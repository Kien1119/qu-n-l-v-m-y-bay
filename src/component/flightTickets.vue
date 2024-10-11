<template>
  <div class="relative pb-20">
    <div class="bg-slate-300">
      <div
        class="flex w-11/12 h-14 rounded-lg bg-slate-50 justify-around border-2 my-3 mx-5 w-full"
      >
        <img
          style="border-radius: 5px"
          src="https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/vietnam-airline-logo.jpg"
          alt=""
        />
        <span class="flex items-center text-orange-600 font-bold">
          {{ information?.bookingCode }}</span
        >
        <div class="flex items-center">
          <span class="text-stone-950 font-bold"
            >{{ formatDate(information?.departure.time) }}-
          </span>
          {{ formatDate(information?.arrival.time) }}
        </div>
        <span class="flex items-center font-bold text-amber-500">
          {{ information?.departure.airport }} - {{ information?.arrival.airport }}
        </span>
      </div>
      <div class="m-7 h-1/3 border-2 rounded-lg border-cyan-700 bg-slate-50 p-4">
        <div>
          <div class="border-2 rounded-lg">
            <div class="flex gap-3 bg-gradient-to-r from-cyan-500 from-10%">
              <div class="h-ful flex justify-center items-center bg-cyan-200">
                <svg
                  data-v-532b2a7a=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-body feather feather-dollar-sign"
                >
                  <line data-v-532b2a7a="" x1="12" y1="1" x2="12" y2="23"></line>
                  <path
                    class="w-50px"
                    data-v-532b2a7a=""
                    d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                  ></path>
                </svg>
              </div>
              <div class="flex flex-col p-3">
                <span class="font-bol text-2xl text-cyan-900"> Chi tiết giá </span>
                <span>Thông tin giá vé, phí dịch vụ kèm theo</span>
              </div>
            </div>
            <div class="card border-2 !border-gray-500 rounded-lg mx-5 my-5">
              <DataTable :value="price" tableStyle="min-width: 50rem">
                <template #header>
                  <div class="flex flex-wrap items-center justify-center gap-2">
                    <span class="text-xl font-bold !text-orange-400"
                      >{{ getAirportName(information?.departure.airport) }} ({{
                        information?.departure.airport
                      }}) - {{ getAirportName(information?.arrival.airport) }} ({{
                        information?.arrival.airport
                      }})</span
                    >
                  </div>
                </template>
                <Column field="class" header="Hạng">
                  <template #body="slotProps">
                    {{ slotProps }}
                  </template>
                </Column>
                <Column field="price" header="GIÁ">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.price) }}
                  </template>
                </Column>
                <Column header="TỔNG TIỀN">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.price) }}
                  </template>
                </Column>
                <template #footer>
                  <span class="text-red-400 font-bold w-full flex flex-row-reverse"
                    >Tổng: 1,135,640</span
                  >
                  <!-- In total there are {{ products ? products.length : 0 }} products. -->
                </template>
              </DataTable>
            </div>
          </div>
        </div>
        <div class="flex flex-row-reverse items-center mt-5">
          <span class="text-gray-950 text-sm">(Đã bao gôm thuế, phí)</span>
          <span class="text-orange-400 font-bold text-3xl">1,330,000</span>
          <span class="text-slate-950 font-bold">Tổng chi phí: </span>
        </div>
      </div>
      <div class="m-7 h-1/3 border-2 border-cyan-700 rounded-lg bg-slate-50 p-4">
        <div>
          <div class="border-2 rounded-lg">
            <div class="flex gap-3 bg-gradient-to-r from-cyan-500 from-10%">
              <div class="h-ful flex justify-center items-center bg-cyan-200">
                <svg
                  data-v-33ccfcdd=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-body feather feather-users"
                >
                  <path data-v-33ccfcdd="" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle data-v-33ccfcdd="" cx="9" cy="7" r="4"></circle>
                  <path data-v-33ccfcdd="" d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path data-v-33ccfcdd="" d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div class="flex flex-col p-3">
                <span class="font-bol text-2xl text-cyan-900">Thông tin hành khách</span>
                <span
                  >Nhập tiếng Việt không dấu, tên hành khách phải chính xác như trong CCCD/Hộ
                  chiếu/Giấy phép lái xe.</span
                >
              </div>
            </div>
            <div class="flex flex-col card border-2 !border-gray-500 rounded-lg mx-5 my-5 gap-5">
              <div class="flex flex-wrap items-center pl-4 gap-2">
                <span class="text-xl font-bold !text-gray-900">PHAN THANH GIANG MS</span>
              </div>
              <div class="bg-red-200 text-red-600 mx-4 font-bold rounded-lg p-3">
                <span class=""
                  >Lưu ý: "Theo yêu cầu của VietjetAir tất cả hành khách phải nhập ngày sinh. Trong
                  trường hợp Quý AG để trống chúng tôi sẽ cung cấp dữ liệu ngẫu nhiên. BGT không
                  chịu trách nhiệm nếu quý AG không nhập đầy đủ thông tin !"</span
                >
              </div>
              <div class="card flex gap-4 px-4 bg-slate-200 p-6 m-4 rounded-lg">
                <div class="flex flex-col gap-3">
                  <InputText class="flex-1" type="text" v-model="value" placeholder="Họ (*)" />
                  <Select
                    v-model="titleName"
                    :options="title"
                    optionLabel="name"
                    placeholder="Danh xưng"
                    class="w-full md:w-56"
                  />
                </div>
                <div class="flex-1 flex flex-col gap-3">
                  <InputText
                    class="flex-1"
                    type="text"
                    v-model="value"
                    placeholder="Tên đệm & Tên (*)"
                  />
                  <div>
                    <DatePicker
                      v-model="date"
                      dateFormat="dd/mm/yy"
                      placeholder="Ngày sinh (DD-MM-YYYY)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-5">
        <div class="flex flex-col p-4 border-2 border-cyan-700 rounded-lg bg-slate-50 gap-3">
          <div><span class="font-bold text-cyan-700">Thông tin liên hệ khách hàng</span></div>
          <div class="flex gap-5 bg-slate-300 p-4 rounded-lg gap-3">
            <div class="flex flex-col">
              <label for="phone">Số điện thoại: </label>
              <InputNumber
                type="number"
                v-bind="phoneAttrs"
                v-model="value"
                placeholder="Vui lòng nhập"
              />
            </div>
            <div class="flex flex-col">
              <label for="email">Email: </label>
              <InputText
                type="text"
                v-bind="emailAttrs"
                v-model="value"
                placeholder="Vui lòng nhập"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="backdrop-blur-md flex !bg-white/50 border gap-7 h-20 justify-center fixed inset-x-0 bottom-0"
    >
      <Button
        class="!bg-gradient-to-r from-orange-500 from-10% !rounded-2xl h-10 flex items-center shadow-2xl justify-center mt-5"
        label="Quay lại"
        @click="backBooking"
      ></Button>
      <Button
        class="!bg-gradient-to-r shadow-2xl from-orange-500 from-10% !rounded-2xl h-10 flex items-center justify-center mt-5"
        label="Giữ chỗ"
        @click="bookingFlightHandel"
      ></Button>
    </div>
  </div>
