<!-- eslint-disable no-undef -->
<template>
  <div class="relative pb-20">
      <div class="bg-slate-300 pt-5">
        <div class="flex h-14 rounded-lg bg-slate-50 md:justify-around border-2 md:w-full">
          <img style="border-radius: 5px" :src="information?.img" alt="" />
          <span class="flex items-center text-orange-600 font-bold">
            {{ information?.airline }}</span
          >
          <span class="flex items-center text-black-600 font-bold">
            {{ information?.aircraft }}</span
          >
          <span class="flex items-center text-gray-600 font-bold">
            {{ information?.flightNumber }}</span
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

        <!-- GIÁ VÉ -->
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
                  <Column class="!rounded-lg" field="count" header="Hành khách">
                    <template #body="slotProps">
                      {{ slotProps.data.count }}
                    </template></Column
                  >
                  <Column class="!rounded-lg" field="class" header="Hạng"></Column>
                  <Column field="price" header="Giá">
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.price * 0.9) }}
                    </template>
                  </Column>
                  <Column field="tax" header="Thuế">
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.tax) }}
                    </template>
                  </Column>
                  <Column field="total" header="total">
                    <template #body="slotProps">
                      {{ formatPrice(slotProps.data.total) }}
                    </template>
                  </Column>

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


        <!-- HÀNH KHÁCH -->
        <!--  -->
        <Form :validation-schema="schema" @submit.prevent="onSubmit">
          <!-- Danh sách hành khách -->
           {{ values }}
          <FieldArray name="passengers" v-slot="{ fields }">
            <div v-for="(entry, idx) in values.passengers" :key="entry.key">
            <Field  :name="`passengers[${idx}].titleName`" v-slot="{ field, errors }">
              <InputText v-bind="field" placeholder="Title Name" />
              <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
            </Field>

            <Field  :name="`passengers[${idx}].firstName`" v-slot="{ field, errors }">
              <InputText v-bind="field" placeholder="First Name" />
              <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
            </Field>

            <Field  :name="`passengers[${idx}].lastName`" v-slot="{ field, errors }">
              <InputText v-bind="field" placeholder="Last Name" />
              <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
            </Field>

            <Field  :name="`passengers[${idx}].birthday`" v-slot="{ field, errors }">
              <Calendar v-bind="field" placeholder="Birthday" />
              <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
            </Field>
          </div>
          </FieldArray>

          <!-- Email -->
          <Field name="email" v-slot="{ field, errors }">
            <InputText v-bind="field" placeholder="Email" />
                <small v-if="errors[0]" class="text-red-600">{{ errors[0] }}</small>
          </Field>

          <!-- Phone -->
          <Field name="phone" v-slot="{ field, errors }">
            <InputText v-bind="field" placeholder="Phone" />
            <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
          </Field>

          <!-- <Button 
          class="!bg-gradient-to-r shadow-2xl from-orange-500 from-10% !rounded-2xl h-10 flex items-center justify-center mt-5"
          type="submit" label="Submit" /> -->
        
        <!-- BUTTON -->
        <!-- <div
          class="backdrop-blur-md flex !bg-white/50 border gap-7 h-20 justify-center fixed inset-x-0 bottom-0"
        > -->
          <!-- <Button
            class="!bg-gradient-to-r from-orange-500 from-10% !rounded-2xl h-10 flex items-center shadow-2xl justify-center mt-5"
            label="Quay lại"
            @click="backBooking"
          ></Button> -->
          <Button
            class="!bg-gradient-to-r shadow-2xl from-orange-500 from-10% !rounded-2xl h-10 flex items-center justify-center mt-5"
            label="Giữ chỗ"
            type="submit"
          ></Button>
        <!-- </div> -->
        </Form>
      </div>


  </div>
