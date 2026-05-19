import { A } from '@solidjs/router'
import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Projects_Screen() {
  const t = useTheme

  const item_style = () => ({
    display: 'flex',
    'flex-direction': 'column',
    gap: '0.35rem',
  })

  const link_style = () => ({
    'font-weight': 700,
    'font-size': '1.5rem',
    color: t().text_h,
    'text-decoration': 'none',
  })

  const desc_style = () => ({
    margin: 0,
    color: t().text,
    'line-height': 1.5,
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
        Projects
      </h2>
      <p style={{ margin: 0, color: t().text }}>Things I've built.</p>

      <div
        style={{
          display: 'flex',
          'flex-direction': 'column',
          gap: '1.25rem',
          'margin-top': '0.75rem',
        }}
      >
        <div style={item_style()}>
          <A href="/projects/project-ec" style={link_style()}>
            Project EC
          </A>
          <p style={desc_style()}>
            Cookie-clicker–style desktop game with a real backend — auctions,
            chess, music, themes. Electron + Vite + React + Redux on top,
            FastAPI + Supabase underneath.
          </p>
        </div>
        <div style={item_style()}>
          <A href="/projects/golden-egg" style={link_style()}>
            Golden Egg
          </A>
          <p style={desc_style()}>
            One-item Minecraft mod via Fabric. Crafts from eight gold nuggets
            and an egg; always spawns a chicken on impact instead of the
            vanilla 1/8 odds.
          </p>
        </div>
        <div style={item_style()}>
          <A href="/projects/personal-website" style={link_style()}>
            Personal Website
          </A>
          <p style={desc_style()}>
            This site. Solid + Vite, no CSS framework, module-level signals
            instead of context providers.
          </p>
        </div>
      </div>
    </Screen_Layout>
  )
}
