<template>
  <div class="relative pb-20">
    <!-- HÀNH KHÁCH -->
    <Form :validation-schema="schema" @submit="onSubmit">
      <div v-for="(entry, idx) in fields" :key="entry.key">
        <Field  :name="`passengers[${idx}].firstName`" v-slot="{ field, errors, errorMessage }">
          <InputText v-bind="field" placeholder="First Name" />
          {{ errorMessage || 'errorMessage' }} 
          <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
        </Field>
        <Field  :name="`passengers[${idx}].lastName`" v-slot="{ field, errors }">
          <InputText v-bind="field" placeholder="Last Name" />
          <small v-if="errors[0]" class="p-error">{{ errors[0] }}</small>
        </Field>
      </div>

      <!-- Email -->
      <Field name="email" v-slot="{ field, errors }">
        <InputText v-bind="field" placeholder="Email" />
        mail: {{errors}}
        <small v-if="errors[0]" class="text-red-600">{{ errors[0] }}</small>
      </Field>

      <Button
        class="!bg-gradient-to-r shadow-2xl from-orange-500 from-10% !rounded-2xl h-10 flex items-center justify-center mt-5"
        label="Giữ chỗ"
        type="submit"
      ></Button>
      <Button
        class="!bg-gradient-to-r shadow-2xl from-orange-500 from-10% !rounded-2xl h-10 flex items-center justify-center mt-5"
        label="Add pax"
        @click="handleAdd"
      ></Button>
    </Form>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePlaneStore } from '@/stores/airports'
import { Form, useForm, Field, useFieldArray, useField } from 'vee-validate'
import * as yup from 'yup'

const planeStore = usePlaneStore()
const price = ref([{ count: 0 }])
const information = ref([])

const blankData = ref({
  passengers: [{ firstName: '', lastName: '' }],
  email: '',
})

const schema = yup.object({
  passengers: yup.array().of(
    yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
    })
  ),
  email: yup.string().email('Invalid email').required('Email is required'),
})

// useForm
const { handleSubmit } = useForm({ initialValues: blankData.value })

const {push, fields } = useFieldArray('passengers', 
  yup.array().of(
    yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
    }))
  )

const { value } = useField('email', yup.string().required('Email is required'))

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted:', values);
}, (errors) => {
  console.log('Validation errors:', errors);
});

function handleAdd() {
  push(blankData.value.passengers[0])
}

onMounted(() => {
  planeStore.fetchAirports()

  const saveInformation = localStorage.getItem('flightTicket')
  const priceChair = localStorage.getItem('priceTicket')

  if (saveInformation && priceChair) {
    try {
      const parsedInfo = JSON.parse(saveInformation)
      const parsedPrice = JSON.parse(priceChair)
      if (typeof parsedInfo === 'object' && typeof parsedPrice === 'object') {
        information.value = parsedInfo
        price.value = parsedPrice
      } else {
        this.$toast.add({
          severity: 'warn',
          summary: 'Lỗi dữ liệu',
          detail: 'Thông tin hoặc giá vé không hợp lệ',
          life: 3000
        })
      }
    } catch (e) {
      this.$toast.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Dữ liệu từ localStorage không hợp lệ',
        life: 3000
      })
    }
  }

  const paxCount = price.value[0]?.count
  if ( paxCount && (paxCount - 1)) {
    for (let i = 0; i < paxCount - 1; i++) {
      push(blankData.value.passengers[0])
    }
  }
})
</script>
