<script setup>
import { ref, defineProps } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'

const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const visible = ref(false)
const reenter = ref(false)
const refVForm = ref()
const departments = ['CCIS', 'CEGS', 'CHASS', 'CAA', 'COFES', 'CMNS', 'CED'] // List of departments
const selectedDepartment = ref('') // To hold the selected department

const formDataDefault = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  password_confirmation: '',
}

const formData = ref({
  ...formDataDefault,
})

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onLogin()
  })
}

// Function to validate ID format
function isValidId(id) {
  const idPattern = /^\d{3}-\d{5}$/ // Pattern: 3 digits, a slash, and 5 digits
  return idPattern.test(id)
}
const id = ref('') // ID input value
</script>

<template>
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="formData.firstname"
          label="First Name"
          prepend-inner-icon="mdi-account"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Last Name"
          prepend-inner-icon="mdi-account"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- New ID input field -->
    <v-text-field
      v-model="id"
      label="ID (e.g. 221/00391)"
      prepend-inner-icon="mdi-account-card-details"
      :rules="[
        requiredValidator,
        value =>
          isValidId(value) || 'ID must be in the format 3 digits / 5 digits',
      ]"
    ></v-text-field>

    <v-text-field
      label="Phone Number"
      prepend-inner-icon="mdi mdi-phone"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      label="Email"
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
      :rules="[requiredValidator, passwordValidator]"
    ></v-text-field>

    <v-text-field
      v-model="formData.password_confirmation"
      :append-inner-icon="reenter ? 'mdi-eye-off' : 'mdi-eye'"
      :type="reenter ? 'text' : 'password'"
      label="Re-enter Password"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="reenter = !reenter"
      :rules="[
        requiredValidator,
        confirmedValidator(formData.password_confirmation, formData.password),
      ]"
    ></v-text-field>

    <!-- Conditionally render the department dropdown for Admins -->
    <v-select
      v-if="isAdmin"
      v-model="selectedDepartment"
      :items="departments"
      label="Select Department"
      class="mt-3"
    ></v-select>

    <v-btn
      class="mt-2 mb-3 text-h6 font-weight-bold bg-login"
      size="large"
      type="submit"
      block
      style="color: #162013"
      >Create my Account</v-btn
    >

    <v-card-text class="text-center">
      <span style="color: #40513b; text-decoration: none"
        >Already have an account?</span
      >
      <RouterLink style="color: #0000ff; text-decoration: underline" to="/"
        >Log in here</RouterLink
      >
    </v-card-text>
  </v-form>
</template>
