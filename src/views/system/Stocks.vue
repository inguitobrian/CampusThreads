<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'
import AppLayout from '@/components/layout/AppLayout.vue'

// Reactive state
const merchTypes = ref(['Lanyard', 'Uniform', 'Accessories'])
const merchandiseList = ref([])
const headers = ref([
  { text: 'Name', value: 'name' },
  { text: 'Description', value: 'desc' },
  { text: 'Price', value: 'price' },
  { text: 'Type', value: 'type' },
  { text: 'Quantity', value: 'quantity' },
  { text: 'Actions', value: 'actions', sortable: false },
])
const showEditDialog = ref(false)
const showStockDialog = ref(false)
const showAddMerchandiseDialog = ref(false)
const formValid = ref(false)
const editItem = ref({})
const newStock = ref({ merchandise_id: null, quantity: 1 })
const userCollegeId = ref(null)

const rules = {
  required: value => !!value || 'This field is required',
  isNumber: value => !isNaN(parseFloat(value)) || 'This field must be a number',
}

// Computed property to filter merchandise
const filteredMerchandiseList = computed(() => {
  return merchandiseList.value.filter(
    item => item.college_id === userCollegeId.value,
  )
})

// Fetch user college ID
const fetchUserCollege = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error('Error fetching user details:', error.message)
      return
    }

    const collegeId = user?.user_metadata?.college_id
    if (!collegeId) {
      console.error('College ID not found in user metadata.')
      return
    }

    userCollegeId.value = collegeId
  } catch (error) {
    console.error('Error fetching user college:', error.message)
  }
}

// Fetch merchandise data
const fetchMerchandise = async () => {
  const { data, error } = await supabase.from('merchandises').select(`
    id, name, desc, price, type, college_id,
    stocks_in (quantity)
  `)

  if (error) {
    console.error('Error fetching merchandise:', error.message)
  } else {
    merchandiseList.value = data.map(item => ({
      ...item,
      quantity: item.stocks_in
        ? item.stocks_in.reduce((acc, stock) => acc + stock.quantity, 0)
        : 0,
    }))
  }
}

// Increase quantity by 1
const increaseQuantity = () => {
  newStock.value.quantity += 1
}

// Decrease quantity by 1 (ensuring it stays at least 1)
const decreaseQuantity = () => {
  if (newStock.value.quantity > 1) {
    newStock.value.quantity -= 1
  }
}

// Open Add Merchandise dialog
const openAddMerchandiseDialog = () => {
  showAddMerchandiseDialog.value = true
}

// Close Add Merchandise dialog
const closeAddMerchandiseDialog = () => {
  showAddMerchandiseDialog.value = false
}

// Edit merchandise
const editMerchandise = item => {
  editItem.value = { ...item }
  showEditDialog.value = true
}

// Close Edit dialog
const closeEditDialog = () => {
  showEditDialog.value = false
}

// Update merchandise
const updateMerchandise = async () => {
  const { error } = await supabase
    .from('merchandises')
    .update({
      name: editItem.value.name,
      desc: editItem.value.desc,
      price: editItem.value.price,
      type: editItem.value.type,
    })
    .eq('id', editItem.value.id)

  if (error) {
    console.error('Error updating merchandise:', error.message)
  } else {
    closeEditDialog()
    await fetchMerchandise()
  }
}

// Delete merchandise
const deleteMerchandise = async id => {
  try {
    const { error: stockDeleteError } = await supabase
      .from('stocks_in')
      .delete()
      .eq('merchandise_id', id)

    if (stockDeleteError) {
      console.error(
        'Error deleting associated stock records:',
        stockDeleteError.message,
      )
      return
    }

    const { error: merchandiseDeleteError } = await supabase
      .from('merchandises')
      .delete()
      .eq('id', id)

    if (merchandiseDeleteError) {
      console.error(
        'Error deleting merchandise:',
        merchandiseDeleteError.message,
      )
    } else {
      console.log('Merchandise deleted successfully')
      await fetchMerchandise()
    }
  } catch (error) {
    console.error('Error deleting merchandise:', error.message)
  }
}

// Open stock dialog
const openStockDialog = merchandiseId => {
  newStock.value.merchandise_id = merchandiseId
  newStock.value.quantity = 1
  showStockDialog.value = true
}

// Close stock dialog
const closeStockDialog = () => {
  showStockDialog.value = false
}

