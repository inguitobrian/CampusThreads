<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'

// Define items as a plain JavaScript array
const items = [
  { src: 'public/pexels-daiangan-102129.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' },
]
</script>

<template>
  <AppLayout>
    <template #content>
      <!-- Carousel Section -->
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          cover
        ></v-carousel-item>
      </v-carousel>

      <!-- Text Section -->
      <v-container class="text-center mt-8">
        <h1 class="text-h4 font-weight-bold mb-4" style="font-size: 2rem;">
          "Wear Your School Spirit, Share Your Pride"
        </h1>
        <p class="text-body-1" style="font-size: 1rem; max-width: 900px; margin: 0 auto;">
          "Our university gear lets you showcase your pride and connection to campus.
          Celebrate your journey and represent your alma mater with confidence!"
        </p>
      </v-container>
      <v-container fluid>
  <v-row>
    <!-- First Image: Lanyards -->
    <v-col cols="4">
      <v-parallax
        height="600"
        src="public/fa157f04dc5f874ebddd2f56382dd64b.jpg"
      >
        <v-overlay>
          <template v-slot:activator="{ props }">
            <v-container v-bind="props" class="fill-height d-flex align-start">
              <h2 class="text-h4" 
                  style="writing-mode: vertical-rl; text-orientation: mixed; color: white; font-weight: bold; margin-left: 20px; margin-top: 200px;">
                LANYARDS
              </h2>
            </v-container>
          </template>
        </v-overlay>
      </v-parallax>
    </v-col>

    <!-- Second Image: Uniform -->
    <v-col cols="4">
      <v-parallax
        height="600"
        src="public/pexels-eben-15404590.jpg"
      >
        <v-overlay>
          <template v-slot:activator="{ props }">
            <v-container v-bind="props" class="fill-height d-flex align-start">
              <h2 class="text-h4" 
                  style="writing-mode: vertical-rl; text-orientation: mixed; color: white; font-weight: bold; margin-left: 20px; margin-top: 200px;">
                UNIFORMS
              </h2>
            </v-container>
          </template>
        </v-overlay>
      </v-parallax>
    </v-col>

    <!-- Third Image: Accessories -->
    <v-col cols="4">
      <v-parallax
        height="600"
        src="public\a8433f3083b769da094ddb1d81408e6b.jpg"
      >
        <v-overlay>
          <template v-slot:activator="{ props }">
            <v-container v-bind="props" class="fill-height d-flex align-start">
              <h2 class="text-h4" 
                  style="writing-mode: vertical-rl; text-orientation: mixed; color: white; font-weight: bold; margin-left: 20px; margin-top: 200px;">
                ACCESSORIES
              </h2>
            </v-container>
          </template>
        </v-overlay>
      </v-parallax>
    </v-col>
  </v-row>
</v-container>
<v-parallax src="public/pexels-pavel-danilyuk-6461397.jpg" height="600">
  <v-row class="fill-height d-flex align-center text-white px-8">
    <!-- Left Column: Text and Button -->
    <v-col cols="6" class="d-flex flex-column justify-center">
      <h1 class="text-h2 font-weight-bold mb-4" style="color: white;">
        <span style="color: #FFCC00;">CampusThreads</span>
      </h1>
      <h2 class="text-h4 font-weight-regular mb-6" style="line-height: 1.5; color: white;">
        With <span style="color: #FFCC00;">CampusThreads</span>, you can create & showcase
        custom merchandise for your <span style="color: #FFCC00;">college departments</span> 
        or organization in an exclusive online store.
      </h2>
      <v-btn outlined rounded class="text-none" style="color: #537346; border-color: #537346; padding: 10px 24px; width: 120px;">
  Get Started
</v-btn>

    </v-col>

    <!-- Right Column: Image -->
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-img src="public\1eace6f4f286927833a35f8e45cc92bc (1).gif" max-width="100%" max-height="400" contain></v-img>
    </v-col>
  </v-row>
</v-parallax>



    </template>
  </AppLayout>
</template>
