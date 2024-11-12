<script setup>
import { isAuthenticated } from '@/utils/supabase'
import { onMounted, ref } from 'vue'
import ProfileHeader from './ProfileHeader.vue'

const theme = ref('light')
const isLoggedIn = ref(false)
const drawer = ref(false) // for the navigation drawer on mobile screens

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
      <!-- App Bar -->
      <v-app-bar :style="{ backgroundColor: '#111703' }" class="px-3 nav-bar">
        <!-- Mobile View: Hamburger Icon -->
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          style="color: white"
          class="d-lg-none"
        ></v-app-bar-nav-icon>

        <!-- Toolbar Title -->
        <v-toolbar-title
          style="color: white; font-family: 'Montserrat', sans-serif"
          >CampusThreads</v-toolbar-title
        >

        <v-spacer></v-spacer>

        <!-- Desktop View: Nav Buttons -->
        <div class="d-none d-lg-flex nav-buttons">
          <v-btn text style="color: white" to="/home">Home</v-btn>

          <!-- Departments Dropdown -->
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text v-bind="attrs" v-on="on" style="color: white"
                >Departments</v-btn
              >
            </template>
            <v-list>
              <v-list-item
                v-for="(dept, index) in departments"
                :key="index"
                :to="dept.route"
              >
                <v-list-item-content>{{ dept.name }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn text style="color: white">Shop all</v-btn>
          <v-btn text style="color: white">About</v-btn>
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

        <ProfileHeader v-if="isLoggedIn"></ProfileHeader>
      </v-app-bar>

      <!-- Mobile Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" app temporary>
        <v-list dense>
          <v-list-item link to="/home">
            <v-list-item-content>Home</v-list-item-content>
          </v-list-item>

          <v-subheader>Departments</v-subheader>
          <v-list-item
            v-for="(dept, index) in departments"
            :key="index"
            :to="dept.route"
          >
            <v-list-item-content>{{ dept.name }}</v-list-item-content>
          </v-list-item>

          <v-list-item link to="/merchs">
            <v-list-item-content>Shop all</v-list-item-content>
          </v-list-item>

          <v-list-item link>
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

      <v-footer class="footer" padless>
        <v-container class="text-center">
          <v-row align="center" justify="center">
            <!-- Center Column: Links in a single line -->
            <v-col cols="12" md="12">
              <span style="color: black; font-size: 14px; margin-right: 20px"
                >Privacy Policy</span
              >
              <span style="color: black; font-size: 14px; margin-right: 20px"
                >Terms of Service</span
              >
              <span style="color: black; font-size: 14px; margin-right: 20px"
                >FAQs</span
              >
              <span style="color: black; font-size: 14px; margin-right: 20px"
                >Feedback</span
              >
            </v-col>
          </v-row>

          <!-- Bottom Row: Website Name -->
          <v-row>
            <v-col class="text-center" cols="12">
              <span style="color: black; font-size: 14px"
                ><b>© 2024 CampusThreads. All Rights Reserved.</b></span
              >
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
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

.footer {
  background: linear-gradient(135deg, #d0ebde, #b0ebc3); /* Purple gradient */
  padding: 20px 0;
}
</style>
