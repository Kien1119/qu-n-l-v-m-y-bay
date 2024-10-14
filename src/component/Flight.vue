<template>
  <div class="relative pb-20">
    <div class="bg-slate-200 flex justify-center rounded-lg gap-3 mb-8">
      <div class="flex w-11/12 h-14 rounded-lg border-2 bg-slate-50">
        <div class="flex justify-around gap-3">
          <img
            src="https://dev.airdata.site/img/airplane.87c2a8f1.svg"
            style="width: 24px"
            alt=""
          />
          <label class="flex items-center text-stone-950">Một Chiều</label>
          <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        </div>
        <div class="grow flex items-center text-orange-400">
          <div class="flex-1 flex items-center justify-center">
            <Label>{{ planeStore.airports.city }}</Label>
          </div>
          <div>
            <img
              src="https://dev.airdata.site/img/swap-horizontal.a11c3836.svg"
              style="width: 24px"
              alt=""
            />
          </div>
          <div class="flex-1 flex items-center justify-center">
            <Label>Cà Mau</Label>
          </div>
        </div>
        <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        <div class="flex gap-3 justify-center">
          <img
            src="https://dev.airdata.site/img/airplane-up.50b67a05.svg"
            style="width: 24px"
            alt=""
          />
          <DatePicker
            class="h-3/4 pt-3"
            placeholder="Chọn ngày đi"
            :showIcon="true"
            :showButtonBar="true"
            v-model="calendarValue"
            iconDisplay="input"
          ></DatePicker>
          <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        </div>
        <div class="flex items-center gap-3">
          <img src="https://dev.airdata.site/img/users.1985e36a.svg" style="width: 24px" alt="" />
          <div class="">
            <InputGroup>
              <Button icon="pi pi-plus" severity="success" />
              <InputNumber placeholder="0" />
              <Button icon="pi pi-minus" severity="danger" />
            </InputGroup>
          </div>
        </div>
        <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        <div class="flex items-center">
          <button class="bg-orange-500 h-2/3 p-3 !rounded-full mr-4">
            <svg
              data-v-c4b70bea=""
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ico-bold feather feather-more-horizontal"
            >
              <circle data-v-c4b70bea="" cx="12" cy="12" r="1"></circle>
              <circle data-v-c4b70bea="" cx="19" cy="12" r="1"></circle>
              <circle data-v-c4b70bea="" cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center">
        <Button class="!bg-slate-600 !rounded-full h-4/5" icon="pi pi-search" iconPos="top" />
      </div>
    </div>
    <div class="w-full">
      <Accordion value="0" expandIcon="none" collapseIcon="none">
        <AccordionPanel
          v-for="flight in storedFilteredFlights"
          :key="flight.id"
          :value="flight.id"
          v-model="flightTicket"
        >
          <AccordionHeader class="">
            <div
              class="flex w-full h-14 rounded-lg border-2 bg-slate-50 justify-between focus:outline-none"
              @click="handleFlightSelect(flight)"
            >
              <img
                style="border-radius: 5px"
                src="https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/vietnam-airline-logo.jpg"
                alt=""
              />
              <span class="flex items-center text-orange-600 font-bold">{{
                flight.bookingCode
              }}</span>
              <div class="flex items-center">
                <span class="text-stone-950 font-bold">{{
                  formatDate(flight.departure.time)
                }}</span>
                -
                {{ formatDate(flight.arrival.time) }}
              </div>
              <span class="flex items-center"
                >{{ flight.departure.airport }}-{{ flight.arrival.airport }}</span
              >
              <span class="flex items-center">{{ flight.aircraft }}</span>
              <span class="flex items-center text-red-600 font-bold">1,176,000</span>
              <div class="flex items-center mr-3">
                <!-- <RadioButton
                  v-model="flightTicket"
                  inputId="ingredient1"
                  name="flightTicket"
                  :value="flight"
                /> -->
              </div>
            </div>
          </AccordionHeader>
          <AccordionContent>
            <div class="flex flex-col gap-3">
              <div
                v-for="price in flight.fareOptions"
                :key="price.index"
                class="flex items-center gap-5 bg-slate-200 h-12 p-5 border-2 rounded-lg"
              >
                <RadioButton
                  v-model="priceTicket"
                  inputId="ingredient1"
                  name="ingredient"
                  :value="price"
                /><span class="text-orange-500"> {{ price.class }}</span>
                <span class=""
                  >Giá:
                  <span class="text-red-600 font-bold">{{ formatPrice(price.price) }}</span></span
                >
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <div
      class="backdrop-blur-md flex !bg-white/50 rounded-2xl border gap-7 h-20 justify-center fixed inset-x-0 bottom-0"
    >
      <Button
        class="!bg-gradient-to-r from-orange-500 from-10% !rounded-2xl h-10 flex items-center shadow-2xl justify-center mt-5"
        label="Quay lại"
        @click="backBooking"
      ></Button>
      <Button
        class="!bg-gradient-to-r shadow-2xl from-orange-500 from-10% !rounded-2xl h-10 flex items-center justify-center mt-5"
        label="Xác nhận"
        @click="bookingFlightHandel"
      ></Button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaneStore } from '@/stores/airports'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

const toast = useToast()
const planeStore = usePlaneStore()
const router = useRouter()
const storedFilteredFlights = ref([])
const formatPrice = (price) => {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
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
const loading = ref(false)
const handleFlightSelect = (flight) => {
  flightTicket.value = flight
  priceTicket.value = null
}
const priceTicket = ref()

const calendarValue = ref()
const flightTicket = ref()
const bookingFlightHandel = () => {
  confirm.require({
    message: 'Bạn có chắc chắn muốn tiếp tục không?',
    header: 'Xác nhận',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Hủy bỏ',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Save'
    },

    accept: async () => {
      toast.add({
        severity: 'info',
        summary: 'Đang cập nhật',
        detail: 'Đang tiến hành chuyến bay...',
        life: 3000
      })
      loading.value = true
      if (flightTicket.value && priceTicket.value) {
        const priceDetails = {
          ...priceTicket.value,
          tax: (priceTicket.value.price * 10) / 100,
          total: Math.floor(priceTicket.value.price * 1.1)
        }
        localStorage.setItem('flightTicket', JSON.stringify(flightTicket.value))
        localStorage.setItem('priceTicket', JSON.stringify([priceDetails]))
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'chọn vé thành công!',
          life: 3000
        })
        router.push({ path: '/reservation' })
      } else {
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Không lấy được thông tin vé máy bay',
          life: 3000
        })
      }
    },
    reject: () => {
      toast.add({
        severity: 'Lỗi',
        summary: 'Vật bị loại bỏ',
        detail: 'Bạn đã từ chối',
        life: 3000
      })
    }
  })
}

const backBooking = () => {
  router.push({ path: '/' })
}
onMounted(() => {
  planeStore.fetchAirports
  const savedFlights = localStorage.getItem('filteredFlights')
  if (savedFlights) {
    storedFilteredFlights.value = JSON.parse(savedFlights)
  }
})
</script>
<style scoped></style>
