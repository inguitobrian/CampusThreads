<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const visible = ref(false)
const reenter = ref(false)
const departments = ['CCIS', 'CEGS', 'CHASS'] // List of departments
const selectedDepartment = ref('') // To hold the selected department
</script>

<template>
  <v-form fast-fail @submit.prevent>
    <v-row>
      <v-col cols="6">
        <v-text-field
          label="First Name"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          label="Last Name"
          prepend-inner-icon="mdi-account"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-text-field
      label="Phone Number"
      prepend-inner-icon="mdi mdi-phone"
    ></v-text-field>

    <v-text-field
      label="Email"
      prepend-inner-icon="mdi-email-outline"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      label="Password"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="visible = !visible"
    ></v-text-field>

    <v-text-field
      :append-inner-icon="reenter ? 'mdi-eye-off' : 'mdi-eye'"
      :type="reenter ? 'text' : 'password'"
      label="Re-enter Password"
      prepend-inner-icon="mdi-lock-outline"
      @click:append-inner="reenter = !reenter"
    ></v-text-field>

    <!-- Conditionally render the department dropdown for Admins -->
    <v-select
      v-if="isAdmin"
      v-model="selectedDepartment"
      :items="departments"
      label="Select Department"
      class="mt-3"
    ></v-select>

    <v-btn
      class="mt-2 mb-3 text-h6 font-weight-bold bg-login"
      size="large"
      type="submit"
      block
      style="color: #162013"
      >Create my Account</v-btn
    >

    <v-card-text class="text-center">
      <span style="color: #40513b; text-decoration: none"
        >Already have an account?</span
      >
      <RouterLink style="color: #0000ff; text-decoration: underline" to="/"
        >Log in here</RouterLink
      >
    </v-card-text>
  </v-form>
</template>
