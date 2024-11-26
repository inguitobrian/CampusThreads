<script setup>
import { ref, onMounted } from 'vue'
import AlertNotification from '@/components/common/AlertNotification.vue'
import { useAuthUserStore } from '@/stores/authUser'
import { formActionDefault } from '@/utils/supabase.js'
import { imageValidator, requiredValidator } from '@/utils/validators'
import { fileExtract } from '@/utils/helpers'

// Use Pinia Store
const authStore = useAuthUserStore()

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
const imgPreview = ref(
  authStore.userData?.image_url || '/images/img-profile.png',
)

// Modal visibility state
const isModalVisible = ref(false)

// Function to handle file change and show image preview
const onPreview = async event => {
  const { fileObject, fileUrl } = await fileExtract(event)
  formData.value.image = fileObject // Update formData
  imgPreview.value = fileUrl // Update imgPreview state
}

// Function to reset preview if file-input clear is clicked
const onPreviewReset = () => {
  imgPreview.value = authStore.userData?.image_url || '/images/img-profile.png'
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
    isModalVisible.value = true // Show success modal
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
        <v-img
          class="mx-auto rounded-circle"
          :src="imgPreview"
          alt="Profile Picture Preview"
          cover
          aspect-ratio="1"
          max-width="80%"
          height="90%"
        ></v-img>
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

  <!-- Modal for Success Notification -->
  <v-dialog v-model="isModalVisible" max-width="400">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">Success</v-card-title>
      <v-card-text>Profile picture updated successfully!</v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click="isModalVisible = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
