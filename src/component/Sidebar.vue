<template>
  <div class="max-h-full">
    <div>
      <div class="card flex justify-center">
        <Menu class="h-lvh" :model="items">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span :class="item.icon" />
              <span class="ml-2">{{ item.label }}</span>
            </a>
          </template>
        </Menu>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const items = ref([
  {
    label: 'Đặt vé máy bay',
    items: [
      {
        label: 'Đặt vé máy bay',
        icon: 'pi pi-send',
        route: '/'
      }
    ]
  },
  {
    label: 'Manages',
    items: [
      {
        label: 'Quản lí sân bay',
        icon: 'pi pi-cog',
        route: '/airports'
      },
      {
        label: 'Quản lí chuyến bay',
        icon: 'pi pi-cog',
        route: '/flights'
      },
      {
        label: 'Quản lí đặt chỗ',
        icon: 'pi pi-cog',
        route: '/bookings'
      }
    ]
  }
])
</script>
<style lang="css" scoped></style>
