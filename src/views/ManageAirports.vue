<template>
  <div class="Manages">
    <div class="mt-5">
      <Toolbar class="mb-6">
        <template #start>
          <Button
            label="Thêm"
            icon="pi pi-plus"
            severity="secondary"
            class="mr-2"
            @click="airportAddDialog = true"
          />
          <Button disabled label="Xóa" icon="pi pi-trash" severity="secondary" />
        </template>

        <template #end>
          <Button disabled label="Export" icon="pi pi-upload" severity="secondary" />
        </template>
      </Toolbar>

      <DataTable
        :paginator="true"
        :loading="loading"
        :rows="planeStore.params._per_page"
        lazy
        v-model="selectionAirports"
        :totalRecords="planeStore.total"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 36]"
        currentPageReportTemplate="Hiển thị {first} đến {last} trong số {totalRecords} sân bay"
        selectionMode="single"
        :value="planeStore.airports"
        tableStyle="min-width: 50rem"
        @page="onPage"
        @sort="onSort"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h1 class="m-0 font-mono font-medium text-4xl text-orange-600">Danh sách sân bay</h1>
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

        <template #empty> No airports found. </template>
        <template #loading> Loading airports data. Please wait. </template>
        <Column class="text-orange-600" field="stt" header="STT" style="width: 10rem">
          <template #body="{ index }">
            {{ startIndex + index + 1 }}
          </template>
        </Column>

        <Column class="" field="name" header="Tên sân bay" sortable style="min-width: 16rem" />
        <Column
          class=""
          field="airportCode"
          header="Mã sân bay"
          sortable
          style="min-width: 12rem"
        />
        <Column class="" field="city" header="Thành phố" sortable style="min-width: 16rem" />
        <Column class="" field="country" header="Đất nước" sortable style="min-width: 16rem" />
        <Column class="" :exportable="false" style="min-width: 12rem">
          <template #body="{ data }">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2 !bg-green-100"
              @click="editAirPort(data)"
            />
            <Button
              class="!bg-red-100"
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteAirport(data.id)"
            />
          </template>
        </Column>
      </DataTable>
      <Dialog
        v-model:visible="airportDialog"
        :style="{ width: '450px' }"
        header="Airport Details"
        :modal="true"
      >
        <div class="flex flex-col gap-6">
          <div>
            <label for="name" class="block font-bold mb-3">Tên sân bay</label>
            <InputText id="name" v-model.trim="airport.name" required="true" autofocus fluid />
          </div>
          <div>
            <label for="airportCode" class="block font-bold mb-3">Mã sân bay</label>
            <InputText
              id="airportCode"
              v-model.trim="airport.airportCode"
              required="true"
              autofocus
              fluid
            />
          </div>
          <div>
            <label for="city" class="block font-bold mb-3">Thành phố</label>
            <InputText id="city" v-model.trim="airport.city" required="true" autofocus fluid />
          </div>
          <div>
            <label for="country" class="block font-bold mb-3">Đất nước</label>
            <InputText
              id="country"
              v-model.trim="airport.country"
              required="true"
              autofocus
              fluid
            />
          </div>
        </div>

        <template #footer>
          <Button label="Save" icon="pi pi-check" @click="handleUpdateAirport" />
        </template>
      </Dialog>
      <Dialog
        v-model:visible="airportAddDialog"
        :style="{ width: '450px' }"
        header="Airport Details"
        :modal="true"
      >
        <div class="flex flex-col gap-6">
          <div>
            <label for="name" class="block font-bold mb-3">Tên sân bay</label>
            <InputText
              v-bind="nameAttrs"
              id="name"
              v-model.trim="name"
              required="true"
              autofocus
              fluid
            />
          </div>
          <span style="color: #d81221">{{ errors.name }}</span>

          <div>
            <label for="airportCode" class="block font-bold mb-3">Mã sân bay</label>
            <InputText
              id="airportCode"
              v-bind="airportCodeAttrs"
              v-model.trim="airportCode"
              required="true"
              autofocus
              fluid
            />
          </div>
          <span style="color: #d81221">{{ errors.airportCode }}</span>

          <div>
            <label for="city" class="block font-bold mb-3">Thành phố</label>
            <InputText
              id="city"
              v-bind="cityAttrs"
              v-model.trim="city"
              required="true"
              autofocus
              fluid
            />
          </div>
          <span style="color: #d81221">{{ errors.city }}</span>

          <div>
            <label for="country" class="block font-bold mb-3">Đất nước</label>
            <InputText
              v-bind="countryAttrs"
              id="country"
              v-model.trim="country"
              required="true"
              autofocus
              fluid
            />
          </div>
          <span style="color: #d81221">{{ errors.country }}</span>
        </div>

        <template #footer>
          <Button label="Save" icon="pi pi-check" @click="handleAddAirport" />
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
const confirm = useConfirm()
const toast = useToast()
const planeStore = usePlaneStore()
const loading = ref(false)
const startIndex = computed(() => {
  return planeStore.params._page * planeStore.params._per_page - planeStore.params._per_page
})
const selectionAirports = ref()
const onPage = async (event) => {
  loading.value = true
  planeStore.params._page = event.page + 1 || event
  await planeStore.fetchAirports()
  loading.value = false
}

