<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import WelcomeUsers from '@/components/layout/WelcomeUsers.vue'

const items = [
  { src: '/bb5c7a2ae83123e155fddf6d11040816.jpg' },
  { src: '/csu.jpg' },
  { src: '/55b172c9edee65f683757cb9d49e6b8a.jpg' },
  { src: '/bbc2ba5d1153d0f86705527cc838b68b.jpg' },
]

import { ref } from 'vue'

const cards = [
  {
    link: '/ccis',
    title: 'College of Computing and Information Sciences',
    subtitle: 'IT, CS, IS',
    image: '/ccis1.jpg',
    description:
      'Gain expertise in software development, data science, and cybersecurity, preparing you for impactful careers in tech.',
  },
  {
    link: '/cmns',
    title: 'College of Mathematics and Natural Science',
    subtitle: 'MATH, APPLIEDMATH, PHYSICS, CHEMISTRY',
    image: '/cmns.jpg',
    description:
      'Discover the principles of natural sciences and advanced mathematics, building a foundation for research and analysis.',
  },
  {
    link: '/cofes',
    title: 'College of Forestry and Environmental Science',
    subtitle: 'ES, FORESTRY, AGROFORESTRY',
    image: '/pexels-ivan-drazic-20457695-20385805.jpg',
    description:
      'Develop skills in sustainable forestry and environmental management to protect ecosystems and resources.',
  },
  {
    link: '/ced',
    title: 'College of Education',
    subtitle: 'ELEM, ENG, SCIENCE, MATH, FIL',
    image: '/ced.jpg',
    description:
      'Equip yourself with essential teaching skills and knowledge to inspire and educate future generations.',
  },
  {
    link: '/cegs',
    title: 'College of Engineering and Geo-Sciences',
    subtitle: 'GE, CE, ECE, GEOL, ME',
    image: '/cegs.jpg',
    description:
      'Master engineering principles and geoscience knowledge to solve complex environmental and infrastructural challenges.',
  },
  {
    link: '/caa',
    title: 'College of Agriculture and Agri-Industries',
    subtitle: 'AGRI, AGRITECH',
    image: '/caa.jpg',
    description:
      'Explore agricultural sciences and technology, advancing skills in sustainable farming and food production.',
  },
  {
    link: '/chass',
    title: 'College of Humanities and Social Sciences',
    subtitle: 'SW, PSYCH, SOCIO',
    image: '/chass.jpg',
    description:
      'Engage with diverse perspectives in humanities and social sciences, fostering critical thinking and cultural understanding.',
  },
]

const show = ref(Array(cards.length).fill(false))

const toggleShow = index => {
  show.value[index] = !show.value[index]
}
const shopItems = [
  {
    name: 'University Exclusive Outfit',
    image: '/b0ac2c12da0c00691252ef81e3f9d4b1.jpg ',
  },
  {
    name: 'Department Lanyard',
    image: '/c5b9fc3dca0f741158fdb98153f4d147.jpg',
  },
  {
    name: 'Campus Accessory',
    image: '/c8d902f304580e3a65c358a71c0cd760.png',
  },
  {
    name: 'Department Tees',
    image: '/b438a2cb928c528ee494e31b275d8f06.jpg',
  },
]
</script>

