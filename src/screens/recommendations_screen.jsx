import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'
import code_geass_img from '../assets/recommendations_screen/code_geass.png'
import arcane_img from '../assets/recommendations_screen/Arcane.jpg'
import ninjago_img from '../assets/recommendations_screen/ninjago_season_8_city_skyline_red_black.png'
import wolf_img from '../assets/recommendations_screen/the_wolf_of_wallstreet.jpeg'
import bourne_identity_img from '../assets/recommendations_screen/the_bourne_identity.jpg'
import bourne_supremacy_img from '../assets/recommendations_screen/the_bourne_supremacy.jpg'
import bourne_ultimatum_img from '../assets/recommendations_screen/the_bourne_ultimatum.jpg'

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
          width: '1000px',
          'max-width': '100%',
          height: 'auto',
          display: 'block',
          border: '2px solid #4FC3F7',
          'margin-left': 'auto',
          'margin-right': '3rem',
          'margin-bottom': '5rem',
        }}
      />

      <p
        style={{
          margin: '0 0 1rem',
          'white-space': 'pre-line',
          color: t().text_h,
          'font-size': '1.15rem',
          'line-height': 1.6,
        }}
      >
        {transition_blurb}
      </p>

      <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1.5rem' }}>
        {rec_rows.map((row) => (
          <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '1.5rem' }}>
            {row.map((rec) => (
              <Rec_Card rec={rec} />
            ))}
          </div>
        ))}
      </div>
    </Screen_Layout>
  )
}

const REC_IMAGE_HEIGHT = '300px'

function Rec_Card(props) {
  const t = useTheme
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: '0.5rem',
        width: 'max-content',
        'min-width': '200px',
        'flex-shrink': 0,
      }}
    >
      <p
        style={{
          margin: 0,
          color: t().text_h,
          'font-size': '1.15rem',
          'line-height': 1.4,
          'font-weight': 700,
          'white-space': 'nowrap',
          'text-align': 'center',
        }}
      >
        {props.rec.title}
      </p>
      {props.rec.images && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {props.rec.images.map((src) => (
            <img
              src={src}
              alt={props.rec.title}
              style={{
                height: REC_IMAGE_HEIGHT,
                display: 'block',
                border: '2px solid #FFD700',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const code_geass_blurb =
`This is my favorite show. It's a complete story, through and through.
The original is 2 seasons, titled "Code Geass: Lelouch of the Rebellion" and "Code Geass: Lelouch of the Rebellion R2" precisely. There are many spinoffs, ignore them.
If you've never watched anime before or usually watch dubbed, I highly recommend watching the subbed version.`

const transition_blurb =
`There are others, but people's watch lists are long enough, so I would just recommend this one. But if you have the time and you're interested, here are some more:`

const rec_rows = [
  [
    { title: 'Arcane', images: [arcane_img] },
    { title: 'The Wolf of Wall Street', images: [wolf_img] },
    { title: 'Ninjago Season 8', images: [ninjago_img] },
  ],
  [
    {
      title: 'The Bourne Trilogy',
      images: [bourne_identity_img, bourne_supremacy_img, bourne_ultimatum_img],
    },
  ],
]
