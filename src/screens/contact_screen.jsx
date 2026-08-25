import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

function Contact_Item(props) {
  const t = useTheme
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        gap: '0.25rem',
      }}
    >
      <div
        style={{
          color: t().text,
          'font-size': '0.85rem',
          'text-transform': 'uppercase',
          'letter-spacing': '0.06em',
        }}
      >
        {props.label}
      </div>
      <div style={{ color: t().text_h, 'font-size': '1.25rem' }}>
        {props.value}
      </div>
    </div>
  )
}

function Contact_Contents() {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        flex: 1,
        gap: '2rem',
        'text-align': 'center',
      }}
    >
      <Contact_Item
        label="Personal Email"
        value="666handsomeguy999@gmail.com"
      />
      <Contact_Item label="Discord" value="thehandsomeguy67420" />
      <Contact_Item
        label="School / Work Email"
        value="k93wang@uwaterloo.ca"
      />
    </div>
  )
}

export function Contact_Screen() {
  return (
    <Screen_Layout>
      <Contact_Contents />
    </Screen_Layout>
  )
}
