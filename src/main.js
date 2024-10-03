import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Listbox from 'primevue/listbox'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.component('Listbox', Listbox)
app.mount('#app')
