import { useTheme } from '../../shared/constants'
import { Screen_Layout } from '../../shared/utility_components'

export function NanoGPT_Screen() {
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

  const iframe_style = () => ({
    width: '100%',
    height: '700px',
    border: `1px solid ${t().border}`,
    'border-radius': '8px',
    'background': t().code_bg,
  })

  return (
    <Screen_Layout>
      <h1 style={h1_style()}>NanoGPT</h1>

      <p style={para_style()}>
        Or{' '}
        <a
          href="https://huggingface.co/spaces/BozoBus67/NanoGPT"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: t().accent, 'text-decoration': 'none' }}
        >
          open it on HuggingFace
        </a>
        .
      </p>

      <iframe
        src="https://BozoBus67-NanoGPT.hf.space"
        title="NanoGPT demo"
        style={iframe_style()}
      />

      <h2 style={h2_style()}>Model</h2>
      <p style={para_style()}>
        Six Transformer blocks, 384-dim residual stream, six attention heads,
        rotary position embeddings, grouped-query attention (configurable
        n_kv_heads so the same code path covers MHA/GQA/MQA), SwiGLU MLP,
        RMSNorm, weight-tied input and output embeddings. Context length 512.
        Vocab is a custom byte-level BPE trained on the TinyStories corpus,
        with a reserved endoftext token.
      </p>

      <h2 style={h2_style()}>Training</h2>
      <p style={para_style()}>
        Pretrained on the full TinyStories corpus (~500M tokens) with AdamW,
        cosine LR schedule, warmup, gradient clipping, and mixed-precision
        where the device supports it. The run converges to a val loss around
        1.07 nats, with the train/val gap holding around 0.02 nats throughout
        — 13M parameters across 500M tokens doesn't have the capacity to
        memorize, so it has to generalize. Spot-checking generated chunks
        against the corpus confirms it: short common phrases match, longer
        contiguous spans don't.
      </p>

      <h2 style={h2_style()}>Inference</h2>
      <p style={para_style()}>
        Autoregressive decode with a per-block KV cache, so each new token
        only computes its own K and V and attends over the stored prefix.
        Temperature-scaled multinomial sampling, with temperature 0 falling
        back to argmax. Generation stops at the endoftext token or at the
        requested max new tokens, whichever comes first.
      </p>

      <h2 style={h2_style()}>Stack</h2>
      <p style={para_style()}>
        Python and PyTorch for the model, custom BPE tokenizer, Gradio for
        the UI, HuggingFace Spaces with ZeroGPU for hosting. Training ran on
        a local machine; the checkpoint ships to the Space via git-lfs.
      </p>
    </Screen_Layout>
  )
}
