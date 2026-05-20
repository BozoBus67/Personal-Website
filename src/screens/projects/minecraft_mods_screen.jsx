import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Minecraft_Mods_Screen() {
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
    'font-size': '30px',
    'line-height': 1.1,
    margin: '2.5rem 0 0',
    color: t().text_h,
  })

  const h3_style = () => ({
    'font-weight': 700,
    'font-size': '22px',
    'line-height': 1,
    margin: '1.25rem 0 0',
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
      <h1 style={h1_style()}>Minecraft Mods</h1>

      <p style={para_style()}>
        Personal Fabric mods, working up in complexity — from "single item
        that always spawns a chicken" to "rewrite combat to feel like 1.8."
        Each one an excuse to learn one more layer of how modern Minecraft
        modding actually works.
      </p>

      <h2 style={h2_style()}>Golden Egg (1.20.6, ported to 1.21)</h2>
      <p style={para_style()}>
        A small Minecraft mod that adds one item: the golden egg. Thrown like
        a regular egg, except where vanilla rolls a 1/8 chance to spawn a
        chicken, the golden egg always spawns one.
      </p>

      <h3 style={h3_style()}>Stack</h3>
      <p style={para_style()}>
        Fabric, built with fabric-loom. Java for the item and behavior, JSON
        for the recipe and item model, a single PNG for the texture. No
        mixins — the egg's spawn logic lives in a custom item that extends
        the base egg item, so vanilla behavior stays untouched.
      </p>

      <h3 style={h3_style()}>How it works</h3>
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

      <h3 style={h3_style()}>Notes</h3>
      <p style={para_style()}>
        Mostly an excuse to walk through the Fabric modding pipeline
        end-to-end — registries, data-driven recipes, asset paths,
        dev-environment runs. The 1.21 port adds entity logic on top of the
        same recipe — same idea, more surface area.
      </p>

      <h2 style={h2_style()}>Custom Mobs (26.1.2)</h2>
      <p style={para_style()}>
        Two new hostile mobs added to the game from scratch. Spawn naturally
        in the overworld, drop loot, have models and animations, make ambient
        sounds, cluster more densely around villages. Spawn eggs land in the
        creative menu for testing.
      </p>

      <h3 style={h3_style()}>Stack</h3>
      <p style={para_style()}>
        Fabric on 26.1.2. Java for AI, attributes, renderers, and registry
        wiring. JSON for loot tables, sound events, lang strings. Still no
        mixins — Fabric's registry surface covers everything this mod needs.
      </p>

      <h3 style={h3_style()}>What's wired</h3>
      <ul style={list_style()}>
        <li>
          <strong>Entity types + AI.</strong> Both mobs extend HostileEntity
          with melee goals and default attributes registered at init.
        </li>
        <li>
          <strong>Renderers + models.</strong> Entity model layers registered
          client-side, baked once at startup.
        </li>
        <li>
          <strong>Spawn rules.</strong> Ground + dark-light placement via
          SpawnRestriction, paired with biome-modification entries on the
          server side.
        </li>
        <li>
          <strong>Village boost.</strong> Additive spawn entries weighted
          into plains, savanna, desert, taiga, and snowy_plains — so the
          mobs cluster where villages do, without disturbing the rest of the
          overworld.
        </li>
        <li>
          <strong>Loot tables, sound events, lang.</strong> All data-driven
          via JSON under the namespaced resource paths data-pack conventions
          specify.
        </li>
      </ul>

      <h3 style={h3_style()}>Notes</h3>
      <p style={para_style()}>
        About fifteen files across the conventional Java + Fabric package
        layout. The verbose paths are the price of admission — each one
        names exactly one thing, and the convention is what lets Minecraft's
        runtime find them on cold start.
      </p>

      <h2 style={h2_style()}>1.8 Combat (26.1.2)</h2>
      <p style={para_style()}>
        Restores Minecraft 1.8-style PvP combat in a modern client via
        mixins. Drops the post-1.9 attack cooldown, kills sprint-reset on
        hit, restores the 1.8 knockback formula so mid-air hits actually
        launch, brings back the 1.8 sneak eye height. Singleplayer-focused
        — on vanilla servers, knockback is server-authoritative and a
        client-only mod can't override that.
      </p>

      <h3 style={h3_style()}>Stack</h3>
      <p style={para_style()}>
        Fabric on 26.1.2, all behavior in SpongePowered mixins — no new
        items, no new entities, just bytecode-level surgery on existing
        Minecraft classes at class-load time.
      </p>

      <h3 style={h3_style()}>Mixins</h3>
      <ul style={list_style()}>
        <li>
          <strong>LivingEntity#takeKnockback.</strong> Re-implements the
          vanilla formula without the on-ground gate on the Y component —
          1.8's aerial-chain knockback comes back. X/Z math stays identical
          to vanilla; only the upward gating differs.
        </li>
        <li>
          <strong>PlayerEntity#attack.</strong> Two redirects: force
          getAttackCooldownProgress() to always return 1.0 (kills the 1.9
          cooldown bar and its damage scaling), and drop the post-hit
          setSprinting(false) calls so sprint persists through attacks.
          W-tap no longer needed.
        </li>
        <li>
          <strong>PlayerEntity#getActiveEyeHeight.</strong> Restores the
          1.54 sneak eye height (vanilla 1.21 dropped it to ~1.27). Hitbox
          stays at the modern shorter value — sneaking under 1.5-block
          gaps is a movement mechanic worth keeping.
        </li>
      </ul>

      <h3 style={h3_style()}>Notes</h3>
      <p style={para_style()}>
        The conceptual mixin theory (HEAD-inject + cancel as a polite
        @Overwrite, the (LivingEntity)(Object) this self-cast idiom, JVM
        descriptors as strings) does most of the work. Once those click,
        the actual combat patches are short. Sweep cancellation, friction
        tuning, and i-frame timing are left as follow-ups depending on what
        feels wrong in-game.
      </p>
    </Screen_Layout>
  )
}
