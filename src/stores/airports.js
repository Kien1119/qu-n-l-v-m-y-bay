import axios from 'axios'
import { defineStore } from 'pinia'

export const usePlaneStore = defineStore('planeStore', {
  state: () => ({
    params: {
      _page: 1,
      _per_page: 10,
      _field: 'id,name,city,country,airportCode',
      _order: 'asc',
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
        console.error('data Error')
      }
    },
    async fetchAirportById(id) {
      try {
        const { data } = await axios.get(`http://localhost:3000/plane/${id}`)
        this.airport = {
          ...data
        }
        return data
      } catch (error) {
        console.error('data lỗi')
      }
    },
    async updateAirport(id, data) {
      try {
        // Gọi API để cập nhật sân bay
        const response = await axios.patch(`http://localhost:3000/plane/${id}`, data)
        console.log('Sân bay đã cập nhật thành công:', response)

        // Sau khi cập nhật, tải lại danh sách sân bay
        await this.fetchAirports()
      } catch (error) {
        console.error('Lỗi khi cập nhật sân bay:', error)
      }
    },
    async addAirport(req) {
      try {
        const { data } = await axios.post(`http://localhost:3000/plane`, req)

        data.id = Math.round(Math.random() * 1000000)
        await this.fetchAirports({})

        return data
      } catch (error) {
        console.error(error)

        return error
      }
    },
    async sortAirport(sortOrder, sortField) {
      try {
        // Cập nhật params với cột và thứ tự sắp xếp

        // Gọi API để lấy dữ liệu sắp xếp
        this.params._field = sortField
        this.params._order = sortOrder
        const sortData = await axios.get(
          `http://localhost:3000/plane?_sort=-id,name,city,country,airportCode`
        )
        this.airports = sortData.data
        console.log('🚀 ~ sortAirport ~ this.airports:', this.airports)
      } catch (error) {
        console.error('Error sorting airports:', error)
      }
    }
  }
})
