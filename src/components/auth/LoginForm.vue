<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { formActionDefault, supabase } from '@/utils/supabase'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { requiredValidator, emailValidator } from '@/utils/validators'

const router = useRouter()
const visible = ref(false)
const refVForm = ref()
const isAdminLogin = ref(false) // Toggle for admin login
const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({
  ...formDataDefault,
})
const formAction = ref({
  ...formActionDefault,
})

// Function to log in
const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    const { user } = data

    // Get the role from user metadata
    const userRole = user?.user_metadata?.role

    // Handle Admin login
    if (isAdminLogin.value) {
      if (userRole !== 'Admin') {
        formAction.value.formErrorMessage = `Only Admin accounts can log in here.`
        formAction.value.formStatus = 403
      } else {
        formAction.value.formSuccessMessage = 'Successfully Logged In as Admin.'
        router.replace('/admin')
      }
    } else {
      // Handle Student or LSG login
      const validUserRoles = ['Student', 'LSG']
      if (!validUserRoles.includes(userRole)) {
        formAction.value.formErrorMessage = `The user is not registered yet.`
        formAction.value.formStatus = 403
      } else {
        formAction.value.formSuccessMessage = 'Successfully Logged In.'
        router.replace('/home')
      }
    }
  }

  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <v-form ref="refVForm" fast-fail @submit.prevent="onFormSubmit">
    <!-- Toggle for Admin Login -->
    <v-switch
      v-model="isAdminLogin"
      label="Log in as Admin"
      class="mb-4 d-flex justify-center align-center"
    ></v-switch>

    <!-- Email Field -->
    <v-text-field
      v-model="formData.email"
      label="Email"
      prepend-inner-icon="mdi-email-outline"
      :rules="[requiredValidator, emailValidator]"
    ></v-text-field>

    <!-- Password Field -->
    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      label="Password"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
    ></v-text-field>

    <!-- Submit Button -->
    <v-btn
      class="mt-2 mb-3 text-h6 font-weight-bold bg-login mb-5"
      size="large"
      type="submit"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
      block
      style="color: #162013"
    >
      Log In
    </v-btn>

    <v-divider thickness="2"></v-divider>

    <v-card-text class="text-center">
      <span style="color: #40513b; text-decoration: none">
        Don't have an account yet?
      </span>
      <RouterLink style="color: #0000ff" to="/register">
        Sign up now
      </RouterLink>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </v-card-text>
  </v-form>
</template>
