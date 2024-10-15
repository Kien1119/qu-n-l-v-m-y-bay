<template>
  <div>
    <div class="m-4 p-4">
      <div class="flex gap-5">
        <div class="flex-1">
          <DatePicker
            placeholder="Ngày đặt vé"
            date-format="mm/dd/yy"
            v-model="filter.startDate"
            :showIcon="true"
          >
          </DatePicker>
        </div>
        <div class="flex-1">
          <DatePicker
            :showIcon="true"
            placeholder="Ngày bay"
            date-format="mm/dd/yy"
            v-model="filter.endDate"
          ></DatePicker>
        </div>
        <div class="flex-1">
          <InputGroup>
            <InputText v-model="filter.name" placeholder="Tìm kiếm tên khách hàng" />
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
            <InputText v-model="filter.bookingCode" placeholder="Tìm kiếm PNR trong hệ thống" />
            <Button icon="pi pi-search" class="!bg-gray-300 !border-none" severity="warn" />
          </InputGroup>
        </div>
        <div class="search">
          <Button
            icon="pi pi-search"
            class="!bg-gray-300 !border-none"
            severity="warn"
            @click="handleSearch"
          />
        </div>
      </div>
      <div>
        <DataTable :value="reservationStore.reservations" tableStyle="min-width: 50rem">
          <Column field="flight.airline" header="Hệ Thống" class="font-bold text-teal-900"></Column>
          <Column field="bookingCode" header="Mã đặt chỗ">
            <template #body="slotProps">
              <div class="!bg-white">
                <Button
                  class="!bg-white !text-cyan-600 !border-none hover:underline decoration-solid"
                  @click="handleDetail(slotProps.data.id)"
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
          <Column field="createdAt" header="Ngày đặt chỗ">
            <template #body="slotProps">
              <div class="flex flex-col">
                <div>{{ formatDate(slotProps.data.createdAt) }}</div>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { usePlaneStore } from '../stores/airports.js'
import { useReservationStore } from '@/stores/reservation'
import { formatDate } from '../utils/format'
import { useRouter } from 'vue-router'
const reservationStore = useReservationStore()
const planeStore = usePlaneStore()
const router = useRouter()
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return `${airport ? airport.name : code} (${code})`
}
const filter = ref({})
const handleSearch = () => {
  const { bookingCode, name, startDate } = filter.value
  if (bookingCode) reservationStore.params.bookingCode = bookingCode
  if (name) reservationStore.params._paxLists[0].lastName = name
  if (startDate) reservationStore.params.createdAt_gt = startDate.getTime()

  reservationStore.fetchBooking()
}
const handleDetail = (id) => {
  if (id) {
    reservationStore.detailTicket(id)
    router.push({ path: '/detail' })
  } else {
    console.error('lỗi không có data')
  }
}
onMounted(() => {
  planeStore.fetchAirports()
  reservationStore.fetchBooking()
  // const bookingFlight = localStorage.getItem('bookingsReservation')
  // if (bookingFlight) {
  //   try {
  //     const parsedData = JSON.parse(bookingFlight)
  //     if (parsedData) {
  //       booking.value = parsedData.map((item) => ({
  //         ...item,
  //         bookingCode: item.bookingCode || generateBookingCode()
  //       }))
  //     } else {
  //       console.error('Dữ liệu không phải là một mảng:', parsedData)
  //     }
  //   } catch (error) {
  //     console.error('Lỗi khi parse dữ liệu từ localStorage:', error)
  //   }
  // }
})
</script>
<style scoped></style>
