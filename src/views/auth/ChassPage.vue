<script setup>
import { ref } from 'vue'

const theme = ref('light')
const drawer = ref(false) // for the navigation drawer on mobile screens

const images = [
  { src: 'public/b438a2cb928c528ee494e31b275d8f06.jpg' },
  { src: 'public/b0ac2c12da0c00691252ef81e3f9d4b1.jpg' },
  { src: 'public/a8433f3083b769da094ddb1d81408e6b.jpg' },
  { src: 'public/86b0588cda7de732293e10ac99e6b7d2.jpg' },
];

const currentSet = ref(0);

function nextSet() {
  currentSet.value = (currentSet.value + 1) % images.length;
}

function prevSet() {
  currentSet.value = (currentSet.value - 1 + images.length) % images.length;
}
</script>

<template>
  <v-responsive class="border rounded">
    <v-app
  :theme="theme"
  style="
    background: linear-gradient(to right, #d6a3e5, #8e44ad); /* Light purple/magenta to dark purple/violet */
    font-family: 'Roboto', sans-serif
  "
>
  <!-- App Bar -->
  <v-app-bar
    :style="{
      background: 'linear-gradient(to left, #5e2b8c, #111703)' /* Darker from right to left */
    }"
    class="px-3 nav-bar"
  >
        <!-- Mobile View: Hamburger Icon -->
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          style="color: white"
          class="d-lg-none"
        ></v-app-bar-nav-icon>

        <!-- Toolbar Title -->
        <v-toolbar-title
          style="color: white; font-family: 'Montserrat', sans-serif"
        >
          CampusThreads
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Desktop View: Nav Buttons -->
        <div class="d-none d-lg-flex nav-buttons">
          <v-btn text class="mr-1" style="color: white">Home</v-btn>
          <v-btn text class="mr-1" style="color: white">Departments</v-btn>
          <v-btn text class="mr-1" style="color: white">Shop all</v-btn>
          <v-btn text class="mr-1" style="color: white">About</v-btn>
          <!-- Search Field -->
          <v-text-field
            class="mx-4 search-bar"
            style="color: white"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search"
            hide-details
            dense
            solo
          ></v-text-field>
        </div>

        <!-- Log In Button for all sizes -->
        <v-btn class="mr-5 ml-5" style="color: white">
          <v-icon left>mdi-account</v-icon>
          Log In
        </v-btn>
      </v-app-bar>

      <!-- Mobile Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list dense>
          <v-list-item>
            <v-list-item-title class="text-h6">Menu</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>Home</v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>Departments</v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>Shop all</v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>About</v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content>Log In</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <v-img src="public/pexels-george-pak-7972506.jpg" height="400px" cover></v-img>

          <v-container class="text-center mt-8">
            <h1 class="text-h4 font-weight-bold mb-4" style="font-size: 2rem;">
              "Wear your passion for people and ideas with university pride."
            </h1>
            <p class="text-body-1" style="font-size: 1rem; font-weight: bold; max-width: 900px; margin: 0 auto;">
              "Wear the pride of understanding and shaping society."
            </p>
          </v-container>

          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <v-parallax height="500" src="public/fa157f04dc5f874ebddd2f56382dd64b.jpg">
                  <v-overlay>
                    <template v-slot:activator="{ props }">
                      <v-container v-bind="props" class="fill-height d-flex flex-column justify-space-between align-start">
                        <h2 class="text-h4" 
                          style="writing-mode: vertical-rl; text-orientation: mixed; color: white; font-weight: bold; margin-left: 20px; margin-top: 200px;">
                          LANYARDS
                        </h2>
                        <v-btn outlined class="text-none" style="margin-left: 20px; margin-bottom: 20px; color: black; border-color: black;">
                          Shop Now
                          <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-container>
                    </template>
                  </v-overlay>
                </v-parallax>
              </v-col>

              <v-col cols="6">
                <v-parallax height="500" src="public/pexels-eben-15404590.jpg">
                  <v-overlay>
                    <template v-slot:activator="{ props }">
                      <v-container v-bind="props" class="fill-height d-flex flex-column justify-space-between align-start">
                        <h2 class="text-h4" 
                          style="writing-mode: vertical-rl; text-orientation: mixed; color: white; font-weight: bold; margin-left: 20px; margin-top: 200px;">
                          UNIFORMS
                        </h2>
                        <v-btn outlined class="text-none" style="margin-left: 20px; margin-bottom: 20px; color: black; border-color: black;">
                          Shop Now
                          <v-icon right>mdi-arrow-right</v-icon>
                        </v-btn>
                      </v-container>
                    </template>
                  </v-overlay>
                </v-parallax>
              </v-col>
            </v-row>
          </v-container>

          <v-container>
            <v-row>
              <v-col v-for="(image, index) in images" :key="index" cols="6" md="3">
                <v-card class="mx-auto" outlined>
                  <v-img :src="image.src" height="200px" cover></v-img>
                  <v-card-subtitle class="text-center font-weight-bold" style="background-color: rgba(0, 0, 0, 0.7); color: white;">
                    {{ image.price }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style>
.bg-login {
  background-color: #71885a;
}

.bg-student {
  background-color: #8fa477;
}

.bg-admin {
  background-color: #acbd99;
}

.v-input--selection-controls
  .v-input--checkbox
  .v-input__control
  .v-input__slot {
  color: #63794e;
}

.nav-bar {
  min-height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.nav-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.search-bar {
  min-width: 300px;
  max-width: 500px;
  margin-right: 20px;
}

.search-bar {
  min-height: 40px;
}
</style>
