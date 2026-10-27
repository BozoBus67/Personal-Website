import { createSignal, createEffect, onCleanup, Index, Show } from 'solid-js'
import { useTheme } from '../../shared/constants'
import { Screen_Layout, para_style, Github_Button, Page_Title } from '../../shared/utility_components'
import {
  get_state,
  submit_op,
  tick,
  add_node,
  delete_node,
  reset,
  shutdown,
  wait_ready,
} from './raft_wasm_backend'

const TICK_INTERVAL_MS = 1000

export function Raft_Screen() {
  const [running, set_running] = createSignal(false)
  const [cluster, set_cluster] = createSignal(get_state())

  wait_ready().then(() => {
    reset()
    set_cluster(get_state())
  })

  onCleanup(() => shutdown())

  createEffect(() => {
    if (!running()) return
    const id = setInterval(() => {
      tick()
      set_cluster(get_state())
    }, TICK_INTERVAL_MS)
    onCleanup(() => clearInterval(id))
  })

  const handle_submit = (op, key, value) => {
    submit_op(op, key, value)
    set_cluster(get_state())
  }

  const handle_tick = () => {
    tick()
    set_cluster(get_state())
  }

  const handle_add_node = () => {
    add_node()
    set_cluster(get_state())
  }

  const handle_delete_node = (id) => {
    delete_node(id)
    set_cluster(get_state())
  }

  const handle_reset = () => {
    reset()
    set_cluster(get_state())
  }

  const toggle_running = () => set_running((r) => !r)

  return (
    <Screen_Layout>
      <Intro />
      <Demo_Box>
        <Clock_Controls
          running={running}
          toggle_running={toggle_running}
          on_tick={handle_tick}
          on_add_node={handle_add_node}
          on_reset={handle_reset}
        />
        <Cluster_View cluster={cluster} on_delete={handle_delete_node} />
        <Ops_Panel on_submit={handle_submit} />
        <Tick_Counter cluster={cluster} />
      </Demo_Box>
      <Explainer />
    </Screen_Layout>
  )
}

function Intro() {
  return (
    <div style={{ position: 'relative' }}>
      <Page_Title>Raft</Page_Title>
      <div
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: 0,
        }}
      >
        <Github_Button href="https://github.com/BozoBus67/Raft" />
      </div>
    </div>
  )
}

function Demo_Box(props) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(80, 130, 220, 0.15)',
        border: '1px solid rgba(80, 130, 220, 0.35)',
        'border-radius': '12px',
        padding: '5rem 1.5rem 1.5rem',
        display: 'flex',
        'flex-direction': 'column',
        gap: '1rem',
      }}
    >
      {props.children}
    </div>
  )
}

function Clock_Controls(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '1rem',
        right: '1.25rem',
        display: 'flex',
        gap: '0.75rem',
      }}
    >
      <Action_Button on_click={props.toggle_running}>
        <Show when={props.running()} fallback={<Play_Icon />}>
          <Pause_Icon />
        </Show>
      </Action_Button>
      <Action_Button on_click={props.on_tick}>Step</Action_Button>
      <Add_Node_Button on_click={props.on_add_node} />
      <Action_Button on_click={props.on_reset}>Reset</Action_Button>
    </div>
  )
}

function Add_Node_Button(props) {
  return <Action_Button on_click={props.on_click}>+ Node</Action_Button>
}

function Pause_Icon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="4" y="3" width="3" height="10" />
      <rect x="9" y="3" width="3" height="10" />
    </svg>
  )
}

function Play_Icon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <polygon points="4,3 13,8 4,13" />
    </svg>
  )
}

function Cluster_View(props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        'justify-content': 'center',
        'flex-wrap': 'wrap',
      }}
    >
      <Index each={props.cluster().nodes}>
        {(node) => <Node_Tile node={node()} on_delete={props.on_delete} />}
      </Index>
    </div>
  )
}

function Node_Tile(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  return (
    <div
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        position: 'relative',
        border: `1px solid ${t().border}`,
        'border-radius': '8px',
        padding: '1rem',
        'min-width': '220px',
        background: t().code_bg,
        display: 'flex',
        'flex-direction': 'column',
        gap: '0.75rem',
      }}
    >
      <Show when={hover()}>
        <button
          onClick={() => props.on_delete(props.node.id)}
          aria-label={`Delete node ${props.node.id}`}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            width: '20px',
            height: '20px',
            'border-radius': '50%',
            border: `1px solid ${t().text_h}`,
            background: t().code_bg,
            color: t().text_h,
            'font-size': '0.75rem',
            'font-weight': 700,
            cursor: 'pointer',
            display: 'inline-flex',
            'align-items': 'center',
            'justify-content': 'center',
            padding: 0,
            'line-height': 1,
          }}
        >
          ×
        </button>
      </Show>
      <Node_Header id={props.node.id} role={props.node.role} />
      <Node_Stats
        term={props.node.term}
        commit={props.node.commitIndex}
        applied={props.node.lastApplied}
      />
      <Log_View log={props.node.log} commit={props.node.commitIndex} />
      <KV_View kv={props.node.kv} />
    </div>
  )
}

