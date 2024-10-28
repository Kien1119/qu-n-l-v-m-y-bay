<template>
  <div
    class="bg-cover bg-center md:flex items-center justify-center flex md:block"
    style="height: 100vh; background-image: url('/src/assets/background-image2.15114820.png')"
  >
    <div
      class="backdrop-blur-md flex p-3 flex-col bg-white/50 rounded-2xl md:mx-20 md:my-20 border !border-gray-500 gap-7 md:h-2/3 justify-between"
    >
      <div>
        <div class="card flex justify-between">
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" :value="1" />
              <label for="ingredient1" class="ml-2">Một chiều</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                disabled
                v-model="ingredient"
                inputId="ingredient3"
                name="pizza"
                :value="2"
              />
              <label for="ingredient3" class="ml-2">Khứ hồi</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                disabled
                v-model="ingredient"
                inputId="ingredient4"
                name="pizza"
                :value="3"
              />
              <label for="ingredient4" class="ml-2">Nhiều chặng</label>
            </div>
          </div>
        </div>
      </div>
      <div class="md:flex gap-5 md:h-1/3 justify-center">
        <AddressPage :title="`Khởi hành`" v-model:airports="departures" />
        <div class="mx-3 my-3 flex items-center">
          <Button
            type="button"
            class="!bg-orange-400 hover:shadow-xl !hover:bg-black"
            icon="pi pi-arrow-right-arrow-left"
            @click="swapAirports"
          />
        </div>
        <AddressPage :title="`Kết thúc`" v-model:airports="arrival" />
      </div>

      <div class="md:flex justify-around gap-3">

        <div class="flex items-center  pr-2 border-r-2 gap-2">
          <div style="width: 40px !important;height: 40px !important; overflow: hidden;">
            <img src="https://dev.airdata.site/img/airplane-up.50b67a05.svg" class="w-full" alt="" />
          </div>
          <DatePicker
            placeholder="Chọn ngày đi"
            dateFormat="dd/mm/yy"
            v-model="startedDate"
            :minDate="minDate"
            :locale="viLocale"
            @change="onDateSelect(newDate)"
            class="w-full"
          ></DatePicker>
        </div>

        <div class="flex items-center  pr-2 border-r-2 gap-2">
          <div style="width: 40px !important;height: 40px !important; overflow: hidden;">
            <img src="https://dev.airdata.site/img/plane-ticket.c034a5ca.svg" class="w-full" alt="" />
          </div>
          <pre></pre>
          <MultiSelect
            v-model="multiselectValue"
            :options="multiselectValues"
            optionLabel="name"
            placeholder="Chọn hệ thống đặt vé"
            class="w-full"
            :filter="true"
          >
            <template #value="slotProps">
              <div
                class="inline-flex items-center py-1 px-2 bg-primary text-primary-contrast rounded-border mr-2 border rounded bg-gray-100"
                v-for="option of slotProps.value"
                :key="option.code"
              >
                <div><img style="width: 24px" :src="option.img" alt="" /></div>
                <span :class="'mr-2 flag flag-' + option.code.toLowerCase()" />
                <div>{{ option.code }}</div>
              </div>
            </template>
            <template #option="slotProps">
              <div class="flex items-center gap-3">
                <div><img style="width: 24px" :src="slotProps.option.img" alt="" /></div>
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </MultiSelect>
        </div>

        <div class="flex items-center  pr-2 border-r-2 gap-2">
          <div style="width: 40px !important;height: 40px !important; overflow: hidden;">
            <img src="https://dev.airdata.site/img/users.1985e36a.svg" class="w-full" alt="" />
          </div>
          <div class="flex-1">
            <div class="flex gap-3 items-center">
              <!-- <div class="">
                <span class="font-medium">Hành khách</span>
              </div> -->
              <div class="grow w-full">
                <InputGroup>
                  <Button icon="pi pi-plus" severity="success" @click="increment" />
                  <InputNumber v-model="count" :min="0" placeholder="1" />
                  <Button icon="pi pi-minus" severity="danger" @click="decrement" />
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <Button
          class="!rounded-3xl"
          icon="pi pi-search"
          label="Tìm kiếm chuyến bay"
          @click="handleSubmit"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddressPage from '@/component/AddressPage.vue'
import { onMounted, ref } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { viLocale } from '@/utils/format'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const router = useRouter()

const planeStore = usePlaneStore()

const loading = ref(false)
const formatDate = () => {
  const date = new Date()
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return new Date(`${year}-${month}-${day}`)
}

