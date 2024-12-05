<script setup>
import { ref } from 'vue'

import RegisterForm from '@/components/auth/RegisterForm.vue'
import { requiredValidator } from '@/utils/validators'
import AppLayout from '@/components/layout/AppLayout.vue'

const isAdmin = ref(false)
const departments = ['CCIS', 'CEGS', 'CHASS', 'CAA', 'COFES', 'CMNS', 'CED'] // List of departments
const selectedDepartment = ref('') // To hold the selected department
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row justify="end">
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-card
            class="text-center rounded-xl"
            elevation="24"
            style="
              width: 500px;
              height: auto;
              background: linear-gradient(
                to top,
                #b4cca9,
                #cdddc6,
                #ffffff,
                #ffffff
              );
              padding: 20px;
            "
          >
            <v-row class="d-flex align-center justify-center">
              <!-- Image Column -->
              <v-col class="d-flex justify-center">
                <v-img
                  src="/Campusthreads.png"
                  alt="Custom Logo"
                  style="max-width: 80px; width: 100%; height: auto"
                  contain
                ></v-img>
              </v-col>

              <!-- Text Column -->
              <v-col cols="12" sm="12" md="auto" class="d-flex justify-center">
                <v-card-title
                  class="text-h3 font-weight-black light-green-darken-4"
                  style="margin: 0; color: #40513b"
                >
                  <span>Let's get started</span>
                </v-card-title>
              </v-col>
            </v-row>

            <v-card-text
              class="bg-surface-white mx-8 pt-8 text-center"
              style="
                color: #40513b;
                font-family: 'Manrope', sans-serif;
                font-weight: 600;
              "
            >
              Sign Up to your CampusThreads Account
            </v-card-text>

            <v-card-text>
              <RegisterForm
                :isAdmin="isAdmin"
                :departments="departments"
                :selectedDepartment="selectedDepartment"
                :requiredValidator="requiredValidator"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-col cols="12" md="10" class="d-flex flex-column">
            <v-img
              src="/pana.svg"
              alt="Login Image"
              class="pa-2 animated-image"
              cover
            ></v-img>
            <span
              class="text-h5"
              style="color: #40513b; margin-top: 20px; text-align: center"
            >
              Stay connected and enjoy the latest from
              <span class="font-weight-bold text-h5">CampusThreads</span>!
            </span>
          </v-col>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

<style scoped>
.animated-image {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
