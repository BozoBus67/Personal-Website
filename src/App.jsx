import { createEffect } from 'solid-js'
import { Router, Route } from '@solidjs/router'
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

function App() {
  const t = useTheme

  createEffect(() => {
    const theme = t()
    const bg_url = theme.name === 'light' ? light_bg : dark_bg
    const overlay =
      theme.name === 'light'
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(49, 51, 56, 0.7)'

    document.body.style.backgroundImage = `linear-gradient(${overlay}, ${overlay}), url(${bg_url})`
    document.body.style.backgroundColor = theme.bg
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.color = theme.text
    document.documentElement.style.colorScheme = theme.color_scheme
  })

  return (
    <Router>
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

export default App
