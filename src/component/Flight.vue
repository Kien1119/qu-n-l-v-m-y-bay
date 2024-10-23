<template>
  <div class="relative pb-20 pt-10 pl-10 pr-0">
    <div v-if="storedFilteredFlights.length > 0" class="flex justify-center">
      <div class="w-2/3">
        <Accordion value="0" expandIcon="none" collapseIcon="none">
          <AccordionPanel
            v-for="flight in storedFilteredFlights"
            :key="flight.id"
            :value="flight.id"
          >
            <AccordionHeader class="">
              <div
                class="flex w-full h-14 rounded-lg border-2 bg-slate-50 justify-around focus:outline-none"
                @click="handleFlightSelect(flight)"
              >
                <img
                  :src="flight.img"
                  alt="Không có cảnh
                "
                />
                <span class="flex items-center text-orange-600 font-bold">{{
                  flight.airline
                }}</span>
                <span class="flex items-center text-gray-600 font-bold">{{
                  flight.flightNumber
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
                <span class="flex items-center text-red-600 font-bold">{{
                  formatPrice(flight?.fareOptions[0].price)
                }}</span>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex flex-col gap-3">
                <div
                  v-for="(price, index) in flight.fareOptions"
                  :key="index"
                  @click="priceTicket = price"
                  class="flex items-center gap-5 bg-slate-200 h-12 p-5 border-2 rounded-lg"
                >
                  <RadioButton v-model="priceTicket" :inputId="`${price}`" :value="price" />
                  <span class="text-orange-500"> {{ price.class }}</span>
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
      <div class="w-2/6">
        <Accordion expandIcon="none" collapseIcon="none">
          <AccordionPanel v-if="flightTicket" class="!bg-orange-500 w-full rounded-lg p-3">
            <AccordionHeader class="!bg-orange-500 w-full !p-0">
              <div class="bg-orange-500 w-full">
                <span class="text-white flex mb-3">Chuyến bay</span>
                <div class="bg-white">
                  <div class="flex">
                    <span
                      class="bg-orange-500 text-white rounded-full w-1/12 flex items-center justify-center m-3"
                    >
                      1</span
                    >
                    <span class="flex w-11/12 items-center gap-3 text-orange-500 font-medium"
                      >{{ getAirportName(flightTicket.departure.airport) }}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-arrow-right mx-25 text-warning"
                        style="stroke-width: 3"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                      {{ getAirportName(flightTicket.arrival.airport) }}</span
                    >
                  </div>
                  <div class="flex items-center px-3">
                    <span class="text-stone-950 font-bold">{{
                      formatDate(flightTicket.departure.time)
                    }}</span>
                    -
                    {{ formatDate(flightTicket.arrival.time) }}
                  </div>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div v-if="flightTicket && priceTicket">
                <div class="flex gap-3 justify-between">
                  <div class="flex gap-1">
                    <span class="flex items-center text-black font-bold">{{
                      flightTicket.airline
                    }}</span>
                    <img class="w-2" src="https://dev.airdata.site/img/dot.2aa51c9a.svg" alt="" />
                    <span class="flex items-center text-black font-bold">{{
                      flightTicket.aircraft
                    }}</span>
                    <img class="w-2" src="https://dev.airdata.site/img/dot.2aa51c9a.svg" alt="" />
                    <span class="flex items-center text-black font-bold">{{
                      priceTicket.class
                    }}</span>
                  </div>
                  <img :src="flightTicket.img" class="w-1/4" alt="" />
                </div>
                <Accordion>
                  <AccordionPanel>
                    <AccordionHeader>
                      <span class="text-orange-500 font-semibold text-2xl">{{
                        formatPrice(priceDetails.total)
                      }}</span>
                    </AccordionHeader>
                    <AccordionContent>
                      <div class="flex text-blue-900 justify-between font-thin">
                        <span>KH</span>
                        <span>x{{ priceDetails.count }}</span>
                        <span>{{ formatPrice(priceDetails.tax) }}</span>
                        <span>{{ formatPrice(priceDetails.price * 0.9) }}</span>
                        <span class="text-yellow-600">{{ formatPrice(priceDetails.price) }}</span>
                      </div>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
              <div v-else>
                <p class="text-red-600 font-normal font-mono text-lg">Vui lòng chọn chuyến bay!</p>
              </div>
            </AccordionContent>
            <div
              class="float-left bg-white font-bold text-orange-600 p-3 flex justify-end border-dashed border-stone-950 border-t-4 gap-3"
            >
              <span>Tổng tiền:</span>
              <span v-if="priceDetails">{{
                formatPrice(priceTicket.price * flightTicket.count)
              }}</span>
              <span v-else>0</span>
            </div>
          </AccordionPanel>

          <!-- Thẻ mặc định nếu không có chuyến bay nào được chọn -->
          <AccordionPanel v-else class="!bg-orange-500 w-full rounded-lg p-3">
            <AccordionHeader class="!bg-orange-500 w-full !p-0">
              <div class="bg-orange-500 w-full">
                <span class="text-white flex mb-3">Không có chuyến bay được chọn</span>
                <div class="bg-white p-3">
                  <p class="text-gray-600">Vui lòng chọn chuyến bay để hiển thị chi tiết.</p>
                </div>
              </div>
            </AccordionHeader>
          </AccordionPanel>
        </Accordion>
        <div class="mt-3">
          <div class="flex p-3 gap-3">
            <div class="!flex justify-center gap-3" v-for="(sort, index) in sortValue" :key="index">
              <Button class="!bg-orange-500 !flex" @click="sort.sortFun">{{ sort.name }}</Button>
              <!-- <Button class="!bg-orange-500" label="Đắt nhất" @click="ticketExpensive"></Button>
                    <Button class="!bg-orange-500" label="Muộn nhất" @click="ticketFastest"></Button>
                    <Button class="!bg-orange-500" label="Sớm nhất" @click="ticketSoonest"></Button> -->
            </div>
          </div>
          <Accordion>
            <AccordionPanel>
              <AccordionHeader>
                <div class="flex gap-3">
                  <svg
                    style="color: currentColor"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 8L20 8"
                      stroke="#EFAD02"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M4 16L14 16"
                      stroke="#EFAD02"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></path>
                    <ellipse
                      cx="7"
                      cy="8"
                      rx="3"
                      ry="3"
                      transform="rotate(90 7 8)"
                      stroke="#EFAD02"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></ellipse>
                    <ellipse
                      cx="17"
                      cy="16"
                      rx="3"
                      ry="3"
                      transform="rotate(90 17 16)"
                      stroke="#EFAD02"
                      stroke-width="2"
                      stroke-linecap="round"
                    ></ellipse>
                  </svg>
                  <span class="text-black font-bold">Hiển thị</span>
                </div>
              </AccordionHeader>
              <AccordionContent class="flex" style="padding: 0">
                <div class="flex flex-col gap-3">
                  <label for="" class="font-bold">Sắp xếp theo:</label>
                  <Select
                    v-model="sortSelect"
                    :options="sortValue"
                    optionLabel="name"
                    optionValue="sortFun"
                    placeholder="Select a sort"
                    class="w-full md:w-56"
                  />
                </div>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="flex justify-center items-center">
        Không có kết quả nào tìm thấy chuyến bay phù hợp
      </p>
    </div>
    <div
      class="backdrop-blur-md flex !bg-white/50 rounded-2xl border gap-7 h-20 justify-center fixed inset-x-0 bottom-0"
    >
      <Button
        class="!bg-gradient-to-r from-orange-500 from-10% !rounded-2xl h-10 flex items-center shadow-2xl justify-center mt-5"
        label="Làm mới"
        @click="resetBooking"
      ></Button>
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
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaneStore } from '@/stores/airports'
import { useToast } from 'primevue/usetoast'
import { formatDate } from '@/utils/format'

const toast = useToast()
const planeStore = usePlaneStore()
const router = useRouter()
const storedFilteredFlights = ref([])
const sortSelect = ref()
const formatPrice = (price) => {
  if (!price) return '0'

  return price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  })
}

