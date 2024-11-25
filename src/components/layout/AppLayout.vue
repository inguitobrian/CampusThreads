<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import ProfileHeader from './ProfileHeader.vue'

const theme = ref('light')
const isLoggedIn = ref(false)
const drawer = ref(false) // for the navigation drawer on mobile and large screens

// List of departments for dropdown
const departments = ref([
  { name: 'CCIS', route: '/ccis' },
  { name: 'CEGS', route: '/cegs' },
  { name: 'CED', route: '/ced' },
  { name: 'CHASS', route: '/chass' },
  { name: 'CMNS', route: '/cmns' },
  { name: 'COFES', route: '/cofes' },
  { name: 'CAA', route: '/caa' },
])

// Manage dropdown visibility
const menuVisible = ref(false)

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await isAuthenticated()
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>

<template>
  <v-responsive class="border rounded">
    <v-app
      :theme="theme"
      style="background-color: #e1ebdc; font-family: 'Roboto', sans-serif"
    >
      <!-- App Bar with Hamburger Icon for Mobile and Large Screen -->
      <v-app-bar :style="{ backgroundColor: '#111703' }" class="px-3 nav-bar">
        <!-- Mobile and Desktop View: Hamburger Icon -->
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          style="color: white"
          class="d-block"
        ></v-app-bar-nav-icon>

        <v-toolbar-title
          style="color: white; font-family: 'Montserrat', sans-serif"
          >CampusThreads</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <!-- Profile Header only for logged-in users -->
        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
      </v-app-bar>

      <!-- Mobile Navigation Drawer (Hamburger Menu Content) -->
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list dense>
          <!-- Home Link with Icon -->
          <v-list-item link to="/">
            <v-icon left class="mr-2">mdi-home</v-icon>
            <v-list-item-content>Home</v-list-item-content>
          </v-list-item>

          <!-- Colleges Dropdown -->
          <v-list-item @click="menuVisible = !menuVisible">
            <v-icon left class="mr-2">mdi-school</v-icon>
            <v-list-item-content>Colleges</v-list-item-content>
            <v-icon :style="{ transform: menuVisible ? 'rotate(180deg)' : 'rotate(0deg)' }">mdi-chevron-down</v-icon>
          </v-list-item>

          <!-- Dropdown menu for colleges -->
          <v-slide-y-transition>
            <v-list v-if="menuVisible" dense>
              <v-list-item
                v-for="(dept, index) in departments"
                :key="index"
                :to="dept.route"
                link
              >
                <v-list-item-content>{{ dept.name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-slide-y-transition>

          <!-- Shop All Link with Icon -->
          <v-list-item link to="/merchs">
            <v-icon left class="mr-2">mdi-cart</v-icon>
            <v-list-item-content>Shop all</v-list-item-content>
          </v-list-item>

          <!-- About Link with Icon -->
          <v-list-item link to="/about">
            <v-icon left class="mr-2">mdi-information</v-icon>
            <v-list-item-content>About</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <slot name="content"></slot>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.nav-bar {
  min-height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.footer {
  background: linear-gradient(135deg, #d0ebde, #b0ebc3); /* Purple gradient */
  padding: 20px 0;
}
</style>
