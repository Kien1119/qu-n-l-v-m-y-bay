<template>
  <div>
    <div>
      <div class="flex justify-between rounded-lg border-2 border-cyan-500 p-5">
        <div>
          <div class="flex gap-3 items-center">
            <div class="flex gap-3 items-center bg-sky-100 p-4 rounded-lg border-2 border-sky-400">
              <span class="font-bold text-indigo-600 text-4xl">{{
                reservationStore.detail.bookingCode
              }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 3H9C6.79086 3 5 4.79086 5 7V15"
                  stroke="#2FA4E5"
                  stroke-width="2"
                ></path>
                <path
                  d="M9 11.5C9 10.304 9.00149 9.49062 9.0712 8.87226C9.13864 8.27406 9.25916 7.98334 9.41329 7.78248C9.51969 7.64381 9.64381 7.51969 9.78248 7.41329C9.98334 7.25916 10.2741 7.13864 10.8723 7.0712C11.4906 7.00149 12.304 7 13.5 7C14.696 7 15.5094 7.00149 16.1277 7.0712C16.7259 7.13864 17.0167 7.25916 17.2175 7.41329C17.3562 7.51969 17.4803 7.64381 17.5867 7.78248C17.7408 7.98334 17.8614 8.27406 17.9288 8.87226C17.9985 9.49062 18 10.304 18 11.5V15.5C18 16.696 17.9985 17.5094 17.9288 18.1277C17.8614 18.7259 17.7408 19.0167 17.5867 19.2175C17.4803 19.3562 17.3562 19.4803 17.2175 19.5867C17.0167 19.7408 16.7259 19.8614 16.1277 19.9288C15.5094 19.9985 14.696 20 13.5 20C12.304 20 11.4906 19.9985 10.8723 19.9288C10.2741 19.8614 9.98334 19.7408 9.78248 19.5867C9.64381 19.4803 9.51969 19.3562 9.41329 19.2175C9.25916 19.0167 9.13864 18.7259 9.0712 18.1277C9.00149 17.5094 9 16.696 9 15.5V11.5Z"
                  stroke="#2FA4E5"
                  stroke-width="2"
                ></path>
              </svg>
              <div class="border-r-2"></div>

              <div>
                <img
                  style="width: 70px"
                  src="https://airdata-cms-dev.sgp1.cdn.digitaloceanspaces.com/airlines/VN.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-3 mt-3">
            <div class="flex gap-3">
              <span class="text-base font-sans text-gray-950">Thời gian giữ chỗ: </span>
              <span class="text-red-500">
                {{ formatDate(reservationStore?.detail?.createdAt) }}</span
              >
            </div>
            <div class="flex gap-3">
              <span>Thời hạn giữ giá: </span>
              <span class="text-red-500">
                {{ formatDate(reservationStore?.detail?.flight?.departure?.time) }}</span
              >
            </div>
            <div class="flex gap-3">
              <span>Ngày đặt chỗ: </span
              ><span class="text-red-500">
                {{ formatDate(reservationStore?.detail?.flight?.arrival?.time) }}</span
              >
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
                <div class="flex gap-2 w-1/4 items-center justify-center">
                  <img
                    src="https://airdata-cms-dev.sgp1.cdn.digitaloceanspaces.com/airlines/VN.png"
                    alt=""
                  />
                  <div class="flex flex-col items-center justify-center font-bold">
                    <span class="text-2xl">{{ reservationStore?.detail?.flight?.airline }}</span>
                    <span class="text-base">{{ reservationStore?.detail?.flight?.aircraft }}</span>
                  </div>
                </div>
                <div class="flex gap-5 w-3/6 justify-center">
                  <div class="flex flex-col justify-between">
                    <span class="font-bold text-orange-400 text-2xl flex justify-center">
                      {{ reservationStore?.detail?.flight?.departure?.airport }}</span
                    >
                    <span class="text-gray-950 text-lg font-medium flex justify-center">
                      {{ formatDate(reservationStore?.detail?.flight?.departure?.time) }}
                    </span>
                    <span> </span>
                  </div>
                  <div class="flex flex-col justify-center">
                    <span class="flex justify-center">2h15p</span>
                    <img src="https://dev.airdata.site/img/line-flight.222ef73e.svg" alt="" />
                  </div>
                  <div class="flex flex-col justify-between">
                    <span class="font-bold text-orange-400 text-2xl flex justify-center">
                      {{ reservationStore?.detail?.flight?.arrival?.airport }}</span
                    >
                    <span class="text-gray-950 text-lg font-medium flex justify-center">
                      {{ formatDate(reservationStore?.detail?.flight?.arrival?.time) }}</span
                    >
                    <span></span>
                  </div>
                </div>
                <div class="flex flex-col gap-3 w-1/4 bg-slate-200 p-3 rounded-lg">
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
                </div>
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
                <span>1.</span><span class="font-medium">VU</span><span class="font-medium">/</span
                ><span class="font-medium">LINH MR</span>
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
                    src="https://dev.airdata.site/img/eticket-list.28544c71.svg"
                    alt=""
                  />
                </div>

                <div class="flex flex-col p-3">
                  <span class="font-bol text-2xl text-cyan-900">Danh sách vé</span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex text-2xl gap-3">
                <span>1.</span><span class="font-medium">VU</span><span class="font-medium">/</span
                ><span class="font-medium">LINH MR</span>
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
                    src="https://dev.airdata.site/img/suitcase.d11fc685.svg"
                    alt=""
                  />
                </div>

                <div class="flex flex-col p-3">
                  <span class="font-bol text-2xl text-cyan-900">Sản phẩm khác</span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex text-2xl gap-3">
                <span>1.</span><span class="font-medium">VU</span><span class="font-medium">/</span
                ><span class="font-medium">LINH MR</span>
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
                    src="https://dev.airdata.site/img/warning.24b6be15.svg"
                    alt=""
                  />
                </div>

                <div class="flex flex-col p-3">
                  <span class="font-bol text-2xl text-cyan-900">Thông báo từ hệ thống</span>
                </div>
              </div>
            </AccordionHeader>
            <AccordionContent>
              <div class="flex text-2xl gap-3">
                <span>1.</span><span class="font-medium">VU</span><span class="font-medium">/</span
                ><span class="font-medium">LINH MR</span>
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
import { formatDate } from '@/utils/format'
const reservationStore = useReservationStore()
console.log(reservationStore.detail)
onMounted(() => {
  reservationStore.detailTicket
})
</script>
<style scoped></style>
