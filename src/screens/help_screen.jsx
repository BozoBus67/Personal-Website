import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'
import step1 from '../assets/help_page_stuff/step1.png'
import step2 from '../assets/help_page_stuff/step2.png'
import step3 from '../assets/help_page_stuff/step3.png'
import step4 from '../assets/help_page_stuff/step4.png'
import step5 from '../assets/help_page_stuff/step5.png'

function Step(props) {
  const t = useTheme
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
      <div
        style={{
          'font-weight': 700,
          color: t().text_h,
          'font-size': '1.6rem',
        }}
      >
        Step {props.number}. {props.text}
      </div>
      <a
        href={props.image}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', 'max-width': '900px' }}
      >
        <img
          src={props.image}
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            border: '2px solid black',
            cursor: 'zoom-in',
          }}
        />
      </a>
    </div>
  )
}

export function Help_Screen() {
  const t = useTheme
  return (
    <Screen_Layout padding_bottom="8rem">
      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          gap: '3rem',
        }}
      >
        <h2
          style={{
            'font-weight': 700,
            'font-size': '64px',
            'line-height': 1,
            margin: 0,
            color: t().text_h,
            'text-align': 'center',
          }}
        >
          Help
        </h2>

        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '3rem',
            'padding-left': '8rem',
          }}
        >
          <Step number="1" text="Click Contact" image={step1} />
          <Step number="2" text="Copy my email" image={step2} />
          <Step number="3" text="Go to your email" image={step3} />
          <Step number="4" text="Write your email" image={step4} />
          <Step number="5" text="Click send" image={step5} />
        </div>
      </div>
    </Screen_Layout>
  )
}
