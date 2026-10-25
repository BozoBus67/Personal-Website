import { useTheme } from '../../shared/constants'
import { Screen_Layout, Github_Button } from '../../shared/utility_components'

export function Others_Screen() {
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
        Others
      </h2>

      <p
        style={{
          margin: 0,
          color: t().text,
          'font-size': '1.1rem',
          'text-align': 'center',
        }}
      >
        Some additional projects that are smaller in scale and don't really warrant a page dedicated to them, or experimental.
      </p>

      <Personal_Website />
      <ML_Compiler />
      <Toy_OS />
    </Screen_Layout>
  )
}

function ML_Compiler() {
  const t = useTheme
  return (
    <div>
      <div style={item_title_style(t)}>ML Compiler</div>
      <p style={item_blurb_style(t)}>{ml_compiler_blurb}</p>
      <div style={button_wrapper_style()}>
        <Github_Button href="https://github.com/BozoBus67/Toy-ML-Compiler" />
      </div>
    </div>
  )
}

function Personal_Website() {
  const t = useTheme
  return (
    <div>
      <div style={item_title_style(t)}>Personal Website</div>
      <p style={item_blurb_style(t)}>{personal_website_blurb}</p>
      <div style={button_wrapper_style()}>
        <Github_Button href="https://github.com/BozoBus67/Personal-Website" />
      </div>
    </div>
  )
}

function Toy_OS() {
  const t = useTheme
  return (
    <div>
      <div style={item_title_style(t)}>Toy OS</div>
      <p style={item_blurb_style(t)}>{toy_os_blurb}</p>
      <div style={button_wrapper_style()}>
        <Github_Button href="https://github.com/BozoBus67/Toy-OS" />
      </div>
    </div>
  )
}

const button_wrapper_style = () => ({ 'margin-top': '0.75rem' })

const item_title_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  margin: '1rem 0 0.5rem',
  color: t().text_h,
  'font-family': "'Oxygen', sans-serif",
})

const item_blurb_style = (t) => ({
  margin: 0,
  color: t().text_h,
  'font-size': '1.1rem',
  'line-height': 1.6,
  'white-space': 'pre-line',
})

const ml_compiler_blurb =
`I built a tiny neural-network compiler in Rust that builds a computation DAG from ML ops. In addition to the main functionality, it applies SSA and reverse-mode autodiff and fuses some operations.`

const personal_website_blurb =
`You're looking at it right now! This is built with SolidJS.`

const toy_os_blurb =
`I was quite dissatisfied with my school's underwhelming OS course and decided to try building one myself to learn how they actually work. This project is incomplete.`
