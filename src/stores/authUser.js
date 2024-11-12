// src/stores/authUser.js
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useAuthUserStore = defineStore('authUser', () => {
  // States
  const userData = ref(null)

  // Reset State Action
  function $reset() {
    userData.value = null
  }

  // Check if the user is logged in
  const isLoggedIn = computed(() => !!userData.value)

  // Fetch and store user information
  async function getUserInformation() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error('Could not retrieve user information:', error.message)
        return
      }

      if (user) {
        userData.value = {
          firstname: user.user_metadata.firstname || '',
          lastname: user.user_metadata.lastname || '',
          email: user.email || '',
          isAdmin: user.user_metadata.is_admin || false,
          role: user.user_metadata.role || '', // Adding role here
        }
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
    }
  }

  return {
    userData,
    isLoggedIn,
    $reset,
    getUserInformation,
  }
})
