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
      <div style={item_title_style(t)}>ML Compiler</div>
      <p style={item_blurb_style(t)}>{ml_compiler_blurb}</p>
      <Github_Footer href="https://github.com/BozoBus67/Toy-ML-Compiler" />
    </div>
  )
}

function Personal_Website() {
  const t = useTheme
  return (
    <div>
      <div style={item_title_style(t)}>Personal Website</div>
      <p style={item_blurb_style(t)}>{personal_website_blurb}</p>
      <Github_Footer href="https://github.com/BozoBus67/Personal-Website" />
    </div>
  )
}

function Github_Footer(props) {
  const t = useTheme
  return (
    <p
      style={{
        margin: '0.5rem 0 0',
        color: t().text,
        'font-size': '0.95rem',
      }}
    >
      <a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: t().accent, 'text-decoration': 'none' }}
      >
        {props.href.replace(/^https?:\/\//, '')}
      </a>
    </p>
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
`You're looking at it right now! This is built with SolidJS, a lightweight React-like framework. I liked React's way of UI programming where you define JSX components via functions, it feels more natural than other frameworks I've experiemnted with such as Vue and Svelte. I didn't need React's state-management machinery, so I opted to just use Solid.`
