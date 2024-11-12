<script setup>
import { ref } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)
const reenter = ref(false)
const refVForm = ref()

const formDataDefault = {
  firstname: '',
  lastname: '',
  account_id: '',
  email: '',
  number: '',
  password: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

function isValidId(account_id) {
  const idPattern = /^\d{3}-\d{5}$/
  return idPattern.test(account_id)
}

const onSubmit = async () => {
  // Reset Form Action utils
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        number: formData.value.number,
        account_id: formData.value.account_id,
        role: 'Student', // Default role set as "Student"
        isLSG: false, // Default LSG status to false
      },
    },
  })

  if (error) {
    // Add Error Message and Status Code
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'

    await supabase.auth.signOut()
  }

  refVForm.value?.reset()
  // Turn off processing
  formAction.value.formProcess = false
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

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
          v-model="formData.lastname"
          label="Last Name"
          prepend-inner-icon="mdi-account"
          :rules="[requiredValidator]"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      v-model="formData.account_id"
      label="ID (e.g. 221-00391)"
      prepend-inner-icon="mdi-account-card-details"
      :rules="[
        requiredValidator,
        value =>
          isValidId(value) || 'ID must be in the format 3 digits-5 digits',
      ]"
    ></v-text-field>

    <v-text-field
      label="Phone Number"
      v-model="formData.number"
      prepend-inner-icon="mdi mdi-phone"
      :rules="[requiredValidator]"
    ></v-text-field>

    <v-text-field
      label="Email"
      v-model="formData.email"
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

    <v-btn
      class="mt-2 mb-3 text-h6 font-weight-bold bg-login"
      size="large"
      type="submit"
      prepend-icon="mdi-account-plus"
      block
      style="color: #162013"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      Create my Account
    </v-btn>

    <v-card-text class="text-center">
      <span style="color: #40513b; text-decoration: none">
        Already have an account?</span
      >
      <RouterLink style="color: #0000ff; text-decoration: underline" to="/login"
        >Log in here</RouterLink
      >
    </v-card-text>
  </v-form>
</template>
