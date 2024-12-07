<script setup>
import { ref, onMounted } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
  phoneNumberValidator,
} from '@/utils/validators'
import AppLayout from '@/components/layout/AppLayout.vue'
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
  created_at: '',
  collegeId: null,
}

const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })

// Fetch Colleges
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

// Validate Account ID
function isValidId(account_id) {
  const idPattern = /^\d{3}-\d{5}$/
  return idPattern.test(account_id)
}

// Get College Name
function getCollegeNameById(collegeId) {
  const college = colleges.value.find(col => col.id === collegeId)
  return college ? college.name : ''
}

// Register New User
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

  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          firstname: formData.value.firstname,
          lastname: formData.value.lastname,
          number: formData.value.number,
          account_id: formData.value.account_id,
          role: 'LSG', // Default role assignment
          isLSG: true, // Custom field to mark users as LSG
          college_id: formData.value.collegeId,
          college_name: collegeName,
          created_at: formData.value.created_at,
        },
      },
    })

    if (error) {
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } else if (data) {
      formAction.value.formSuccessMessage = 'Successfully Registered Account.'
      // Ensure that the user stays logged out after registration
      await supabase.auth.signOut()
    }
  } catch (error) {
    console.error('Error during sign-up:', error.message)
    formAction.value.formErrorMessage = 'An error occurred during registration.'
  }

  refVForm.value?.reset()
  formAction.value.formProcess = false
}

// Logout
const logout = async () => {
  try {
    await supabase.auth.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Error logging out:', error.message)
  }
}

// Fetch Users (Admin)
const users = ref([])

async function fetchUsers() {
  try {
    const { data, error } = await supabase.from('all_users').select('*')
    if (error) throw error

    // Add fullName field by concatenating firstname and lastname
    users.value = data.map(user => ({
      ...user,
      fullName: `${user.firstname} ${user.lastname}`, // Concatenate first and last names
    }))
  } catch (error) {
    console.error('Error fetching users:', error.message)
  }
}

// Update Role (Admin)
const updateRole = async (userId, newRole) => {
  try {
    const { data, error } = await supabase.auth.admin.updateUserById(userId, {
      data: { role: newRole }, // Update the role in the metadata
    })
    if (error) throw error
    console.log(`User ${userId} role updated to: ${newRole}`)
    fetchUsers() // Refresh the user list
  } catch (error) {
    console.error('Error updating role:', error.message)
  }
}

onMounted(() => {
  fetchColleges()
  fetchUsers()
})
</script>

<template>
  <AppLayout>
    <template #content>
      <div class="admin-container">
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
                      value =>
                        isValidId(value) ||
                        'ID must be in the format 3 digits-5 digits',
                    ]"
                  ></v-text-field>

                  <v-text-field
                    label="Phone Number"
                    v-model="formData.number"
                    prepend-inner-icon="mdi-phone"
                    :rules="[requiredValidator, phoneNumberValidator]"
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
                    color="#40513b"
                    elevation="2"
                  >
                    <span v-if="formAction.formProcess">Processing...</span>
                    <span v-else>Register LSG</span>
                  </v-btn>
                </v-form>
              </v-card>
            </v-col>
          </v-row>

          <!-- User Management Section -->
          <v-row>
            <v-col cols="12" md="12">
              <v-card class="pa-4 elevation-3">
                <h2 class="text-center">List of Users</h2>
                <v-data-table
                  :headers="[
                    { text: 'Name', align: 'start', value: 'fullName' },
                    { text: 'Email', value: 'email' },
                    { text: 'Role', value: 'role' },

                    { text: 'Time', value: 'created_at' },
                  ]"
                  :items="users"
                  item-key="id"
                >
                  <template v-slot:items="props">
                    <tr :key="props.item.id">
                      <td>{{ props.item.fullName }}</td>
                      <td>{{ props.item.email }}</td>
                      <td>{{ props.item.role }}</td>

                      <td>{{ props.item.created_at }}</td>
                      <td>
                        <v-btn
                          @click="updateRole(props.item.id, 'Admin')"
                          color="blue"
                          rounded
                          small
                        >
                          Make Admin
                        </v-btn>
                        <v-btn
                          @click="updateRole(props.item.id, 'User')"
                          color="green"
                          rounded
                          small
                        >
                          Make User
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
.admin-container {
  padding-top: 40px;
}
.register-container {
  background: linear-gradient(135deg, #6ff665, #99fd85);
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
