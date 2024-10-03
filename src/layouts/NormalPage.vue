<template>
  <div class="flex gap-2.5">
    <Sidebar></Sidebar>
    <div class="flex items-center h-lvh">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import Sidebar from '@/component/Sidebar.vue'
</script>
<style lang="css" scoped></style>
