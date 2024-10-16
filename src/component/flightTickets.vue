<template>
  <div class="relative pb-20">
    <form action="">
      <div class="bg-slate-300 pt-5">
        <div class="flex h-14 rounded-lg bg-slate-50 justify-around border-2 my-3 mx-5 w-full">
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
              >{{ formatDate(information?.departure?.time) }}-
            </span>
            {{ formatDate(information?.arrival?.time) }}
          </div>
          <span class="flex items-center font-bold text-amber-500">
            {{ information?.departure?.airport }} - {{ information?.arrival?.airport }}
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
              <div class="card border-2 !border-gray-500 !rounded-lg mx-5 my-5">
                <DataTable :value="price" tableStyle="min-width: 50rem ">
                  <template #header>
                    <div class="flex flex-wrap items-center justify-center gap-2">
                      <span class="text-xl font-bold !text-orange-400"
                        >{{ getAirportName(information?.departure?.airport) }} ({{
                          information?.departure?.airport
                        }}) - {{ getAirportName(information?.arrival?.airport) }} ({{
                          information?.arrival?.airport
                        }})</span
                      >
                    </div>
                  </template>
                  <Column class="!rounded-lg" field="count" header="Hành khách"></Column>
                  <Column class="!rounded-lg" field="class" header="Hạng"></Column>
                  <Column field="price" header="GIÁ"></Column>
                  <Column field="tax" header="Thuế"></Column>
                  <Column field="total" header="total"></Column>

                  <template #footer>
                    <span class="text-red-400 font-bold w-full flex flex-row-reverse"
                      >Giá chi tiết:
                      {{ formatPrice(price.reduce((acc, cur) => acc + cur.total, 0)) }}</span
                    >
                  </template>
                </DataTable>
              </div>
            </div>
          </div>
          <div class="flex flex-row-reverse items-center mt-5">
            <span class="text-gray-950 text-sm">(Đã bao gôm thuế, phí)</span>
            <span class="text-orange-400 font-bold text-3xl">{{
              formatPrice(price.reduce((acc, cur) => acc + cur.total, 0))
            }}</span>
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
                  <span class="text-xl font-bold !text-gray-900 uppercase">
                    {{ firstName }} {{ lastName }} {{ titleName }}
                  </span>
                </div>
                <div class="bg-red-200 text-red-600 mx-4 font-bold rounded-lg p-3">
                  <span>
                    Lưu ý: "Theo yêu cầu của VietjetAir tất cả hành khách phải nhập ngày sinh. Trong
                    trường hợp Quý AG để trống chúng tôi sẽ cung cấp dữ liệu ngẫu nhiên. BGT không
                    chịu trách nhiệm nếu quý AG không nhập đầy đủ thông tin !"
                  </span>
                </div>
                <div
                  v-for="(item, index) in passengers"
                  :key="index"
                  class="card flex gap-4 px-4 bg-slate-200 p-6 m-4 rounded-lg py-4"
                >
                  firstName {{ item.firstName }} firstNameAttrs {{ item.firstNameAttrs }}
                  <div class="flex-1 flex flex-col gap-1">
                    <div>
                      <InputText
                        class="w-full uppercase"
                        v-bind="item.firstNameAttrs"
                        type="text"
                        v-model="item.firstName"
                        placeholder="Họ (*)"
                        :class="{ 'p-invalid': errors[`passengers.${index}.firstName`] }"
                      />
                    </div>
                    <span class="h-6" style="color: #d81221">{{
                      errors[`passengers.${index}.firstName`]
                    }}</span>

                    <div>
                      <Select
                        v-model="item.titleName"
                        v-bind="item.titleNameAttrs"
                        :options="title"
                        optionLabel="name"
                        optionValue="code"
                        placeholder="Danh xưng"
                        class="w-full"
                      />
                    </div>
                    <span class="h-6" style="color: #d81221">{{
                      errors[`passengers.${index}.titleName`]
                    }}</span>
                  </div>
                  <div class="flex-1 flex flex-col gap-1">
                    <div>
                      <InputText
                        v-bind="item.lastNameAttrs"
                        class="w-full uppercase"
                        v-model="item.lastName"
                        type="text"
                        placeholder="Tên đệm & Tên (*)"
                        :class="{ 'p-invalid': errors[`passengers.${index}.lastName`] }"
                      />
                    </div>
                    <span class="h-6" style="color: #d81221">{{
                      errors[`passengers.${index}.lastName`]
                    }}</span>
                    <div>
                      <DatePicker
                        v-bind="item.birthdayAttrs"
                        v-model="item.birthday"
                        birthdayFormat="dd/mm/yy"
                        placeholder="Ngày sinh (DD-MM-YYYY)"
                        class="w-full"
                        :maxDate="new Date()"
                        :class="{ 'p-invalid': errors[`passengers.${index}.birthday`] }"
                      />
                    </div>
                    <span class="h-6" style="color: #d81221">{{
                      errors[`passengers.${index}.birthday`]
                    }}</span>
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
                <InputMask
                  v-bind="phoneAttrs"
                  id="phone"
                  v-model="phone"
                  mask="(999) 999-9999"
                  placeholder="(999) 999-9999"
                  :invalid="errors.phone"
                  fluid
                />
                <span class="h-6" style="color: #d81221">{{ errors.phone }}</span>
              </div>
              <div class="flex flex-col">
                <label for="email">Email: </label>
                <InputText
                  type="text"
                  v-bind="emailAttrs"
                  v-model="email"
                  placeholder="Vui lòng nhập"
                  :invalid="errors.email"
                />
                <span class="h-6" style="color: #d81221">{{ errors.email }}</span>
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
          @click="holdBooking"
        ></Button>
      </div>
    </form>
  </div>
