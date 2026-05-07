import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Games_Screen() {
  const t = useTheme
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
    </Screen_Layout>
  )
}
