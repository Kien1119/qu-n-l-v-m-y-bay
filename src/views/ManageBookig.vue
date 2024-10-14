<template>
  <div>
    <div class="m-4 p-4">
      <div class="flex gap-5">
        <div class="flex-1">
          <DatePicker
            placeholder="Ngày đặt vé"
            date-format="mm/dd/yy"
            v-model="dayBooking"
            :showIcon="true"
          ></DatePicker>
        </div>
        <div class="flex-1">
          <DatePicker
            :showIcon="true"
            placeholder="Ngày bay"
            date-format="mm/dd/yy"
            v-model="dayFlight"
          ></DatePicker>
        </div>
        <div class="flex-1">
          <InputGroup>
            <InputText v-model="searchQueryName" placeholder="Tìm kiếm tên khách hàng" />
            <Button
              icon="pi pi-search"
              class="!bg-gray-300 !border-none"
              severity="warn"
              @click="handleSearch"
            />
          </InputGroup>
        </div>
        <div class="flex-1">
          <InputGroup>
            <InputText placeholder="Tìm kiếm PNR trong hệ thống" />
            <Button icon="pi pi-search" class="!bg-gray-300 !border-none" severity="warn" />
          </InputGroup>
        </div>
      </div>
      <div>
        <DataTable :value="booking" tableStyle="min-width: 50rem">
          <Column field="flight.airline" header="Hệ Thống" class="font-bold text-teal-900"></Column>
          <Column field="bookingCode" header="Mã đặt chỗ">
            <template #body="slotProps">
              <div>
                <Button
                  class="!text-sky-400"
                  link
                  @click="handleLinkClick(slotProps.data.bookingCode)"
                >
                  {{ slotProps.data.bookingCode }}</Button
                >
              </div>
            </template>
          </Column>
          <Column field="name" header="Hành khách">
            <template #body="slotProps">
              <div
                class="uppercase font-mono"
                v-for="(pax, index) in slotProps.data.paxLists"
                :key="index"
              >
                {{ pax.firstName }} {{ pax.lastName }} {{ pax.titleName }}
              </div>
            </template>
          </Column>
          <Column field="flight" header="Chuyến bay">
            <template #body="slotProps">
              <div class="text-orange-400">
                {{ getAirportName(slotProps.data.flight.departure.airport) }} -
                {{ getAirportName(slotProps.data.flight.arrival.airport) }}
              </div>
            </template>
          </Column>
          <Column field="price" header="Giá">
            <template #body="slotProps">
              <div class="flex flex-col">
                <div class="text-red-500 font-bold">
                  {{ slotProps.data.flight.fareOptions.price }}
                </div>
                <div class="text-red-300">({{ slotProps.data.flight.fareOptions.class }})</div>
              </div>
            </template>
          </Column>
          <Column field="day" header="Ngày đặt chỗ">
            <template #body="slotProps">
              <div class="flex flex-col">
                <div>{{ formatDate(slotProps.data.flight.departure.time) }}-</div>
                <div>
                  {{ formatDate(slotProps.data.flight.arrival.time) }}
                </div>
              </div>
            </template></Column
          >
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { usePlaneStore } from '../stores/airports.js'
const planeStore = usePlaneStore()
const dayBooking = ref()
const dayFlight = ref()
const booking = ref()
function generateBookingCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return `${airport ? airport.name : code} (${code})` // Return the code if no name is found
}
function formatDate() {
  const date = new Date()

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
}
const searchQueryName = ref()
const handleSearch = () => {
  const searchText = searchQueryName.value.toLowerCase()
  console.log(booking.value)

  const filteredPaxLists = booking.value.filter((booking) => {
    const matchesLastName = booking.paxLists.filter((pax) => {
      return pax.lastName.toLowerCase() === searchText || pax.firstName.toLowerCase() === searchText
    })
    return matchesLastName
  })
  console.log(filteredPaxLists)
  console.log(booking.value)
}
onMounted(() => {
  planeStore.fetchAirports()
  const bookingFlight = localStorage.getItem('bookingsReserVation')
  if (bookingFlight) {
    try {
      const parsedData = JSON.parse(bookingFlight)
      if (parsedData) {
        booking.value = parsedData.map((item) => ({
          ...item,
          bookingCode: item.bookingCode || generateBookingCode()
        }))
      } else {
        console.error('Dữ liệu không phải là một mảng:', parsedData)
      }
    } catch (error) {
      console.error('Lỗi khi parse dữ liệu từ localStorage:', error)
    }
  }
})
</script>
<style scoped></style>
