<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import { ref } from 'vue'

// Example data for the team members
const teamMembers = ref([
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    image: 'https://via.placeholder.com/150',
    description: 'John is the visionary behind CampusThreads, focusing on creating a seamless campus community.'
  },
  {
    name: 'Jane Smith',
    role: 'CTO & Co-Founder',
    image: 'https://via.placeholder.com/150',
    description: 'Jane oversees all technical aspects of CampusThreads, ensuring smooth platform functionality.'
  },
  {
    name: 'Emily Johnson',
    role: 'Lead Developer',
    image: 'https://via.placeholder.com/150',
    description: 'Emily is responsible for the front-end development and ensuring a responsive user experience.'
  },
  {
    name: 'David Brown',
    role: 'Marketing & Outreach',
    image: 'https://via.placeholder.com/150',
    description: 'David manages the platform\'s marketing and user engagement strategies.'
  }
])

</script>
<template>
    <AppLayout>
<template #content>
  <v-container fluid>
    <v-row>
      <!-- Page Title -->
      <v-col cols="12">
        <v-typography variant="h3" class="text-center">
          About CampusThreads
        </v-typography>
      </v-col>

      <!-- About Section -->
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Welcome to CampusThreads</v-card-title>
          <v-card-text>
            CampusThreads is a platform designed to connect students, faculty, and staff across universities. Our mission is to provide a seamless way for students to engage with each other, stay updated on campus events, and foster a stronger sense of community.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Mission Section -->
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Our Mission</v-card-title>
          <v-card-text>
            At CampusThreads, we believe that a connected campus is a thriving campus. Our mission is to create a space where students can engage, collaborate, and grow together—whether it's sharing resources, finding study groups, or just connecting with new people.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Team Section -->
      <v-col cols="12">
        <v-typography variant="h4" class="text-center">Meet Our Team</v-typography>
        <v-row>
          <v-col
            v-for="(member, index) in teamMembers"
            :key="index"
            cols="12" sm="6" md="3"
            class="d-flex justify-center mb-4"
          >
            <v-card class="text-center" :elevation="4" width="250">
              <v-img :src="member.image" aspect-ratio="1" contain class="rounded-circle"></v-img>
              <v-card-title class="font-weight-bold">{{ member.name }}</v-card-title>
              <v-card-subtitle>{{ member.role }}</v-card-subtitle>
              <v-card-text>{{ member.description }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Technology Stack Section -->
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Our Technology Stack</v-card-title>
          <v-card-text>
            We use modern technologies to build and maintain CampusThreads. Our tech stack includes:
            <ul>
              <li>Frontend: Vue.js, Vuetify</li>
              <li>Backend: Node.js, Express</li>
              <li>Database: MongoDB</li>
              <li>Hosting: Vercel, Heroku</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Contact Information Section -->
      <v-col cols="12" md="8" class="mx-auto">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Contact Us</v-card-title>
          <v-card-text>
            Have any questions? Reach out to us via email at <strong>support@campusthreads.com</strong>.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
</AppLayout>
</template>

<style scoped>
.text-center {
  text-align: center;
}

.v-card {
  background-color: #fafafa;
}

.v-img {
  max-width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;
}
</style>
