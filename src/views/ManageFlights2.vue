<template>
  <div class="Manages">
    <div class="mt-5">
      <Toolbar class="mb-6 shadow-md shadow-[#cdcdcd]">
        <template #start>
          <Button label="Thêm" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openAddDialog" />
        </template>
      </Toolbar>

      <!-- Data Table -->
      <DataTable :value="planeStore.flights" :loading="loading" paginator :rows="planeStore.params._per_page" lazy
        v-model:selection="selectionFlights" :totalRecords="planeStore.total" selectionMode="single"
        currentPageReportTemplate="Hiển thị {first} đến {last} trong số {totalRecords} chuyến bay" @page="onPage"
        @sort="onSort" class="shadow-md shadow-[#cdcdcd]" :breakpoints="breakpoints">
        <template #header>
          <h1 class="m-0 font-mono font-medium text-4xl text-orange-600">Danh sách chuyến bay</h1>
        </template>

        <template #empty> Không tìm thấy chuyến bay nào. </template>
        <template #loading> Đang tải dữ liệu. </template>

        <Column field="stt" header="STT" :sortable="true" style="width: 10rem">
          <template #body="{ index }">
            {{ startIndex + index + 1 }}
          </template>
        </Column>
        <Column field="airline" header="Hãng" style="min-width: 7rem" />
        <Column field="flightNumber" header="Số hiệu" style="min-width: 5rem" />
        <Column field="aircraft" header="Loại máy bay" style="min-width: 7rem" />

        <Column header="Điểm đi - Điểm đến" style="min-width: 14rem">
          <template #body="slotProps">
            {{ getAirportName(slotProps.data?.departure?.airport) }} -
            {{ getAirportName(slotProps.data?.arrival?.airport) }}
          </template>
        </Column>
        <Column header="Thời gian khởi hành - Thời gian đến" class="flex items-center justify-center"
          style="min-width: 9rem">
          <template #body="slotProps">
            {{ formatDate(slotProps.data?.departure?.time) }} -
            {{ formatDate(slotProps.data?.arrival?.time) }}
          </template>
        </Column>
        <Column header="Hạng vé">
          <template #body="slotProps">
            <div v-for="(priceFlight, index) in slotProps.data.fareOptions" :key="index">
              {{ priceFlight.class }}
            </div>
          </template>
        </Column>
        <Column header="Giá vé">
          <template #body="slotProps">
            <div v-for="(priceFlight, index) in slotProps.data.fareOptions" :key="index" class="text-red-500">
              {{ formatPrice(priceFlight.price) }}
            </div>
          </template>
        </Column>
        <Column header="Thao tác" style="min-width: 12rem">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2 !bg-green-100" @click="openEditDialog(data)" />
            <Button icon="pi pi-trash" outlined rounded class="!bg-red-100" severity="danger"
              @click="confirmDelete(data.id)" />
          </template>
        </Column>
      </DataTable>

      <!-- Dialog for Add/Edit -->
      <Dialog v-model:visible="flightDialog" :style="{ width: '50rem' }" :header="dialogHeader" :modal="true">
        <Form :initial-values="initialValues" :validation-schema="schema" @submit="handleSave">
          <div class="flex flex-col gap-6">
            <Field name="airline" v-slot="{ field }">
              <label for="airline" class="block font-bold">Hãng bay<span class="text-red-500">(*)</span></label>
              <Select @update:model-value="(event) => {
                field.onInput(event)
              }" v-model="field.value" :options="selectValues" option-value="code" option-label="name"
                placeholder="Chọn hãng bay" />
              <ErrorMessage name="airline" class="text-red-600" />
            </Field>

            <Field name="flightNumber" v-slot="{ field }">
              <label class="block font-bold mb-2">Số hiệu chuyến bay<span class="text-red-500">(*)</span></label>
              <InputText v-bind="field" placeholder="Số hiệu chuyến bay" />
              <ErrorMessage name="flightNumber" class="text-red-600" />
            </Field>

            <Field name="aircraft" v-slot="{ field }">
              <label class="block font-bold mb-2">Loại máy bay<span class="text-red-500">(*)</span></label>
              <InputText v-bind="field" placeholder="Loại máy bay" />
              <ErrorMessage name="aircraft" class="text-red-600" />
            </Field>

            <Button label="Lưu" type="submit" icon="pi pi-check" class="mt-4" />
          </div>
        </Form>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="js">
import { usePlaneStore } from '@/stores/airports'
import { ref, computed, onMounted } from 'vue'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { formatDate, formatPrice } from '../utils/format'

// Initialize store, refs, and form schema
const planeStore = usePlaneStore()
const confirm = useConfirm()
const toast = useToast()
const loading = ref(false)
const flightDialog = ref(false)
const dialogHeader = ref('Thêm chuyến bay mới')
const selectionFlights = ref(null)
const { values } = useForm();

const breakpoints = { '768px': { display: 'table-row' }, '560px': { display: 'none' } }
const schema = yup.object().shape({
  airline: yup.string().required('Hãng bay là bắt buộc'),
  flightNumber: yup.string().required('Số hiệu chuyến bay là bắt buộc'),
  aircraft: yup.string().required('Loại máy bay là bắt buộc')
})

// Options for airline select
const selectValues = ref([
  { name: 'Vietnam Airlines', code: 'VN' },
  { name: 'Vietjet Air', code: 'VJ' },
  { name: 'Bamboo Airways', code: 'QH' }
])

// Initialize values and methods for handling dialog actions
const initialValues = ref({})
const openAddDialog = () => {
  initialValues.value = { airline: '', flightNumber: '', aircraft: '' }
  dialogHeader.value = 'Thêm chuyến bay mới'
  flightDialog.value = true
}

const openEditDialog = (flightData) => {
  initialValues.value = { ...flightData }
  dialogHeader.value = 'Chỉnh sửa chuyến bay'
  flightDialog.value = true
}

const handleSave = async (values) => {
  console.log('KANE:: ~ handleSave ~ values:', values);
  return
  // try {
  //   loading.value = true
  //   if (dialogHeader.value === 'Thêm chuyến bay mới') {
  //     await planeStore.addFlights(values)
  //     toast.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm chuyến bay thành công' })
  //   } else {
  //     await planeStore.updateFlights(values.id, values)
  //     toast.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật chuyến bay thành công' })
  //   }
  // } catch (error) {
  //   toast.add({ severity: 'error', summary: 'Lỗi', detail: 'Không thể lưu chuyến bay' })
  // } finally {
  //   flightDialog.value = false
  //   loading.value = false
  // }
}

const confirmDelete = (id) => {
  confirm.require({
    message: 'Bạn có muốn xóa chuyến bay này không?',
    header: 'Xác nhận',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await planeStore.deleteFlights(id)
      toast.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa chuyến bay' })
    }
  })
}

const onSort = () => { }

const onPage = async (event) => {
  loading.value = true
  planeStore.params._page = event.page + 1 || event
  await planeStore.fetchFlights()
  loading.value = false
}

const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return `${airport ? airport.name : code} (${code})` // Return the code if no name is found
}

// Fetch flights data on mount
onMounted(async () => {
  loading.value = true
  await planeStore.fetchFlights()
  loading.value = false
})

const startIndex = computed(() => {
  return planeStore.params._page * planeStore.params._per_page - planeStore.params._per_page
})
</script>

<style lang="css" scoped></style>