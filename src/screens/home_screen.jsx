import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Home_Screen() {
  const t = useTheme

  return (
    <Screen_Layout>
      <div
        style={{
          'min-height': 'calc(100vh - 3rem)',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        }}
      >
        <h1
          style={{
            'font-weight': 700,
            'font-size': '80px',
            'line-height': 1.1,
            margin: 0,
            color: t().text_h,
            'text-align': 'center',
          }}
        >
          Hi, I'm Kevin! Welcome.
        </h1>
      </div>
    </Screen_Layout>
  )
}
