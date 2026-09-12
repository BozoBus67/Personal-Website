import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function Diffusion_Screen() {
  const t = useTheme

  const h1_style = () => ({
    'font-weight': 700,
    'font-size': '40px',
    'line-height': 1,
    margin: 0,
    color: t().text_h,
    'text-align': 'center',
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
    color: t().text_h,
    'font-size': '1.1rem',
    'line-height': 1.5,
  })

  return (
    <Screen_Layout>
      <h1 style={h1_style()}>Diffusion model from scratch</h1>

      <p style={para_style()}>
        The follow-up to the LLM work, on the image-generation side. Same idea:
        build the training loop and the sampling loop by hand instead of
        black-boxing them.
      </p>

      <h2 style={h2_style()}>Rough plan</h2>
      <p style={para_style()}>
        DDPM first (forward noise schedule, reverse denoising network, the
        whole variational lower-bound training setup), then DDIM sampling for a
        faster deterministic path at inference time. The backbone is a U-Net
        with time embeddings and skip connections, which also doubles as the
        first real CNN I'll build end-to-end. Once the unconditional version is
        producing something recognizable, add text conditioning via
        cross-attention.
      </p>

      <h2 style={h2_style()}>Status</h2>
      <p style={para_style()}>
        Not started yet, sequenced after the LLM phases finish.
      </p>
    </Screen_Layout>
  )
}
