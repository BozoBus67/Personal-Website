// Real Raft, compiled from ../../../../distributed_stuff/raft/raft/ with
// GOOS=js GOARCH=wasm. The WASM module publishes raft{GetState,Tick,Submit,
// AddNode,DeleteNode,Reset} onto the global object; this module wraps those
// in the same export shape raft_mock_backend.js exposed, so raft_screen.jsx
// is import-swap-compatible.

const WASM_URL = '/raft.wasm'
const EXEC_URL = '/wasm_exec.js'

const EMPTY_STATE = { nodes: [], tick: 0 }

let ready_promise = null

function load_exec_script() {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.Go) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = EXEC_URL
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('wasm_exec.js failed to load'))
    document.head.appendChild(s)
  })
}

async function boot() {
  await load_exec_script()
  const go = new window.Go()
  const result = await WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject)
  // go.run resolves only when main() returns. Our main() has select{}, so it
  // never resolves — intentional, we want the runtime alive.
  go.run(result.instance)
  // main() sets window.raftReady = true after bindings are installed.
  for (let i = 0; i < 200; i++) {
    if (window.raftReady) return
    await new Promise((r) => setTimeout(r, 10))
  }
  throw new Error('raft wasm did not signal readiness within 2s')
}

function ensure_ready() {
  if (!ready_promise) ready_promise = boot()
  return ready_promise
}

// Kick off loading the moment anyone imports this module so the first UI
// render has WASM in flight.
if (typeof window !== 'undefined') ensure_ready()

export function get_state() {
  if (typeof window === 'undefined' || !window.raftReady) return EMPTY_STATE
  return window.raftGetState()
}

export function tick() {
  if (typeof window === 'undefined' || !window.raftReady) return
  window.raftTick()
}

export function submit_op(op, key, value) {
  if (typeof window === 'undefined' || !window.raftReady) return false
  return window.raftSubmit(String(op), String(key ?? ''), String(value ?? ''))
}

export function add_node() {
  if (typeof window === 'undefined' || !window.raftReady) return
  window.raftAddNode()
}

export function delete_node(id) {
  if (typeof window === 'undefined' || !window.raftReady) return
  window.raftDeleteNode(id)
}

export function reset() {
  if (typeof window === 'undefined' || !window.raftReady) return
  window.raftReset()
}
