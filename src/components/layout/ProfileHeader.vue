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

// Reactive properties for user information
const avatarText = ref('')
const fullName = ref('')
const userEmail = ref('')
const profilePicture = ref(null) // To store the user's profile picture URL
const isLSGAccount = ref(false) // To check if the user has an 'LSG' role
const isAdminAccount = ref(false)

// Fetch user data on component mount
onMounted(async () => {
  await authStore.getUserInformation() // Fetch user info from the store

  if (authStore.userData) {
    const { firstname, lastname, email, role, image_url } = authStore.userData
    avatarText.value =
      `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase()
    fullName.value = `${firstname} ${lastname}`
    userEmail.value = email
    profilePicture.value = image_url || null // Use the profile picture URL if available

    // Check if the user has an 'LSG' role from metadata
    if (role === 'LSG') {
      isLSGAccount.value = true
    }
    if (role === 'Admin') {
      isAdminAccount.value = true
    }
  }
})

// Logout functionality
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
  authStore.$reset() // Reset user data in the store
  router.replace('/login')
}
</script>

<template>
  <v-menu min-width="240px" rounded offset-y>
    <!-- Activator Button with Avatar -->
    <template #activator="{ props }">
      <v-btn icon v-bind="props" class="avatar-btn">
        <!-- Show Profile Picture if available -->
        <v-avatar
          v-if="profilePicture"
          :image="profilePicture"
          color="indigo darken-4"
          size="large"
        />
        <!-- Otherwise, show initials -->
        <v-avatar v-else color="indigo darken-4" size="large">
          <span class="text-h5">{{ avatarText }}</span>
        </v-avatar>
      </v-btn>
    </template>

    <!-- Menu Content -->
    <v-card class="mt-1" elevation="10">
      <v-card-text>
        <!-- User Information -->
        <v-list>
          <v-list-item :subtitle="userEmail" :title="fullName">
            <template #prepend>
              <!-- Show Profile Picture in Menu if available -->
              <v-avatar
                v-if="profilePicture"
                :image="profilePicture"
                color="indigo darken-4"
                size="large"
              />
              <!-- Otherwise, show initials -->
              <v-avatar v-else color="indigo darken-4" size="large">
                <span class="text-h5">{{ avatarText }}</span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider class="my-1"></v-divider>

        <!-- Account Settings Button -->
        <v-btn
          prepend-icon="mdi-wrench"
          variant="outlined"
          class="menu-button"
          to="/settings"
        >
          Account Settings
        </v-btn>
        <v-divider class="my-1"></v-divider>

        <!-- Orders Button -->
        <v-btn
          prepend-icon="mdi-cart-arrow-down"
          variant="outlined"
          class="menu-button"
          to="/orders"
        >
          My Orders
        </v-btn>
        <v-divider class="my-1"></v-divider>

        <!-- Conditionally Render "Manage Merchandise" Button based on role -->
        <v-btn
          v-if="isLSGAccount"
          prepend-icon="mdi-tshirt-crew"
          variant="outlined"
          class="menu-button"
          to="/stocks"
        >
          Manage Merchandise
        </v-btn>

        <v-btn
          v-if="isAdminAccount"
          prepend-icon="mdi-account-multiple"
          variant="outlined"
          class="menu-button"
          to="/admin"
        >
          Register an LSG Account
        </v-btn>

        <v-divider class="my-1"></v-divider>

        <!-- Logout Button -->
        <v-btn
          prepend-icon="mdi-logout"
          variant="outlined"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
          class="menu-button logout-btn"
        >
          Logout
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
/* Avatar Button Styling */
.avatar-btn {
  transition: transform 0.3s ease;
}
.avatar-btn:hover {
  transform: scale(1.1);
}

/* Menu styling */
.v-card {
  background-color: #f5f5f5;
  border-radius: 8px;
}
.v-card-text {
  padding: 15px;
}

/* Button Styling */
.menu-button {
  width: 100%;
  font-weight: 500;
  text-transform: capitalize;
  margin-top: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.menu-button:hover {
  background-color: #4caf50;
  color: white;
}

.logout-btn {
  background-color: #f44336;
  color: white;
  border-radius: 20px;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

/* Avatar Text */
.v-avatar {
  font-weight: bold;
}

/* Divider */
.v-divider {
  border-color: #cfd8dc;
}
</style>