// const startedDate = formatDate()
const minDate = ref(formatDate())
const startedDate = ref()
startedDate.value = formatDate()
const onDateSelect = (newDate) => {
  if (newDate) {
    startedDate.value = newDate
  }
}
const ingredient = ref(1)

const multiselectValue = ref([
  {
    name: 'Vietnam Airlines',
    code: 'VN',
    img: 'https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/vietnam-airline-logo.jpg'
  }
])
const multiselectValues = ref([
  {
    name: 'Vietnam Airlines',
    code: 'VN',
    img: 'https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/vietnam-airline-logo.jpg'
  },
  {
    name: 'Vietjet Air',
    code: 'VJ',
    img: 'https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/logo%2C%2C%2C/y-nghia-logo-vietjet.jpg'
  },
  {
    name: 'Bambo Airways',
    code: 'QH',
    img: 'https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/3e4ba930-ea1f-4a72-a8b1-252a62cdde6b.jpg'
  },
  {
    name: 'Viettravel Arilines',
    code: 'VU',
    img: 'https://media.loveitopcdn.com/3807/logo-vietravel-airlines.png'
  }
])
const departures = ref({
  airportCode: 'HAN',
  name: 'Sân bay Nội Bài',
  city: 'Hà Nội',
  country: 'Việt Nam',
  id: '1'
})
const arrival = ref({
  airportCode: 'SGN',
  name: 'Sân bay Tân Sơn Nhất',
  city: 'Hồ Chí Minh',
  country: 'Việt Nam',
  id: '2'
})

const count = ref(1)
const increment = () => {
  if (count.value < 9) {
    count.value += 1
  }
}

const decrement = () => {
  if (count.value > 1) {
    count.value -= 1
  }
}
const handleSubmit = async () => {
  loading.value = true
  const req = {
    departure: departures.value?.airportCode || '',
    arrival: arrival.value?.airportCode || '',
    startedDate: startedDate.value || null,
    cityDeparture: departures.value.city || '',
    cityArrival: arrival.value.city || '',
    countryDeparture: departures.value.country || '',
    countryArrival: arrival.value.country || '',
    idDeparture: departures.value.id || '',
    idArrival: arrival.value.id || '',
    count: count.value || 1,
    airlines: multiselectValue.value.map((item) => item.code) || null
  }
  if (req.departure === req.arrival) {
    toast.add({
      severity: 'error',
      summary: 'Điểm khởi hành và điểm kết thúc không giống nhau!',
      detail: 'Bạn đã bị từ chối',
      life: 3000
    })
    return
  }
  if (req.departure && req.arrival) {
    console.log(req)
    try {
      localStorage.setItem('searchFlights', JSON.stringify(req))
      await planeStore.getFilteredFlights(req)
      router.push({ path: '/booking' })
    } catch (error) {
      console.error('Lỗi data:', error)
    } finally {
      loading.value = false
    }
  } else {
    console.error('Departure and arrival airport codes are required.')
    loading.value = false
  }
}
const swapAirports = () => {
  // Logic to swap departure and arrival airports
  const temp = departures.value
  departures.value = arrival.value
  arrival.value = temp
}
onMounted(() => {
  planeStore.fetchFlights
  const savedSearch = localStorage.getItem('searchFlights')
  if (savedSearch) {
    const parsedSearch = JSON.parse(savedSearch)
    const departureAirport = planeStore.airports.find(
      (airport) => airport.airportCode === parsedSearch.departure
    )
    departures.value = departureAirport || {
      airportCode: parsedSearch.departure,
      name: parsedSearch.departure,
      city: parsedSearch.cityDeparture,
      country: parsedSearch.countryDeparture,
      id: parsedSearch.idDeparture
    }

    const arrivalAirport = planeStore.airports.find(
      (airport) => airport.airportCode === parsedSearch.arrival
    )
    arrival.value = arrivalAirport || {
      airportCode: parsedSearch.arrival,
      name: parsedSearch.arrival,
      city: parsedSearch.cityArrival,
      country: parsedSearch.countryArrival,
      id: parsedSearch.idArrival
    }
    startedDate.value = new Date(parsedSearch.startedDate)
    count.value = parsedSearch.count
    multiselectValue.value = multiselectValues.value.filter((option) =>
      parsedSearch.airlines.includes(option.code)
    )
  } else {
    planeStore.fetchFlights
  }
})
//  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
//   return `${airport ? airport.name : code} (${code})`
</script>
