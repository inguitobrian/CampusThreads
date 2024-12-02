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
        userData.value = null
        return
      }

      if (user) {
        userData.value = {
          firstname: user.user_metadata.firstname || '',
          lastname: user.user_metadata.lastname || '',
          email: user.email || '',
          isAdmin: user.user_metadata.is_admin || false,
          role: user.user_metadata.role || '', // Adding role here
          id: user.id || '', // Ensure ID is properly fetched
          image_url: user.user_metadata.image_url || '', // Ensure image_url is set correctly
        }
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
      userData.value = null
    }
  }
  // Update User Profile Image
  async function updateUserImage(file) {
    // Ensure the user is logged in and has an ID
    if (!userData.value || !userData.value.id) {
      console.error('User is not logged in or ID is missing.')
      return { error: 'User not logged in or ID is missing.' }
    }

    try {
      // Extract the file extension dynamically
      const fileExtension = file.name.split('.').pop()
      // Generate a unique filePath using user ID and a timestamp
      const timestamp = Date.now()
      const filePath = `avatars/${userData.value.id}-avatar-${timestamp}.${fileExtension}`

      // Upload the file with the unique filePath
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('image_bucket') // Replace with your actual bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false, // Prevent overwriting
        })

      if (uploadError) {
        console.error('Error uploading image:', uploadError.message)
        return { error: uploadError.message }
      }

      console.log('Upload successful:', uploadData)

      // Retrieve the public URL of the uploaded image
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from('image_bucket')
        .getPublicUrl(filePath)

      if (publicUrlError) {
        console.error('Error retrieving public URL:', publicUrlError.message)
        return { error: publicUrlError.message }
      }

      const publicUrl = publicUrlData.publicUrl
      console.log('Public URL retrieved:', publicUrl)

      // Update the user information with the new image URL
      const { error: updateError } = await supabase.auth.updateUser({
        data: { image_url: publicUrl },
      })

      if (updateError) {
        console.error('Error updating user profile:', updateError.message)
        return { error: updateError.message }
      }

      // Update the local userData state
      userData.value.image_url = publicUrl

      // Optionally refetch user information to ensure all data is synced
      await getUserInformation()

      return { success: true, imageUrl: publicUrl }
    } catch (err) {
      console.error('Unexpected error:', err.message)
      return { error: err.message }
    }
  }

  return {
    userData,
    isLoggedIn,
    $reset,
    getUserInformation,
    updateUserImage,
  }
})
