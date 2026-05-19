import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Shows_Screen() {
  const t = useTheme

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
        Shows
      </h2>
      <p style={{ margin: 0, color: t().text }}>
        Shows I think are worth your time.
      </p>

      <ul style={list_style()}>
        <li>
          <strong>Breaking Bad</strong> — the obvious answer, for a reason.
        </li>
        <li>
          <strong>Better Call Saul</strong> — somehow even better than Breaking
          Bad.
        </li>
        <li>
          <strong>Severance</strong> — best show currently airing.
        </li>
        <li>
          <strong>Mr. Robot</strong> — uneven late game, but the highs are
          rare-air good.
        </li>
        <li>
          <strong>Arcane</strong> — animation peak. Worth watching even if
          you've never touched League.
        </li>
        <li>
          <strong>Succession</strong> — Shakespearean in the actual sense, not
          the lazy-reviewer sense.
        </li>
      </ul>
    </Screen_Layout>
  )
}
