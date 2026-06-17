// composables/useLanguage.ts
export function useLanguage() {
  const { locale } = useI18n()

  onMounted(() => {
    if (import.meta.client) {
      const saved = localStorage.getItem('lang')
      if (saved && saved !== locale.value) {
        locale.value = saved
      }
    }
  })

  function toggleLanguage(): void {
    locale.value = locale.value === 'en' ? 'ru' : 'en'
    if (import.meta.client) {
      localStorage.setItem('lang', locale.value)
    }
  }

  function setLanguage(lang: string): void {
    locale.value = lang
    if (import.meta.client) {
      localStorage.setItem('lang', lang)
    }
  }

  return { locale, toggleLanguage, setLanguage }
}
