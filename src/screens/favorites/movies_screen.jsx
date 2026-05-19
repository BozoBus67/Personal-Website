import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Movies_Screen() {
  const t = useTheme

  const list_style = () => ({
    margin: 0,
    'padding-left': '1.25rem',
    color: t().text,
    'line-height': 1.6,
    display: 'flex',
    'flex-direction': 'column',
    gap: '0.5rem',
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
        Movies
      </h2>
      <p style={{ margin: 0, color: t().text }}>
        Movies I think are worth your time.
      </p>

      <ul style={list_style()}>
        <li>
          <strong>Whiplash</strong> — the single best movie about the cost of
          being great at something.
        </li>
        <li>
          <strong>Parasite</strong> — the staircase movie. Tells you exactly
          what it's about in its blocking, and is somehow still surprising.
        </li>
        <li>
          <strong>Everything Everywhere All At Once</strong> — the only
          multiverse movie that earned the multiverse.
        </li>
        <li>
          <strong>The Social Network</strong> — Sorkin dialogue, Fincher
          direction, hard to beat.
        </li>
        <li>
          <strong>Into the Spider-Verse</strong> — proof that animation isn't
          a genre.
        </li>
        <li>
          <strong>Arrival</strong> — sci-fi about language, told slowly enough
          to land.
        </li>
      </ul>
    </Screen_Layout>
  )
}
