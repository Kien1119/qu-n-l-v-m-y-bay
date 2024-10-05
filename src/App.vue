<template>
  <div>
    <ConfirmPopup></ConfirmPopup>
    <component :is="layout">
      <RouterView></RouterView>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DefaultPage from './layouts/DefaultPage.vue'
import NormalPage from './layouts/NormalPage.vue'
import ConfirmPopup from 'primevue/confirmpopup';

import { useRoute } from 'vue-router'
const route = useRoute()

const layout = computed(() => {
  console.log(route)
  return route.meta.layout?.__name === 'NormalPage' ? NormalPage : DefaultPage
})
</script>
<style scoped></style>
