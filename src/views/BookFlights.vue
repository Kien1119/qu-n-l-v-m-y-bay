<template>
  <div>
    <Flight></Flight>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import Flight from '../component/Flight.vue'
import { usePlaneStore } from '@/stores/airports'
const planeStore = usePlaneStore()
onMounted(() => {
  planeStore.fetchFlights
})
</script>
<style lang="css" scoped></style>
