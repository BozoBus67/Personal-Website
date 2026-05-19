import { useTheme } from '../shared/constants'
import { Screen_Layout } from '../shared/utility_components'

export function Home_Screen() {
  const t = useTheme

  const para_style = () => ({
    margin: 0,
    color: t().text,
    'line-height': 1.5,
    'max-width': '60ch',
  })

  return (
    <Screen_Layout>
      <h1
        style={{
          'font-weight': 700,
          'font-size': '56px',
          'line-height': 1,
          margin: 0,
          color: t().text_h,
        }}
      >
        Hi, I'm Kevin.
      </h1>
      <p style={para_style()}>
        CS at Waterloo. I like building things that span more layers than they
        probably need to — a clicker game with a real backend, a toy compiler
        that emits LLVM IR, a tiny kernel that boots to VGA, the occasional
        Minecraft mod.
      </p>
      <p style={para_style()}>
        This site has the projects, a few recommendations, and a way to get in
        touch. The sidebar on the left is the whole map.
      </p>
    </Screen_Layout>
  )
}
