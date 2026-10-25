import { useTheme } from '../../shared/constants'
import { Screen_Layout, Github_Button, Page_Title } from '../../shared/utility_components'

export function Others_Screen() {
  const t = useTheme
  return (
    <Screen_Layout>
      <Page_Title description="Some additional projects that are smaller in scale and don't really warrant a page dedicated to them, or experimental.">
        Others
      </Page_Title>

      <Personal_Website />
      <ML_Compiler />
      <Toy_OS />
    </Screen_Layout>
  )
}

function ML_Compiler() {
  return <Project_Card title="ML Compiler" blurb={ml_compiler_blurb} href="https://github.com/BozoBus67/Toy-ML-Compiler" />
}

function Personal_Website() {
  return <Project_Card title="Personal Website" blurb={personal_website_blurb} href="https://github.com/BozoBus67/Personal-Website" />
}

function Toy_OS() {
  return <Project_Card title="Toy OS" blurb={toy_os_blurb} href="https://github.com/BozoBus67/Toy-OS" />
}

function Project_Card(props) {
  const t = useTheme
  return (
    <div style={{ display: 'flex', 'flex-direction': 'column', gap: '0.5rem' }}>
      <div style={title_row_style()}>
        <div style={item_title_style(t)}>{props.title}</div>
        <Github_Button href={props.href} />
      </div>
      <p style={item_blurb_style(t)}>{props.blurb}</p>
    </div>
  )
}

const title_row_style = () => ({
  display: 'flex',
  'align-items': 'center',
  gap: '1.5rem',
})

const item_title_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  'line-height': 1,
  margin: 0,
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
