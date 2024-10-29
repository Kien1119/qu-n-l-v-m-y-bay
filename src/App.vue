<template>
  <div class="bg-gray-100">
    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>

    <component :is="layout">
      <RouterView></RouterView>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DefaultPage from './layouts/DefaultPage.vue'
import NormalPage from './layouts/NormalPage.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const layout = computed(() => {
  return route.meta.layout?.__name === 'NormalPage' ? NormalPage : DefaultPage
})
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik+Wet+Paint&display=swap');
</style>