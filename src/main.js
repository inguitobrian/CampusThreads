// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Initialize AOS
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  easing: 'ease-in-out', // Animation easing
  once: false, // Whether animation should happen only once
})

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

// Trigger AOS refresh when Vue re-renders
app.mixin({
  updated() {
    AOS.refreshHard()
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
