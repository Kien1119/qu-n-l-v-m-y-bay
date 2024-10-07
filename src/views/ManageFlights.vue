<template>
  <div class="Manages">
    <div class="mt-5">
      <Toolbar class="mb-6">
        <template #start>
          {{ flightsAddDialog }}
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
            {{ getAirportName(slotProps.data.departure.time) }} -
            {{ getAirportName(slotProps.data.arrival.time) }}
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
        <div class="flex flex-col gap-6">
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
              <label for="aircraft" class="block font-bold mb-3">Điểm đi</label>
              <Select
                v-model="flights.departure.airport"
                :options="planeStore.airports"
                optionLabel="airportCode"
                placeholder="Select an Airport"
                class="w-full md:w-56"
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
                    <div>{{ getAirportName(slotProps.option.name) }}</div>
                  </div>
                </template>
              </Select>
            </div>

            <div class="">
              <div class="">
                <label for="aircraft" class="block font-bold mb-3">Điểm đến</label>
                <Select
                  v-model="flights.arrival.airport"
                  :options="planeStore.airports"
                  optionLabel="airportCode"
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
                      <div>{{ getAirportName(slotProps.option.name) }}</div>
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
        <div class="flex flex-col gap-6">
          <div>
            <label for="airline" class="block font-bold mb-3">Hãng Bay</label>
            <InputText
              id="airline"
              v-model.trim="airline"
              v-bind="airlineAttr"
              required="true"
              autofocus
              fluid
            />
          </div>
          <div>
            <label for="flightNumber" class="block font-bold mb-3">Số hiệu chuyến bay</label>
            <InputText
              id="flightNumber"
              v-model.trim="flightNumber"
              required="true"
              v-bind="flightNumberAttr"
              autofocus
              fluid
            />
          </div>
          <div>
            <label for="aircraft" class="block font-bold mb-3">Phi cơ</label>
            <InputText
              id="aircraft"
              v-model.trim="aircraft"
              v-bind="aircraftAttr"
              required="true"
              autofocus
              fluid
            />
          </div>
          <div class="flex justify-between gap-3">
            <div class="">
              <label for="airport" class="block font-bold mb-3">Điểm đi</label>
              <Select
                v-model="flights.departure.airport"
                :options="planeStore.airports"
                optionLabel="airportCode"
                placeholder="Select an Airport"
                class="w-full md:w-56"
              >
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ getAirportName(slotProps.option.name) }}</div>
                  </div>
                </template>
              </Select>
            </div>

            <div class="">
              <div class="">
                <label for="aircraft" class="block font-bold mb-3">Điểm đến</label>
                <Select
                  v-model="flights.arrival.airport"
                  :options="planeStore.airports"
                  optionLabel="airportCode"
                  placeholder="Select a Country"
                >
                  <template #option="slotProps">
                    <div class="flex items-center">
                      <div>{{ getAirportName(slotProps.option.name) }}</div>
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

const flightsEditDialog = ref(false)
const loading = ref(false)
const planeStore = usePlaneStore()
const confirm = useConfirm()
const toast = useToast()
const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return airport ? airport.name : code // Return the code if no name is found
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
  // flightNumber: '567',
  // aircraft: 'Airbus A321',
  // fareOptions: [
  //   {
  //     class: 'Economy',
  //     price: 1200000
  //   },
  //   {
  //     class: 'Business',
  //     price: 3500000
  //   }
  // ],
  // contact: {
  //   email: 'example2@gmail.com',
  //   phone: '0987654321'
  // },
  // paxLists: [
  //   {
  //     title: 'MR',
  //     lastName: 'LE',
  //     firstName: 'ANH TUAN',
  //     birthday: '1995-08-30T00:00:00.000Z'
  //   }
  // ]
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

onMounted(() => {
  onPage(1, 10)
  if (planeStore.airports?.length == 0) {
    planeStore.fetchAirports()
  }
})
</script>
<style lang="css" scoped></style>
