<!-- AddMerchandise.vue -->
<template>
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

<script>
import { supabase } from '@/utils/supabase.js'

export default {
  data() {
    return {
      merchTypes: ['Lanyard', 'Uniform', 'Accessories'],
      merchItem: {
        college_id: '',
        type: '',
        name: '',
        desc: '',
        price: '',
      },
      file: null,
      imageUrl: null,
      formValid: false,
      isUploading: false,
      rules: {
        required: value => !!value || 'This field is required',
        isNumber: value =>
          !isNaN(parseFloat(value)) || 'Price must be a number',
      },
      user: null,
    }
  },
  methods: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error.message)
      } else {
        this.user = data.user
        this.merchItem.college_id = this.user?.user_metadata?.college_id || ''
      }
    },
    async uploadImage(event) {
      const file = event.target.files[0]
      if (!file) return
      this.isUploading = true
      const fileName = `merchandise/${Date.now()}_${file.name}`
      const { data, error } = await supabase.storage
        .from('image_bucket')
        .upload(fileName, file)
      if (error) {
        console.error('Error uploading image:', error.message)
        this.isUploading = false
        return
      }
      //   Kuhaon ang publicurl from storage then store into merchandises table
      const { data: urlData, error: urlError } = supabase.storage
        .from('image_bucket')
        .getPublicUrl(fileName)
      if (urlError) {
        console.error('Error getting public URL:', urlError.message)
        this.isUploading = false
      } else {
        this.imageUrl = urlData.publicUrl
        this.isUploading = false
      }
    },
    handleAddMerchandise() {
      if (this.imageUrl) {
        this.addMerchandise()
      } else {
        console.error('Image upload in progress or failed.')
      }
    },
    async addMerchandise() {
      if (!this.merchItem.college_id || !this.formValid || !this.imageUrl) {
        console.error('Missing required fields.')
        return
      }
      const { data, error } = await supabase
        .from('merchandises')
        .insert([{ ...this.merchItem, image: this.imageUrl }])
      if (error) {
        console.error('Error adding merchandise:', error.message)
      } else {
        this.resetForm()
      }
    },
    resetForm() {
      this.file = null
      this.imageUrl = null
      this.merchItem = {
        college_id: this.user?.user_metadata?.college_id || '',
        type: '',
        name: '',
        desc: '',
        price: '',
      }
    },
  },
  async created() {
    await this.fetchUser()
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