function Node_Header(props) {
  const t = useTheme
  const is_leader = () => props.role === 'Leader'
  return (
    <div
      style={{
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
      }}
    >
      <span
        style={{
          'font-weight': 700,
          'font-size': '1.15rem',
          color: t().text_h,
        }}
      >
        Node {props.id}
      </span>
      <span
        style={{
          padding: '0.15rem 0.5rem',
          'border-radius': '4px',
          border: `1px solid ${is_leader() ? t().accent_border : t().border}`,
          background: is_leader() ? t().accent_bg : 'transparent',
          color: is_leader() ? t().accent : t().text_h,
          'font-size': '0.85rem',
          'font-weight': 600,
        }}
      >
        {props.role}
      </span>
    </div>
  )
}

function Node_Stats(props) {
  const t = useTheme
  const line_style = () => ({
    display: 'flex',
    'justify-content': 'space-between',
    'font-size': '0.9rem',
    color: t().text_h,
  })
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '0.15rem',
      }}
    >
      <div style={line_style()}>
        <span>term</span>
        <span>{props.term}</span>
      </div>
      <div style={line_style()}>
        <span>commit</span>
        <span>{props.commit}</span>
      </div>
      <div style={line_style()}>
        <span>applied</span>
        <span>{props.applied}</span>
      </div>
    </div>
  )
}

function Log_View(props) {
  const entries = () =>
    props.log.slice(1).map((e, i) => ({ ...e, index: i + 1 }))
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.1rem' }}>
      <Section_Label>log</Section_Label>
      <Show when={entries().length > 0} fallback={<Empty_Note />}>
        <div style={{ 'max-height': '12rem', 'overflow-y': 'auto', display: 'flex', 'flex-direction': 'column', gap: '0.1rem' }}>
          <Index each={entries()}>
            {(entry) => (
              <Log_Entry
                entry={entry()}
                committed={entry().index <= props.commit}
              />
            )}
          </Index>
        </div>
      </Show>
    </div>
  )
}

function Log_Entry(props) {
  const t = useTheme
  const label = () => {
    const e = props.entry
    if (e.op === 'noop') return `${e.index}. [t=${e.term}] noop`
    if (e.op === 'put')
      return `${e.index}. [t=${e.term}] put ${e.key}=${e.value}`
    if (e.op === 'delete') return `${e.index}. [t=${e.term}] del ${e.key}`
    return `${e.index}. [t=${e.term}] ${e.op}`
  }
  return (
    <div
      style={{
        'font-family': 'monospace',
        'font-size': '0.85rem',
        color: t().text_h,
        opacity: props.committed ? 1 : 0.5,
      }}
    >
      {label()}
    </div>
  )
}

function KV_View(props) {
  const t = useTheme
  const entries = () => Object.entries(props.kv)
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.1rem' }}>
      <Section_Label>kv</Section_Label>
      <Show when={entries().length > 0} fallback={<Empty_Note />}>
        <Index each={entries()}>
          {(entry) => (
            <div
              style={{
                'font-family': 'monospace',
                'font-size': '0.85rem',
                color: t().text_h,
              }}
            >
              {entry()[0]} = {entry()[1]}
            </div>
          )}
        </Index>
      </Show>
    </div>
  )
}

function Section_Label(props) {
  const t = useTheme
  return (
    <div
      style={{
        'font-size': '0.85rem',
        color: t().text_h,
        'font-weight': 600,
      }}
    >
      {props.children}
    </div>
  )
}

function Empty_Note() {
  const t = useTheme
  return (
    <div style={{ 'font-size': '0.85rem', color: t().text_h, opacity: 0.6 }}>
      (empty)
    </div>
  )
}

