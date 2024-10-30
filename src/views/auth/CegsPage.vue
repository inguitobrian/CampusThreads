<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'

import { ref } from 'vue';

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
  <AppLayout>
    <template #content>
   
      <v-img src="public/pexels-karinarud-11964281.jpg" height="400px" cover></v-img>

      <v-container class="text-center mt-8">
        <h1 class="text-h4 font-weight-bold mb-4" style="font-size: 2rem;">
            "Build your future and your wardrobe with our engineering gear."
        </h1>
        <p class="text-body-1" style="font-size: 1rem; font-weight: bold; max-width: 900px; margin: 0 auto;">
            "Craft your identity—wear the gear that speaks to your engineering heart."
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

      <v-container class="text-right">
        <v-btn @click="prevSet" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn @click="nextSet" icon>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
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
    </template>
  </AppLayout>
</template>
