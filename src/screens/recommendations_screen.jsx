import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'
import code_geass_img from '../assets/image.png'

export function Recommendations_Screen() {
  const t = useTheme

  const h3_style = () => ({
    'font-weight': 700,
    'font-size': '1.75rem',
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
          margin: '1rem 0 0',
          color: t().text_h,
          'text-align': 'center',
        }}
      >
        Recommendations
      </h2>

      <h3 style={h3_style()}>Code Geass</h3>
      <p
        style={{
          margin: 0,
          'white-space': 'pre-line',
          color: t().text_h,
          'font-size': '1.15rem',
          'line-height': 1.6,
        }}
      >
        {code_geass_blurb}
      </p>
      <img
        src={code_geass_img}
        alt="Code Geass"
        style={{
          width: '900px',
          'max-width': '100%',
          height: 'auto',
          display: 'block',
          border: `2px solid ${t().text_h}`,
          'margin-bottom': '2rem',
        }}
      />
    </Screen_Layout>
  )
}

const code_geass_blurb =
`This is my favorite show. It's a complete story, through and through.
The original is 2 seasons, titled "Code Geass: Lelouch of the Rebellion" and "Code Geass: Lelouch of the Rebellion R2" precisely. There are many spinoffs, ignore them.
If you've never watched anime before or usually watch dubbed, I highly recommend watching the subbed version.`
