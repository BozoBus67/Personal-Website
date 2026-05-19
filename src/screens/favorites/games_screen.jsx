import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Games_Screen() {
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
        Games
      </h2>
      <p style={{ margin: 0, color: t().text }}>
        Games I think are worth your time.
      </p>

      <ul style={list_style()}>
        <li>
          <strong>Outer Wilds</strong> — the rare game whose central mechanic
          is also its story. Best game I've ever played.
        </li>
        <li>
          <strong>Minecraft</strong> — modding is half the fun. The 1.8 PvP
          version is the one I keep coming back to.
        </li>
        <li>
          <strong>Hades</strong> — the best argument for roguelikes I've seen,
          and the soundtrack carries half the run.
        </li>
        <li>
          <strong>Stardew Valley</strong> — comfort game. Hours disappear and
          you don't quite know where they went.
        </li>
        <li>
          <strong>Elden Ring</strong> — the world does most of the storytelling
          and gets out of the way.
        </li>
        <li>
          <strong>Disco Elysium</strong> — a video game that earns the word
          "novel."
        </li>
      </ul>
    </Screen_Layout>
  )
}
