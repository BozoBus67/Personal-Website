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

      <p
        style={{
          margin: 0,
          color: t().text,
          'font-size': '1.1rem',
          'text-align': 'center',
        }}
      >
        Personal Fabric mods, working up in complexity.
      </p>

      <div>
        <div style={mod_title_style(t)}>Build</div>
        <p style={mod_blurb_style(t)}>{build_blurb}</p>
      </div>

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

const build_blurb =
`All built with Fabric and the fabric-loom Gradle plugin. Loom handles the remapping between yarn (readable names like LivingEntity#takeKnockback), intermediary (stable across versions), and the obfuscated names Minecraft actually ships with — so the code reads in English while binding to production classes. Dev loop is ./gradlew runClient. Mixins go through SpongePowered, registered via a <modid>.mixins.json that fabric-loader picks up at class-load.`

const golden_egg_blurb =
`Fabric. Adds one item: the golden egg. Thrown like a vanilla egg, but where vanilla rolls 1/8 odds to spawn a chicken, the golden egg always does. Recipe is 8 gold nuggets around an egg, same shape as a glistering melon. No mixins — a custom item that extends vanilla.`

const custom_mobs_blurb =
`Fabric. Two new hostile mobs added from scratch — entity types, AI, attributes, renderers, spawn eggs, biome rules, loot tables, sound events. Spawn entries are additive and weighted into village biomes (plains, savanna, desert, taiga, snowy_plains) so the mobs cluster where villages do. Still no mixins — Fabric's registry surface covers it.`

const combat_blurb =
`Fabric, all behavior in SpongePowered mixins. Restores 1.8-style PvP: drops the 1.9 attack cooldown, kills sprint-reset on hit, removes the on-ground gate on knockback's Y component so mid-air hits actually launch, restores the 1.54 sneak eye height. Singleplayer-focused — vanilla MP servers are knockback-authoritative.`
