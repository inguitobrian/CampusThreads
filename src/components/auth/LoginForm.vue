<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
const visible = ref(false)
const refVForm = ref()

const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({
  ...formDataDefault,
})

const onLogin = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}
</script>

<template>
  <v-form ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
    <v-text-field
      v-model="formData.email"
      label="Enter ID"
      prepend-inner-icon="mdi-email-outline"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      label="Password"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-btn
      class="mt-2 mb-3 text-h6 font-weight-bold bg-login mb-5"
      size="large"
      type="submit"
      block
      style="color: #162013"
      >Log In
    </v-btn>

    <v-divider thickness="2"></v-divider>

    <v-card-text class="text-center">
      <span style="color: #40513b; text-decoration: none"
        >Don't have an account yet?</span
      >
      <RouterLink style="color: #0000ff" to="/register">
        Sign up now</RouterLink
      >
      <v-icon icon="mdi-chevron-right"></v-icon>
    </v-card-text>
  </v-form>
</template>
