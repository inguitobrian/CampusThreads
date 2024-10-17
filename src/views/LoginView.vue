<script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <v-responsive class="border rounded" max-height="300">
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
        <v-container>
          <h1>CARAGA STATE UNIVERSITY</h1>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
