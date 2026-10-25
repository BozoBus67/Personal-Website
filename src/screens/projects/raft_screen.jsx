import { createSignal, createEffect, onCleanup, Index, Show } from 'solid-js'
import { useTheme } from '../../shared/constants'
import { Screen_Layout, para_style } from '../../shared/utility_components'
import { get_state, submit_op, tick } from './raft_mock_backend'

const TICK_INTERVAL_MS = 1000

export function Raft_Screen() {
  const [running, set_running] = createSignal(true)
  const [cluster, set_cluster] = createSignal(get_state())

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

  const toggle_running = () => set_running((r) => !r)

  return (
    <Screen_Layout padding_top="6rem">
      <Demo_Box>
        <Clock_Controls
          running={running}
          toggle_running={toggle_running}
          on_tick={handle_tick}
        />
        <Cluster_View cluster={cluster} />
        <Ops_Panel on_submit={handle_submit} />
        <Tick_Counter cluster={cluster} />
      </Demo_Box>
      <Explainer />
    </Screen_Layout>
  )
}

function Demo_Box(props) {
  return (
    <div
      style={{
        background: 'rgba(80, 130, 220, 0.15)',
        border: '1px solid rgba(80, 130, 220, 0.35)',
        'border-radius': '12px',
        padding: '1.5rem',
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
        display: 'flex',
        'justify-content': 'center',
        gap: '0.75rem',
      }}
    >
      <Action_Button on_click={props.toggle_running}>
        <Show when={props.running()} fallback={<Play_Icon />}>
          <Pause_Icon />
        </Show>
      </Action_Button>
      <Action_Button on_click={props.on_tick}>Tick</Action_Button>
    </div>
  )
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
        {(node) => <Node_Tile node={node()} />}
      </Index>
    </div>
  )
}

function Node_Tile(props) {
  const t = useTheme
  return (
    <div
      style={{
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
        <Index each={entries()}>
          {(entry) => (
            <Log_Entry
              entry={entry()}
              committed={entry().index <= props.commit}
            />
          )}
        </Index>
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
      <select
        value={op()}
        onInput={(e) => set_op(e.currentTarget.value)}
        style={field_style()}
      >
        <option value="put">put</option>
        <option value="delete">delete</option>
      </select>
      <input
        placeholder="key"
        value={key()}
        onInput={(e) => set_key(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handle_submit()
        }}
        style={field_style()}
      />
      <Show when={op() === 'put'}>
        <input
          placeholder="value"
          value={value()}
          onInput={(e) => set_value(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handle_submit()
          }}
          style={field_style()}
        />
      </Show>
      <Action_Button on_click={handle_submit}>Submit</Action_Button>
    </div>
  )
}

function Action_Button(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  return (
    <button
      onClick={props.on_click}
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        padding: '0.4rem 1rem',
        border: `1px solid ${hover() ? t().accent : t().accent_border}`,
        'border-radius': '6px',
        background: hover() ? t().accent_bg : 'transparent',
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
        'text-align': 'center',
        'font-size': '0.85rem',
        color: t().text_h,
        opacity: 0.6,
      }}
    >
      tick: {props.cluster().tick}
    </div>
  )
}

function Explainer() {
  return <p style={para_style()}>(explainer coming later)</p>
}
