import {
  useTheme,
  accordion_mode,
  set_accordion_mode,
} from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Settings_Screen() {
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
        Settings
      </h2>
      <p style={{ margin: 0, color: t().text }}>
        In case you're a control freak
      </p>
      <label
        style={{
          display: 'flex',
          'align-items': 'center',
          gap: '0.6rem',
          color: t().text_h,
          cursor: 'pointer',
          'margin-top': '0.5rem',
        }}
      >
        <input
          type="checkbox"
          checked={accordion_mode()}
          onChange={(e) => set_accordion_mode(e.currentTarget.checked)}
          style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
        />
        <span>Only one sub-category open at a time</span>
      </label>
    </Screen_Layout>
  )
}
