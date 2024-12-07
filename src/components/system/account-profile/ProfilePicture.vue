<script setup>
import { ref, onMounted } from 'vue'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { formActionDefault } from '@/utils/supabase.js'
import { imageValidator, requiredValidator } from '@/utils/validators'
import { fileExtract } from '@/utils/helpers'

defineProps({
  snackbar: Boolean,
})

// Use Pinia Store
const authStore = useAuthUserStore()

const snackbar = ref(false) // Snackbar visibility

// Default Form Data
const formDataDefault = {
  image: null,
}
const formData = ref({
  ...formDataDefault,
})
const formAction = ref({
  ...formActionDefault,
})
const refVForm = ref()
const avatarText = ref('') // Fallback for avatar initials
const imgPreview = ref(
  authStore.userData?.image_url || null, // Use null as fallback
)

// Generate avatar text based on user data
onMounted(() => {
  authStore.getUserInformation()
  const userData = authStore.userData
  if (userData) {
    avatarText.value =
      (userData.firstname?.charAt(0) || '') +
      (userData.lastname?.charAt(0) || '')
  }
})

// File Change Handler
const onPreview = async event => {
  const { fileObject, fileUrl } = await fileExtract(event)
  formData.value.image = fileObject // Update formData
  imgPreview.value = fileUrl // Update imgPreview state
}

// Reset Preview
const onPreviewReset = () => {
  imgPreview.value = authStore.userData?.image_url || null
}

// Submit Form
const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { data, error } = await authStore.updateUserImage(formData.value.image)

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Updated Profile Image.'
    snackbar.value = true
  }

  formAction.value.formProcess = false
}

// Validate Form Before Submit
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

  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row class="d-flex justify-center py-4">
      <!-- Avatar Section -->
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex justify-center align-center pa-0"
      >
        <div class="avatar-container">
          <v-img
            v-if="imgPreview"
            class="avatar-img"
            :src="imgPreview"
            alt="Profile Picture Preview"
            cover
          ></v-img>
          <div v-else class="avatar-initials">{{ avatarText }}</div>
        </div>
      </v-col>

      <!-- User Info -->
      <v-col sm="6" md="8" lg="9" class="d-flex flex-column justify-center">
        <div class="user-info text-center mb-5">
          <h1
            style="
              font-weight: bold;
              font-family: 'Syne', sans-serif;
              font-size: 4rem;
              font-weight: 600;
              font-style: normal;
            "
          >
            {{ authStore.userData?.firstname }}
            {{ authStore.userData?.lastname }}
          </h1>
          <h4
            style="
              font-family: 'Inter', sans-serif;
              font-weight: 500;
              font-size: 1.1rem;
              font-style: normal;
            "
          >
            <b>Email:</b> {{ authStore.userData?.email }}
          </h4>
          <h4
            style="
              font-family: 'Inter', sans-serif;
              font-weight: 500;
              font-size: 1.1rem;
              font-style: normal;
            "
          >
            <b>Role:</b> {{ authStore.userData?.role }}
          </h4>
        </div>

        <!-- File Input -->
        <v-file-input
          class="mt-4"
          :rules="[requiredValidator, imageValidator]"
          accept="image/png, image/jpeg, image/bmp"
          label="Upload Profile Picture"
          placeholder="Choose File"
          prepend-icon="mdi-camera"
          show-size
          chips
          @change="onPreview"
          @click:clear="onPreviewReset"
        ></v-file-input>

        <!-- Update Button -->
        <v-btn
          rounded
          elevation="2"
          class="mt-4 update-btn"
          type="submit"
          color="#40513b"
          prepend-icon="mdi-image-edit"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
        >
          Update Picture
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

  <!-- Snackbar Notification -->
  <v-overlay v-model="snackbar" class="snackbar-overlay">
    <v-card class="snackbar-card">
      <v-card-text>
        <h3>Profile Picture Updated!</h3>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="white" @click="snackbar = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<style scoped>
.avatar-container {
  width: 200px;
  height: 200px;
  border: 4px solid #40513b;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.avatar-initials {
  color: white;
  font-size: 2rem;
  background-color: #1976d2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 50%;
}

.user-info {
  margin-top: 1rem;
}

.update-btn {
  font-weight: bold;
  text-transform: uppercase;
}

.snackbar-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.snackbar-card {
  width: 300px;
  text-align: center;
  border-radius: 12px;
  padding: 20px;
  background-color: #4caf50;
  color: white;
}
</style>
