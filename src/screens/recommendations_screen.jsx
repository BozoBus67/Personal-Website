import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Recommendations_Screen() {
  const t = useTheme

  const h3_style = () => ({
    'font-weight': 700,
    'font-size': '1.25rem',
    margin: '1rem 0 0.5rem',
    color: t().text_h,
  })

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
        Recommendations
      </h2>

      <h3 style={h3_style()}>Code Geass</h3>
      {/* TODO: replace with `import codeGeass from '../assets/code_geass.png'` and set src={codeGeass} */}
      <img
        src=""
        alt="Code Geass"
        style={{
          width: '400px',
          height: '560px',
          'object-fit': 'cover',
          border: `2px solid ${t().text_h}`,
          background: t().bg_alt ?? 'transparent',
        }}
      />
      <p
        style={{
          margin: 0,
          'white-space': 'pre-line',
          color: t().text,
          'line-height': 1.6,
        }}
      >
        {code_geass_blurb}
      </p>
    </Screen_Layout>
  )
}

const code_geass_blurb =
`This is my favorite show. It's a complete story, through and through.
The original is 2 seasons, titled "Code Geass: Lelouch of the Rebellion" and "Code Geass: Lelouch of the Rebellion R2" precisely. There are many spinoffs, ignore those.
If you've never watched anime before or usually watch dubbed, I highly recommend watching the subbed version.`