<template>
  <AppLayout>
    <template #content>
      <WelcomeUsers />
      <div class="carousel-wrapper">
        <v-carousel
          data-aos="fade-up"
          data-aos-delay="200"
          :show-arrows="false"
          :cycle="true"
          :interval="4000"
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            class="carousel-item-with-gradient"
          >
            <!-- Gradient and Image Background -->
            <div
              class="image-overlay"
              :style="{
                backgroundImage: `linear-gradient(to top right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.22)), url(${item.src})`,
              }"
            ></div>

            <!-- Text Content -->
            <v-container
              class="text-content d-flex flex-column justify-center align-center"
            >
              <h1
                data-aos="fade-up"
                data-aos-duration="1000"
                class="display-2"
                style="font-weight: bold; font-size: 4rem"
              >
                University Spirit Merchandise Hub
              </h1>
              <p
                class="text-h5"
                style="max-width: 600px; text-align: center; margin-top: 20px"
              >
                Your one-stop shop for all campus gear and essentials.
              </p>
            </v-container>
          </v-carousel-item>
        </v-carousel>
      </div>

      <v-container class="text-center mt-8">
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          class="text-h4 font-weight-bold mb-4"
          style="color: #111703; font-size: 2rem"
        >
          "Wear Your School Spirit, Share Your Pride"
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="1000"
          class="text-h6"
          style="
            color: #2e3b1f;
            font-size: 1rem;
            max-width: 900px;
            margin: 0 auto;
          "
        >
          "Our university gear lets you showcase your pride and connection to
          campus. Celebrate your journey and represent your alma mater with
          confidence!"
        </p>
      </v-container>
      <v-container fluid>
        <v-row>
          <v-col data-aos="fade-up-right" data-aos-duration="800" cols="4">
            <div class="carousel-wrapper">
              <v-parallax
                gradient="to top right, rgba(0, 0, 0, 0.3), rgba(25, 32, 72, 0.7)"
                height="600"
                src="/lanyard.jpg"
              >
                <v-overlay>
                  <template v-slot:activator="{ props }">
                    <v-container
                      v-bind="props"
                      class="fill-height d-flex align-start"
                    >
                      <h2
                        class="text-h4"
                        style="
                          writing-mode: vertical-rl;
                          text-orientation: mixed;
                          color: #c9d7b6;
                          font-weight: bold;
                          margin-left: 20px;
                          margin-top: 200px;
                        "
                      >
                        LANYARDS
                      </h2>
                    </v-container>
                  </template>
                </v-overlay>
              </v-parallax>
            </div>
          </v-col>

          <v-col cols="4">
            <div class="carousel-wrapper">
              <v-parallax
                data-aos="fade-down"
                data-aos-duration="800"
                gradient="to top right, rgba(0, 0, 0, 0.3), rgba(25, 32, 72, 0.7)"
                height="600"
                src="/uniforms.jpg"
              >
                <v-overlay>
                  <template v-slot:activator="{ props }">
                    <v-container
                      v-bind="props"
                      class="fill-height d-flex align-start"
                    >
                      <h2
                        class="text-h4"
                        style="
                          writing-mode: vertical-rl;
                          text-orientation: mixed;
                          color: #c9d7b6;
                          font-weight: bold;
                          margin-left: 20px;
                          margin-top: 200px;
                        "
                      >
                        UNIFORMS
                      </h2>
                    </v-container>
                  </template>
                </v-overlay>
              </v-parallax>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="carousel-wrapper">
              <v-parallax
                data-aos="fade-up-left"
                data-aos-duration="800"
                gradient="to top right, rgba(0, 0, 0, 0.3), rgba(25, 32, 72, 0.7)"
                height="600"
                src="/accessories.jpg"
              >
                <v-overlay>
                  <template v-slot:activator="{ props }">
                    <v-container
                      v-bind="props"
                      class="fill-height d-flex align-start"
                    >
                      <h2
                        class="text-h4"
                        style="
                          writing-mode: vertical-rl;
                          text-orientation: mixed;
                          color: #c9d7b6;
                          font-weight: bold;
                          margin-left: 20px;
                          margin-top: 200px;
                        "
                      >
                        ACCESSORIES
                      </h2>
                    </v-container>
                  </template>
                </v-overlay>
              </v-parallax>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="text-center mt-8">
        <h1
          data-aos="fade-up"
          data-aos-duration="800"
          class="display-2 font-weight-bold mb-2"
          style="color: #111703"
        >
          "Inspiring the Future, Empowering the Present"
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="800"
          class="text-h6 mb-2"
          style="color: #2e3b1f; font-size: 1rem; max-width: 900px; color: #333"
        >
          Discover, Learn, and Grow with Us – Where Education and Excellence
          Meet
        </p>
      </v-container>

      <v-responsive class="video-fullscreen" aspect-ratio="16/9">
        <video
          data-aos="fade-up"
          data-aos-duration="800"
          autoplay
          loop
          playsinline
          controls
          style="width: 100%; height: 100%; object-fit: cover"
        >
          <source
            src="/videos/464664855_8759599854100641_1316003168808465613_n.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </v-responsive>

      <v-container class="text-center mt-8">
        <h1
          data-aos="fade-up"
          data-aos-duration="500"
          class="display-2 font-weight-bold mb-2"
        >
          "Wear your pride. With CampusThreads, your college spirit comes to
          life through custom merchandise."
        </h1>
      </v-container>
      <v-parallax
        data-aos="fade-up"
        data-aos-duration="800"
        elevation-18
        class="mb-10"
        rounded
        src="/pexels-pavel-danilyuk-6461397.jpg"
        height="auto"
        style="margin-top: 20px"
      >
        <v-row class="fill-height d-flex align-center text-white px-8">
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="d-flex flex-column justify-center"
          >
            <h1 class="text-h2 font-weight-bold mb-4" style="color: white">
              <span
                data-aos="fade-up"
                data-aos-duration="800"
                style="color: #ffcc00"
                >CampusThreads</span
              >
            </h1>
            <h2
              data-aos="fade-up"
              data-aos-duration="800"
              class="text-h4 font-weight-regular mb-6"
              style="line-height: 1.3; color: white"
            >
              With
              <span
                data-aos="fade-up"
                data-aos-duration="800"
                style="color: #ffcc00"
                >CampusThreads</span
              >, you can create & showcase custom merchandise for your
              <span
                data-aos="fade-up"
                data-aos-duration="800"
                style="color: #ffcc00"
                >college departments</span
              >
              or organization in an exclusive online store.
            </h2>
            <v-btn
              data-aos="fade-up"
              data-aos-duration="200"
              outlined
              rounded
              class="text-none"
              to="/login"
              style="
                color: #537346;
                font-weight: bold;
                border-color: #537346;
                padding: 10px 24px;
                width: 120px;
              "
            >
              Get Started
            </v-btn>
          </v-col>

          <v-col class="d-flex justify-center align-center">
            <v-img
              data-aos="zoom-out-left"
              data-aos-duration="500"
              src="/1eace6f4f286927833a35f8e45cc92bc (1).gif"
              width="100%"
              max-height="500"
              contain
            ></v-img>
          </v-col>
        </v-row>
      </v-parallax>

      <v-col cols="12" class="text-center">
        <h1
          data-aos="fade-up"
          data-aos-duration="500"
          class="text-h3 font-weight-bold mb-2"
          style="color: #2e3b1f"
        >
          College Departments
        </h1>
        <p
          data-aos="fade-down-right"
          data-aos-duration="800"
          class="text-body-1 mb-4"
          style="font-size: 1.2rem; color: #333"
        >
          Discover merchandise from all our colleges. Browse unique
          <br />items from each department and show your school spirit!
        </p>
        <v-btn
          data-aos="fade-up"
          data-aos-duration="1000"
          outlined
          rounded
          class="text-none mb-2"
          to="merchs"
          style="
            color: #537346;
            font-weight: bold;
            border-color: #537346;
            padding: 8px 20px;
            width: 180px;
          "
        >
          View Merchandise
        </v-btn>
      </v-col>

      <v-container fluid>
        <v-row>
          <v-col
            data-aos="slide-left"
            data-aos-duration="1000"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(card, index) in cards.slice(0, 4)"
            :key="index"
          >
            <v-card max-width="344" class="custom-card elevation-10">
              <!-- Card Image -->
              <v-img :src="card.image" height="200px" cover></v-img>

              <!-- Card Title and Subtitle -->
              <v-card-title class="card-title">{{ card.title }}</v-card-title>
              <v-card-subtitle class="card-subtitle">{{
                card.subtitle
              }}</v-card-subtitle>

              <!-- Card Actions -->
              <v-card-actions class="card-actions">
                <v-btn :to="card.link" text class="explore-btn">Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="toggle-btn"
                  @click="toggleShow(index)"
                ></v-btn>
              </v-card-actions>

              <!-- Expandable Content -->
              <v-expand-transition>
                <div v-show="show[index]" class="expanded-content">
                  <v-divider></v-divider>
                  <v-card-text class="card-text">{{
                    card.description
                  }}</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>

          <v-col
            data-aos="slide-right"
            data-aos-duration="1000"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="(card, index) in cards.slice(4, 7)"
            :key="index"
          >
            <v-card max-width="344" class="custom-card elevation-10">
              <!-- Card Image -->
              <v-img :src="card.image" height="200px" cover></v-img>

              <!-- Card Title and Subtitle -->
              <v-card-title class="card-title">{{ card.title }}</v-card-title>
              <v-card-subtitle class="card-subtitle">{{
                card.subtitle
              }}</v-card-subtitle>

              <!-- Card Actions -->
              <v-card-actions class="card-actions">
                <v-btn :to="card.link" text class="explore-btn">Explore</v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :icon="show[index] ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="toggle-btn"
                  @click="toggleShow(index)"
                ></v-btn>
              </v-card-actions>

              <!-- Expandable Content -->
              <v-expand-transition>
                <div v-show="show[index]" class="expanded-content">
                  <v-divider></v-divider>
                  <v-card-text class="card-text">{{
                    card.description
                  }}</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="text-center my-5">
        <h1
          data-aos="fade-left"
          data-aos-duration="800"
          class="text-h3 font-weight-bold mb-4"
          style="color: #2e3b1f"
        >
          Our Merchandise
        </h1>
        <p data-aos="fade-right" data-aos-duration="800" class="subtitle-1">
          Discover this season’s must-haves and elevate your campus wardrobe to
          new heights!
        </p>
      </v-container>

      <v-row class="text-center">
        <v-col
          data-aos="slide-left"
          data-aos-duration="800"
          cols="12"
          sm="6"
          md="3"
          lg="3"
          v-for="(item, index) in shopItems"
          :key="index"
        >
          <v-img
            :src="item.image"
            height="250px"
            cover
            class="hover-effect"
          ></v-img>
          <h3 class="mt-3" style="color: #2e3b1f">{{ item.name }}</h3>
          <router-link
            to="/merchs"
            style="text-decoration: underline; color: black"
          >
            Shop Now
          </router-link>
        </v-col>
      </v-row>
    </template>
  </AppLayout>
