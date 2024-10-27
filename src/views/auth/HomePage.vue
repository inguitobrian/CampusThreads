<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'

const items = [
  { src: 'public/pexels-daiangan-102129.jpg' },
  { src: 'public/DJI_0016 (1).jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
  { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' },
]

import { ref } from 'vue';

// Array of card data with unique images, titles, subtitles, and descriptions
const cards = [
  {
    title: 'College of Computing and Information Sciences',
    subtitle: 'Bask in the golden rays',
    image: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg',
    description: 'Explore the stunning coastline with warm beaches and vibrant culture.',
  },
  {
    title: 'College of Mathematics and Natural Science',
    subtitle: 'Reach new heights',
    image: 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg',
    description: 'Conquer the towering mountains and enjoy breathtaking views.',
  },
  {
    title: 'College of Forestry and Enviromental Science',
    subtitle: 'Cityscapes and skylines',
    image: 'https://cdn.vuetifyjs.com/images/cards/city.jpg',
    description: 'Discover the bustling city life, where every corner has a story.',
  },
  {
    title: 'College of Education',
    subtitle: 'A green escape',
    image: 'https://cdn.vuetifyjs.com/images/cards/forest.jpg',
    description: 'Relax in the tranquility of nature and enjoy fresh air in lush forests.',
  },
  {
    title: 'College of Engineering and Geo-Sciences',
    subtitle: 'Endless sands',
    image: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
    description: 'Experience the beauty and mystery of the vast desert landscape.',
  },
  {
    title: 'College of Agriculture and Agri-Industries',
    subtitle: 'Winter’s embrace',
    image: 'https://cdn.vuetifyjs.com/images/cards/snow.jpg',
    description: 'Embrace the magic of snowy landscapes and enjoy winter sports.',
  },
  {
    title: 'College of Humanities and Social Sciences',
    subtitle: 'Reflections of peace',
    image: 'https://cdn.vuetifyjs.com/images/cards/lake.jpg',
    description: 'Find peace by the lakeside with calm waters and serene surroundings.',
  },
];

// Create an array to track the "show" state for each card
const show = ref(Array(cards.length).fill(false));

// Toggle function to change "show" state for a specific card
const toggleShow = (index) => {
  show.value[index] = !show.value[index];
};
</script>

<template>
  <AppLayout>
    <template #content>
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          cover
        ></v-carousel-item>
      </v-carousel>

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
   
    <v-col cols="6" class="d-flex flex-column justify-center">
      <h1 class="text-h2 font-weight-bold mb-4" style="color: white;">
        <span style="color: #FFCC00;">CampusThreads</span>
      </h1>
      <h2 class="text-h4 font-weight-regular mb-6" style="line-height: 1.5; color: white;">
        With <span style="color: #FFCC00;">CampusThreads</span>, you can create & showcase
        custom merchandise for your <span style="color: #FFCC00;">college departments</span> 
        or organization in an exclusive online store.
      </h2>
      <v-btn outlined rounded class="text-none" style="color: #537346; font-weight: bold; border-color: #537346; padding: 10px 24px; width: 120px;">
  Get Started
</v-btn>

    </v-col>

    
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-img src="public\1eace6f4f286927833a35f8e45cc92bc (1).gif" max-width="100%" max-height="400" contain></v-img>
    </v-col>
  </v-row>
</v-parallax>


<v-container fluid class="mt-4 d-flex justify-center align-center" style="height: 50vh;">
    
    <v-col cols="12" class="text-center">
      <h1 class="text-h3 font-weight-bold mb-2" style="color: #537346;">
        College Departments
      </h1>
      <p class="text-body-1 mb-4" style="font-size: 1.2rem; color: #333;">
        Discover merchandise from all our colleges. Browse unique <br>items from each department and show your school spirit!
      </p>
      <v-btn outlined rounded class="text-none" style="color: #537346; font-weight: bold; border-color: #537346; padding: 8px 20px; width: 180px;">
        View Merchandise
      </v-btn>
    </v-col>
</v-container>
<v-container fluid>
    <!-- First row with 4 cards -->
    <v-row>
      <v-col cols="3" v-for="(card, index) in cards.slice(0, 4)" :key="index">
        <v-card max-width="344">
          <v-img :src="card.image" height="200px" cover></v-img>

          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text>Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="toggleShow(index)"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show[index]">
              <v-divider></v-divider>
              <v-card-text>{{ card.description }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <!-- Second row with 3 centered cards -->
    <v-row justify="center">
      <v-col cols="3" v-for="(card, index) in cards.slice(4, 7)" :key="4 + index">
        <v-card max-width="344">
          <v-img :src="card.image" height="200px" cover></v-img>

          <v-card-title>{{ card.title }}</v-card-title>
          <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange-lighten-2" text>Explore</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :icon="show[4 + index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="toggleShow(4 + index)"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show[4 + index]">
              <v-divider></v-divider>
              <v-card-text>{{ card.description }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>







    </template>
  </AppLayout>
</template>
