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
        Denoising diffusion probabilistic model built from scratch in PyTorch,
        trained on CIFAR-10 with a time-conditioned UNet denoiser, cosine
        noise schedule, and DDIM sampling at inference. Same idea as the LLM
        work: build the training loop and the sampling loop by hand instead of
        black-boxing them.
      </p>

      <h2 style={h2_style()}>Model</h2>
      <p style={para_style()}>
        Four-level UNet with a bottleneck self-attention block for the
        denoiser, 64 base channels, GroupNorm and SiLU throughout. Time
        conditioning is a sinusoidal timestep embedding projected through a
        small MLP and injected into every residual block. Cosine noise
        schedule (Nichol and Dhariwal) with T=1000 diffusion steps. Loss is
        standard DDPM epsilon-prediction on noisy latents from q_sample.
      </p>

      <h2 style={h2_style()}>Training and sampling</h2>
      <p style={para_style()}>
        Training loop keeps an EMA copy of the denoiser weights for sampling.
        Inference uses the DDIM sampler at 50 steps by default, deterministic
        with eta=0, which trades some sample diversity for far fewer function
        evaluations than the DDPM ancestral sampler. Fits comfortably on a
        single 16GB GPU or Apple MPS, a few hours to convergence at these
        hyperparameters.
      </p>

      <h2 style={h2_style()}>Evaluation</h2>
      <p style={para_style()}>
        FID against real CIFAR-10 test images using InceptionV3 pool3
        features. Not chasing SOTA numbers, just wanted the whole pipeline in
        my hands from noise schedule to metric.
      </p>
    </Screen_Layout>
  )
}
