import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config' // Import PrimeVue
import 'primeicons/primeicons.css' // Icons
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
const app = createApp(App)
const pinia = createPinia()
app.use(ToastService)
app.use(ConfirmationService)
app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      // prefix: "p",
      darkModeSelector: 'light'
      // cssLayer: false,
    }
  }
})

app.mount('#app')
