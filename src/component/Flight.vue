<template>
  <div>
    <div class="bg-slate-200 flex justify-center rounded-lg gap-3 mb-8">
      <div class="flex w-11/12 h-14 rounded-lg border-2 bg-slate-50">
        <div class="flex justify-around gap-3">
          <img
            src="https://dev.airdata.site/img/airplane.87c2a8f1.svg"
            style="width: 24px"
            alt=""
          />
          <label class="flex items-center text-stone-950">Một Chiều</label>
          <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        </div>
        <div class="grow flex items-center text-orange-400">
          <div class="flex-1 flex items-center justify-center">
            <Label>Cà Mau</Label>
          </div>
          <div>
            <img
              src="https://dev.airdata.site/img/swap-horizontal.a11c3836.svg"
              style="width: 24px"
              alt=""
            />
          </div>
          <div class="flex-1 flex items-center justify-center">
            <Label>Cà Mau</Label>
          </div>
        </div>
        <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        <div class="flex gap-3 justify-center">
          <img
            src="https://dev.airdata.site/img/airplane-up.50b67a05.svg"
            style="width: 24px"
            alt=""
          />
          <DatePicker
            class="h-3/4 pt-3"
            placeholder="Chọn ngày đi"
            :showIcon="true"
            :showButtonBar="true"
            v-model="calendarValue"
            iconDisplay="input"
          ></DatePicker>
          <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        </div>
        <div class="flex items-center gap-3">
          <img src="https://dev.airdata.site/img/users.1985e36a.svg" style="width: 24px" alt="" />
          <div class="">
            <InputGroup>
              <Button icon="pi pi-plus" severity="success" />
              <InputNumber placeholder="0" />
              <Button icon="pi pi-minus" severity="danger" />
            </InputGroup>
          </div>
        </div>
        <div class="h-auto border-l border-gray-500 mx-4 my-2"></div>
        <div class="flex items-center">
          <button class="bg-orange-500 h-2/3 p-3 !rounded-full mr-4">
            <svg
              data-v-c4b70bea=""
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ico-bold feather feather-more-horizontal"
            >
              <circle data-v-c4b70bea="" cx="12" cy="12" r="1"></circle>
              <circle data-v-c4b70bea="" cx="19" cy="12" r="1"></circle>
              <circle data-v-c4b70bea="" cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center">
        <Button class="!bg-slate-600 !rounded-full h-4/5" icon="pi pi-search" iconPos="top" />
      </div>
    </div>
    <div class="flex w-11/12 h-14 rounded-lg border-2 bg-slate-50 justify-between">
      <img
        style="border-radius: 5px"
        src="https://www.vnas.vn/public/upload/files/29.9.2020/%E1%BA%A3nh%20vinayuuki%20vinh/04.10/06.10/10.10/%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20vinh/16.10/trang%20nh%C6%B0/ng%C3%A0y%2018.10/%C4%90%E1%BA%A1i%20h%20vinh/ng%C3%A0y%2030.10/th%C3%A1ng%2011/logo%2C/vietnam-airline-logo.jpg"
        alt=""
      />
      <span class="flex items-center text-orange-600 font-bold">VN8060</span>
      <div class="flex items-center">
        <span class="text-stone-950 font-bold">07:10</span> - 08:25
      </div>
      <span class="flex items-center">CAH-SGN</span>
      <span class="flex items-center">ATR</span>
      <span class="flex items-center text-red-600 font-bold">1,176,000</span>
      <div class="flex items-center mr-3">
        <Checkbox v-model="pizza" inputId="ingredient1" name="pizza" :value="item" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const calendarValue = ref()
const pizza = ref()
</script>
<style scoped></style>
