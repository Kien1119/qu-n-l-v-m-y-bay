<template>
  <div class="Manages">
    <div class="mt-5">
      <Toolbar class="mb-6">
        <template #start>
          <Button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" />
          <Button label="Delete" icon="pi pi-trash" severity="secondary" />
        </template>

        <template #end>
          <Button label="Export" icon="pi pi-upload" severity="secondary" />
        </template>
      </Toolbar>
      <pre>
        <!-- {{ planeStore.airports }} -->
      </pre>

      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink
      :rows="planeStore.params._per_page" :totalRecords="planeStore.total" CurrentPageReport
      RowsPerPageDropdown" paginator
      <DataTable
        :value="planeStore.airports"
        :loading="loading"
        lazy
        :rowsPerPageOptions="[5, 10, 36]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
        selectionMode="single"
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
      </DataTable>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { usePlaneStore } from '@/stores/airports'

const planeStore = usePlaneStore()
const loading = ref(false)
const startIndex = computed(() => {
  return planeStore.params._page * planeStore.params._per_page - planeStore.params._per_page
  //return lazyParams.page * lazyParams.rows - lazyParams.rows;
})

console.log('🚀 ~ planeStore:', planeStore)
const onPage = (event) => {
  startIndex.value = event.first
  planeStore.params._page = event.page + 1
  planeStore.params._per_page = event.rows
  planeStore.fetchAirports({})
}

const onSort = (event) => {
  console.log('🚀 ~ onSort ~ event:', event)
  planeStore.params._field = event.sortField
  planeStore.fetchAirports({})
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

// Lấy dữ liệu khi thành phần được gắn
onMounted(() => {
  onPage({})
})
</script>
<style scoped></style>
