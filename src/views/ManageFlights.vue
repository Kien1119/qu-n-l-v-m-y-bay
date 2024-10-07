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
            @click="airportAddDialog = true"
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
        <Column class="text-orange-600" field="stt" header="STT" sortable style="width: 10rem">
          <template #body="{ index }">
            {{ startIndex + index + 1 }}
          </template>
        </Column>
        <Column class="" field="airline" header="Hãng" sortable style="min-width: 12rem" />
        <Column class="" field="flightNumber" header="Số hiệu" sortable style="min-width: 12rem" />
        <Column class="" field="aircraft" header="Loại máy bay" sortable style="min-width: 12rem" />

        <Column header="Điểm đi - Điểm đến" sortable style="min-width: 16rem">
          <template #body="slotProps">
            {{ slotProps.data.departure.airport }} - {{ slotProps.data.arrival.airport }}
          </template>
        </Column>
        <Column
          header="Thời gian khởi hành - Thời gian đến"
          sortable
          class="flex items-center justify-center"
          style="min-width: 20rem"
        >
          <template #body="slotProps">
            {{ slotProps.data.departure.time }} - {{ slotProps.data.arrival.time }}
          </template>
        </Column>
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
    </div>
  </div>
</template>
<script setup lang="js">
import { usePlaneStore } from '@/stores/airports'
import { computed, onMounted, ref } from 'vue'
const loading = ref(false)
const planeStore = usePlaneStore()

const onPage = async (event) => {
  loading.value = true
  planeStore.params._page = event.page + 1 || event
  await planeStore.fetchFlights()
  loading.value = false
}
const startIndex = computed(() => {
  return planeStore.params._page * planeStore.params._per_page - planeStore.params._per_page
})
onMounted(() => {
  onPage(1, 10)
})
</script>
<style lang="css" scoped></style>
