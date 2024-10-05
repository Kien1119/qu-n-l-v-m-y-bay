<template>
  <div class="Manages">
    <div class="mt-5">
      <Toolbar class="mb-6">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" />
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
        v-model:selection="selectionAirports"
        :totalRecords="planeStore.total"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 36]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} airports"
        selectionMode="single"
        :value="planeStore.airports"
        tableStyle="min-width: 50rem"
        @page="onPage"
        @sort="onSort"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0">Manage Airports</h4>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText placeholder="Search..." />
            </IconField>
          </div>
        </template>

        <template #empty> No airports found. </template>
        <template #loading> Loading airports data. Please wait. </template>
        <Column field="stt" header="STT" sortable style="width: 10rem">
          <template #body="{ index }">
            {{ startIndex + index + 1 }}
          </template>
        </Column>

        <Column field="name" header="Name" sortable style="min-width: 16rem" />
        <Column field="airportCode" header="Airport Code" sortable style="min-width: 12rem" />
        <Column field="city" header="City" sortable style="min-width: 16rem" />
        <Column field="country" header="Country" sortable style="min-width: 16rem" />
        <Column :exportable="false" style="min-width: 12rem">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(data)" />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteAirport(data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const confirm = useConfirm()
const toast = useToast()
const planeStore = usePlaneStore()
const loading = ref(false)
const startIndex = computed(() => {
  return planeStore.params._page * planeStore.params._per_page - planeStore.params._per_page
})
const onPage = (event) => {
  console.log('🚀 ~ onPage ~ event:', event)
  // startIndex.value = event.first
  // planeStore.params._page = event?.page || 0 + 1
  planeStore.params._page = event.page + 1 || event
  // planeStore.params._per_page = event.rows
  planeStore.fetchAirports()
}

const onSort = (event) => {
  planeStore.params._field = event.sortField
  planeStore.fetchAirports()
}

// Theo dõi sự thay đổi trong airports
watch(
  () => planeStore.airports,
  (newValue) => {
    console.log(newValue)
  },
  {
    deep: true
  }
)

const confirmDeleteAirport = (id) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    acceptLabel: 'Delete',
    accept: () => {
      planeStore.deleteAirport(id)
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Record deleted',
        life: 3000
      })
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'Deletion canceled',
        life: 3000
      })
    }
  })
}
// Lấy dữ liệu khi thành phần được gắn
onMounted(() => {
  onPage(1, 10)
})
</script>
<style scoped></style>