const ticketCheapest = () => {
  storedFilteredFlights.value.sort((a, b) => a.fareOptions[0].price - b.fareOptions[0].price)
}
const ticketExpensive = () => {
  storedFilteredFlights.value.sort((a, b) => b.fareOptions[0].price - a.fareOptions[0].price)
}
const ticketFastest = () => {
  storedFilteredFlights.value.sort(
    (a, b) => new Date(a.departure.time) - new Date(b.departure.time)
  )
}
const ticketSoonest = () => {
  storedFilteredFlights.value.sort(
    (a, b) => new Date(b.departure.time) - new Date(a.departure.time)
  )
}
const ticketLanding = () => {
  storedFilteredFlights.value.sort((a, b) => new Date(a.arrival.time) - new Date(b.arrival.time))
}
const ticketLateLanding = () => {
  storedFilteredFlights.value.sort((a, b) => new Date(b.arrival.time) - new Date(a.arrival.time))
}

const loading = ref(false)
const handleFlightSelect = async (flight) => {
  priceTicket.value = null
  flightTicket.value = flight
  priceTicket.value = flight.fareOptions[0]
  await nextTick()
}

const priceDetails = computed(() => {
  if (!priceTicket.value || !flightTicket.value) return null
  if (!priceTicket.value.price) return null
  const taxPercent = 0.1 * 100
  const tax = (priceTicket.value.price * taxPercent) / 100

  return {
    ...priceTicket.value,
    count: flightTicket.value.count,
    tax,
    total: priceTicket.value.price * flightTicket.value.count
  }
})
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return `${airport ? airport.name : code} `
}

const sortValue = ref([
  { name: 'Giá đắt nhất', sortFun: ticketExpensive },
  { name: 'Giá rẻ nhất', sortFun: ticketCheapest },
  { name: 'Khởi hành sớm nhất', sortFun: ticketFastest },
  { name: 'Khởi hành muộn nhất', sortFun: ticketSoonest },
  { name: 'Hạ cánh sớm nhất', sortFun: ticketLanding },
  { name: 'Hạ cánh muộn nhất', sortFun: ticketLateLanding }
])
watch(sortSelect, (newSortFun) => {
  if (newSortFun) {
    newSortFun()
  }
})

const priceTicket = ref()
const flightTicket = ref()
const bookingFlightHandel = () => {
  toast.add({
    severity: 'info',
    summary: 'Đang cập nhật',
    detail: 'Đang tiến hành chuyến bay...',
    life: 3000
  })
  loading.value = true
  if (flightTicket.value && priceTicket.value) {
    localStorage.setItem('flightTicket', JSON.stringify(flightTicket.value))
    localStorage.setItem('priceTicket', JSON.stringify([priceDetails.value]))
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
}
const resetBooking = () => {
  flightTicket.value = null
  priceTicket.value = null
  priceDetails.value = null
}

const backBooking = () => {
  router.push({ path: '/' })
}
onMounted(() => {
  planeStore.fetchAirports()
  const savedFlights = localStorage.getItem('filteredFlights')
  if (savedFlights) {
    storedFilteredFlights.value = JSON.parse(savedFlights)
  }
})
</script>
<style scoped></style>
<!-- <div class="bg-slate-200 flex justify-center rounded-lg gap-3 mb-8">
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
    </div> -->
