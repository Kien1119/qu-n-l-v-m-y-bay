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
  locale: {
    accept: 'Chấp nhận',
    reject: 'Từ chối',
    // Add other translations here
    dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12'
    ],
    monthNamesShort: [
      'Th1',
      'Th2',
      'Th3',
      'Th4',
      'Th5',
      'Th6',
      'Th7',
      'Th8',
      'Th9',
      'Th10',
      'Th11',
      'Th12'
    ],
    today: 'Hôm nay',
    clear: 'Xóa',
    weekHeader: 'Tuần',
    firstDayOfWeek: 1,
    dateFormat: 'dd/mm/yy',
    weak: 'Yếu',
    medium: 'Trung bình',
    strong: 'Mạnh',
    passwordPrompt: 'Nhập mật khẩu'
  },
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
