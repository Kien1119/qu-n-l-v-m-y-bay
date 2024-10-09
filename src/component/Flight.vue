<template>
  <div>
    <div class="bg-slate-400 flex justify-center rounded-lg">
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
        <div class="grow flex items-center text-yellow-300">
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
        <div class="flex gap-3">
          <img
            src="https://dev.airdata.site/img/airplane-up.50b67a05.svg"
            style="width: 24px"
            alt=""
          />
          <DatePicker
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
          <button class="bg-orange-500 h-2/3 p-3 rounded-full mr-4">
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
      <div></div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped></style>
