import './assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
