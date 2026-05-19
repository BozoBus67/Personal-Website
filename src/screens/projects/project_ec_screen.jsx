import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Project_EC_Screen() {
  const t = useTheme

  const h1_style = () => ({
    'font-weight': 700,
    'font-size': '40px',
    'line-height': 1,
    margin: 0,
    color: t().text_h,
  })

  const h2_style = () => ({
    'font-weight': 700,
    'font-size': '22px',
    'line-height': 1,
    margin: '1rem 0 0',
    color: t().text_h,
  })

  const para_style = () => ({
    margin: 0,
    color: t().text,
    'line-height': 1.5,
  })

  const list_style = () => ({
    margin: 0,
    'padding-left': '1.25rem',
    color: t().text,
    'line-height': 1.5,
    display: 'flex',
    'flex-direction': 'column',
    gap: '0.4rem',
  })

  return (
    <Screen_Layout>
      <h1 style={h1_style()}>Project EC</h1>

      <p style={para_style()}>
        A cookie-clicker–style incremental game built as a desktop app. It
        started as an excuse to learn Electron and ended up growing a real
        backend, persistent multi-user state, and a handful of features that
        have nothing to do with clicking cookies.
      </p>

      <h2 style={h2_style()}>Stack</h2>
      <p style={para_style()}>
        The client is Electron + Vite, with React and Redux on the frontend and
        Tailwind for styling. Routing uses react-router in hash mode so it works
        inside a packaged Electron build. The backend is Python (FastAPI),
        backed by Supabase for auth and Postgres for game state. PostHog handles
        analytics. The music player wraps the YouTube IFrame Player so audio
        keeps playing across screen navigation.
      </p>

      <h2 style={h2_style()}>Features</h2>
      <ul style={list_style()}>
        <li>
          <strong>Core loop.</strong> Click cookies, buy buildings, accumulate
          currency, unlock more buildings.
        </li>
        <li>
          <strong>Auction house.</strong> Time-windowed listings between
          players.
        </li>
        <li>
          <strong>Mastery scrolls.</strong> Unlockables that gate cosmetics and
          modes — extra themes, joke toggles, certain features.
        </li>
        <li>
          <strong>Chess.</strong> Play Stockfish at variable strength.
          Lazy-loaded so chess.js and the engine wrapper don't bloat startup.
        </li>
        <li>
          <strong>Music player.</strong> Persistent YouTube-backed playlists,
          shuffle, volume control.
        </li>
        <li>
          <strong>Theming.</strong> Default cookie-clicker art, plus light
          parchment and dark themes unlocked through gameplay.
        </li>
        <li>
          <strong>Premium tiers.</strong> Three tiers behind paid scrolls,
          gating a subset of features.
        </li>
      </ul>

      <h2 style={h2_style()}>Notes</h2>
      <p style={para_style()}>
        A lot of state ended up in Redux that could've been local component
        state. If I started over I'd be more careful about which slices are
        actually shared and which are just convenient to reach from anywhere.
        The chess integration also got tangled with global game state in a way
        that made the lazy-load split harder than it needed to be.
      </p>
    </Screen_Layout>
  )
}
