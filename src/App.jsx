import { createEffect } from 'solid-js'
import { Router, Route } from '@solidjs/router'
import { useTheme } from './shared/constants'
import { Home_Screen } from './screens/home_screen'
import { Contact_Screen } from './screens/contact_screen'
import { Projects_Screen } from './screens/projects/projects_screen'
import { Epstein_Clicker_Screen } from './screens/projects/epstein_clicker_screen'
import { Golden_Egg_Screen } from './screens/projects/golden_egg_screen'
import { Personal_Website_Screen } from './screens/projects/personal_website_screen'
import { Recommendations_Screen } from './screens/recommendations_screen'
import { Help_Screen } from './screens/help_screen'
import { Settings_Screen } from './screens/settings_screen'

function App() {
  const t = useTheme

  createEffect(() => {
    document.body.style.background = t().bg
    document.body.style.color = t().text
    document.documentElement.style.colorScheme = t().color_scheme
  })

  return (
    <Router>
      <Route path="/" component={Home_Screen} />
      <Route path="/projects" component={Projects_Screen} />
      <Route path="/projects/epstein-clicker" component={Epstein_Clicker_Screen} />
      <Route path="/projects/golden-egg" component={Golden_Egg_Screen} />
      <Route path="/projects/personal-website" component={Personal_Website_Screen} />
      <Route path="/recommendations" component={Recommendations_Screen} />
      <Route path="/contact" component={Contact_Screen} />
      <Route path="/help" component={Help_Screen} />
      <Route path="/settings" component={Settings_Screen} />
    </Router>
  )
}

export default App
