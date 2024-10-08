<template>
  <div class="Manages">
    <div class="mt-5">
      <Toolbar class="mb-6">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            severity="secondary"
            class="mr-2"
            @click="flightsAddDialog = true"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="secondary"
            @click="confirmDeleteSelected"
            :disabled="!selectionAirports || !selectionAirports.length"
          />
        </template>

        <template #end>
          <Button label="Export" icon="pi pi-upload" severity="secondary" />
        </template>
      </Toolbar>

      <DataTable
        :paginator="true"
        :loading="loading"
        :rows="planeStore.params._per_page"
        lazy
        v-model:selection="selectionFlights"
        :totalRecords="planeStore.total"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 36]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} flights"
        selectionMode="single"
        :value="planeStore.flights"
        tableStyle="min-width: 50rem"
        @page="onPage"
        @sort="onSort"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h1 class="m-0 font-serif font-medium text-4xl text-orange-600">Manage Flights</h1>
            <InputGroup>
              <Button @click="handleSearch" icon="pi pi-search" severity="search" />
              <InputText
                v-model="searchQueryAirport"
                placeholder="Search..."
                @keyup.enter="debouncedSearch()"
              />
              <Button icon="pi pi-times" severity="danger" @click="resetFilters" />
            </InputGroup>
          </div>
        </template>

        <template #empty> No flights found. </template>
        <template #loading> Loading airports data. Please wait. </template>
        <Column class="text-orange-600" field="stt" header="STT" style="width: 10rem">
          <template #body="{ index }">
            {{ startIndex + index + 1 }}
          </template>
        </Column>
        <Column class="" field="airline" header="Hãng" style="min-width: 12rem" />
        <Column class="" field="flightNumber" header="Số hiệu" style="min-width: 12rem" />
        <Column class="" field="aircraft" header="Loại máy bay" style="min-width: 12rem" />

        <Column header="Điểm đi - Điểm đến" style="min-width: 16rem">
          <template #body="slotProps">
            {{ getAirportName(slotProps.data.departure.airport) }} -
            {{ getAirportName(slotProps.data.arrival.airport) }}
          </template>
        </Column>
        <Column
          header="Thời gian khởi hành - Thời gian đến"
          sortable
          class="flex items-center justify-center"
          style="min-width: 20rem"
        >
          <template #body="slotProps">
            {{ formatDate(slotProps.data.departure.time) }} -
            {{ formatDate(slotProps.data.arrival.time) }}
          </template>
        </Column>
        <Column class="" :exportable="false" style="min-width: 12rem">
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2 !bg-green-100"
              @click="editFlights(data)"
            />
            <Button
              class="!bg-red-100"
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteFlights(data.id)"
            />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="flightsEditDialog"
        :style="{ width: '550px' }"
        header="Flights Details"
        :modal="true"
      >
        <div class="flex flex-col gap-3 gap-6">
          <div>
            <label for="airline" class="block font-bold mb-3">Hãng Bay</label>
            <InputText
              id="airline"
              v-model.trim="flights.airline"
              required="true"
              autofocus
              fluid
            />
          </div>
          <div>
            <label for="flightNumber" class="block font-bold mb-3">Số hiệu chuyến bay</label>
            <InputText
              id="flightNumber"
              v-model.trim="flights.flightNumber"
              required="true"
              autofocus
              fluid
            />
          </div>
          <div>
            <label for="aircraft" class="block font-bold mb-3">Phi cơ</label>
            <InputText
              id="aircraft"
              v-model.trim="flights.aircraft"
              required="true"
              autofocus
              fluid
            />
          </div>
          <div class="flex justify-between gap-3">
            <div class="">
              <div class="">
                <label for="aircraft" class="block font-bold mb-3">Điểm đi</label>
                <Select
                  v-model="flights.departure.airport"
                  :options="planeStore.airports"
                  option-value="airportCode"
                  placeholder="Select a flights"
                >
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex items-center">
                      <div>{{ getAirportName(slotProps.value) }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <div>{{ slotProps.option.name }} ({{ slotProps.option.airportCode }})</div>
                    </div>
                  </template>
                </Select>
              </div>
            </div>

            <div class="">
              <div class="">
                <label for="aircraft" class="block font-bold mb-3">Điểm đến</label>
                <Select
                  v-model="flights.arrival.airport"
                  :options="planeStore.airports"
                  option-value="airportCode"
                  placeholder="Select a Country"
                >
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex items-center">
                      <div>{{ getAirportName(slotProps.value) }}</div>
                    </div>
                    <span v-else>
                      {{ slotProps.placeholder }}
                    </span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <div>{{ slotProps.option.name }} ({{ slotProps.option.airportCode }})</div>
                    </div>
                  </template>
                </Select>
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <div class="flex-auto">
                <label for="aircraft" class="block font-bold mb-3">Thời Gian đi</label>
                <DatePicker
                  id="datepicker-24h"
                  v-model="flights.departure.time"
                  showTime
                  hourFormat="24"
                  fluid
                />
              </div>
            </div>
            <div>
              <div class="flex-auto">
                <label for="aircraft" class="block font-bold mb-3">Thời gian đến</label>
                <DatePicker
                  id="datepicker-24h"
                  v-model="flights.arrival.time"
                  showTime
                  hourFormat="24"
                  fluid
                />
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <Button label="Save" icon="pi pi-check" @click="handleUpdateFlights" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="flightsAddDialog"
        :style="{ width: '550px' }"
        header="Flights New"
        :modal="true"
      >
        <form>
          <div class="flex flex-col gap-3 gap-6">
            <!-- Hãng bay -->
            <div>
              <label for="airline" class="block font-bold mb-3">Hãng Bay</label>
              <InputText
                id="airline"
                v-model.trim="airline"
                :class="{ 'p-invalid': errors.airline }"
                required
                autofocus
                fluid
                v-bind="airlineAttrs"
              />
              <span style="color: #d81221">{{ errors.airline }}</span>
            </div>

            <!-- Số hiệu chuyến bay -->
            <div>
              <label for="flightNumber" class="block font-bold mb-3">Số hiệu chuyến bay</label>
              <InputText
                id="flightNumber"
                v-model.trim="flightNumber"
                :class="{ 'p-invalid': errors.flightNumber }"
                required
                fluid
                v-bind="flightNumberAttrs"
              />
              <span style="color: #d81221">{{ errors.flightNumber }}</span>
            </div>

            <!-- Phi cơ -->
            <div>
              <label for="aircraft" class="block font-bold mb-3">Phi cơ</label>
              <InputText
                id="aircraft"
                v-model.trim="aircraft"
                :class="{ 'p-invalid': errors.aircraft }"
                required
                fluid
                v-bind="aircraftAttrs"
              />
              <span style="color: #d81221">{{ errors.aircraft }}</span>
            </div>

            <!-- Điểm đi và Điểm đến -->
            <div class="flex justify-between gap-3">
              <div class="flex flex-col gap-3">
                <label for="departureAirport" class="block font-bold mb-3">Điểm đi</label>
                <Select
                  id="departureAirport"
                  v-model="departureAirport"
                  :options="planeStore.airports"
                  option-value="airportCode"
                  placeholder="chọn chuyến bay đi"
                  :class="{ 'p-invalid': errors['departure.airport'] }"
                  v-bind="departureAirportAttrs"
                >
                  <template #value="slotProps">
                    <span v-if="slotProps.value">{{ getAirportName(slotProps.value) }}</span>
                    <span v-else>{{ slotProps.placeholder }}</span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <div>{{ slotProps.option.name }} ({{ slotProps.option.airportCode }})</div>
                    </div>
                  </template>
                </Select>
                <span style="color: #d81221">{{ errors['departure.airport'] }}</span>
              </div>

              <div class="flex flex-col gap-3">
                <label for="arrivalAirport" class="block font-bold mb-3">Điểm đến</label>
                <Select
                  id="arrivalAirport"
                  v-model="arrivalAirport"
                  :options="planeStore.airports"
                  option-value="airportCode"
                  placeholder="chọn chuyến bay đến"
                  :class="{ 'p-invalid': errors['arrival.airport'] }"
                  v-bind="arrivalAirportAttrs"
                >
                  <template #value="slotProps">
                    <span v-if="slotProps.value">{{ getAirportName(slotProps.value) }}</span>
                    <span v-else>{{ slotProps.placeholder }}</span>
                  </template>
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <div>{{ slotProps.option.name }} ({{ slotProps.option.airportCode }})</div>
                    </div>
                  </template>
                </Select>
                <span style="color: #d81221">{{ errors['arrival.airport'] }}</span>
              </div>
            </div>

            <!-- Thời gian đi và Thời gian đến -->
            <div class="flex justify-between">
              <div class="flex flex-col gap-3">
                <label for="departureTime" class="block font-bold mb-3">Thời Gian đi</label>
                <DatePicker
                  id="departureTime"
                  v-model="departureTime"
                  showTime
                  hourFormat="24"
                  :class="{ 'p-invalid': errors['departure.time'] }"
                  v-bind="departureTimeAttrs"
                />
                <span style="color: #d81221">{{ errors['departure.time'] }}</span>
              </div>

              <div class="flex flex-col gap-3">
                <label for="arrivalTime" class="block font-bold mb-3">Thời gian đến</label>
                <DatePicker
                  id="arrivalTime"
                  v-model="arrivalTime"
                  showTime
                  hourFormat="24"
                  :class="{ 'p-invalid': errors['arrival.time'] }"
                  v-bind="arrivalTimeAttrs"
                />
                <span style="color: #d81221">{{ errors['arrival.time'] }}</span>
              </div>
            </div>
          </div>
        </form>

        <template #footer>
          <Button label="Save" icon="pi pi-check" @click="handleAddFlights" />
        </template>
      </Dialog>
    </div>
  </div>
</template>
<script setup lang="js">
import { usePlaneStore } from '@/stores/airports'
import { computed, onMounted, ref } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: yup.object({
    airline: yup
      .string()
      .required('Hãng bay là bắt buộc')
      .oneOf(['VN', 'VJ', 'VU', 'QH'], 'Hãng bay không hợp lệ'),
    flightNumber: yup.string().required('Số hiệu chuyến bay là bắt buộc'),
    aircraft: yup.string().required('Phi cơ là bắt buộc'),

    departure: yup.object({
      airport: yup
        .string()
        .required('Điểm đi là bắt buộc')
        .matches(/^[A-Z]{3}$/, 'Mã sân bay phải có chính xác 3 chữ in hoa'),
      time: yup.string().required('Thời gian bắt buộc')
    }),

    arrival: yup.object({
      airport: yup
        .string()
        .required('Điểm đến là bắt buộc')
        .matches(/^[A-Z]{3}$/, 'Mã sân bay phải có chính xác 3 chữ in hoa'),
      time: yup.string().required('Thời gian bắt buộc')
    })
  })
})

