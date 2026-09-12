import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function LLM_Screen() {
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
      <h1 style={h1_style()}>Building an LLM from scratch</h1>

      <p style={para_style()}>
        Working through the LLM stack in Python, phase by phase, reimplementing
        what the framework hides before letting the framework take over.
        Pedagogy is the point. Each phase lives in its own folder, and the
        earlier ones stay frozen as pedagogical artifacts even when the later
        phases duplicate them.
      </p>

      <h2 style={h2_style()}>Progression</h2>
      <p style={para_style()}>
        NumPy backprop on MNIST first, to feel manual chain rule across layers.
        Then a micrograd-style scalar autograd (Value class, computational
        graph, reverse-topo backward), to see what .backward() actually does.
        Then char-level bigram and Bengio-style MLP language models on Tiny
        Shakespeare, moving from NumPy to PyTorch. Then the GPT block itself:
        causal self-attention, MLP with residual + LayerNorm, multi-head,
        stacking N blocks, scaling up.
      </p>

      <h2 style={h2_style()}>Where it's going</h2>
      <p style={para_style()}>
        Later phases point at scale and inference: mixed precision, flash
        attention, gradient accumulation, then SFT and RLHF/DPO on open weights
        (Llama, Mistral, Qwen, GPT-2). Pretraining from scratch isn't in reach
        on my hardware, so fine-tuning is where the practical work ends up. The
        final phase is a Rust inference engine with a KV cache, paged
        attention, and speculative decoding, which folds back into the ML
        compiler side of things.
      </p>

      <h2 style={h2_style()}>Stack</h2>
      <p style={para_style()}>
        Python and PyTorch, MPS on Apple Silicon and CUDA where I can get it.
        Two-space indent throughout, no sklearn or matplotlib in this project.
      </p>
    </Screen_Layout>
  )
}
