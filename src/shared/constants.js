import { createSignal, createEffect, createRoot } from 'solid-js'

const THEME_STORAGE_KEY = 'theme'

const get_initial_theme = () => {
  if (typeof localStorage === 'undefined') return 'dark'
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  return saved === 'dark' || saved === 'light' ? saved : 'dark'
}

export const themes = {
  light: {
    name: 'light',
    bg: '#ffffff',
    page_bg: 'rgba(50, 160, 240, 0.15)',
    text: '#4a4452',
    text_h: '#08060d',
    border: '#9ca3af',
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
    border: '#55575d',
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

const SHOW_BG_EVERYWHERE_KEY = 'show_bg_everywhere'

const get_initial_show_bg_everywhere = () => {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem(SHOW_BG_EVERYWHERE_KEY) === 'true'
}

export const [show_bg_everywhere, set_show_bg_everywhere] =
  createSignal(get_initial_show_bg_everywhere())

createRoot(() => {
  createEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(SHOW_BG_EVERYWHERE_KEY, String(show_bg_everywhere()))
    }
  })
})

export const [menu_open, set_menu_open] = createSignal(true)

export const [sidebar_width, set_sidebar_width] = createSignal(260)

export const [sidebar_scroll, set_sidebar_scroll] = createSignal(0)

const DISCLOSURES_STORAGE_KEY = 'disclosures'

const get_initial_disclosures = () => {
  if (typeof localStorage === 'undefined') return {}
  try {
    const parsed = JSON.parse(localStorage.getItem(DISCLOSURES_STORAGE_KEY))
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

const [disclosures, set_disclosures] = createSignal(get_initial_disclosures())

createRoot(() => {
  createEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(DISCLOSURES_STORAGE_KEY, JSON.stringify(disclosures()))
    }
  })
})

export const [accordion_mode, set_accordion_mode] = createSignal(true)

export const is_disclosure_open = (key) => disclosures()[key] ?? false

export const toggle_disclosure = (key) =>
  set_disclosures((m) => {
    const is_open = !!m[key]
    if (is_open) return { ...m, [key]: false }
    return accordion_mode() ? { [key]: true } : { ...m, [key]: true }
  })
