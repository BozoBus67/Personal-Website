import { createSignal, createEffect, onCleanup, Index, Show } from 'solid-js'
import { useTheme } from '../../shared/constants'
import { Screen_Layout, para_style } from '../../shared/utility_components'
import { get_state, submit_op, tick } from './raft_mock_backend'

const TICK_INTERVAL_MS = 400

export function Raft_Screen() {
  const [mode, set_mode] = createSignal('demo')
  const [cluster, set_cluster] = createSignal(get_state())

  createEffect(() => {
    if (mode() !== 'demo') return
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

  const handle_step = () => {
    tick()
    set_cluster(get_state())
  }

  return (
    <Screen_Layout>
      <Mode_Toggle mode={mode} set_mode={set_mode} />
      <Simulation
        cluster={cluster}
        mode={mode}
        on_submit={handle_submit}
        on_step={handle_step}
      />
      <Explainer />
    </Screen_Layout>
  )
}

function Mode_Toggle(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(null)
  const button_style = (name) => {
    const selected = props.mode() === name
    const hovered = hover() === name && !selected
    return {
      padding: '0.5rem 1.25rem',
      border: 'none',
      background: selected
        ? t().code_bg
        : hovered
          ? t().hover_bg
          : 'transparent',
      color: t().text_h,
      cursor: 'pointer',
      'font-family': 'inherit',
      'font-size': '1rem',
      'font-weight': selected ? 700 : 400,
      transition: 'background 0.15s ease',
    }
  }
  return (
    <div style={{ display: 'flex', 'justify-content': 'center' }}>
      <div
        style={{
          display: 'inline-flex',
          'border-radius': '999px',
          border: `1px solid ${t().border}`,
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => props.set_mode('demo')}
          onMouseEnter={() => set_hover('demo')}
          onMouseLeave={() => set_hover(null)}
          style={button_style('demo')}
        >
          Demo
        </button>
        <button
          onClick={() => props.set_mode('debug')}
          onMouseEnter={() => set_hover('debug')}
          onMouseLeave={() => set_hover(null)}
          style={button_style('debug')}
        >
          Debug
        </button>
      </div>
    </div>
  )
}

function Simulation(props) {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '1.5rem',
      }}
    >
      <Cluster_View cluster={props.cluster} />
      <Controls_Row
        mode={props.mode}
        on_submit={props.on_submit}
        on_step={props.on_step}
      />
      <Tick_Counter cluster={props.cluster} />
    </div>
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

function Controls_Row(props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        'justify-content': 'center',
        'align-items': 'center',
        'flex-wrap': 'wrap',
      }}
    >
      <Ops_Panel on_submit={props.on_submit} />
      <Show when={props.mode() === 'debug'}>
        <Action_Button label="Step" on_click={props.on_step} />
      </Show>
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
    <div style={{ display: 'flex', gap: '0.5rem', 'align-items': 'center' }}>
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
      <Action_Button label="Submit" on_click={handle_submit} />
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
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
    >
      {props.label}
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
  return (
    <p style={para_style()}>
      Three Raft nodes in your browser. Submit a put or delete to see the
      leader append the entry to its log, replicate to followers one step at a
      time, and advance the commit index across the cluster. In Debug mode time
      only advances when you click Step.
    </p>
  )
}
