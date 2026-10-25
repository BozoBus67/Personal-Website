import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Home_Screen() {
  const t = useTheme
  const glow_color = () => (t().name === 'light' ? '#ffd700' : '#2d0a4a')
  const text_shadow = () => {
    const c = glow_color()
    return `0 0 8px ${c}, 0 0 16px ${c}, 0 0 24px ${c}`
  }

  return (
    <Screen_Layout>
      <div
        style={{
          flex: 1,
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
            'text-shadow': text_shadow(),
          }}
        >
          Hello! Welcome.
        </h1>
      </div>
    </Screen_Layout>
  )
}
