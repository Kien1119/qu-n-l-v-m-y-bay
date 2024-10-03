<template>
  <div class="flex gap-2.5">
    <Sidebar></Sidebar>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import Sidebar from '@/component/Sidebar.vue'
</script>
<style lang="css" scoped></style>
