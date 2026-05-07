import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Projects_Screen() {
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
        Projects
      </h2>
      <p style={{ margin: 0, color: t().text }}>Things I've built.</p>
    </Screen_Layout>
  )
}
