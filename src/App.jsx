import { createEffect, onMount, Show } from 'solid-js'
import { Router, Route, useLocation } from '@solidjs/router'
import { useTheme } from './shared/constants'
import light_bg from './assets/KqyRp-Y_KZ0.jpg'
import dark_bg from './assets/sodium-street-lamps.webp'
import { Home_Screen } from './screens/home_screen'
import { Contact_Screen } from './screens/contact_screen'
import { Project_EC_Screen } from './screens/projects/project_ec_screen'
import { Minecraft_Mods_Screen } from './screens/projects/minecraft_mods_screen'
import { Personal_Website_Screen } from './screens/projects/personal_website_screen'
import { Coursework_Screen } from './screens/coursework_screen'
import { Recommendations_Screen } from './screens/recommendations_screen'
import { Help_Screen } from './screens/help_screen'
import { Settings_Screen } from './screens/settings_screen'

const all_image_assets = import.meta.glob(
  './assets/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true, query: '?url', import: 'default' },
)

const PATHS_WITH_BG = new Set(['/', '/contact'])

function App() {
  const t = useTheme

  onMount(() => {
    for (const url of Object.values(all_image_assets)) {
      const img = new Image()
      img.src = url
    }
  })

  createEffect(() => {
    const theme = t()
    document.body.style.background = theme.bg
    document.body.style.color = theme.text
    document.body.style.overscrollBehavior = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
    document.documentElement.style.colorScheme = theme.color_scheme
  })

  return (
    <Router root={Layout}>
      <Route path="/" component={Home_Screen} />
      <Route path="/projects/project-ec" component={Project_EC_Screen} />
      <Route path="/projects/minecraft-mods" component={Minecraft_Mods_Screen} />
      <Route path="/projects/personal-website" component={Personal_Website_Screen} />
      <Route path="/coursework" component={Coursework_Screen} />
      <Route path="/recommendations" component={Recommendations_Screen} />
      <Route path="/contact" component={Contact_Screen} />
      <Route path="/help" component={Help_Screen} />
      <Route path="/settings" component={Settings_Screen} />
    </Router>
  )
}

function Layout(props) {
  const location = useLocation()
  return (
    <>
      <Show when={PATHS_WITH_BG.has(location.pathname)}>
        <Background />
      </Show>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          'overflow-y': 'auto',
          'overflow-x': 'hidden',
          'overscroll-behavior': 'contain',
        }}
      >
        {props.children}
      </div>
    </>
  )
}

function Background() {
  const t = useTheme
  const bg_url = () => (t().name === 'light' ? light_bg : dark_bg)
  const overlay = () =>
    t().name === 'light'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(49, 51, 56, 0.7)'
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        'background-image': `linear-gradient(${overlay()}, ${overlay()}), url(${bg_url()})`,
        'background-color': t().bg,
        'background-size': 'cover',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'z-index': -1,
        'pointer-events': 'none',
      }}
    />
  )
}

export default App
