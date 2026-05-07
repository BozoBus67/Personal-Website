import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Home_Screen() {
  const t = useTheme
  return (
    <Screen_Layout>
      <h1
        style={{
          'font-weight': 700,
          'font-size': '56px',
          'line-height': 1,
          margin: 0,
          color: t().text_h,
        }}
      >
        Hi, I'm Kevin.
      </h1>
      <p style={{ margin: 0, color: t().text }}>
        Welcome to my personal website.
      </p>
    </Screen_Layout>
  )
}
