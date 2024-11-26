<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" md="8">
            <h1 class="text-center">Add Merchandise</h1>

            <!-- Form to Add Merchandise -->
            <v-form v-model="formValid">
              <v-select
                v-model="merchItem.type"
                :items="merchTypes"
                label="Merchandise Type"
                :rules="[rules.required]"
                outlined
              ></v-select>

              <v-text-field
                v-model="merchItem.name"
                label="Merchandise Name"
                :rules="[rules.required]"
                outlined
              ></v-text-field>

              <v-textarea
                v-model="merchItem.desc"
                label="Description"
                :rules="[rules.required]"
                outlined
              ></v-textarea>

              <v-text-field
                v-model="merchItem.price"
                label="Price"
                :rules="[rules.required, rules.isNumber]"
                outlined
                type="number"
              ></v-text-field>

              <v-file-input
                v-model="file"
                label="Upload Image"
                @change="uploadImage"
                :rules="[rules.required]"
                outlined
              ></v-file-input>

              <v-btn
                :disabled="!formValid || isUploading"
                color="primary"
                @click="handleAddMerchandise"
              >
                Add Merchandise
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'
import AppLayout from '@/components/layout/AppLayout.vue'

// Reactive state and refs
const merchTypes = ['Lanyard', 'Uniform', 'Accessories']
const merchItem = reactive({
  college_id: '',
  type: '',
  name: '',
  desc: '',
  price: '',
})
const file = ref(null)
const imageUrl = ref(null)
const formValid = ref(false)
const isUploading = ref(false)
const user = ref(null)

// Validation rules
const rules = {
  required: value => !!value || 'This field is required',
  isNumber: value => !isNaN(parseFloat(value)) || 'Price must be a number',
}

// Fetch user data
const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error.message)
  } else {
    user.value = data.user
    merchItem.college_id = user.value?.user_metadata?.college_id || ''
  }
}

// Upload image to Supabase storage
const uploadImage = async event => {
  const selectedFile = event.target.files[0]
  if (!selectedFile) return

  isUploading.value = true
  const fileName = `merchandise/${Date.now()}_${selectedFile.name}`
  const { data, error } = await supabase.storage
    .from('image_bucket')
    .upload(fileName, selectedFile)

  if (error) {
    console.error('Error uploading image:', error.message)
    isUploading.value = false
    return
  }

  const { data: urlData, error: urlError } = supabase.storage
    .from('image_bucket')
    .getPublicUrl(fileName)

  if (urlError) {
    console.error('Error getting public URL:', urlError.message)
    isUploading.value = false
  } else {
    imageUrl.value = urlData.publicUrl
    isUploading.value = false
  }
}

// Handle adding merchandise
const handleAddMerchandise = () => {
  if (imageUrl.value) {
    addMerchandise()
  } else {
    console.error('Image upload in progress or failed.')
  }
}

// Add merchandise to database
const addMerchandise = async () => {
  if (!merchItem.college_id || !formValid.value || !imageUrl.value) {
    console.error('Missing required fields.')
    return
  }

  const { data, error } = await supabase
    .from('merchandises')
    .insert([{ ...merchItem, image: imageUrl.value }])

  if (error) {
    console.error('Error adding merchandise:', error.message)
  } else {
    resetForm()
  }
}

// Reset form fields
const resetForm = () => {
  file.value = null
  imageUrl.value = null
  Object.assign(merchItem, {
    college_id: user.value?.user_metadata?.college_id || '',
    type: '',
    name: '',
    desc: '',
    price: '',
  })
}

// Lifecycle hook
onMounted(() => {
  fetchUser()
})
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
