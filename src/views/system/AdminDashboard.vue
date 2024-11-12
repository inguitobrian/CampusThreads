<script setup>
import { ref, onMounted } from 'vue'
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

const colleges = ref([]) // For storing college data
const formDataDefault = {
  firstname: '',
  lastname: '',
  account_id: '',
  email: '',
  number: '',
  password: '',
  collegeId: null, // For college selection
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

// Fetch colleges from the database
async function fetchColleges() {
  try {
    const { data, error } = await supabase.from('colleges').select('id, name')

    if (error) throw error

    colleges.value = data
  } catch (error) {
    console.error('Error fetching colleges:', error.message)
    formAction.value.formErrorMessage =
      'Error fetching colleges: ' + error.message
  }
}

// Validate the ID format
function isValidId(account_id) {
  const idPattern = /^\d{3}-\d{5}$/
  return idPattern.test(account_id)
}

// Get college name based on selected ID
function getCollegeNameById(collegeId) {
  const college = colleges.value.find(col => col.id === collegeId)
  return college ? college.name : ''
}

// Form submission handler
const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

const onSubmit = async () => {
  // Reset Form Action utils
  formAction.value = { ...formActionDefault, formProcess: true }

  // Ensure ID is valid
  if (!isValidId(formData.value.account_id)) {
    formAction.value.formErrorMessage = 'Invalid ID format. Use XXX-XXXXX.'
    formAction.value.formProcess = false
    return
  }

  // Get college name based on the selected college ID
  const collegeName = getCollegeNameById(formData.value.collegeId)

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        firstname: formData.value.firstname,
        lastname: formData.value.lastname,
        number: formData.value.number,
        account_id: formData.value.account_id,
        role: 'LSG', // Default role set as "LSG"
        isLSG: true, // Default LSG status to true
        college_id: formData.value.collegeId,
        college_name: collegeName, // Send the college name
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
  }

  refVForm.value?.reset()
  // Turn off processing
  formAction.value.formProcess = false
}

// Fetch colleges when the component mounts
onMounted(fetchColleges)
</script>

<template>
  <div>
    <h2>Register LSG Account</h2>

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

      <!-- Radio buttons for selecting college -->
      <div>
        <label>Select College</label>
        <v-radio-group v-model="formData.collegeId" row>
          <v-radio
            v-for="college in colleges"
            :key="college.id"
            :label="college.name"
            :value="college.id"
            :rules="[requiredValidator]"
          ></v-radio>
        </v-radio-group>
      </div>

      <v-btn type="submit" :disabled="formAction.formProcess">
        <span v-if="formAction.formProcess">Processing...</span>
        <span v-else>Register LSG</span>
      </v-btn>
    </v-form>
  </div>
</template>

<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
