import {
  createSignal,
  createEffect,
  onCleanup,
  onMount,
  For,
  Show,
} from 'solid-js'
import { A, useLocation } from '@solidjs/router'
import {
  useTheme,
  themeName,
  toggleTheme,
  menu_open,
  set_menu_open,
  sidebar_width,
  set_sidebar_width,
  is_disclosure_open,
  toggle_disclosure,
} from './constants'
import sun from '../assets/light_dark_toggle_switch/sun.png'
import moon from '../assets/light_dark_toggle_switch/moon.png'

const SECTIONS = [
  { path: '/', label: 'Home' },
  { path: '/coursework', label: 'Coursework' },
  {
    label: 'Projects',
    children: [
      { path: '/projects/project-ec', label: 'Project EC' },
      { path: '/projects/minecraft-mods', label: 'Minecraft Mods' },
      { path: '/projects/others', label: 'Others' },
    ],
  },
  { path: '/recommendations', label: 'Recommendations' },
  { path: '/contact', label: 'Contact' },
  { path: '/help', label: 'Help' },
  { path: '/settings', label: 'Settings' },
]

function Sidebar_Link(props) {
  const t = useTheme
  const location = useLocation()
  const [hover, set_hover] = createSignal(false)
  const is_active = () => location.pathname === props.section.path
  const get_bg = () =>
    is_active() ? t().code_bg : hover() ? t().hover_bg : 'transparent'
  if (props.indent) {
    return (
      <A
        href={props.section.path}
        onMouseEnter={() => set_hover(true)}
        onMouseLeave={() => set_hover(false)}
        style={{
          display: 'block',
          color: t().text_h,
          background: get_bg(),
          'text-decoration': 'none',
          'font-size': '1.2rem',
          'white-space': 'nowrap',
          'border-bottom': props.is_last ? `1px solid ${t().border}` : 'none',
        }}
      >
        <div
          style={{
            'margin-left': '2.5rem',
            'margin-right': '1.75rem',
            padding: '0.5rem 0',
            'border-bottom': props.is_last
              ? 'none'
              : `1px solid ${t().border}`,
          }}
        >
          {props.section.label}
        </div>
      </A>
    )
  }
  return (
    <A
      href={props.section.path}
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        display: 'block',
        padding: '0.9rem 1.75rem',
        color: t().text_h,
        background: get_bg(),
        'border-bottom': `1px solid ${t().border}`,
        'text-decoration': 'none',
        'font-size': '1.5rem',
        'white-space': 'nowrap',
      }}
    >
      {props.section.label}
    </A>
  )
}

function Sidebar_Disclosure(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  const expanded = () => is_disclosure_open(props.section.label)
  return (
    <>
      <button
        onClick={() => toggle_disclosure(props.section.label)}
        onMouseEnter={() => set_hover(true)}
        onMouseLeave={() => set_hover(false)}
        style={{
          display: 'block',
          width: '100%',
          padding: 0,
          color: t().text_h,
          background: hover() ? t().hover_bg : 'transparent',
          border: 'none',
          'font-size': '1.5rem',
          'font-family': 'inherit',
          'text-align': 'left',
          cursor: 'pointer',
          'white-space': 'nowrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'space-between',
            'margin-left': expanded() ? '1.75rem' : 0,
            'margin-right': expanded() ? '1.75rem' : 0,
            padding: expanded() ? '0.9rem 0' : '0.9rem 1.75rem',
            'border-bottom': `1px solid ${t().border}`,
          }}
        >
          <span>{props.section.label}</span>
          <span
            style={{
              display: 'inline-flex',
              'align-items': 'center',
              'justify-content': 'center',
              opacity: hover() ? 0.5 : 0,
              transform: expanded() ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 4, 10 8, 6 12" />
            </svg>
          </span>
        </div>
      </button>
      <div
        style={{
          display: 'grid',
          'grid-template-rows': expanded() ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.2s ease',
        }}
      >
        <div style={{ overflow: 'hidden', 'min-height': 0 }}>
          <For each={props.section.children}>
            {(child, index) => (
              <Sidebar_Link
                section={child}
                indent
                is_last={index() === props.section.children.length - 1}
              />
            )}
          </For>
        </div>
      </div>
    </>
  )
}

export function Hamburger_Icon(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      {props.open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </>
      )}
    </svg>
  )
}

