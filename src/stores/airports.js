import axios from 'axios'
import { defineStore } from 'pinia'

export const usePlaneStore = defineStore('planeStore', {
  state: () => ({
    params: {
      _page: 1,
      _per_page: 10,
      _field: 'id',
      _title: ''
    },
    airports: [],
    airport: {},
    total: 0, // Tổng số sản phẩm
    first: 0
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

        // .data.map((e, i) => {
        //   console.log(e.instances?.[0] ? i : '')
        //   return {
        //     ...e,
        //     memorySelected: e.memoryButton.find((i) => i.default),
        //     instanceSelected: e.instances?.[0] ?? null
        //   }
        // }) // Lưu dữ liệu vào state

        this.total = response.data.items // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error)
      }
    },
    async deleteAirport(id) {
      try {
        const deleteAirport = await axios.delete(`http://localhost:3000/plane/${id}`)
        console.log('Sản phẩm đã xóa thành công:', deleteAirport.data)
        await this.fetchAirports()
      } catch (error) {
        console.log('data Error')
      }
    }
  }
})
