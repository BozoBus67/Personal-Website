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
          'font-size': '24px',
          'line-height': 1,
          margin: 0,
          color: t().text_h,
        }}
      >
        Recommendations
      </h2>
      <p style={{ margin: 0, color: t().text }}>
        Stuff that was worth the time. Updated whenever I remember to.
      </p>

      <h3 style={h3_style()}>Anime</h3>
      <div
        style={{
          display: 'flex',
          gap: '1.25rem',
          'align-items': 'flex-start',
          'flex-wrap': 'wrap',
        }}
      >
        {/* TODO: replace with `import codeGeass from '../assets/code_geass.png'` and set src={codeGeass} */}
        <img
          src=""
          alt="Code Geass"
          style={{
            width: '200px',
            height: '280px',
            'object-fit': 'cover',
            border: `2px solid ${t().text_h}`,
            background: t().bg_alt ?? 'transparent',
            'flex-shrink': 0,
          }}
        />
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '0.5rem',
            color: t().text,
            'line-height': 1.6,
            'min-width': '240px',
            flex: 1,
          }}
        >
          <div style={{ 'font-weight': 700, color: t().text_h, 'font-size': '1.1rem' }}>
            Code Geass
          </div>
          <p style={{ margin: 0 }}>{code_geass_blurb}</p>
        </div>
      </div>
    </Screen_Layout>
  )
}

const code_geass_blurb = '...'