export function Hamburger_Button(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  return (
    <button
      onClick={props.on_click}
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      aria-label="Toggle menu"
      aria-expanded={props.open}
      data-menu-keep-open
      style={{
        width: '44px',
        height: '44px',
        display: 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        border: 'none',
        background: 'transparent',
        color: t().text_h,
        padding: 0,
        cursor: 'pointer',
        transform: hover() ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform 0.1s ease',
      }}
    >
      <Hamburger_Icon open={props.open} />
    </button>
  )
}

export function Hamburger_Sidebar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '60px',
        padding: '1rem 0 0 1rem',
        'box-sizing': 'border-box',
        'z-index': 5,
      }}
    >
      {!menu_open() && (
        <Hamburger_Button
          open={false}
          on_click={() => set_menu_open(true)}
        />
      )}
    </div>
  )
}

export function Sidebar(props) {
  const t = useTheme
  let nav_el
  onMount(() => {
    if (!nav_el) return
    const obs = new ResizeObserver(([entry]) => {
      if (entry) set_sidebar_width(entry.contentRect.width)
    })
    obs.observe(nav_el)
    onCleanup(() => obs.disconnect())
  })
  return (
    <nav
      ref={nav_el}
      aria-hidden={!props.open}
      data-menu-keep-open
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: 'max-content',
        'min-width': '200px',
        background: 'transparent',
        'border-right': `1px solid ${t().border}`,
        padding: 0,
        display: 'flex',
        'flex-direction': 'column',
        transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        'z-index': 10,
        'box-sizing': 'border-box',
      }}
    >
      <For each={SECTIONS}>
        {(section) =>
          section.children ? (
            <Sidebar_Disclosure section={section} />
          ) : (
            <Sidebar_Link section={section} />
          )
        }
      </For>
    </nav>
  )
}

export function Theme_Toggle() {
  const [hover, set_hover] = createSignal(false)
  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      aria-label={`Switch to ${themeName() === 'light' ? 'dark' : 'light'} mode`}
      data-menu-keep-open
      style={{
        position: 'fixed',
        top: '0.5rem',
        right: '0.5rem',
        'z-index': 20,
        border: 'none',
        background: 'transparent',
        padding: 0,
        cursor: 'pointer',
        transform: hover() ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform 0.1s ease',
      }}
    >
      <img
        src={themeName() === 'light' ? sun : moon}
        alt=""
        style={{ width: '64px', height: '64px', display: 'block' }}
      />
    </button>
  )
}

const DEFAULT_PADDING_TOP = '3rem'
const DEFAULT_PADDING_SIDE = '4.5rem'
const DEFAULT_PADDING_BOTTOM = '5rem'

export function Screen_Layout(props) {
  createEffect(() => {
    if (!menu_open()) return
    const on_key = (e) => {
      if (e.key === 'Escape') set_menu_open(false)
    }
    document.addEventListener('keydown', on_key)
    onCleanup(() => {
      document.removeEventListener('keydown', on_key)
    })
  })

  return (
    <>
      <Hamburger_Sidebar />
      <Theme_Toggle />
      <Sidebar open={menu_open()} />
      <main
        style={{
          'margin-left': menu_open() ? `${sidebar_width()}px` : '60px',
          padding: `${props.padding_top ?? DEFAULT_PADDING_TOP} ${props.padding_side ?? DEFAULT_PADDING_SIDE} ${props.padding_bottom ?? DEFAULT_PADDING_BOTTOM}`,
          'min-height': '100vh',
          'box-sizing': 'border-box',
          display: 'flex',
          'flex-direction': 'column',
          gap: '1rem',
          transition: 'margin-left 0.25s ease',
        }}
      >
        {props.children}
      </main>
    </>
  )
}