const onSort = async (event) => {
  // Gọi hàm sortAirport để lấy dữ liệu đã sắp xếp từ API
  // await planeStore.sortAirport(sortField, sortOrder)
  const sortField = event.sortField // Lấy trường c
  const sortOrder = event.sortOrder === 1 ? '-' : '' // Đặt thứ tự sắp xếp (asc hoặc desc)
  planeStore.params._sort = sortOrder + sortField
  // Gọi hàm sortAirport để lấy dữ liệu đã sắp xếp từ API
  loading.value = true
  await planeStore.fetchAirports()
  loading.value = false
}
const resetFilters = () => {
  searchQueryAirport.value = ''
  planeStore.fetchAirports() // Re-fetch or reset the airports list
}
const searchQueryAirport = ref('')
const handleSearch = () => {
  const [name, airportCode] = searchQueryAirport.value.split(',').map((str) => str.trim())
  planeStore.searchAirport({ name, airportCode })
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

watch(searchQueryAirport, debouncedSearch)
const confirmDeleteAirport = (id) => {
  confirm.require({
    message: 'Bạn có muốn xóa sân bay này không??',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Hủy bỏ',
    acceptLabel: 'Xóa bỏ',
    accept: () => {
      planeStore.deleteAirport(id)
      toast.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Xóa sân bay thành công',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Hủy bỏ',
        detail: 'Đã hủy bỏ xóa sân bay',
        life: 3000
      })
    }
  })
}

const airportDialog = ref(false)
const airport = ref({})

const editAirPort = (air) => {
  airportDialog.value = true
  airport.value = { ...air }
}

const handleUpdateAirport = async () => {
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
        // Gọi API cập nhật sân bay với ID và dữ liệu đã chỉnh sửa
        await planeStore.updateAirport(airport.value.id, airport.value)

        // Đóng dialog sau khi cập nhật thành công
        airportDialog.value = false

        // Tải lại danh sách sân bay
        await planeStore.fetchAirports()

        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Sân bay đã được cập nhật!',
          life: 3000
        })
      } catch (error) {
        console.error('Lỗi khi cập nhật sân bay:', error)
        toast.add({
          severity: 'error',
          summary: 'Lỗi',
          detail: 'Cập nhật sân bay thất bại.',
          life: 3000
        })
      } finally {
        loading.value = false
      }
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Đã hủy',
        detail: 'Bạn đã từ chối cập nhật.',
        life: 3000
      })
    }
  })
}
const airportAddDialog = ref(false)
const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Tên là bắt buộc'),
    airportCode: yup
      .string()
      .required('Mã sân bay là bắt buộc')
      .matches(/^[A-Z]{3}$/, 'Mã sân bay phải có chính xác 3 chữ in hoa'),
    city: yup.string().required(),
    country: yup.string().required()
  })
})

const handleAddAirport = handleSubmit((values) => {
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
        name: values.name,
        airportCode: values.airportCode,
        city: values.city,
        country: values.country
      }

      if (req) {
        try {
          await planeStore.addAirport(req)

          airportAddDialog.value = true
        } catch (error) {
          console.error('lỗi data', { error })
        } finally {
          loading.value = false // Set loading to false
        }
        airportAddDialog.value = false
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
      airportAddDialog.value = true
    }
  })
})

const [name, nameAttrs] = defineField('name')
const [airportCode, airportCodeAttrs] = defineField('airportCode')
const [city, cityAttrs] = defineField('city')
const [country, countryAttrs] = defineField('country')

onMounted(() => {
  onPage(1, 10)
})
</script>

<style scoped></style>