// Add stock
const addStock = async () => {
  if (formValid.value) {
    try {
      const { data: merchandise, error: merchandiseError } = await supabase
        .from('merchandises')
        .select('name')
        .eq('id', newStock.value.merchandise_id)
        .single()

      if (merchandiseError) {
        console.error(
          'Error fetching merchandise name:',
          merchandiseError.message,
        )
        return
      }

      const { data: stockRecords, error: fetchError } = await supabase
        .from('stocks_in')
        .select('id, quantity')
        .eq('merchandise_id', newStock.value.merchandise_id)

      if (fetchError) {
        console.error('Error fetching stock:', fetchError.message)
        return
      }

      if (stockRecords && stockRecords.length > 0) {
        const totalQuantity =
          stockRecords.reduce((acc, record) => acc + record.quantity, 0) +
          newStock.value.quantity
        const stockId = stockRecords[0].id

        const { error: updateError } = await supabase
          .from('stocks_in')
          .update({ quantity: totalQuantity, name: merchandise.name })
          .eq('id', stockId)

        if (updateError) {
          console.error('Error updating stock:', updateError.message)
        } else {
          console.log('Stock updated successfully')
          closeStockDialog()
          await fetchMerchandise()
        }
      } else {
        const { error: insertError } = await supabase.from('stocks_in').insert([
          {
            merchandise_id: newStock.value.merchandise_id,
            quantity: newStock.value.quantity,
            name: merchandise.name,
          },
        ])

        if (insertError) {
          console.error('Error adding stock:', insertError.message)
        } else {
          console.log('Stock added successfully')
          closeStockDialog()
          await fetchMerchandise()
        }
      }
    } catch (error) {
      console.error('Error adding stock:', error.message)
    }
  }
}

// Purchase merchandise
const purchaseMerchandise = async merchandiseId => {
  try {
    const { data: stockRecord, error } = await supabase
      .from('stocks_in')
      .select('id, quantity')
      .eq('merchandise_id', merchandiseId)
      .single()

    if (error) {
      console.error('Error fetching stock:', error.message)
      return
    }

    if (stockRecord && stockRecord.quantity > 0) {
      const updatedQuantity = stockRecord.quantity - 1

      const { error: updateError } = await supabase
        .from('stocks_in')
        .update({ quantity: updatedQuantity })
        .eq('id', stockRecord.id)

      if (updateError) {
        console.error('Error updating stock quantity:', updateError.message)
      } else {
        console.log('Stock quantity updated successfully')
        await fetchMerchandise()
      }
    } else {
      console.log('Insufficient stock to complete purchase')
    }
  } catch (error) {
    console.error('Error processing purchase:', error.message)
  }
}

// Fetch data when component is mounted
onMounted(() => {
  fetchUserCollege()
  fetchMerchandise()
})
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" md="10" lg="8">
            <v-card class="elevation-3 mb-5">
              <v-card-title class="text-h5 primary--text justify-center">
                Manage Stocks
              </v-card-title>

              <!-- Merchandise Inventory Table -->
              <v-data-table
                :headers="headers"
                :items="filteredMerchandiseList"
                item-key="id"
                class="elevation-1"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Merchandise Inventory</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- Button to open Add Merchandise Form -->
                    <router-link to="/addmerch">
                      <v-btn
                        color="primary"
                        @click="openAddMerchandiseDialog"
                        large
                      >
                        <v-icon left>mdi-plus</v-icon> Add Merchandise
                      </v-btn>
                    </router-link>
                  </v-toolbar>
                </template>

                <template v-slot:item.quantity="{ item }">
                  <v-chip :color="item.quantity > 0 ? 'green' : 'red'" dark>
                    {{ item.quantity }}
                  </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="editMerchandise(item)">
                    <v-icon color="orange">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteMerchandise(item.id)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="openStockDialog(item.id)">
                    <v-icon color="green">mdi-plus-circle</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>

            <!-- Add Stock Modal -->
            <!-- Add Stock Modal -->
            <v-dialog v-model="showStockDialog" max-width="500px">
              <v-card>
                <v-card-title>Add Stock</v-card-title>
                <v-card-text>
                  <v-form v-model="formValid">
                    <v-row align="center" justify="center">
                      <v-btn
                        icon
                        @click="decreaseQuantity"
                        :disabled="newStock.quantity <= 1"
                      >
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>

                      <v-text-field
                        v-model="newStock.quantity"
                        label="Quantity"
                        type="number"
                        :rules="[rules.required, rules.isNumber]"
                        outlined
                        min="1"
                        class="mx-2"
                        style="width: 80px"
                      ></v-text-field>

                      <v-btn icon @click="increaseQuantity">
                        <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="addStock">Add</v-btn>
                  <v-btn @click="closeStockDialog">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- Edit Merchandise Modal -->
            <v-dialog v-model="showEditDialog" max-width="500px">
              <v-card>
                <v-card-title>Edit Merchandise</v-card-title>
                <v-card-text>
                  <v-form v-model="formValid">
                    <v-text-field
                      v-model="editItem.name"
                      label="Merchandise Name"
                      :rules="[rules.required]"
                      outlined
                    ></v-text-field>

                    <v-textarea
                      v-model="editItem.desc"
                      label="Description"
                      :rules="[rules.required]"
                      outlined
                    ></v-textarea>

                    <v-text-field
                      v-model="editItem.price"
                      label="Price"
                      type="number"
                      :rules="[rules.required, rules.isNumber]"
                      outlined
                    ></v-text-field>

                    <v-select
                      v-model="editItem.type"
                      :items="merchTypes"
                      label="Merchandise Type"
                      :rules="[rules.required]"
                      outlined
                    ></v-select>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="updateMerchandise"
                    >Update</v-btn
                  >
                  <v-btn @click="closeEditDialog">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped></style>
