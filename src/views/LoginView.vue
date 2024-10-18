<script setup>
import { ref } from 'vue'

const theme = ref('light')
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar :style="{ backgroundColor: '#111703' }" class="px-3">
        <v-toolbar-title class="mr-8" style="color: white"
          >CampusThreads</v-toolbar-title
        >

        <v-btn text class="mr-1" style="color: white">Home</v-btn>
        <v-btn text class="mr-1" style="color: white">Departments</v-btn>
        <v-btn text class="mr-1" style="color: white">Shop all</v-btn>
        <v-btn text class="mr-1" style="color: white">About</v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          class="mx-4"
          style="color: white"
          prepend-inner-icon="mdi-magnify"
          placeholder="search"
          hide-details
          dense
          solo
        ></v-text-field>
        <v-btn class="mr-5 ml-5" style="color: white">
          <v-icon left>mdi-account</v-icon>
          Log In
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row justify="end">
            <v-col cols="12" md="6" class="d-flex justify-end">
              <v-card
                class="text-center mx-9 mt-8"
                prepend-icon="$vuetify"
                style="max-width: 450px"
              >
                <template v-slot:title>
                  <span class="font-weight-black">Welcome Back!</span>
                </template>

                <v-card-text class="bg-surface-white mx-8">
                  Securely log in to your CampusThreads account and enjoy
                  personalized shopping.
                </v-card-text>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Enter ID"></v-text-field>

                    <v-text-field
                      label="Password"
                      type="password"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Log In</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-footer border app>2024- CampusThreads</v-footer>
    </v-app>
  </v-responsive>
</template>
