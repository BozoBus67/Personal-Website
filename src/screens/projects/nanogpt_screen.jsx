import { createSignal } from 'solid-js'
import { useTheme } from '../../shared/constants'
import {
  Screen_Layout,
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
    <p style={para_style()}>
      The model uses a Transformer architecture with 8 blocks. There are 8
      attention heads split into 2 groups of 4 for GQA — each group of 4
      query heads shares one K and one V projection, which cuts the KV cache
      4x versus full MHA. d_model is 384, context length 512, RoPE for
      positions, SwiGLU MLP, RMSNorm, tied input/output embeddings. Tokenizer
      is a byte-level BPE I trained on the TinyStories corpus itself with a
      reserved endoftext token. Comes out to ~13M params. Pretrained on
      TinyStories (~500M tokens) with AdamW, cosine LR + warmup, gradient
      clipping, mixed precision where the device supports it — converges to
      val loss ~1.07 nats with the train/val gap holding ~0.02 nats the
      whole way, so it's generalizing, not memorizing. Inference uses a KV
      cache per block, temperature-scaled multinomial sampling (temp=0 falls
      back to argmax), and stops on endoftext or max_new_tokens. Served
      through Gradio on HuggingFace Spaces ZeroGPU; the 145MB checkpoint
      ships to the Space over git-lfs.
    </p>
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