const [airline, airlineAttrs] = defineField('airline')
const [flightNumber, flightNumberAttrs] = defineField('flightNumber')
const [aircraft, aircraftAttrs] = defineField('aircraft')
const [departureAirport, departureAirportAttrs] = defineField('departureAirport')
const [arrivalAirport, arrivalAirportAttrs] = defineField('arrivalAirport')
const [departureTime, departureTimeAttrs] = defineField('departureTime')
const [arrivalTime, arrivalTimeAttrs] = defineField('arrivalTime')

const handleAddFlights = handleSubmit((values) => {
  console.log(values)
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
      loading.value = true
      toast.add({
        severity: 'thông tin',
        summary: 'Đã xác nhận',
        detail: 'Thêm thành công',
        life: 3000
      })
      const req = {
        airline: values.airline,
        flightNumber: values.flightNumber,
        aircraft: values.aircraft,
        departureAirport: values.departureAirport,
        arrivalAirport: values.arrivalAirport,
        departureTime: values.departureTime,
        arrivalTime: values.arrivalTime
      }

      if (req) {
        try {
          await planeStore.addFlights(req)

          flightsAddDialog.value = true
        } catch (error) {
          console.error('lỗi data', { error })
        } finally {
          loading.value = false // Set loading to false
        }
        flightsAddDialog.value = false
      } else {
        alert('Thêm Thất bại')
      }
    },
    reject: () => {
      toast.add({
        severity: 'Lỗi',
        summary: 'Vật bị loại bỏ',
        detail: 'Bạn đã từ chối',
        life: 3000
      })
      flightsAddDialog.value = true
    }
  })
})
const flightsEditDialog = ref(false)
const loading = ref(false)
const planeStore = usePlaneStore()
const confirm = useConfirm()
const toast = useToast()
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return `${airport ? airport.name : code} (${code})` // Return the code if no name is found
}
const onPage = async (event) => {
  loading.value = true
  planeStore.params._page = event.page + 1 || event
  await planeStore.fetchFlights()
  loading.value = false
}
const startIndex = computed(() => {
  return planeStore.params._page * planeStore.params._per_page - planeStore.params._per_page
})
const confirmDeleteFlights = (id) => {
  confirm.require({
    message: 'Bạn có muốn xóa chuyến bay này không??',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Hủy bỏ',
    acceptLabel: 'Xóa bỏ',
    accept: () => {
      planeStore.deleteFlights(id)
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Xóa chuyến bay thành công',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Hủy bỏ',
        detail: 'Đã hủy bỏ xóa chuyến bay',
        life: 3000
      })
    }
  })
}
const flights = ref({
  airline: '',
  bookingCode: '',
  departure: {
    time: null,
    airport: null
  },
  arrival: {
    time: null,
    airport: null
  }
})
const editFlights = (data) => {
  flightsEditDialog.value = true
  flights.value = { ...data }
}
const handleUpdateFlights = () => {
  confirm.require({
    header: 'Bạn có chắc không?',
    message: 'Vui lòng xác nhận để tiếp tục.',
    accept: async () => {
      toast.add({
        severity: 'info',
        summary: 'Đang cập nhật',
        detail: 'Đang tiến hành cập nhật sân bay...',
        life: 3000
      })
      loading.value = true
      try {
        await planeStore.updateFlights(flights.value.id, flights.value)
        flightsEditDialog.value = false
        await planeStore.fetchFlights()
      } catch (error) {
        console.error('Data loi')
      } finally {
        loading.value = false
      }
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Sân bay đã được cập nhật!',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Hủy bỏ',
        detail: 'Đã hủy bỏ cập nhật chuyến bay',
        life: 3000
      })
      flightsEditDialog.value = false
    }
  })
}
const flightsAddDialog = ref(false)
function formatDate(inputDate) {
  const date = new Date(inputDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${hours}:${minutes} ${day}/${month}/${year}`
}

const formattedDate = formatDate('2024-10-06T19:38:15.812Z')
console.log(formattedDate) // Output: 06/10/
const resetFilters = () => {
  searchQueryAirport.value = ''
  planeStore.fetchAirports() // Re-fetch or reset the airports list
}
const searchQueryAirport = ref('')
const handleSearch = () => {
  const [name, airportCode] = searchQueryAirport.value.split(',').map((str) => str.trim())
  planeStore.searchFlight({ name, airportCode })
}
let timeoutID = null
const debouncedSearch = () => {
  clearTimeout(timeoutID)
  timeoutID = setTimeout(async () => {
    loading.value = true
    planeStore.params._search = searchQueryAirport.value
    await handleSearch()
    loading.value = false
  }, 300)
  const sortField = event.sortField // Lấy trường cần sắp xếp
  const sortOrder = event.sortOrder === 1 ? '' : '-' // Đặt thứ tự sắp xếp (asc hoặc desc)
  planeStore.params._sort = sortOrder + sortField
  // Gọi hàm sortAirport để lấy dữ liệu đã sắp xếp từ API
  planeStore.fetchAirports()
}
onMounted(() => {
  onPage(1, 10)
  if (planeStore.airports?.length == 0) {
    planeStore.fetchAirports()
  }
})
</script>
<style lang="css" scoped></style>
