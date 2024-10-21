<template>
  <div>
    <div class="rounded-lg border-2 border-sky-400 my-7">
      <div class="flex flex-col rounded-3xl p-3">
        <span class="font-medium text-2xl rounded-xl bg-slate-100 w-full text-sky-500 p-2">
          Vé rút gọn
        </span>
        <div class="flex flex-col gap-5 my-3 bg-yellow-200 p-5 rounded-3xl font-medium">
          <div>
            <span>Mã đặt chỗ:</span>
            <span>{{ reservationStore.detail.bookingCode }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <span>Hành trình:</span>
            <span
              >{{ reservationStore?.detail?.flight?.airline }}
              {{ reservationStore?.detail?.flight?.aircraft }}
              {{ reservationStore?.detail?.flight?.departure?.airport }}
              {{ reservationStore?.detail?.flight?.arrival?.airport }}
            </span>
          </div>
          <div
            v-for="(pax, index) in reservationStore.detail.paxLists"
            :key="index"
            class="flex flex-col gap-2"
          >
            <span>Hành khách# {{ index + 1 }}</span>
            <span class="uppercase">{{ index + 1 }}. {{ pax.firstName }} {{ pax.lastName }}</span>
          </div>
          <div>
            <span>Số điện thoại:</span><span>{{ reservationStore?.detail?.contact?.phone }}</span>
          </div>
          <div>
            <span>Email:</span><span>{{ reservationStore?.detail?.contact?.email }}</span>
          </div>
          <div>
            <span>Tổng tiền:</span
            ><span>{{ formatPrice(reservationStore?.detail?.flight?.fareOptions?.price) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useReservationStore } from '@/stores/reservation'
import { formatPrice } from '@/utils/format'
const reservationStore = useReservationStore()
onMounted(() => {
  reservationStore.detailTicket
})
</script>
<style scoped></style>