function Ops_Panel(props) {
  const t = useTheme
  const [op, set_op] = createSignal('put')
  const [key, set_key] = createSignal('')
  const [value, set_value] = createSignal('')

  const handle_submit = () => {
    if (!key()) return
    props.on_submit(op(), key(), op() === 'put' ? value() : '')
    set_key('')
    set_value('')
  }

  const field_style = () => ({
    padding: '0.4rem 0.6rem',
    border: `1px solid ${t().border}`,
    'border-radius': '6px',
    background: t().code_bg,
    color: t().text_h,
    'font-family': 'inherit',
    'font-size': '0.95rem',
  })

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        'align-items': 'center',
        'justify-content': 'center',
        'flex-wrap': 'wrap',
      }}
    >
      <Op_Dropdown op={op} set_op={set_op} />
      <input
        placeholder="key"
        value={key()}
        onInput={(e) => set_key(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handle_submit()
        }}
        style={field_style()}
      />
      <input
        placeholder="value"
        value={value()}
        disabled={op() === 'delete'}
        onInput={(e) => set_value(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handle_submit()
        }}
        style={{
          ...field_style(),
          opacity: op() === 'delete' ? 0.4 : 1,
          cursor: op() === 'delete' ? 'not-allowed' : 'text',
        }}
      />
      <Action_Button on_click={handle_submit}>Submit</Action_Button>
    </div>
  )
}

function Op_Dropdown(props) {
  const t = useTheme
  const [open, set_open] = createSignal(false)

  createEffect(() => {
    if (!open()) return
    const handle_outside = (e) => {
      if (!e.target.closest('[data-op-dropdown]')) {
        set_open(false)
      }
    }
    document.addEventListener('click', handle_outside)
    onCleanup(() => document.removeEventListener('click', handle_outside))
  })

  const handle_select = (op) => {
    props.set_op(op)
    set_open(false)
  }

  return (
    <div data-op-dropdown style={{ position: 'relative' }}>
      <button
        onClick={() => set_open(!open())}
        style={{
          padding: '0.4rem 0.6rem',
          border: `1px solid ${t().border}`,
          'border-radius': '6px',
          background: t().code_bg,
          color: t().text_h,
          'font-family': 'inherit',
          'font-size': '0.95rem',
          cursor: 'pointer',
          'min-width': '5rem',
          display: 'inline-flex',
          'align-items': 'center',
          'justify-content': 'space-between',
          gap: '0.5rem',
        }}
      >
        <span>{props.op()}</span>
        <span style={{ 'font-size': '0.7rem', opacity: 0.6 }}>▾</span>
      </button>
      <Show when={open()}>
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            background: t().code_bg,
            border: `1px solid ${t().border}`,
            'border-radius': '6px',
            overflow: 'hidden',
            'z-index': 10,
          }}
        >
          <Dropdown_Option
            label="put"
            selected={props.op() === 'put'}
            on_click={() => handle_select('put')}
          />
          <Dropdown_Option
            label="delete"
            selected={props.op() === 'delete'}
            on_click={() => handle_select('delete')}
          />
        </div>
      </Show>
    </div>
  )
}

function Dropdown_Option(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  return (
    <div
      onClick={props.on_click}
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        padding: '0.5rem 0.75rem',
        background: hover()
          ? t().hover_bg
          : props.selected
            ? t().accent_bg
            : 'transparent',
        color: t().text_h,
        cursor: 'pointer',
        'font-size': '0.95rem',
      }}
    >
      {props.label}
    </div>
  )
}

function Action_Button(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  const bg_rest = () => (t().name === 'light' ? 'rgba(170, 59, 255, 0.1)' : 'rgba(192, 132, 252, 0.18)')
  const bg_hover = () => (t().name === 'light' ? 'rgba(170, 59, 255, 0.2)' : 'rgba(192, 132, 252, 0.3)')
  return (
    <button
      onClick={props.on_click}
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        padding: '0.4rem 1rem',
        border: `1px solid ${hover() ? t().accent : t().accent_border}`,
        'border-radius': '6px',
        background: hover() ? bg_hover() : bg_rest(),
        color: t().text_h,
        'font-family': 'inherit',
        'font-size': '0.95rem',
        'font-weight': 600,
        cursor: 'pointer',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
    >
      {props.children}
    </button>
  )
}

function Tick_Counter(props) {
  const t = useTheme
  return (
    <div
      style={{
        position: 'absolute',
        top: '1rem',
        left: '1.25rem',
        'font-size': '0.95rem',
        'font-weight': 700,
        color: t().text_h,
      }}
    >
      tick: {props.cluster().tick}
    </div>
  )
}

function Explainer() {
  return (
    <>
      <p style={para_style()}>
        I built an implementation of the Raft consensus algorithm. The mock cluster above simulates leader election, log replication, and commits across the nodes you see. The implementation is in Go, compiled to WebAssembly to run in the browser. In addition to the core consensus and log replication, I also added cluster membership changes and log compaction, so it really covers the full thing.
      </p>
    </>
  )
}
