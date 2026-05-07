import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Personal_Website_Screen() {
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

  return (
    <Screen_Layout>
      <h1 style={h1_style()}>Personal Website</h1>

      <p style={para_style()}>
        You're looking at it. A small Solid app for things I've made and things
        I'm thinking about.
      </p>

      <h2 style={h2_style()}>Why Solid</h2>
      <p style={para_style()}>
        I tried Vue and Svelte before settling here. Both are well-designed,
        but neither felt like the way I wanted to think about UI.
      </p>
      <p style={para_style()}>
        Vue's template syntax and the <code>.vue</code> single-file format had
        me context-switching between three mini-languages inside one file.
        Svelte's compile-time magic was clever but obscured what was actually
        happening at runtime — I didn't love writing assignments that secretly
        trigger reactivity.
      </p>
      <p style={para_style()}>
        Solid clicked. A component is just a function that returns JSX, and a
        signal is just a value you call to read and to write. Function-named
        components ended up feeling like the most logical way to express UI for
        me — they're just functions, composing them is just calling them, and
        shared state is a signal in a module you import. That's the
        architecture.
      </p>

      <h2 style={h2_style()}>Stack</h2>
      <p style={para_style()}>
        Solid + Vite + @solidjs/router. No CSS framework — styles are inline on
        JSX elements, with the theme palette and signals living in{' '}
        <code>shared/constants.js</code> and read through a{' '}
        <code>useTheme()</code> accessor so light/dark mode is just signal
        reads. Nunito from Google Fonts. State lives at module level (theme,
        menu open/closed, disclosure expansion) rather than through context
        providers, which has been fine for a site this size.
      </p>

      <h2 style={h2_style()}>Notes</h2>
      <p style={para_style()}>
        Inline styles get repetitive — I'll probably extract style helpers if
        any single screen gets noisy. The router runs in pushState mode, so
        I'll need to configure SPA fallbacks before deploying somewhere
        static.
      </p>
    </Screen_Layout>
  )
}
