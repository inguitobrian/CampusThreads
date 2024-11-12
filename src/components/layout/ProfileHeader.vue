<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase } from '@/utils/supabase'

// Set up router and auth store
const router = useRouter()
const authStore = useAuthUserStore()

// Form action state to handle processing
const formAction = ref({ formProcess: false })

// Watch user data from auth store
const userInfo = ref(authStore.userData)
const avatarText = ref('')
const fullName = ref('')
const userEmail = ref('')
const isLSGAccount = ref(false) // To store if user has 'LSG' role

// Fetch user data on component mount
onMounted(async () => {
  await authStore.getUserInformation() // Fetch user info from store

  if (authStore.userData) {
    const { firstname, lastname, email, role } = authStore.userData
    avatarText.value =
      `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
    fullName.value = `${firstname} ${lastname}`
    userEmail.value = email

    // Check if the user has an 'LSG' role from metadata
    if (role === 'LSG') {
      isLSGAccount.value = true
    }
  }
})

// Logout Functionality
const onLogout = async () => {
  formAction.value.formProcess = true

  // Supabase logout functionality
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    formAction.value.formProcess = false
    return
  }

  formAction.value.formProcess = false
  authStore.$reset() // Reset user data in store
  router.replace('/login')
}
</script>

<template>
  <v-menu min-width="200px" rounded>
    <!-- Activator Button with Avatar -->
    <template #activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="red-darken-4" size="large">
          <span class="text-h5">{{ avatarText }}</span>
        </v-avatar>
      </v-btn>
    </template>

    <!-- Menu Content -->
    <v-card class="mt-1">
      <v-card-text>
        <!-- User Information -->
        <v-list>
          <v-list-item :subtitle="userEmail" :title="fullName">
            <template #prepend>
              <v-avatar color="red-darken-4" size="large">
                <span class="text-h5">{{ avatarText }}</span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-3"></v-divider>

        <!-- Account Settings Button -->
        <v-btn prepend-icon="mdi-wrench" variant="plain" to="/settings">
          Account Settings
        </v-btn>
        <v-divider class="my-3"></v-divider>
        <!-- Conditionally Render "Manage Merchandise" Button based on role -->
        <v-btn
          v-if="isLSGAccount"
          prepend-icon="mdi-cogs"
          variant="plain"
          to="/stocks"
        >
          Manage Merchandise
        </v-btn>

        <v-divider class="my-3"></v-divider>

        <!-- Logout Button -->
        <v-btn
          prepend-icon="mdi-logout"
          variant="plain"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
        >
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
/* Optional Styling for Avatar and Menu */
.v-avatar {
  font-weight: bold;
}

.v-btn {
  font-weight: 500;
}
</style>
