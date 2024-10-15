import axios from 'axios'
import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservationStore', {
  state: () => ({
    params: {
      _page: 1,
      _per_page: 10,
      _sort: '',
      _title: ''
    },

    airports: [],
    reservations: [],
    total: 0, // Tổng số sản phẩm
    first: 0,
    detail: {}
  }),
  actions: {
    async fetchAirports(params) {
      const temp = {}
      Object.assign(temp, this.params, params)
      for (const e of Object.keys(this.params)) {
        if (this.params[e] === '') delete temp[e]
      }
      try {
        const response = await axios.get(`http://localhost:3000/plane`, { params: temp })
        this.airports = response.data.data
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error)
      }
    },
    async fetchBooking(params) {
      const temp = {}
      Object.assign(temp, this.params, params)
      for (const e of Object.keys(this.params)) {
        if (this.params[e] === '') delete temp[e]
      }
      const { data } = await axios.get(`http://localhost:3000/reservations`, { params: temp })
      this.reservations = data.data
      this.total = data.items // Lưu dữ liệu vào state
      return data.data
    },
    async holdBooking(req) {
      const { data } = await axios.post(`http://localhost:3000/reservations`, req)
      return data
    },

    async detailTicket(id) {
      try {
        const { data } = await axios.get(`http://localhost:3000/reservations/${id}`)

        console.log('🚀 ~ detailTicket ~ data:', data)
        this.detail = {
          ...data
        }
        return data
      } catch (error) {
        console.error('data lỗi')
      }
    }
  }
})
