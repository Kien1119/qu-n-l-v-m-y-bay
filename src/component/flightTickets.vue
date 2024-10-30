<!-- eslint-disable no-undef -->
<template>
  <div class="flex flex-col gap-5 pb-20">
    <div class="flex h-14 rounded-lg bg-slate-50 md:justify-around border-2 md:w-full">
      <img class="w-24" :src="information?.img" alt="" />
      <span class="flex items-center text-orange-600 font-bold"> {{ information?.airline }}</span>
      <span class="flex items-center text-black-600 font-bold"> {{ information?.aircraft }}</span>
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
    <div class="border-2 rounded-lg bg-slate-50 p-4">
      <div>
        <div class="border-2 rounded-lg">
          <div class="flex gap-3 bg-gradient-to-r from-primary from-10%">
            <div class="h-ful flex justify-center items-center bg-primary">
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
                </template>
              </Column>
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
      <div class="flex flex-row-reverse gap-3 items-center mt-5">
        <span class="text-gray-950 text-sm">(Đã bao gôm thuế, phí)</span>
        <span class="text-orange-400 font-bold text-3xl">{{
          formatPrice(price.reduce((acc, cur) => acc + cur.total, 0))
        }}</span>
        <span class="text-slate-950 font-bold">Tổng chi phí: </span>
      </div>
    </div>
    <!-- form nhập thông tin -->
    <Form
      :initial-values="initialValues"
      :validation-schema="schema"
      class="flex flex-col gap-5"
      @submit="getHold"
    >
      <!-- Thông tin hành khách -->
      <div class="border-2 rounded-lg bg-slate-50">
        <div class="flex gap-3 bg-gradient-to-r from-primary from-10%">
          <div class="flex justify-center items-center bg-primary">
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
              >Nhập tiếng Việt không dấu, tên hành khách phải chính xác như trong CCCD/Hộ chiếu/Giấy
              phép lái xe.</span
            >
          </div>
        </div>

        <div class="flex flex-col card border-2 rounded-lg mx-5 my-5 gap-5">
          <!-- FieldArray cho danh sách hành khách -->
          <FieldArray name="paxLists" v-slot="slotProps">
            <div v-if="slotProps && slotProps.fields" class="bg-slate-100">
              <div v-for="(field, idx) in fields" :key="field.key" class="card p-3 rounded-lg">
                <!-- Hành khách số -->
                <div class="flex flex-col gap-2 pb-1">
                  <legend class="text-xl font-bold !text-orange-500 uppercase">
                    Hành Khách #{{ idx + 1 }}
                  </legend>
                  <span class="text-xl uppercase font-medium font-montserrat">
                    {{ field.value?.firstName }}
                    {{ field.value?.lastName }}
                    {{ field.value?.titleName }}
                  </span>
                </div>

                <!-- Form nhập -->
                <div class="grid grid-cols-2 gap-6">
                  <!-- Trường Họ -->
                  <div class="flex flex-col gap-1 mb-3">
                    <label :for="`firstName_${idx}`"
                      >Họ <span class="text-red-600">(*)</span></label
                    >
                    <Field
                      :id="`firstName_${idx}`"
                      :name="`paxLists[${idx}].firstName`"
                      class="px-2 w-full uppercase h-10 rounded-md"
                      placeholder="Họ"
                      as="input"
                    />
                    <ErrorMessage :name="`paxLists[${idx}].firstName`" class="text-red-600" />
                  </div>

                  <!-- Trường Tên -->
                  <div class="flex flex-col gap-1">
                    <label :for="`lastName_${idx}`"
                      >Tên đệm & Tên <span class="text-red-600">(*)</span></label
                    >
                    <Field
                      :id="`lastName_${idx}`"
                      :name="`paxLists[${idx}].lastName`"
                      class="px-2 w-full uppercase h-10 rounded-md"
                      placeholder="Tên đệm & Tên"
                      as="input"
                    />
                    <ErrorMessage :name="`paxLists[${idx}].lastName`" class="text-red-600" />
                  </div>

                  <!-- Trường Danh xưng -->
                  <div class="flex flex-col gap-1">
                    <label :for="`titleName_${idx}`"
                      >Danh xưng<span class="text-red-600">(*)</span></label
                    >
                    <Field
                      :id="`titleName_${idx}`"
                      :name="`paxLists[${idx}].titleName`"
                      as="select"
                      placeholder="Danh xưng"
                      class="w-full h-10 rounded-md"
                    >
                      <option value="MR">Ông</option>
                      <option value="MRS">Bà</option>
                      <option value="MS">Cô</option>
                    </Field>
                    <ErrorMessage :name="`paxLists[${idx}].titleName`" class="text-red-600" />
                  </div>

                  <!-- Trường Ngày sinh -->
                  <div class="flex flex-col gap-1">
                    <label :for="`birthday_${idx}`"
                      >Ngày sinh<span class="text-red-600">(*)</span></label
                    >
                    <Field :name="`paxLists[${idx}].birthday`" v-slot="{ field, value }">
                      <DatePicker v-bind="field" :model-value="value" :max-date="new Date()" />
                    </Field>
                    <ErrorMessage :name="`paxLists[${idx}].birthday`" class="text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </FieldArray>
        </div>
      </div>

      <!-- Thông tin liên hệ khách hàng -->
      <div class="border-2 rounded-lg bg-slate-50">
        <div class="flex gap-3 bg-gradient-to-r from-primary from-10%">
          <div class="h-ful flex justify-center items-center bg-primary">
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
            <span class="font-bol text-2xl text-cyan-900">Thông tin liên hệ khách hàng </span>
          </div>
        </div>
        <div class="flex card border-2 rounded-lg mx-5 my-5 gap-3 bg-slate-100">
          <div class="flex-1 flex flex-col gap-1 p-3">
            <label>Email <span class="text-red-600">(*)</span></label>
            <Field
              name="contact.email"
              v-model="initialValues.contact.email"
              type="email"
              placeholder="Email"
              class="w-full h-10 rounded-md px-3"
            />
            <ErrorMessage class="text-red-600" name="contact.email" />
          </div>
          <div class="flex-1 flex flex-col gap-1 p-3">
            <label>Số điện thoại <span class="text-red-600">(*)</span></label>
            <Field
              name="contact.phone"
              v-model="initialValues.contact.phone"
              type="tel"
              placeholder="Số điện thoại"
              class="w-full h-10 rounded-md px-3"
            />
            <ErrorMessage class="text-red-600" name="contact.phone" />
          </div>
        </div>
      </div>

      <!-- Thao tác -->
      <div
        class="backdrop-blur-md flex !bg-white/50 rounded-2xl border justify-center fixed inset-x-0 bottom-0"
      >
        <div class="py-3 flex gap-3">
          <Button class="" label="Quay lại" @click="backBooking"></Button>
          <Button class="" label="Giữ chỗ" type="submit"></Button>
        </div>
      </div>
    </Form>
  </div>
