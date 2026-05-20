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
        Things I kinda did that are kinda experimental, half-finished, or just sitting around.
      </p>

      <ML_Compiler />
      <Personal_Website />
    </Screen_Layout>
  )
}

function ML_Compiler() {
  const t = useTheme
  return (
    <div>
      <div style={item_title_style(t)}>ML Compiler</div>
      <p style={item_blurb_style(t)}>{ml_compiler_blurb}</p>
    </div>
  )
}

function Personal_Website() {
  const t = useTheme
  return (
    <div>
      <div style={item_title_style(t)}>Personal Website</div>
      <p style={item_blurb_style(t)}>{personal_website_blurb}</p>
    </div>
  )
}

const item_title_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  margin: '1rem 0 0.5rem',
  color: t().text_h,
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
`This site. Solid + Vite, no CSS framework — all styling is inline objects. Hand-rolled router pages, theme toggle, sidebar disclosure animation, image background only on specific routes. Mostly an excuse to do something frontend after months of backend and Rust.`
