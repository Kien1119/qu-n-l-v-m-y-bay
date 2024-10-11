import { createRouter, createWebHistory } from 'vue-router'
import NormalPage from '@/layouts/NormalPage.vue'
import DefaultPage from '@/layouts/DefaultPage.vue'
// import DefaultPage from '@/layouts/DefaultPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
      meta: { layout: DefaultPage }
    },
    {
      path: '/booking',
      name: 'BookFlight',
      component: () => import('../views/BookFlights.vue'),
      meta: { layout: DefaultPage }
    },
    {
      path: '/reservation',
      name: 'Reservation',
      component: () => import('../views/Reservation.vue')
    },
    {
      path: '/airports',
      name: 'ManageAirports',
      component: () => import('../views/ManageAirports.vue'),
      meta: { layout: NormalPage }
    },
    {
      path: '/flights',
      name: 'ManageFlights',
      component: () => import('../views/ManageFlights.vue'),
      meta: { layout: NormalPage }
    },
    {
      path: '/bookings',
      name: 'ManageBookings',
      component: () => import('../views/HomeView.vue'),
      meta: { layout: NormalPage }
    }
  ]
})

export default router
