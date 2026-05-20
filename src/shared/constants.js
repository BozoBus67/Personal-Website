import { createSignal, createEffect, createRoot } from 'solid-js'

const THEME_STORAGE_KEY = 'theme'

const get_initial_theme = () => {
  if (typeof localStorage === 'undefined') return 'light'
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  return saved === 'dark' || saved === 'light' ? saved : 'light'
}

export const themes = {
  light: {
    name: 'light',
    bg: '#ffffff',
    page_bg: 'rgba(40, 90, 200, 0.3)',
    text: '#4a4452',
    text_h: '#08060d',
    border: '#e5e4e7',
    code_bg: '#f4f3ec',
    accent: '#aa3bff',
    accent_bg: 'rgba(170, 59, 255, 0.1)',
    accent_border: 'rgba(170, 59, 255, 0.5)',
    hover_bg: '#faf9f3',
    rec_border: '#000000',
    color_scheme: 'light',
  },
  dark: {
    name: 'dark',
    bg: '#313338',
    page_bg: '#313338',
    text: '#d2d6db',
    text_h: '#f2f3f5',
    border: '#3f4147',
    code_bg: '#2b2d31',
    accent: '#c084fc',
    accent_bg: 'rgba(192, 132, 252, 0.15)',
    accent_border: 'rgba(192, 132, 252, 0.5)',
    hover_bg: '#3a3c42',
    rec_border: '#FFD700',
    color_scheme: 'dark',
  },
}

export const [themeName, setThemeName] = createSignal(get_initial_theme())

createRoot(() => {
  createEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, themeName())
    }
  })
})

export const useTheme = () => themes[themeName()]

export const toggleTheme = () =>
  setThemeName((n) => (n === 'light' ? 'dark' : 'light'))

export const PATHS_WITH_BG = new Set(['/', '/contact', '/help'])

export const [menu_open, set_menu_open] = createSignal(true)

export const [sidebar_width, set_sidebar_width] = createSignal(260)

const [disclosures, set_disclosures] = createSignal({})

export const [accordion_mode, set_accordion_mode] = createSignal(true)

export const is_disclosure_open = (key) => disclosures()[key] ?? false

export const toggle_disclosure = (key) =>
  set_disclosures((m) => {
    const is_open = !!m[key]
    if (is_open) return { ...m, [key]: false }
    return accordion_mode() ? { [key]: true } : { ...m, [key]: true }
  })
