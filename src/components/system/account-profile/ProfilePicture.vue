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

// Load Variables
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
  authStore.userData?.image_url || null, // Use null as a fallback
)

// Modal visibility state
const isModalVisible = ref(false)

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

// Function to handle file change and show image preview
const onPreview = async event => {
  const { fileObject, fileUrl } = await fileExtract(event)
  formData.value.image = fileObject // Update formData
  imgPreview.value = fileUrl // Update imgPreview state
}

// Function to reset preview if file-input clear is clicked
const onPreviewReset = () => {
  imgPreview.value = authStore.userData?.image_url || null // Reset to default or null
}

// Submit Functionality
const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true } // Reset Form Action utils; Turn on processing

  const { data, error } = await authStore.updateUserImage(formData.value.image)

  if (error) {
    formAction.value.formErrorMessage = error.message // Add Error Message and Status Code
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Updated Profile Image.' // Add Success Message
    snackbar.value = true // Show snackbar
  }

  formAction.value.formProcess = false // Turn off processing
}
// Trigger Validators
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
// Fetch user information when the component mounts
onMounted(() => {
  authStore.getUserInformation()
})
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>

  <!-- Profile Section with Image and User Info -->
  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
    <v-row class="d-flex justify-center">
      <!-- Profile Image Display -->
      <v-col cols="12" sm="6" md="4" lg="3" class="d-flex justify-center pa-0">
        <div
          class="mx-auto d-flex justify-center align-center rounded-circle"
          style="aspect-ratio: 1; width: 80%; height: 90%; overflow: hidden"
        >
          <!-- Show Profile Picture if available -->
          <v-img
            v-if="imgPreview"
            class="rounded-circle"
            :src="imgPreview"
            alt="Profile Picture Preview"
            cover
          ></v-img>

          <!-- Otherwise, show initials -->
          <div
            v-else
            class="text-h3 font-weight-bold d-flex justify-center align-center"
            style="
              color: white;
              background-color: #d32f2f;
              width: 100%;
              height: 100%;
            "
          >
            {{ avatarText }}
          </div>
        </div>
      </v-col>

      <!-- User Info Below Image -->
      <v-col
        sm="6"
        md="8"
        lg="9"
        class="d-flex flex-column justify-center pa-0"
      >
        <div class="text-center my-4 ma-0">
          <h4 class="ma-0">
            <b>Full Name:</b>
            {{
              authStore.userData?.firstname + ' ' + authStore.userData?.lastname
            }}
          </h4>
          <h4 class="my-2"><b>Email:</b> {{ authStore.userData?.email }}</h4>
          <h4 class="my-2"><b>Role:</b> {{ authStore.userData?.role }}</h4>
        </div>

        <!-- File Input to Upload Profile Picture -->
        <v-file-input
          class="mt-5"
          :rules="[requiredValidator, imageValidator]"
          accept="image/png, image/jpeg, image/bmp"
          label="Browse Profile Picture"
          placeholder="Browse Profile Picture"
          prepend-icon="mdi-camera"
          show-size
          chips
          @change="onPreview"
          @click:clear="onPreviewReset"
        ></v-file-input>

        <!-- Update Button -->
        <v-btn
          rounded
          elevation="8"
          class="mt-3 mb-3"
          type="submit"
          color="light-green-darken-4"
          prepend-icon="mdi-image-edit"
          :disabled="formAction.formProcess"
          :loading="formAction.formProcess"
        >
          Update Picture
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-overlay v-model="snackbar" class="snackbar-overlay">
    <v-card
      class="centered-snackbar"
      color="light-green-darken-4"
      elevation="10"
    >
      <v-card-text>
        <h2>Profile Picture Updated!</h2>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="white" @click="snackbar = false">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>
</template>

<style scoped>
.snackbar-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); /* Dimmed background */
}

.centered-snackbar {
  width: 300px;
  text-align: center;
  border-radius: 12px;
  padding: 16px;
}
</style>
