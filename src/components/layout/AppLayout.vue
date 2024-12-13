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

        <v-img
          src="/Campusthreads.png"
          alt="Custom Logo"
          max-width="40px"
          contain
        ></v-img>

        <v-toolbar-title
          class="pa-0 ma-2"
          style="color: white; font-family: 'Manrope', sans-serif; font-weight: 500;"
        >
          CampusThreads.
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="!isLoggedIn" class="login-btn" to="/login">
          <span class="mdi mdi-login yes"></span>
          Login
        </v-btn>
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
            <v-icon
              :style="{ transform: menuVisible ? 'rotate(180deg)' : 'rotate(0deg)' }"
            >
              mdi-chevron-down
            </v-icon>
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

      <!-- Footer -->
      <v-footer class="footer">
        <v-container>
          <v-row justify="space-between">
            <!-- Left-aligned text -->
            <v-col cols="12" sm="6" class="text-center text-sm-start">
              <span>&copy; 2024 CampusThreads. All Rights Reserved.</span>
            </v-col>

            <!-- Right-aligned links in a single line -->
            <v-col cols="12" sm="6" class="text-center text-sm-end">
              <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
              <span class="footer-divider">|</span>
              <a href="/terms-of-service" class="footer-link">Terms of Service</a>
              <span class="footer-divider">|</span>
              <a href="/faqs" class="footer-link">FAQs</a>
              <span class="footer-divider">|</span>
              <a href="/feedback" class="footer-link">Feedback</a>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
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

.v-navigation-drawer {
  background: linear-gradient(to top, #111703, #2e3b1f); /* Gradient background */
  color: white;
  font-family: 'Roboto', sans-serif;
  padding: 16px;
}

.v-navigation-drawer a {
  color: #c9d7b6;
  text-decoration: none;
}

.v-navigation-drawer a:hover {
  color: #f0f0f0;
  font-weight: bold;
}

.footer {
  background: linear-gradient(135deg, #111703, #2e3b1f);
  color: #f0f0f0;
  padding: 16px 0;
  font-size: 0.9rem;
  position: relative;
  width: 100%;
}

.footer-link {
  color: #f0f0f0;
  text-decoration: none;
  margin: 0 8px;
}

.footer-link:hover {
  color: #c9d7b6;
}

.footer-divider {
  color: #f0f0f0;
  margin: 0 4px;
}

.v-main {
  min-height: 100vh;
}

.login-btn {
  background: linear-gradient(135deg, #c9d7b6, #1b5f13);
  color: white;
  font-weight: bold;
  font-family: 'Manrope', sans-serif;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #c9d7b6, #958c72);
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}
</style>
