<template>
  <div class="flex-1 flex-col rounded-lg bg-white px-3 py-3 justify-center flex">
    <div class="ml-4 text-base font-serif text-black">Khởi hành</div>
    <div class="flex flex-col justify-content-start text-title gap-1.5 px-2 py-1">
      <div class="flex flex-col gap-2">
        <div class="text-slate-950 text-xl mb-0 font-medium-4 Class Properties">
          <Select
            class="!border-0"
            :model-value="airports"
            :options="planeStore.airports"
            placeholder="Chọn chuyến bay"
            @update:modelValue="onChangeAirports"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center !text-orange-400">
                <div>{{ getAirportName(slotProps.value.airportCode) }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <span class="text-xl ml-50"
                  >{{ slotProps.option.name }} ({{ slotProps.option.airportCode }} ,VN)</span
                >
              </div>
            </template>
          </Select>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-slate-950 font-bold font-serif">{{ props.airports.city }}</span>
          <span class="text-gray-500">{{ props.airports.country }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { usePlaneStore } from '@/stores/airports'
import { onMounted } from 'vue'
const props = defineProps({
  airports: {
    type: Object
  }
})
const emit = defineEmits(['update:airports'])
console.log({ props }, 1)
const planeStore = usePlaneStore()

const getAirportName = (code) => {
  const airport = planeStore.airports.find((airport) => airport.airportCode === code)
  return `${airport ? airport.name : code} (${code})` // Return the code if no name is found
}
onMounted(() => {
  planeStore.fetchAirports()
})

function onChangeAirports(val) {
  console.log({ val })
  emit('update:airports', val)
}
</script>
<style scoped></style>
