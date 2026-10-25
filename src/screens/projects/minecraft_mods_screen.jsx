import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Minecraft_Mods_Screen() {
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
        Minecraft Mods
      </h2>

      <p style={mod_blurb_style(t)}>{intro_blurb}</p>

      <Golden_Egg />
      <Custom_Mobs />
      <Combat_1_8 />
    </Screen_Layout>
  )
}

function Golden_Egg() {
  const t = useTheme
  return (
    <div>
      <div style={mod_title_style(t)}>Golden Egg (1.20.6, ported to 1.21)</div>
      <p style={mod_blurb_style(t)}>{golden_egg_blurb}</p>
      <a href="/jars/golden_egg.jar" download style={download_button_style(t)}>
        Download .jar
      </a>
    </div>
  )
}

function Custom_Mobs() {
  const t = useTheme
  return (
    <div>
      <div style={mod_title_style(t)}>Custom Mobs (1.21)</div>
      <p style={mod_blurb_style(t)}>{custom_mobs_blurb}</p>
      <a href="/jars/custom_mobs.jar" download style={download_button_style(t)}>
        Download .jar
      </a>
    </div>
  )
}

function Combat_1_8() {
  const t = useTheme
  return (
    <div>
      <div style={mod_title_style(t)}>1.8 Combat (1.21)</div>
      <p style={mod_blurb_style(t)}>{combat_blurb}</p>
      <a href="/jars/combat_1_8.jar" download style={download_button_style(t)}>
        Download .jar
      </a>
    </div>
  )
}

const mod_title_style = (t) => ({
  'font-weight': 700,
  'font-size': '1.5rem',
  margin: '1rem 0 0.5rem',
  color: t().text_h,
  'font-family': "'Oxygen', sans-serif",
})

const mod_blurb_style = (t) => ({
  margin: 0,
  color: t().text_h,
  'font-size': '1.1rem',
  'line-height': 1.6,
  'white-space': 'pre-line',
})

const download_button_style = (t) => ({
  display: 'inline-block',
  'margin-top': '0.75rem',
  padding: '0.5rem 1rem',
  background: t().accent_bg,
  border: `1px solid ${t().accent_border}`,
  'border-radius': '6px',
  color: t().accent,
  'text-decoration': 'none',
  'font-weight': 600,
  'font-size': '0.95rem',
})

const intro_blurb =
`I made various Minecraft mods using Fabric Loader and the fabric-loom Gradle plugin.`

const golden_egg_blurb =
`Added a crafting recipe where you craft a golden egg from an egg and eight gold nuggets. A golden egg can be thrown and will always spawn a chicken, as opposed to a vanilla egg, which has a 1/8 chance to spawn a chicken.`

const custom_mobs_blurb =
`I made two custom hostile mobs with attributes, renderers, biome rules, loot tables, and sound events, along with their spawn eggs.`

const combat_blurb =
`For combat, I used mixins to restore the combat mechanics from Minecraft 1.8 in Minecraft 1.21. I removed the attack cooldown, restored sprint-reset on hit, and restored other subtle combat behaviors as faithfully as I could.`
