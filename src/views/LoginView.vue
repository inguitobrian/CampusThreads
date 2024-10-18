<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar :style="{ backgroundColor: '#111703' }" class="px-3">
        <v-toolbar-title>CampusThreads</v-toolbar-title>
        <v-btn text>Home</v-btn>
        <v-btn text>Departments</v-btn>
        <v-btn text>Shop all</v-btn>
        <v-btn text>About</v-btn>

        <v-text-field
          placeholder="search"
          append-icon="mdi-magnify"
          hide-details
          dense
          solo
        ></v-text-field>
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
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

                    <v-btn class="mt-2" type="submit" block>Submit</v-btn>
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
