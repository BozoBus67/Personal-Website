import { createSignal } from 'solid-js'
import { useTheme } from '../../shared/constants'
import { Screen_Layout, Page_Title, para_style, Github_Button } from '../../shared/utility_components'

const RELEASE_BASE =
  'https://github.com/BozoBus67/PROJECT-EC/releases/download/v1.0.0'

const DOWNLOADS = [
  {
    platform: 'macOS',
    arch: 'Apple Silicon',
    file: 'project_ec_react-darwin-arm64-1.0.0.zip',
    size: '130 MB',
  },
  {
    platform: 'Windows',
    arch: 'x64',
    file: 'project_ec_react-win32-x64-1.0.0.zip',
    size: '158 MB',
  },
  {
    platform: 'Linux',
    arch: 'x64 (.deb)',
    file: 'project-ec-react_1.0.0_amd64.deb',
    size: '102 MB',
  },
]

function Download_Button(props) {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  const accent = () => (t().name === 'light' ? '#1e40af' : t().accent)
  const accent_border = () => (t().name === 'light' ? 'rgba(30, 64, 175, 0.5)' : t().accent_border)
  const bg_rest = () => (t().name === 'light' ? 'rgba(30, 64, 175, 0.12)' : 'rgba(192, 132, 252, 0.18)')
  const bg_hover = () => (t().name === 'light' ? 'rgba(30, 64, 175, 0.22)' : 'rgba(192, 132, 252, 0.3)')
  return (
    <a
      href={`${RELEASE_BASE}/${props.item.file}`}
      download
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '0.25rem',
        padding: '0.75rem 1rem',
        border: `1px solid ${hover() ? accent() : accent_border()}`,
        'border-radius': '8px',
        background: hover() ? bg_hover() : bg_rest(),
        color: t().text_h,
        'text-decoration': 'none',
        'min-width': '180px',
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
    >
      <span style={{ 'font-weight': 700, 'font-size': '1rem' }}>
        Download for {props.item.platform}
      </span>
      <span style={{ 'font-size': '0.85rem', color: t().text }}>
        {props.item.arch} · {props.item.size}
      </span>
    </a>
  )
}

export function Project_EC_Screen() {
  const t = useTheme

  const download_row_style = () => ({
    display: 'flex',
    'flex-wrap': 'wrap',
    gap: '0.75rem',
  })

  return (
    <Screen_Layout>
      <Page_Title>Cookie Clicker Plus</Page_Title>

      <div style={{ display: 'flex', 'align-items': 'flex-start', 'justify-content': 'space-between', gap: '1.5rem' }}>
        <p style={{ ...para_style(), margin: 0, flex: 1 }}>
          I remade a version of the popular web game Cookie Clicker with a bunch of add-ons on top. It started as an excuse to learn Electron and ended up with a real backend, multi-user state, and a handful of features that have nothing to do with clicking cookies.
        </p>
        <Github_Button href="https://github.com/BozoBus67/PROJECT-EC" />
      </div>

      <p style={para_style()}>
        Play in your browser at{' '}
        <a
          href="https://cookie-clicker-plus.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: t().name === 'light' ? '#1e40af' : '#60a5fa', 'text-decoration': 'underline' }}
        >
          cookie-clicker-plus.vercel.app
        </a>
        .
      </p>
      <p style={para_style()}>
        You can also download them as a desktop app.
      </p>
      <div style={download_row_style()}>
        {DOWNLOADS.map((item) => (
          <Download_Button item={item} />
        ))}
      </div>

      <p style={para_style()}>
        This is a webapp, also available as a desktop app via Electron. The frontend is built with Vite, React, and Redux, styled with Tailwind. The backend is built with Python and FastAPI. Supabase handles auth and the Postgres database. I also added various add-ons like an auction house, lootboxes, Stripe for payments, PostHog for analytics, and a music player that wraps the YouTube IFrame Player so audio keeps playing between screens.
      </p>

    </Screen_Layout>
  )
}
