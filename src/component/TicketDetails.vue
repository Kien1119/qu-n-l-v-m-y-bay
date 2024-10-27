<template>
  <div>
    <div>
      <div class="flex justify-between rounded-lg border-2 border-cyan-500 p-5">
        <div>
          <div class="flex gap-3 items-center">
            <div
              class="flex gap-3 justify-between items-center bg-sky-100 p-4 rounded-lg border-2 border-sky-400"
            >
              <span class="font-bold text-indigo-600 text-4xl">{{
                reservationStore.detail.bookingCode
              }}</span>

              <div class="border-r-2"></div>

              <img :src="reservationStore?.detail?.flight?.img" class="w-52" alt="" />
            </div>
          </div>
          <div class="flex flex-col gap-3 mt-3">
            <div class="flex gap-3">
              <span class="text-base font-sans text-gray-950">Thời gian giữ chỗ: </span>
              <span class="text-red-500">
                {{ formatDate(addHours(reservationStore?.detail?.createdAt, 8)) }}</span
              >
            </div>
            <div class="flex gap-3">
              <span>Thời hạn giữ giá: </span>
              <span class="text-red-500">
                {{ formatDate(addDays(reservationStore?.detail?.createdAt, 1)) }}</span
              >
            </div>
            <div class="flex gap-3">
              <span>Ngày đặt chỗ: </span
              ><span class="text-black font-bold">
                {{ formatDate(reservationStore?.detail?.createdAt) }}
              </span>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-3">
          <div class="flex gap-3">
            <span class="text-base font-sans text-gray-950 font-bold">Thông tin liên hệ </span>
          </div>
          <div class="flex gap-3">
            <span>Số điện thoại: </span>
            <span class="text-gray-500">{{ reservationStore?.detail?.contact?.phone }}</span>
          </div>
          <div class="flex gap-3">
            <span>Email: </span
            ><span class="text-gray-500"> {{ reservationStore?.detail?.contact?.email }}</span>
          </div>
        </div>
      </div>
      <div class="rounded-lg border-2 border-sky-400 my-7">
        <Accordion value="0">
          <AccordionPanel value="0">
            <AccordionHeader>
              <div class="flex gap-3 bg-gradient-to-r rounded-2xl from-cyan-300 from-10%">
                <div class="flex bg-sky-500 rounded-lg">
                  <img
                    style="width: 40px"
                    src="https://dev.airdata.site/img/info-outline.5c2c22c9.svg"
                    alt=""
                  />
                </div>

                <div class="flex flex-col p-3">
                  <span class="font-bol text-2xl text-cyan-900">Thông tin chuyến bay</span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex gap-5 border-2 border-zinc-500 rounded-lg justify-between p-6">
                <img :src="reservationStore?.detail?.flight?.img" class="w-96" alt="" />
                <div class="flex gap-2 w-1/4 items-center justify-center">
                  <div class="flex flex-col items-center justify-center font-bold">
                    <span class="text-7xl">{{ reservationStore?.detail?.flight?.airline }}</span>
                    <span class="text-5xl">{{ reservationStore?.detail?.flight?.aircraft }}</span>
                  </div>
                </div>
                <div class="flex gap-5 w-3/6 justify-center">
                  <div class="flex flex-col justify-between">
                    <span class="font-bold text-orange-400 text-4xl flex justify-center">
                      {{ reservationStore?.detail?.flight?.departure?.airport }}</span
                    >
                    <span class="text-gray-950 text-3xl font-medium flex justify-center">
                      {{ formatDate(reservationStore?.detail?.flight?.departure?.time) }}
                    </span>
                  </div>
                  <div class="flex flex-col justify-center">
                    <span class="flex text-2xl justify-center">2h15p</span>
                    <img src="https://dev.airdata.site/img/line-flight.222ef73e.svg" alt="" />
                  </div>
                  <div class="flex flex-col justify-between">
                    <span class="font-bold text-orange-400 text-4xl flex justify-center">
                      {{ reservationStore?.detail?.flight?.arrival?.airport }}</span
                    >
                    <span class="text-gray-950 text-3xl font-medium flex justify-center">
                      {{ formatDate(reservationStore?.detail?.flight?.arrival?.time) }}</span
                    >
                  </div>
                </div>
                <!-- <div class="flex flex-col gap-3 w-1/4 bg-slate-200 p-3 rounded-lg">
                  <div class="flex justify-between">
                    <span>Tình trạng chỗ</span
                    ><span class="text-green-400 font-semibold text-xl">HK</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Hạng vé</span
                    ><span>( EC | L <span class="text-red-500">LPXVNF</span> )</span>
                  </div>
                  <div class="flex justify-between"><span>Hoàn tháng</span><span>HK</span></div>
                  <div class="flex justify-between">
                    <span>Hành lý xách tay</span><span class="font-medium">1 kiện (10KG) +2KG</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Hành lý ký gửi</span><span class="font-medium">1 kiện (23KG)</span>
                  </div>
                </div> -->
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
      <div class="rounded-lg border-2 border-sky-400 my-7">
        <Accordion value="0">
          <AccordionPanel value="0">
            <AccordionHeader>
              <div class="flex gap-3 bg-gradient-to-r rounded-2xl from-cyan-300 from-10%">
                <div class="flex bg-sky-500 rounded-lg">
                  <img
                    style="width: 40px"
                    src="https://dev.airdata.site/img/passengers.60ddf03f.svg"
                    alt=""
                  />
                </div>

                <div class="flex flex-col p-3">
                  <span class="font-bol text-2xl text-cyan-900">Chi tiết khách hàng</span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div
                v-for="(pax, index) in reservationStore.detail.paxLists"
                :key="index"
                class="flex text-2xl gap-3"
              >
                <span>{{ index + 1 }}.</span
                ><span class="font-medium uppercase">{{ pax.firstName }}</span
                ><span class="font-medium">/</span
                ><span class="font-medium uppercase">{{ pax.lastName }}</span>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
      <div class="rounded-lg border-2 border-sky-400 my-7">
        <Accordion value="0">
          <AccordionPanel value="0">
            <AccordionHeader>
              <div class="flex gap-3 bg-gradient-to-r rounded-2xl from-cyan-300 from-10%">
                <div class="flex bg-sky-500 rounded-lg">
                  <img
                    style="width: 40px"
                    src="https://dev.airdata.site/img/dollar.4c3562a4.svg"
                    alt=""
                  />
                </div>
                <div class="flex flex-col p-3">
                  <span class="font-bol text-2xl text-cyan-900">Chi tiết giá</span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex text-2xl gap-3">
                <span>1.</span
                ><span class="font-medium">{{
                  reservationStore.detail.flight?.fareOptions.class
                }}</span
                ><span class="font-medium">/</span
                ><span class="font-medium">{{
                  formatPrice(reservationStore.detail.flight?.fareOptions.price)
                }}</span>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useReservationStore } from '@/stores/reservation'
import { onMounted } from 'vue'
import { formatDate, formatPrice } from '@/utils/format'
function addHours(date, hours) {
  const result = new Date(date)
  result.setHours(result.getHours() + hours)
  return result
}

function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}
const reservationStore = useReservationStore()
console.log(reservationStore.detail)
onMounted(() => {
  reservationStore.detailTicket
})
</script>
<style scoped></style>
