import{ ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark' | 'OS'
const LOCAL_KEY = '__theme__'
const theme = ref<Theme>((localStorage.getItem(LOCAL_KEY) as Theme) || 'light')
// 系统颜色媒体查询
const media = window.matchMedia('(prefers-color-scheme: dark)')
const handler = () => {
    document.documentElement.dataset.theme = media.matches ? 'dark' : 'light'
}
watchEffect(() => {
    localStorage.setItem(LOCAL_KEY, theme.value)
    if (theme.value === 'OS') {
        // 媒介查询
        handler()
        media.addEventListener('change', handler)
    }else {
        media.removeEventListener('change', handler)
        document.documentElement.dataset.theme = theme.value
    }
})

export default function useTheme() {
    return {
        theme,
    }
}

