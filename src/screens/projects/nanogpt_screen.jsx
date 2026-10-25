import { createSignal } from 'solid-js'
import { useTheme } from '../../shared/constants'
import {
  Screen_Layout,
  h2_style,
  para_style,
} from '../../shared/utility_components'

function Intro_Text() {
  const t = useTheme
  return (
    <p style={{ ...para_style(), 'font-size': '1.5rem' }}>
      Below you can play around with a NanoGPT I built. You can also access
      it directly on HuggingFace{' '}
      <a
        href="https://huggingface.co/spaces/BozoBus67/NanoGPT"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: t().accent, 'text-decoration': 'none' }}
      >
        here
      </a>
      .
    </p>
  )
}

function Github_Button() {
  const t = useTheme
  const [hover, set_hover] = createSignal(false)
  return (
    <a
      href="https://github.com/BozoBus67/Nano-GPT-From-Scratch"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => set_hover(true)}
      onMouseLeave={() => set_hover(false)}
      style={{
        display: 'inline-block',
        padding: '0.75rem 1.25rem',
        border: `1px solid ${hover() ? t().accent : t().accent_border}`,
        'border-radius': '8px',
        background: hover() ? t().accent_bg : 'transparent',
        color: t().text_h,
        'text-decoration': 'none',
        'font-weight': 700,
        'white-space': 'nowrap',
        transition: 'background 0.15s ease, border-color 0.15s ease',
      }}
    >
      GitHub
    </a>
  )
}

function Intro() {
  return (
    <div
      style={{
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        gap: '1.5rem',
      }}
    >
      <Intro_Text />
      <Github_Button />
    </div>
  )
}

function Demo_Iframe() {
  const t = useTheme
  const iframe_style = () => ({
    width: '100%',
    height: '700px',
    border: `1px solid ${t().border}`,
    'border-radius': '8px',
    background: t().code_bg,
  })
  return (
    <iframe
      src="https://BozoBus67-NanoGPT.hf.space"
      title="NanoGPT demo"
      style={iframe_style()}
    />
  )
}

function Notes() {
  return (
    <>
      <h2 style={h2_style()}>Model</h2>
      <p style={para_style()}>
        6 Transformer blocks, d_model 384, 6 attention heads. GQA is wired in
        through n_kv_heads so the same code path does MHA, GQA, or MQA
        depending on config. RoPE for positions, SwiGLU in the MLP, RMSNorm
        instead of LayerNorm, tied input/output embeddings. Context 512.
        Tokenizer is a byte-level BPE I trained on the TinyStories corpus
        itself, with a reserved endoftext token. Comes out to ~13M params.
      </p>

      <h2 style={h2_style()}>Training</h2>
      <p style={para_style()}>
        TinyStories, roughly 500M tokens. AdamW, cosine LR with warmup,
        gradient clipping, mixed precision on devices that support it. Val
        loss sits around 1.07 nats and the train/val gap holds ~0.02 nats the
        whole way — 13M params over 500M tokens is way under memorization
        capacity, so it has to actually generalize. Grepping chunks of the
        output against the corpus confirms it: short common phrases hit,
        longer spans don't.
      </p>

      <h2 style={h2_style()}>Inference</h2>
      <p style={para_style()}>
        Autoregressive loop with a KV cache per attention block. Each new
        step only computes K and V for the one new token; the rest is read
        out of the cache. Temperature sampling, temp=0 falls back to argmax.
        Stops when it emits endoftext or hits max_new_tokens.
      </p>

      <h2 style={h2_style()}>Stack</h2>
      <p style={para_style()}>
        PyTorch for the model, custom BPE tokenizer, Gradio for the UI,
        HuggingFace Spaces on ZeroGPU for hosting. Trained locally; the
        145MB checkpoint ships to the Space over git-lfs.
      </p>
    </>
  )
}

export function NanoGPT_Screen() {
  return (
    <Screen_Layout>
      <Intro />
      <Demo_Iframe />
      <Notes />
    </Screen_Layout>
  )
}