</template>
<script setup lang="js">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { useReservationStore } from '@/stores/reservation'
import { Form, useForm, FieldArray, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

import { formatDate, formatPrice, genBookingCode } from '../utils/format'

// const loading = ref(false)
const toast = useToast()

const router = useRouter()
const confirm = useConfirm()
const reservationStore = useReservationStore()
const planeStore = usePlaneStore()
const price = ref([{ count: 0 }])
const information = ref([])
const title = ref([
  { name: 'Ông', code: 'MR' },
  { name: 'Bà', code: 'MRS' },
  { name: 'Cô', code: 'MS' }
])

const schema = yup.object({
  passengers: yup.array().of(
    yup.object({
      titleName: yup.string().required('Title name is required'),
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      birthday: yup.string() //.required('Birthday is required'),
    })
  ),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
})

// Định nghĩa form validation với vee-validate
const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
  passengers: [{ titleName: '', firstName: '', lastName: '', birthday: '' }],
  email: '',
  phone: '',
},
})

// Hàm cập nhật số lượng passengers
const updatePassengers = (count) => {
  const passengers = Array.from({ length: count }, () => ({
    titleName: '',
    firstName: '',
    lastName: '',
    birthday: '',
  }))
  setFieldValue('passengers', passengers)
}

watch(() => price.value[0]?.count, (newCount) => {
    if (newCount && newCount > 0) {
      updatePassengers(newCount)
    } else {
      updatePassengers(1)
    }
  },
  { immediate: true }
)

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values)
})

watchEffect(() => {
  console.log('watchEffect: ',{ values })
})

// // Hàm để xử lý dữ liệu booking
// const onSubmit = handleSubmit((values) => {
//   console.log( 'holdBooking = handleSubmit', {values})

//   // eslint-disable-next-line no-constant-condition
//   if (true) return

//   confirm.require({
//     message: 'Bạn có chắc chắn muốn tiếp tục không?',
//     header: 'Xác nhận',
//     icon: 'pi pi-exclamation-triangle',
//     rejectProps: { label: 'Hủy bỏ', severity: 'secondary', outlined: true },
//     acceptProps: { label: 'Save' },
//     accept: async () => {
//       toast.add({
//         severity: 'info',
//         summary: 'Đang cập nhật',
//         detail: 'Đang tiến hành cập nhật sân bay...',
//         life: 3000
//       })

//       const req = {
//         bookingCode: genBookingCode(),
//         createdAt: new Date().getTime(),
//         flight: {
//           img: information.value?.img,
//           id: information.value?.id,
//           airline: information.value?.airline,
//           departure: {
//             time: information.value?.departure.time,
//             airport: information.value?.departure.airport
//           },
//           arrival: {
//             time: information.value?.arrival.time,
//             airport: information.value?.arrival.airport
//           },
//           flightNumber: information.value?.flightNumber,
//           aircraft: information.value?.aircraft,
//           fareOptions: [
//             {
//               class: price.value[0]?.class,
//               price: price.value[0]?.total
//             }
//           ]
//         },
//         contact: {
//           email: values.email,
//           phone: values.phone
//         },
//         paxLists: values.passengers.map((passenger) => ({
//           titleName: passenger.titleName,
//           firstName: passenger.firstName,
//           lastName: passenger.lastName,
//           birthday: passenger.birthday
//         }))
//       }

//       if (req) {
//         reservationStore.holdBooking(req) // Gọi API
//         router.push({ path: '/bookings' })
//       } else {
//         alert('Đặt Thất bại')
//       }

//       toast.add({
//         severity: 'success',
//         summary: 'Thành công',
//         detail: 'Đặt vé thành công!',
//         life: 3000
//       })
//     },
//     reject: () => {
//       toast.add({
//         severity: 'error',
//         summary: 'Lỗi',
//         detail: 'Bạn đã từ chối',
//         life: 3000
//       })
//     }
//   })
// })

// Hàm để quay lại trang booking
const backBooking = () => {
  router.push({ path: '/booking' })
}

// Hàm lấy tên sân bay từ code
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return airport ? airport.name : code
}
onMounted(() => {
  planeStore.fetchAirports()

  if (price.value[0]?.count) {
    updatePassengers(price.value[0].count)
  }

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
