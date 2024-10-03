<template>
  <div class="h-full flex items-center">
    <div class="w-full !bg-emerald-50 rounded-2xl gap-2">
      <div>
        <div class="card flex justify-center">
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
              <RadioButton
                v-model="ingredient"
                inputId="ingredient1"
                name="pizza"
                value="One-way"
              />
              <label for="ingredient1" class="ml-2">Một chiều</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                v-model="ingredient"
                inputId="ingredient3"
                name="pizza"
                value="Round-trip"
              />
              <label for="ingredient3" class="ml-2">Khứ hồi</label>
            </div>
            <div class="flex items-center">
              <RadioButton
                v-model="ingredient"
                inputId="ingredient4"
                name="pizza"
                value="Many-stages"
              />
              <label for="ingredient4" class="ml-2">Nhiều chặng</label>
            </div>
          </div>
          <Button icon="pi pi-refresh"></Button>
        </div>
      </div>

      <div class="bg-white flex justify-around">
        <AddressPage></AddressPage>
        <div class="mx-3 my-3">
          <Button
            type="button"
            class="!bg-orange-400 hover:shadow-xl"
            icon="pi pi-arrow-right-arrow-left"
          />
        </div>
        <AddressPage></AddressPage>
      </div>
    </div>
  </div>
</template>

<script setup>
import AddressPage from '@/component/AddressPage.vue'
import { ref } from 'vue'
const ingredient = ref()
</script>