</template>
<script setup lang="js">
import { onMounted, ref } from 'vue'
import { usePlaneStore } from '@/stores/airports'
const planeStore = usePlaneStore()
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
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => {
    return airport.airportCode === code
  })
  return `${airport ? airport.name : code}`
}
const titleName = ref()
const title = ref([
  { name: 'Ông', code: 'MR' },
  { name: 'Bà', code: 'MRS' },
  { name: 'Cô', code: 'MS' }
])
const information = ref()
const price = ref()
onMounted(() => {
  planeStore.fetchAirports()

  const saveInformation = localStorage.getItem('flightTicket')
  const priceChair = localStorage.getItem('priceTicket')

  if (saveInformation && priceChair) {
    try {
      const parsedInfo = JSON.parse(saveInformation)
      const parsedPrice = JSON.parse(priceChair)

      if (typeof parsedInfo === 'object' && typeof parsedPrice === 'object') {
        information.value = parsedInfo
        price.value = parsedPrice
      } else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Lỗi dữ liệu',
          detail: 'Thông tin hoặc giá vé không hợp lệ',
          life: 3000
        })
      }
    } catch (e) {
      // Xử lý lỗi nếu việc parse JSON thất bại
      this.$toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Dữ liệu từ localStorage không hợp lệ',
        life: 3000
      })
    }
  }
})
</script>
<style lang="css" scoped></style>
