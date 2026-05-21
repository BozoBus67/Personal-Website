import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'
import code_geass_img from '../assets/recommendations_screen/Code_Geass.png'
import arcane_thumbnail from '../assets/recommendations_screen/Arcane_Thumbnail.jpg'
import ninjago_thumbnail from '../assets/recommendations_screen/Ninjago_Season_8_City_Skyline_Red_Black_Thumbnail.png'
import wolf_thumbnail from '../assets/recommendations_screen/The_Wolf_of_Wall_Street_Thumbnail.jpeg'
import bourne_identity_thumbnail from '../assets/recommendations_screen/The_Bourne_Identity_Thumbnail.jpg'
import bourne_supremacy_thumbnail from '../assets/recommendations_screen/The_Bourne_Supremacy_Thumbnail.jpg'
import bourne_ultimatum_thumbnail from '../assets/recommendations_screen/The_Bourne_Ultimatum_Thumbnail.jpg'
import squid_game_thumbnail from '../assets/recommendations_screen/Squid_Game_Thumbnail.jpeg'
import your_lie_in_april_thumbnail from '../assets/recommendations_screen/Your_Lie_in_April_Thumbnail.jpg'

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
          margin: 0,
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
          width: '1050px',
          'max-width': '100%',
          height: 'auto',
          display: 'block',
          border: '2px solid #4FC3F7',
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

      <div style={{ display: 'flex', 'flex-wrap': 'wrap', gap: '2rem' }}>
        {recs.map((rec) => (
          <Rec_Card rec={rec} />
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
                border: `2px solid ${t().rec_border}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const code_geass_blurb =
`This is my personal favorite piece of media. The canonical anime is 2 seasons, titled "Code Geass: Lelouch of the Rebellion" and "Code Geass: Lelouch of the Rebellion R2" precisely. There are many spinoffs, ignore them. The story is fully complete. 
If you've never watched anime before or usually watch dubbed, I highly recommend watching the subbed version.s`

const transition_blurb =
`There are others, but people's watch lists are long enough, so I would just recommend this one. But if you have the time and you're interested, here are some more:`

const recs = [
  { title: 'Arcane', images: [arcane_thumbnail] },
  { title: 'The Wolf of Wall Street', images: [wolf_thumbnail] },
  { title: 'Ninjago Season 8', images: [ninjago_thumbnail] },
  {
    title: 'The Bourne Trilogy',
    images: [bourne_identity_thumbnail, bourne_supremacy_thumbnail, bourne_ultimatum_thumbnail],
  },
  { title: 'Squid Game', images: [squid_game_thumbnail] },
  { title: 'Your Lie in April', images: [your_lie_in_april_thumbnail] },
]
