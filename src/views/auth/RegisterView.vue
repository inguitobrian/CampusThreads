<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
const isAdmin = ref(false)
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
              max-width: 400px;
              background: linear-gradient(
                to top,
                #b4cca9,
                #cdddc6,
                #ffffff,
                #ffffff
              );
              padding: 20px; /* Optional: Add padding to ensure content does not touch edges */
            "
          >
            <div class="d-flex align-center justify-center" style="gap: 16px">
              <v-img
                src="/i_logo.png"
                alt="Custom Logo"
                max-width="40px"
                contain
              ></v-img>

              <v-card-title
                class="text-h4 font-weight-medium light-green-darken-4"
                style="margin: 0; color: #40513b"
              >
                <span>Let's get started</span>
              </v-card-title>
            </div>

            <v-card-text class="d-flex justify-center pa-0">
              <v-btn
                @click="isAdmin = false"
                :class="{ 'bg-student': !isAdmin }"
                style="color: #cdd7bf"
                class="mr-5"
                >Student</v-btn
              >

              <v-btn
                @click="isAdmin = true"
                :class="{ 'bg-admin': isAdmin }"
                style="color: #cdd7bf"
                >Admin</v-btn
              >
            </v-card-text>

            <v-card-text class="bg-surface-white mx-8 text-center">
              {{
                isAdmin
                  ? 'Sign Up to your CampusThreads Admin account.'
                  : 'Sign Up to your CampusThreads Student account.'
              }}
            </v-card-text>

            <v-card-text>
              <RegisterForm></RegisterForm>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-col cols="12" md="10" class="d-flex flex-column">
            <v-img src="/pana.svg" alt="Login Image" class="pa-2" cover></v-img>
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