</template>

<style scoped>
.video-fullscreen {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.hover-effect {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.hover-effect:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.v-carousel-item {
  position: relative;
}

.display-2 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.carousel-item-with-gradient {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.image-overlay {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 1; /* Place behind the text */
}

.text-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #c9d7b6;
  z-index: 2;
}

.carousel-wrapper {
  border-radius: 20px;
  overflow: hidden;
}

.custom-card {
  border-radius: 12px;
  overflow: hidden;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.custom-card:hover {
  transform: translateY(-5px);
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #162013;
  text-align: center;
  margin-top: 10px;
}

.card-subtitle {
  font-size: 1rem;
  color: #40513b;
  text-align: center;
  margin-bottom: 10px;
}

.card-actions {
  display: flex;
  align-items: center;
  padding: 10px;
}

.explore-btn {
  background-color: #40513b; /* Button background */
  color: white; /* Text color */
  border-radius: 20px;
  padding: 5px 15px;
  transition: background-color 0.2s ease;
}

.explore-btn:hover {
  background-color: #2b3c27; /* Darker shade on hover */
}

.toggle-btn {
  color: #40513b; /* Icon color */
}

.expanded-content {
  padding: 10px;
  background-color: #f1f3f5; /* Light grey for expanded content */
}

.card-text {
  font-size: 0.9rem;
  color: #343a40;
}
</style>
