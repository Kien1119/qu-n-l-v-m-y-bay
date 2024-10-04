import axios from 'axios'
import { defineStore } from 'pinia'

export const usePlaneStore = defineStore('planeStore', {
  state: () => ({
    params: {
      _page: 1,
      _per_page: 5,
      _field: 'id',
      _title: ''
    },
    airports: [],
    total: 0, // Tổng số sản phẩm
    first: 0
  }),
  actions: {
    async fetchAirports(params) {
      try {
        const response = await axios.get(`http://localhost:3000/plane`, {
          params: {
            ...this.params,
            _per_page: params._per_page
          }
        })
        console.log('🚀 ~ fetchAirports ~ params:', params)
        this.airports = response.data

        // .data.map((e, i) => {
        //   console.log(e.instances?.[0] ? i : '')
        //   return {
        //     ...e,
        //     memorySelected: e.memoryButton.find((i) => i.default),
        //     instanceSelected: e.instances?.[0] ?? null
        //   }
        // }) // Lưu dữ liệu vào state

        this.total = response.data.items // Lưu dữ liệu vào state
        console.log('🚀 ~ fetchAirports ~ this.total:', this.total)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error)
      }
    }
  }
})
