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
      The model uses a Transformer architecture with 8 blocks. There are 8 attention heads, split into 2 groups of 4 for GQA. 
      The Tokenizer is a byte-level BPE trained on the TinyStories corpus itself with a reserved endoftext token. 
      The optimizer is AdamW with a cosine learning rate schedule and linear warmup. 
      SwiGLU is used as the activation in the MLP. 
      
      On top of the main architecture, various modern additions were layered in, such as: RoPE for positional encoding, RMSNorm instead of LayerNorm, tied input/output embeddings, a per-block KV cache so each decode step only computes K and V for the new token, skip connections, gradient clipping, etc. 
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
