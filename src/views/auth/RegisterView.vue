<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const theme = ref('light')
const visible = ref(false)
const reenter = ref(false)
const isAdmin = ref(false)
const rememberMe = ref(false)
const drawer = ref(false) // for the navigation drawer on mobile screens
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
          <v-row justify="end">
            <v-col cols="12" md="6" class="d-flex justify-center">
              <v-card
                class="text-center rounded-xl"
                elevation="24"
                style="
                  max-width: 400px;
                  background: linear-gradient(
                    to top,
                    #b4cca9,
                    #cdddc6,
                    #ffffff,
                    #ffffff
                  );
                  padding: 20px; /* Optional: Add padding to ensure content does not touch edges */
                "
              >
                <div
                  class="d-flex align-center justify-center"
                  style="gap: 16px"
                >
                  <v-img
                    src="/i_logo.png"
                    alt="Custom Logo"
                    max-width="40px"
                    contain
                  ></v-img>

                  <v-card-title
                    class="text-h4 font-weight-medium light-green-darken-4"
                    style="margin: 0; color: #40513b"
                  >
                    <span>Let's get started</span>
                  </v-card-title>
                </div>

                <v-card-text class="d-flex justify-center pa-0">
                  <v-btn
                    @click="isAdmin = false"
                    :class="{ 'bg-student': !isAdmin }"
                    style="color: #cdd7bf"
                    class="mr-5"
                    >Student</v-btn
                  >

                  <v-btn
                    @click="isAdmin = true"
                    :class="{ 'bg-admin': isAdmin }"
                    style="color: #cdd7bf"
                    >Admin</v-btn
                  >
                </v-card-text>

                <v-card-text class="bg-surface-white mx-8 text-center">
                  {{
                    isAdmin
                      ? 'Sign Up to your CampusThreads Admin account.'
                      : 'Sign Up to your CampusThreads Student account.'
                  }}
                </v-card-text>

                <v-card-text>
                  <v-form fast-fail @submit.prevent>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          label="First Name"
                          prepend-inner-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          label="Last Name"
                          prepend-inner-icon="mdi-account"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-text-field
                      label="Phone Number"
                      prepend-inner-icon="mdi mdi-phone"
                    ></v-text-field>

                    <v-text-field
                      label="email"
                      prepend-inner-icon="mdi-email-outline"
                    ></v-text-field>

                    <v-text-field
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      label="Password"
                      prepend-inner-icon="mdi-lock-outline"
                      @click:append-inner="visible = !visible"
                    ></v-text-field>

                    <v-text-field
                      :append-inner-icon="reenter ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="reenter ? 'text' : 'password'"
                      label="Re-enter Password"
                      prepend-inner-icon="mdi-lock-outline"
                      @click:append-inner="reenter = !reenter"
                    ></v-text-field>

                    <v-btn
                      class="mt-2 mb-3 text-h6 font-weight-bold bg-login"
                      size="large"
                      type="submit"
                      block
                      style="color: #162013"
                      >Create my Account
                    </v-btn>
                    <v-card-text class="text-center">
                      <span style="color: #40513b; text-decoration: none"
                        >Already have an account?</span
                      >
                      <RouterLink
                        style="color: #0000ff; text-decoration: underline"
                        to="/"
                      >
                        Log in here</RouterLink
                      >
                    </v-card-text>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
              <v-col cols="12" md="10" class="d-flex flex-column">
                <v-img
                  src="/pana.svg"
                  alt="Login Image"
                  class="pa-2"
                  cover
                ></v-img>
                <span
                  class="text-h5"
                  style="color: #40513b; margin-top: 20px; text-align: center"
                >
                  Stay connected and enjoy the latest from
                  <span class="font-weight-bold text-h5">CampusThreads</span>!
                </span>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer border style="background-color: #111703; color: white">
        2024 - CampusThreads
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
</style>
