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

      <!-- Overlay with Centered Snackbar -->
      <v-overlay v-model="snackbar" class="snackbar-overlay">
        <v-card
          class="centered-snackbar"
          color="light-green-darken-4"
          elevation="10"
        >
          <v-card-text>
            <h2>Merchandise Successfully Added!</h2>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="white" @click="snackbar = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
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
const snackbar = ref(false) // Snackbar visibility
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

const addMerchandise = async () => {
  if (!merchItem.college_id || !formValid.value || !imageUrl.value) {
    console.error('Missing required fields.')
    return
  }

  const { data: merchandiseData, error: merchandiseError } = await supabase
    .from('merchandises')
    .insert([{ ...merchItem, image: imageUrl.value }])
    .select('id')

  if (merchandiseError) {
    console.error('Error adding merchandise:', merchandiseError.message)
    return
  }

  if (merchandiseData && merchandiseData.length > 0) {
    const merchandiseId = merchandiseData[0].id

    const { error: stocksError } = await supabase.from('stocks_in').insert([
      {
        merchandise_id: merchandiseId,
        name: merchItem.name,
        quantity: 0,
      },
    ])

    if (stocksError) {
      console.error('Error adding to stocks_in:', stocksError.message)
    } else {
      console.log('Merchandise and stocks_in entry added successfully!')
      snackbar.value = true // Show snackbar
      resetForm()
    }
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
.snackbar-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); /* Dimmed background */
}

.centered-snackbar {
  width: 300px;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
}
</style>
