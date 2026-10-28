import {
  useTheme,
  accordion_mode,
  set_accordion_mode,
  menu_open,
  set_menu_open,
  themeName,
  toggleTheme,
  show_bg_everywhere,
  set_show_bg_everywhere,
} from '../shared/constants'
import { Screen_Layout, Page_Title } from '../shared/utility_components'

export function Settings_Screen() {
  const t = useTheme
  return (
    <Screen_Layout>
      <Page_Title description="In case you're a control freak">
        Settings
      </Page_Title>
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
          checked={themeName() === 'dark'}
          onChange={toggleTheme}
          style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
        />
        <span>
          Dark mode{' '}
          <span style={{ color: t().text }}>
            (this is also togglable top right corner by clicking on the
            sun/moon)
          </span>
        </span>
      </label>
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
        <span>
          Only one sub-category open at a time{' '}
          <span style={{ color: t().text }}>
            (doesn't do anything at the moment because only 1 expandable sub-category)
          </span>
        </span>
      </label>
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
          checked={menu_open()}
          onChange={(e) => set_menu_open(e.currentTarget.checked)}
          style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
        />
        <span>
          Toggle left panel{' '}
          <span style={{ color: t().text }}>
            (you can also do this via esc)
          </span>
        </span>
      </label>
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
          checked={show_bg_everywhere()}
          onChange={(e) => set_show_bg_everywhere(e.currentTarget.checked)}
          style={{ width: '1.1rem', height: '1.1rem', cursor: 'pointer' }}
        />
        <span>
          Show background image on every page{' '}
          <span style={{ color: t().text }}>
            (home, contact, and help always show it)
          </span>
        </span>
      </label>
    </Screen_Layout>
  )
}
