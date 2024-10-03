<template>
  <div>
    <div>
      <p>sssssssss</p>
      <!-- <Listbox v-model="selectedCity" :options="cities" optionLabel="name" class="w-full md:w-56" /> -->
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const selectedCity = ref()
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])
</script>
<style lang="css" scoped></style>
