<script setup>
import { ref, onMounted } from 'vue'
import {
  requiredValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { supabase } from '@/utils/supabase.js'
import AppLayout from '@/components/layout/AppLayout.vue'
import ProfilePicture from '@/components/system/account-profile/ProfilePicture.vue'

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
  <AppLayout>
    <template #content>
      <v-container>
        <AlertNotification
          :form-success-message="formAction.formSuccessMessage"
          :form-error-message="formAction.formErrorMessage"
        />
        <v-card class="mb-5" title="Profile Information">
          <v-card-text>
            <ProfilePicture></ProfilePicture>
          </v-card-text>
        </v-card>

        <!-- Account Settings Card -->
        <div class="settings-wrapper">
          <v-card class="settings-card">
            <v-container>
              <h2 class="settings-title">Account Settings</h2>

              <!-- Profile Information Section -->
              <v-divider />
              <h3 class="section-title">
                <v-icon left color="primary">mdi-account-circle</v-icon>
                Profile Information
              </h3>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="userInfo.firstname"
                    label="First Name"
                    disabled
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="userInfo.lastname"
                    label="Last Name"
                    disabled
                    prepend-inner-icon="mdi-account"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="userInfo.email"
                    label="Email"
                    disabled
                    prepend-inner-icon="mdi-email-outline"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="userInfo.account_id"
                    label="Account ID"
                    disabled
                    prepend-inner-icon="mdi-card-account-details-outline"
                  />
                </v-col>
                <!-- Conditionally display Department field if role is LSG -->
                <v-col cols="12" sm="6" v-if="userInfo.role === 'LSG'">
                  <v-text-field
                    v-model="userInfo.college_name"
                    label="College"
                    disabled
                    prepend-inner-icon="mdi-office-building"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="userInfo.number"
                    label="Phone Number"
                    disabled
                    prepend-inner-icon="mdi-phone"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userInfo.role"
                    label="Role"
                    disabled
                    prepend-inner-icon="mdi-account-cog-outline"
                  />
                </v-col>
              </v-row>

              <!-- Security Section -->
              <v-divider class="my-5" />
              <h3 class="section-title">
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
                  class="update-password-btn"
                  color="light-green-darken-4"
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
        </div>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.settings-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.settings-card {
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.settings-title {
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.section-title {
  font-weight: 600;
  color: #555;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.update-password-btn {
  margin-top: 20px;
  font-weight: 600;
}

.v-text-field {
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .settings-card {
    padding: 15px;
  }

  .settings-title {
    font-size: 20px;
  }
}
</style>
