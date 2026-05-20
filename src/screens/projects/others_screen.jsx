import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

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
    </Screen_Layout>
  )
}

function ML_Compiler() {
  const t = useTheme
  return (
    <div>
      <a
        href="https://github.com/BozoBus67/Toy-ML-Compiler"
        target="_blank"
        rel="noopener noreferrer"
        style={item_title_link_style(t)}
      >
        ML Compiler
      </a>
      <p style={item_blurb_style(t)}>{ml_compiler_blurb}</p>
    </div>
  )
}

function Personal_Website() {
  const t = useTheme
  return (
    <div>
      <a
        href="https://github.com/BozoBus67/Personal-Website"
        target="_blank"
        rel="noopener noreferrer"
        style={item_title_link_style(t)}
      >
        Personal Website
      </a>
      <p style={item_blurb_style(t)}>{personal_website_blurb}</p>
    </div>
  )
}

const item_title_link_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  margin: '1rem 0 0.5rem',
  color: t().accent,
  'text-decoration': 'none',
  display: 'inline-block',
})

const item_blurb_style = (t) => ({
  margin: 0,
  color: t().text_h,
  'font-size': '1.1rem',
  'line-height': 1.6,
  'white-space': 'pre-line',
})

const ml_compiler_blurb =
`A toy neural-network compiler in Rust. Builds a computation DAG from ML ops, applies SSA + reverse-mode autodiff, fuses ops (FUSED_ADD_RELU and friends), allocates registers, lowers to C as the backend instead of going through LLVM IR, then links. Seven phases end-to-end on a tiny model — more an excuse to feel each compiler stage on something I actually understand the math of than a serious tool.`

const personal_website_blurb =
`You're looking at it right now! This is built with SolidJS, a lightweight React-like framework. I liked the way UI programming feels in React with the JSX elemetns and stuf i feel its most natural defining each widget via a fucntio nliek this but i didnt need the state stuf romreact `
