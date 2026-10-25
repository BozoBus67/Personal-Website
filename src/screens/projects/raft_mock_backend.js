// Mock Raft state for the UI scaffold. Replaced later by the WASM bridge.
// Semantics: `tick()` is one scheduler step. `submit_op` only appends to the
// leader; propagation and commit advance across ticks so Step is visible.

let state = initial_state()
let next_follower = 0

function initial_state() {
  return {
    nodes: [
      make_node(1, 'Leader'),
      make_node(2, 'Follower'),
      make_node(3, 'Follower'),
    ],
    tick: 0,
  }
}

function make_node(id, role) {
  return {
    id,
    role,
    term: 1,
    log: [
      { term: 0, op: 'sentinel' },
      { term: 1, op: 'noop' },
    ],
    commitIndex: 1,
    lastApplied: 1,
    kv: {},
  }
}

export function get_state() {
  return clone(state)
}

export function submit_op(op, key, value) {
  const leader = state.nodes.find((n) => n.role === 'Leader')
  if (!leader) return false
  leader.log.push({ term: leader.term, op, key, value })
  return true
}

export function tick() {
  state.tick++
  const leader = state.nodes.find((n) => n.role === 'Leader')
  if (!leader) return
  const followers = state.nodes.filter((n) => n.role === 'Follower')
  if (followers.length === 0) return

  const target = followers[next_follower % followers.length]
  next_follower++
  if (target.log.length < leader.log.length) {
    target.log.push(clone(leader.log[target.log.length]))
    target.term = leader.term
  }

  const total = state.nodes.length
  const majority = Math.floor(total / 2) + 1
  for (let N = leader.commitIndex + 1; N < leader.log.length; N++) {
    let count = 1
    for (const f of followers) {
      if (f.log.length > N && f.log[N].term === leader.log[N].term) count++
    }
    if (count >= majority && leader.log[N].term === leader.term) {
      leader.commitIndex = N
    }
  }

  for (const f of followers) {
    const new_commit = Math.min(leader.commitIndex, f.log.length - 1)
    if (new_commit > f.commitIndex) f.commitIndex = new_commit
  }

  for (const n of state.nodes) {
    while (n.lastApplied < n.commitIndex) {
      n.lastApplied++
      const entry = n.log[n.lastApplied]
      if (entry.op === 'put') n.kv[entry.key] = entry.value
      else if (entry.op === 'delete') delete n.kv[entry.key]
    }
  }
}

function clone(x) {
  return JSON.parse(JSON.stringify(x))
}
