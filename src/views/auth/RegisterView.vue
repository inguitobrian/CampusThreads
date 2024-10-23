<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
const visible = ref(false)
const reenter = ref(false)
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
                  label="email"
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

                <v-btn
                  class="mt-2 mb-3 text-h6 font-weight-bold bg-login"
                  size="large"
                  type="submit"
                  block
                  style="color: #162013"
                  >Create my Account
                </v-btn>
                <v-card-text class="text-center">
                  <span style="color: #40513b; text-decoration: none"
                    >Already have an account?</span
                  >
                  <RouterLink
                    style="color: #0000ff; text-decoration: underline"
                    to="/"
                  >
                    Log in here</RouterLink
                  >
                </v-card-text>
              </v-form>
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
