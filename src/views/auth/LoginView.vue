<script setup>
import { ref } from 'vue'

const theme = ref('light')
const visible = ref(false) 
const isAdmin = ref(false)
const rememberMe = ref(false) 
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme" style="background-color: #e1ebdc; font-family: 'Roboto', sans-serif;">
      <v-app-bar :style="{ backgroundColor: '#111703' }" class="px-3">
        <v-toolbar-title class="mr-8" style="color: white; font-family: 'Montserrat', sans-serif;">CampusThreads</v-toolbar-title>

        <v-btn text class="mr-1" style="color: white">Home</v-btn>
        <v-btn text class="mr-1" style="color: white">Departments</v-btn>
        <v-btn text class="mr-1" style="color: white">Shop all</v-btn>
        <v-btn text class="mr-1" style="color: white">About</v-btn>
        <v-spacer></v-spacer>
        <v-text-field
          class="mx-4"
          style="color: white"
          prepend-inner-icon="mdi-magnify"
          placeholder="search"
          hide-details
          dense
          solo
        ></v-text-field>
        <v-btn class="mr-5 ml-5" style="color: white">
          <v-icon left>mdi-account</v-icon>
          Log In
        </v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row justify="end">
            <v-col cols="12" md="6" class="d-flex justify-center align-center">
              <v-col cols="12" md="10" class="d-flex flex-column">
                <v-img
                  src="/images/loginimage.svg"
                  alt="Login Image"
                  class="pa-2"
                  cover
                ></v-img>
                <span
                  class="font-weight-bold text-h6"
                  style="color: black; margin-top: 20px; text-align: center"
                >
                  Stay connected and enjoy the latest from CampusThreads
                </span>
              </v-col>
            </v-col>
            <v-col cols="12" md="6" class="d-flex justify-center">
              <v-card
                class="text-center rounded-xl elevation-10"
                prepend-icon="$vuetify"
                style="max-width: 400px"
                height="auto"
              >
               
                <v-card-title
                  class="text-h4 font-weight-black light-green-darken-4"
                >
                  <span>Welcome Back!</span>
                </v-card-title>

               
                <v-card-text class="d-flex justify-center mb-4">
                  <v-btn @click="isAdmin = false" :class="{'bg-student': !isAdmin}" style="color: #cdd7bf;">Student</v-btn>
                  <v-btn @click="isAdmin = true" :class="{'bg-admin': isAdmin}" style="color: #cdd7bf;">Admin</v-btn>
                </v-card-text>

                <v-card-text class="bg-surface-white mx-8 text-center ml-14">
                  {{ isAdmin ? 'Securely log in to your CampusThreads Admin account.' : 'Securely log in to your CampusThreads Student account.' }}
                </v-card-text>

             
                <v-card-text>
                  <v-form fast-fail @submit.prevent>
                    <v-text-field
                      label="Enter ID"
                      prepend-inner-icon="mdi-email-outline"
                    ></v-text-field>

                    <v-text-field
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      label="Password"
                      prepend-inner-icon="mdi-lock-outline"
                      @click:append-inner="visible = !visible"
                    ></v-text-field>

                    <div class="d-flex align-center justify-between mb-2">
                      <v-checkbox v-model="rememberMe" label="Remember Me" style="color: #63794e;"></v-checkbox>
                      <a
                        class="text-caption text-decoration-none text-blue"
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                        style="margin-left: auto;"
                      >
                        <u>Forgot password?</u>
                      </a>
                    </div>

                    <v-btn
                      class="mt-2 mb-8 text-h6 font-weight-bold bg-login"
                      size="large"
                      type="submit"
                      block
                      style="color: ;"
                      >Log In
                    </v-btn>
                    <v-card-text class="text-center">
                      <a
                        class="text-blue text-decoration-none"
                        href="#"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                      Don't have an account yet? Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                      </a>
                    </v-card-text>
                  </v-form>
                </v-card-text>

              
                <v-card-actions>
                
                </v-card-actions>
              </v-card>
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


.v-input--selection-controls .v-input--checkbox .v-input__control .v-input__slot {
  color: #63794e; 
}
</style>
