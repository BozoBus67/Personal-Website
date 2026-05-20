import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Coursework_Screen() {
  const t = useTheme

  return (
    <Screen_Layout>
      <h2
        style={{
          'font-weight': 700,
          'font-size': '48px',
          'line-height': 1,
          margin: 0,
          color: t().text_h,
          'text-align': 'center',
        }}
      >
        Coursework
      </h2>
    </Screen_Layout>
  )
}
