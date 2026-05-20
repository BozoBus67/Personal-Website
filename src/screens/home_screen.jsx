import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Home_Screen() {
  const t = useTheme

  return (
    <Screen_Layout>
      <h1
        style={{
          'font-weight': 700,
          'font-size': '120px',
          'line-height': 1.1,
          margin: 0,
          color: t().text_h,
          'text-align': 'center',
        }}
      >
        Hi! Welcome.
      </h1>
    </Screen_Layout>
  )
}
