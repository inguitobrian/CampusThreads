<script setup>
import { ref, onMounted } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'

const isWidgetVisible = ref(false) // Controls widget visibility
const firstName = ref('')

// Fetch user's first name from the store
const authStore = useAuthUserStore()
onMounted(async () => {
  await authStore.getUserInformation()

  // i check if naka log in ba ang user
  if (authStore.userData && authStore.userData.firstname) {
    firstName.value = authStore.userData.firstname
    isWidgetVisible.value = true // Show widget if user is logged in
  }
})

// Hide the widget
const closeWidget = () => {
  isWidgetVisible.value = false
}
</script>

<template>
  <div v-if="isWidgetVisible" class="welcome-widget">
    <v-card class="elevation-4 rounded welcome-card">
      <v-img
        src="/Campusthreads.png"
        alt="Welcome Image"
        class="welcome-image"
        height="160"
      ></v-img>
      <v-card-title class="welcome-title">
        🎉 Welcome to Campusthread, {{ firstName }}!
      </v-card-title>
      <v-card-text class="welcome-text">
        We're thrilled to have you on board. Start exploring and make the most
        of your experience with us!
      </v-card-text>
      <v-card-actions class="welcome-actions">
        <v-btn color="primary" class="welcome-btn" @click="closeWidget" rounded>
          Get Started
        </v-btn>
        <v-btn
          color="secondary"
          variant="text"
          class="welcome-btn-close"
          @click="closeWidget"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.welcome-widget {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  z-index: 1000;
  max-width: 420px;
  width: 90%;
  animation: fadeIn 0.6s ease-out;
}

.welcome-card {
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(to top, #b4cca9, #cdddc6, #ffffff, #ffffff);
}

.welcome-image {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.welcome-title {
  text-align: center;
  font-weight: bold;
  font-size: 1.25rem;
  color: #4a4a4a;
}

.welcome-text {
  text-align: center;
  font-size: 1rem;
  color: #6b6b6b;
  margin-top: 8px;
}

.welcome-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.welcome-btn {
  text-transform: none;
  font-weight: 600;
}

.welcome-btn-close {
  text-transform: none;
  font-weight: 600;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -20%);
  }
}
</style>
