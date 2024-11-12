<script setup>
import { ref, onMounted } from 'vue'
import {
  requiredValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { supabase } from '@/utils/supabase.js'

const formActionDefault = {
  formProcess: false,
  formErrorMessage: '',
  formSuccessMessage: '',
}

const formAction = ref({ ...formActionDefault })

const userInfo = ref({
  firstname: '',
  lastname: '',
  email: '',
  account_id: '',
  college_name: '',
  number: '',
  role: '', // Default user role
})

const passwordData = ref({
  password: '',
  password_confirmation: '',
})

const visible = ref(false)
const reenter = ref(false)
const refVForm = ref()

// Fetch user information on component mount
onMounted(async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    formAction.value.formErrorMessage = 'Could not retrieve user information.'
    return
  }

  if (user) {
    userInfo.value = {
      firstname: user.user_metadata.firstname || '',
      lastname: user.user_metadata.lastname || '',
      email: user.email || '',
      account_id: user.user_metadata.account_id || '',
      college_name: user.user_metadata.college_name || '',
      number: user.user_metadata.number || '',
      role: user.user_metadata.role || 'User',
    }
  }
})

// Submit handler for updating password
const onPasswordUpdate = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) updatePassword()
  })
}

// Function to update password
const updatePassword = async () => {
  formAction.value.formProcess = true

  const { error } = await supabase.auth.updateUser({
    password: passwordData.value.password,
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
  } else {
    formAction.value.formSuccessMessage = 'Password updated successfully.'
  }

  formAction.value.formProcess = false
  refVForm.value?.reset()
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <!-- Account Settings Card -->
  <v-card class="p-5">
    <v-container>
      <h2 class="mb-4">Account Settings</h2>

      <!-- Profile Information Section -->
      <v-divider />
      <h3 class="mt-5 mb-3 font-weight-bold text-subtitle-1">
        <v-icon left color="primary">mdi-account-circle</v-icon>
        Profile Information
      </h3>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="userInfo.firstname"
            label="First Name"
            disabled
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="userInfo.lastname"
            label="Last Name"
            disabled
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="userInfo.email" label="Email" disabled />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="userInfo.account_id"
            label="Account ID"
            disabled
          />
        </v-col>
        <!-- Conditionally display Department field if role is LSG -->
        <v-col cols="12" sm="6" v-if="userInfo.role === 'LSG'">
          <v-text-field
            v-model="userInfo.college_name"
            label="Department"
            disabled
          />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="userInfo.number"
            label="Phone Number"
            disabled
          />
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="userInfo.role" label="Role" disabled />
        </v-col>
      </v-row>

      <!-- Security Section -->
      <v-divider class="my-5" />
      <h3 class="mt-3 font-weight-bold text-subtitle-1">
        <v-icon left color="primary">mdi-lock</v-icon>
        Security
      </h3>
      <v-form ref="refVForm" @submit.prevent="onPasswordUpdate">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="passwordData.password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              label="New Password"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="visible = !visible"
              :rules="[requiredValidator, passwordValidator]"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="passwordData.password_confirmation"
              :append-inner-icon="reenter ? 'mdi-eye-off' : 'mdi-eye'"
              :type="reenter ? 'text' : 'password'"
              label="Re-enter Password"
              prepend-inner-icon="mdi-lock-outline"
              @click:append-inner="reenter = !reenter"
              :rules="[
                requiredValidator,
                confirmedValidator(
                  passwordData.password_confirmation,
                  passwordData.password,
                ),
              ]"
            />
          </v-col>
        </v-row>
        <v-btn
          class="mt-4 mb-3 font-weight-bold"
          color="primary"
          size="large"
          type="submit"
          prepend-icon="mdi-account-key"
          block
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
        >
          Update Password
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<style scoped>
h2,
h3 {
  font-family: 'Roboto', sans-serif;
  color: #333;
}
.text-subtitle-1 {
  font-weight: 500;
}
</style>
