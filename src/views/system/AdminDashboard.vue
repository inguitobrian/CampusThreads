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

const colleges = ref([])
const formDataDefault = {
  firstname: '',
  lastname: '',
  account_id: '',
  email: '',
  number: '',
  password: '',
  collegeId: null,
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

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

function isValidId(account_id) {
  const idPattern = /^\d{3}-\d{5}$/
  return idPattern.test(account_id)
}

function getCollegeNameById(collegeId) {
  const college = colleges.value.find(col => col.id === collegeId)
  return college ? college.name : ''
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  if (!isValidId(formData.value.account_id)) {
    formAction.value.formErrorMessage = 'Invalid ID format. Use XXX-XXXXX.'
    formAction.value.formProcess = false
    return
  }

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
        role: 'LSG',
        isLSG: true,
        college_id: formData.value.collegeId,
        college_name: collegeName,
      },
    },
  })

  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Registered Account.'
  }

  refVForm.value?.reset()
  formAction.value.formProcess = false
}

const logout = async () => {
  try {
    await supabase.auth.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Error logging out:', error.message)
  }
}

onMounted(fetchColleges)
</script>

<template>
  <div class="register-container">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-4 elevation-3">
            <h2 class="text-center text-primary">Register LSG Account</h2>

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
                  value => isValidId(value) || 'Invalid ID format.',
                ]"
              ></v-text-field>

              <v-text-field
                label="Phone Number"
                v-model="formData.number"
                prepend-inner-icon="mdi-phone"
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
                  confirmedValidator(
                    formData.password_confirmation,
                    formData.password,
                  ),
                ]"
              ></v-text-field>

              <div>
                <label>Select College</label>
                <v-radio-group v-model="formData.collegeId" row>
                  <v-radio
                    v-for="college in colleges"
                    :key="college.id"
                    :label="college.name"
                    :value="college.id"
                    class="radio-option"
                    :rules="[requiredValidator]"
                  ></v-radio>
                </v-radio-group>
              </div>

              <v-btn
                type="submit"
                class="mt-4"
                :disabled="formAction.formProcess"
                block
                rounded
                color="primary"
                elevation="2"
              >
                <span v-if="formAction.formProcess">Processing...</span>
                <span v-else>Register LSG</span>
              </v-btn>

              <v-btn
                class="mt-2"
                @click="logout"
                outlined
                color="secondary"
                block
                rounded
              >
                Logout
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.register-container {
  background: url('public/b0d3f002f96041057dac44c842294bc4.gif') no-repeat center center / cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

h2 {
  margin-bottom: 1.5rem;
}

.radio-option {
  margin: 0.5rem 0;
}

.text-primary {
  color: #003366 !important;
}

.text-center {
  text-align: center;
}
</style>