</template>
<script setup lang="js">
import { onMounted, ref, watch } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { useReservationStore } from '@/stores/reservation'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import { formatDate, formatPrice, genBookingCode } from '../utils/format'

const loading = ref(false)
const toast = useToast()

const router = useRouter()
const confirm = useConfirm()
const reservationStore = useReservationStore()
const planeStore = usePlaneStore()
const price = ref([{ count: 0 }])

watch(
  () => price.value[0]?.count,
  (newCount) => {
    if (newCount && newCount > 0) {
      passengers.value = Array.from({ length: newCount }, () => ({
        firstName: '',
        lastName: '',
        titleName: '',
        birthday: '',
        firstNameAttrs: {},
        lastNameAttrs: {},
        titleNameAttrs: {},
        birthdayAttrs: {}
      }))
    }
  },
  { immediate: true }
)

const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => {
    return airport.airportCode === code
  })
  return `${airport ? airport.name : code}`
}
const backBooking = () => {
  router.push({ path: '/booking' })
}
const title = ref([
  { name: 'Ông', code: 'MR' },
  { name: 'Bà', code: 'MRS' },
  { name: 'Cô', code: 'MS' }
])

const information = ref([])

const passengers = ref([
  {
    firstName: '',
    lastName: '',
    titleName: '',
    birthday: '',
    firstNameAttrs: {},
    lastNameAttrs: {},
    titleNameAttrs: {},
    birthdayAttrs: {}
  }
])

const { errors, handleSubmit } = useForm({
  validationSchema: yup.object({
    passengers: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required('Bắt buộc nhập họ'),
        lastName: yup.string().required('Trường tên đệm và tên là bắt buộc'),
        titleName: yup.string().required('Trường danh xưng là bắt buộc'),
        birthday: yup.string().required('Ngày sinh là bắt buộc')
      })
    )
  })
})

const holdBooking = handleSubmit((values) => {
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
        detail: 'Đang tiến hành cập nhật sân bay...',
        life: 3000
      })

      loading.value = true
      const req = {
        bookingCode: genBookingCode(),
        createdAt: new Date().getTime(),
        flight: {
          id: information.value?.id,
          airline: information.value?.airline,
          departure: {
            time: information.value?.departure.time,
            airport: information.value?.departure.airport
          },
          arrival: {
            time: information.value?.arrival.time,
            airport: information.value?.arrival.airport
          },
          flightNumber: information.value?.flightNumber,
          aircraft: information.value?.aircraft,
          fareOptions: {
            class: price.value[0]?.class,
            price: price.value[0]?.total
          }
        },
        contact: {
          email: values.email,
          phone: values.phone
        },
        paxLists: [
          {
            firstName: values.firstName,
            lastName: values.lastName,
            titleName: values.titleName,
            birthday: values.birthday
          }
        ]
      }
      // call api
      if (req) {
        reservationStore.holdBooking(req)
        router.push({ path: '/bookings' })
      } else {
        alert('Đặt Thất bại')
      }
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đặt vé thành công!',
        life: 3000
      })
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
})

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
