import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Golden_Egg_Screen() {
  const t = useTheme

  const h1_style = () => ({
    'font-weight': 700,
    'font-size': '40px',
    'line-height': 1,
    margin: 0,
    color: t().text_h,
  })

  const h2_style = () => ({
    'font-weight': 700,
    'font-size': '22px',
    'line-height': 1,
    margin: '1rem 0 0',
    color: t().text_h,
  })

  const para_style = () => ({
    margin: 0,
    color: t().text,
    'line-height': 1.5,
  })

  const list_style = () => ({
    margin: 0,
    'padding-left': '1.25rem',
    color: t().text,
    'line-height': 1.5,
    display: 'flex',
    'flex-direction': 'column',
    gap: '0.4rem',
  })

  return (
    <Screen_Layout>
      <h1 style={h1_style()}>Golden Egg</h1>

      <p style={para_style()}>
        A small Minecraft mod that adds one item: the golden egg. Thrown like a
        regular egg, except where vanilla rolls a 1/8 chance to spawn a chicken,
        the golden egg always spawns one.
      </p>

      <h2 style={h2_style()}>Stack</h2>
      <p style={para_style()}>
        Fabric on Minecraft 1.20.6, built with fabric-loom. Java for the item
        and behavior, JSON for the recipe and item model, a single PNG for the
        texture. No mixins — the egg's spawn logic lives in a custom item that
        extends the base egg item, so vanilla behavior stays untouched.
      </p>

      <h2 style={h2_style()}>How it works</h2>
      <ul style={list_style()}>
        <li>
          <strong>Recipe.</strong> Eight gold nuggets surrounding one egg in a
          shaped crafting grid yields one golden egg — same shape as a
          glistering melon.
        </li>
        <li>
          <strong>Throw behavior.</strong> The custom egg projectile overrides
          the spawn check so a chicken always spawns on impact, instead of
          rolling against the vanilla 1/8 odds.
        </li>
        <li>
          <strong>Registration.</strong> Item, recipe, and lang entry are all
          registered through the Fabric API — no Forge-style annotations.
        </li>
      </ul>

      <h2 style={h2_style()}>Notes</h2>
      <p style={para_style()}>
        Mostly an excuse to walk through the Fabric modding pipeline end-to-end
        — registries, data-driven recipes, asset paths, dev-environment runs.
        Small enough that it could be a single afternoon, which is the point.
      </p>
    </Screen_Layout>
  )
}
