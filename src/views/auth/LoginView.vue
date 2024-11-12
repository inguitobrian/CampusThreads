<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Loginform from '@/components/auth/LoginForm.vue'

const isAdmin = ref(false)
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row justify="end">
        <v-col cols="12" md="6" class="d-flex justify-center align-center">
          <v-col cols="12" md="10" class="d-flex flex-column">
            <v-img
              src="/loginimage.svg"
              alt="Login Image"
              class="pa-2"
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
        <v-col cols="12" md="6" class="d-flex justify-center">
          <v-card
            class="text-center rounded-xl"
            elevation="24"
            style="
              max-width: 400px;
              height: 550px;
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
                class="text-h4 font-weight-black light-green-darken-4"
                style="margin: 0; color: #40513b"
              >
                <span>Welcome Back!</span>
              </v-card-title>
            </div>

            <v-card-text class="bg-surface-white mx-8 text-center">
              Securely log in to your CampusThreads account
            </v-card-text>
            <Loginform :is-admin="isAdmin"></Loginform>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>
