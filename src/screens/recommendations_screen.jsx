import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Recommendations_Screen() {
  const t = useTheme

  const h3_style = () => ({
    'font-weight': 700,
    'font-size': '1.25rem',
    margin: '1rem 0 0.5rem',
    color: t().text_h,
  })

  const list_style = () => ({
    margin: 0,
    'padding-left': '1.25rem',
    color: t().text,
    'line-height': 1.6,
    display: 'flex',
    'flex-direction': 'column',
    gap: '0.5rem',
    'max-width': '700px',
  })

  return (
    <Screen_Layout>
      <h2
        style={{
          'font-weight': 700,
          'font-size': '24px',
          'line-height': 1,
          margin: 0,
          color: t().text_h,
        }}
      >
        Recommendations
      </h2>
      <p style={{ margin: 0, color: t().text }}>
        Stuff that was worth the time. Updated whenever I remember to.
      </p>

      <h3 style={h3_style()}>Books</h3>
      <ul style={list_style()}>
        <li>
          <strong>Crafting Interpreters</strong> — Robert Nystrom. The book
          that made me want to write a compiler. Two full interpreters that
          both fit in one head.
        </li>
        <li>
          <strong>The Rust Programming Language</strong> — the official book.
          Genuinely the best free intro to a systems language I've read.
        </li>
        <li>
          <strong>Writing an Interpreter in Go</strong> — Thorsten Ball. Pairs
          well with Crafting Interpreters; smaller scope, same clarity.
        </li>
      </ul>

      <h3 style={h3_style()}>Tools</h3>
      <ul style={list_style()}>
        <li>
          <strong>ripgrep</strong> — grep replacement. Once you switch you
          stop noticing it, which is the highest praise a tool can get.
        </li>
        <li>
          <strong>fzf</strong> — fuzzy finder. Turns "where is that thing"
          into one keystroke and a few characters.
        </li>
        <li>
          <strong>zed</strong> — editor. The only one that feels as fast as it
          looks.
        </li>
      </ul>

      <h3 style={h3_style()}>Articles & Blogs</h3>
      <ul style={list_style()}>
        <li>
          <strong>Writing an OS in Rust</strong> — Philipp Oppermann. The
          clearest "start from zero, end at a kernel" walkthrough I've found.
        </li>
        <li>
          <strong>The Architecture of Open Source Applications</strong> — one
          chapter per project. Makes the dense parts approachable.
        </li>
        <li>
          <strong>Hillel Wayne's blog</strong> — opinionated, well-cited,
          surprisingly fun for a blog mostly about formal methods.
        </li>
      </ul>
    </Screen_Layout>
  )
}
