import { createSignal, Show, onMount, onCleanup } from 'solid-js'
import { useTheme } from '../shared/constants'
import { Screen_Layout, Page_Title } from '../shared/utility_components'
import derp from '../assets/favicon/derp_face.png'
import sun from '../assets/light_dark_toggle_switch/sun.png'
import moon from '../assets/light_dark_toggle_switch/moon.png'
import forest from '../assets/forest.png'
import starry_sky from '../assets/starry_sky.png'
import latte_float from '../assets/website_backgrounds/latte_float.jpg'
import sodium_lamps from '../assets/website_backgrounds/sodium-street-lamps.webp'

const ICONS = [
  { url: derp, name: 'derp face', filename: 'derp_face.png' },
  { url: sun, name: 'sun', filename: 'sun.png' },
  { url: moon, name: 'moon', filename: 'moon.png' },
]

const WALLPAPERS = [
  { url: forest, name: 'forest', filename: 'forest.png' },
  { url: latte_float, name: 'latte float', filename: 'latte_float.jpg' },
  { url: starry_sky, name: 'starry sky', filename: 'starry_sky.png' },
  { url: sodium_lamps, name: 'sodium street lamps', filename: 'sodium-street-lamps.webp' },
]

const [selected, set_selected] = createSignal(null)

export function Gallery_Screen() {
  onMount(() => {
    const on_key = (e) => {
      if (e.key !== 'Escape' || !selected()) return
      set_selected(null)
      e.stopImmediatePropagation()
    }
    document.addEventListener('keydown', on_key, { capture: true })
    onCleanup(() =>
      document.removeEventListener('keydown', on_key, { capture: true }),
    )
  })
  return (
    <Screen_Layout padding_bottom="7rem">
      <Page_Title>Gallery</Page_Title>
      <Image_Group items={ICONS} />
      <Image_Group items={WALLPAPERS} />
      <Show when={selected()}>
        <Image_Modal item={selected()} on_close={() => set_selected(null)} />
      </Show>
    </Screen_Layout>
  )
}

function Image_Group(props) {
  return (
    <div
      style={{
        background: 'rgba(80, 130, 220, 0.15)',
        border: '1px solid rgba(80, 130, 220, 0.35)',
        'border-radius': '12px',
        padding: '2rem',
        display: 'flex',
        'flex-wrap': 'wrap',
        gap: '2.5rem',
        'justify-content': 'center',
        'align-items': 'center',
      }}
    >
      {props.items.map((item) => (
        <Image_Tile item={item} />
      ))}
    </div>
  )
}

function Image_Tile(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  return (
    <div
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      onClick={() => set_selected(props.item)}
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        gap: '0.5rem',
        'max-width': '220px',
        cursor: 'pointer',
      }}
    >
      <img
        src={props.item.url}
        alt={props.item.name}
        style={{
          'max-height': '180px',
          'max-width': '220px',
          display: 'block',
          'box-shadow': hover()
            ? '0 0 18px rgba(80, 130, 220, 0.75)'
            : 'none',
          transition: 'box-shadow 0.15s ease',
        }}
      />
      <p
        style={{
          margin: 0,
          color: t().text_h,
          'font-size': '0.85rem',
          'text-align': 'center',
          'font-family': 'monospace',
          'word-break': 'break-word',
        }}
      >
        {props.item.name}
      </p>
    </div>
  )
}

function Image_Modal(props) {
  const [hover, set_hover] = createSignal(false)
  return (
    <div
      onClick={props.on_close}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        'z-index': 100,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'flex-direction': 'column',
        gap: '1rem',
        padding: '2rem',
        cursor: 'pointer',
      }}
    >
      <img
        src={props.item.url}
        alt={props.item.name}
        onClick={(e) => e.stopPropagation()}
        style={{
          'max-width': '85vw',
          'max-height': '75vh',
          'object-fit': 'contain',
          display: 'block',
          cursor: 'default',
        }}
      />
      <a
        href={props.item.url}
        download={props.item.filename}
        onClick={(e) => e.stopPropagation()}
        onMouseEnter={() => set_hover(true)}
        onMouseLeave={() => set_hover(false)}
        style={{
          padding: '0.6rem 1.5rem',
          background: hover() ? '#1d4ed8' : '#2563eb',
          color: '#ffffff',
          'text-decoration': 'none',
          'border-radius': '6px',
          'font-weight': 700,
          'font-size': '1rem',
          transition: 'background 0.15s ease',
        }}
      >
        Download
      </a>
    </div>
  )
}