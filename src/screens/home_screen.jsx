import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Home_Screen() {
  const t = useTheme
  const glow_color = () => (t().name === 'light' ? '#ffffff' : '#000000')
  const text_shadow = () => {
    const c = glow_color()
    return `0 0 6px ${c}, 0 0 12px ${c}, 0 0 18px ${c}`
  }

  return (
    <Screen_Layout>
      <div
        style={{
          flex: 1,
          display: 'flex',
          'align-items': 'flex-start',
          'justify-content': 'center',
          'padding-top': '28vh',
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