</template>
<script setup lang="js">
import { onMounted, ref, watch } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { useReservationStore } from '@/stores/reservation'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useForm, useFieldArray } from 'vee-validate'
import { formatDate, formatPrice, genBookingCode } from '../utils/format'
import { Field, Form, ErrorMessage, FieldArray } from 'vee-validate'

// const loading = ref(false)
const toast = useToast()

const router = useRouter()
const confirm = useConfirm()
const reservationStore = useReservationStore()
const planeStore = usePlaneStore()
const price = ref([{ count: 0 }])
const information = ref([])

useForm()

const { fields } = useFieldArray('paxLists')

// khởi tạo giá trị
const initialValues = ref({
  paxLists: fields,
  contact: { phone: '', email: '' }
})

// Định nghĩa schema xác thực
const schema = yup.object().shape({
  paxLists: yup.array().of(
    yup.object().shape({
      firstName: yup.string().required('Họ là bắt buộc'),
      lastName: yup.string().required('Tên là bắt buộc'),
      titleName: yup.string().required('Danh xưng là bắt buộc'),
      birthday: yup.date().required('Ngày sinh là bắt buộc')
    })
  ),
  contact: yup.object({
    phone: yup.string().required('Số điện thoại là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc')
  })
})

const { handleSubmit } = useForm({
  initialValues,
  validationSchema: schema
})

watch(
  () => price.value[0]?.count,
  (newCount) => {
    if (newCount && newCount > 0) {
      initialValues.value.paxLists = Array.from({ length: newCount }, () => ({
        firstName: '',
        lastName: '',
        titleName: '',
        birthday: ''
      }))
    }
  },
  { immediate: true }
)

// Hàm để xử lý dữ liệu booking
const getHold = (values) => {
  confirm.require({
    message: 'Bạn có chắc chắn muốn tiếp tục không?',
    header: 'Xác nhận',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: 'Hủy bỏ', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Save' },
    accept: async () => {
      toast.add({
        severity: 'info',
        summary: 'Đang cập nhật',
        detail: 'Đang tiến hành cập nhật sân bay...',
        life: 3000
      })

      const req = {
        bookingCode: genBookingCode(),
        createdAt: new Date().getTime(),
        flight: {
          img: information.value?.img,
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
          fareOptions: [
            {
              class: price.value[0]?.class,
              price: price.value[0]?.total
            }
          ]
        },
        contact: {
          email: values.contact.email,
          phone: values.contact.phone
        },
        paxLists: values.paxLists.map((pax) => ({
          titleName: pax.titleName,
          firstName: pax.firstName,
          lastName: pax.lastName,
          birthday: pax.birthday
        }))
      }

      if (req) {
        console.log('🚀 ~ accept: ~ req:', req)

        reservationStore.holdBooking(req) // Gọi API
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
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Bạn đã từ chối',
        life: 3000
      })
    }
  })
}

const holdBooking = handleSubmit((values) => {
  console.log(1)
  confirm.require({
    message: 'Bạn có chắc chắn muốn tiếp tục không?',
    header: 'Xác nhận',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: { label: 'Hủy bỏ', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Save' },
    accept: async () => {
      toast.add({
        severity: 'info',
        summary: 'Đang cập nhật',
        detail: 'Đang tiến hành cập nhật sân bay...',
        life: 3000
      })

      const req = {
        bookingCode: genBookingCode(),
        createdAt: new Date().getTime(),
        flight: {
          img: information.value?.img,
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
          fareOptions: [
            {
              class: price.value[0]?.class,
              price: price.value[0]?.total
            }
          ]
        },
        contact: {
          email: values.email,
          phone: values.phone
        },
        paxLists: values.paxLists.map((pax) => ({
          titleName: pax.titleName,
          firstName: pax.firstName,
          lastName: pax.lastName,
          birthday: pax.birthday
        }))
      }

      if (req) {
        reservationStore.holdBooking(req) // Gọi API
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
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Bạn đã từ chối',
        life: 3000
      })
    }
  })
})

// Hàm để quay lại trang booking
const backBooking = () => {
  router.push({ path: '/booking' })
}

// Hàm lấy tên sân bay từ code
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return airport ? airport.name : code
}

//
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
