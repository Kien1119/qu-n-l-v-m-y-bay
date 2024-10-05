<template>
  <div
    class="h-full bg-cover bg-center flex items-center justify-center"
    style="background-image: url(https://dev.airdata.site/img/background-image2.15114820.svg)"
  >
    <div
      class="backdrop-blur-md flex p-3 flex-col bg-white/50 h-1/2 rounded-2xl mx-20 my-20 border !border-gray-500 gap-7"
    >
      <div>
        <div class="card flex justify-between">
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
              <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza" :value="1" />
              <label for="ingredient1" class="ml-2">Một chiều</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                disabled
                v-model="ingredient"
                inputId="ingredient3"
                name="pizza"
                :value="2"
              />
              <label for="ingredient3" class="ml-2">Khứ hồi</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                disabled
                v-model="ingredient"
                inputId="ingredient4"
                name="pizza"
                :value="3"
              />
              <label for="ingredient4" class="ml-2">Nhiều chặng</label>
            </div>
          </div>
          <Button
            class="!bg-white/50 !border-0 !text-black hover:!bg-black/50"
            icon="pi pi-refresh"
          ></Button>
        </div>
      </div>
      <div class="flex h-1/3 justify-center">
        <AddressPage></AddressPage>
        <div class="mx-3 my-3 flex items-center">
          <Button
            type="button"
            class="!bg-orange-400 hover:shadow-xl !hover:bg-black"
            icon="pi pi-arrow-right-arrow-left"
          />
        </div>
        <AddressPage></AddressPage>
      </div>
      <div class="flex justify-around gap-3">
        <div class="flex gap-3">
          <img src="https://dev.airdata.site/img/airplane-up.50b67a05.svg" width="24px" alt="" />
          <DatePicker
            :showIcon="true"
            :showButtonBar="true"
            v-model="calendarValue"
            iconDisplay="input"
          ></DatePicker>
        </div>
        <div class="border-r-2"></div>
        <div class="flex gap-3 items-center">
          <img src="https://dev.airdata.site/img/plane-ticket.c034a5ca.svg" width="24px" alt="" />
          <MultiSelect
            v-model="multiselectValue"
            :options="multiselectValues"
            optionLabel="name"
            placeholder="Chọn hệ thống đặt vé"
            :filter="true"
          >
            <template #value="slotProps">
              <div
                class="inline-flex items-center py-1 px-2 bg-primary text-primary-contrast rounded-border mr-2"
                v-for="option of slotProps.value"
                :key="option.code"
              >
                <span
                  :class="'mr-2 flag flag-' + option.code.toLowerCase()"
                  style="width: 18px; height: 12px"
                />
                <div>{{ option.name }}</div>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                <div class="p-1">Chọn hệ thống đặt vé</div>
              </template>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <span
                  :class="'mr-2 flag flag-' + slotProps.option.code.toLowerCase()"
                  style="width: 18px; height: 12px"
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </MultiSelect>
        </div>
        <div class="border-l-2"></div>
        <div class="flex items-center gap-3">
          <img src="https://dev.airdata.site/img/users.1985e36a.svg" width="24px" alt="" />
          <div class="flex-1">
            <div class="flex gap-3 items-center">
              <div class="">
                <span class="font-medium">Hành khách</span>
              </div>
              <div class="grow">
                <InputGroup>
                  <Button icon="pi pi-plus" severity="success" />
                  <InputNumber placeholder="0" />
                  <Button icon="pi pi-minus" severity="danger" />
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center items-center justify-center">
        <Button class="!rounded-3xl" icon="pi pi-search" label="Tìm kiếm chuyến bay"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddressPage from '@/component/AddressPage.vue'
import { ref } from 'vue'

const ingredient = ref(1)
const calendarValue = ref()
const multiselectValue = ref()
const multiselectValues = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' }
])

// const search = (event) => {
//   let query = event.query
//   let newFilteredCities = []

//   for (let country of groupedCities.value) {
//     let filteredItems = FilterService.filter(
//       country.items,
//       ['label'],
//       query,
//       FilterMatchMode.CONTAINS
//     )
//     if (filteredItems && filteredItems.length) {
//       newFilteredCities.push({ ...country, ...{ items: filteredItems } })
//     }
//   }

//   filteredCities.value = newFilteredCities
// }
</script>
