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
        <!-- Header Section -->
        <v-row class="mb-5">
          <v-col class="text-center">
            <h1 class="text-h4 font-weight-bold">Manage Stocks</h1>
            <p class="text-body-1">Easily manage and monitor your merchandise inventory.</p>
          </v-col>
        </v-row>

        <!-- Merchandise Inventory Table -->
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-card elevation="3" class="pa-4">
              <v-card-title>
                <span class="text-h6 font-weight-bold">Merchandise Inventory</span>
                <v-spacer></v-spacer>
                <router-link to="/addmerch">
                  <v-btn color="primary" large>
                    <v-icon left>mdi-plus</v-icon>
                    Add New Item
                  </v-btn>
                </router-link>
              </v-card-title>

              <v-data-table
                :headers="headers"
                :items="filteredMerchandiseList"
                item-key="id"
                class="elevation-1"
                dense
                hide-default-footer
              >
                <template v-slot:item.quantity="{ item }">
                  <v-chip :color="item.quantity > 0 ? 'green' : 'red'" dark>
                    {{ item.quantity }}
                  </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-btn icon @click="editMerchandise(item)">
                    <v-icon color="orange" title="Edit">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteMerchandise(item.id)">
                    <v-icon color="red" title="Delete">mdi-delete</v-icon>
                  </v-btn>
                  <v-btn icon @click="openStockDialog(item.id)">
                    <v-icon color="green" title="Add Stock">mdi-plus-circle</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <!-- Add Stock Dialog -->
        <v-dialog v-model="showStockDialog" max-width="400px">
          <v-card>
            <v-card-title class="primary--text">
              <v-icon left>mdi-plus-circle</v-icon>
              Add Stock
            </v-card-title>
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
                    class="mx-3"
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
              <v-btn text @click="closeStockDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Edit Merchandise Dialog -->
        <v-dialog v-model="showEditDialog" max-width="400px">
          <v-card>
            <v-card-title class="primary--text">
              <v-icon left>mdi-pencil</v-icon>
              Edit Merchandise
            </v-card-title>
            <v-card-text>
              <v-form v-model="formValid">
                <v-text-field
                  v-model="editItem.name"
                  label="Name"
                  outlined
                  :rules="[rules.required]"
                ></v-text-field>
                <v-textarea
                  v-model="editItem.desc"
                  label="Description"
                  outlined
                  :rules="[rules.required]"
                ></v-textarea>
                <v-text-field
                  v-model="editItem.price"
                  label="Price"
                  type="number"
                  outlined
                  :rules="[rules.required, rules.isNumber]"
                ></v-text-field>
                <v-select
                  v-model="editItem.type"
                  :items="merchTypes"
                  label="Type"
                  outlined
                  :rules="[rules.required]"
                ></v-select>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="updateMerchandise">Save</v-btn>
              <v-btn text @click="closeEditDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </AppLayout>
</template>
<style scoped>
/* General Styles */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f6f9;
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  color: #3f51b5;
}

/* Card Styling */
.v-card {
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: #3f51b5;
  border-bottom: 1px solid #e0e0e0;
}

.v-card-text {
  font-size: 1rem;
  color: #555;
}

/* Data Table Styling */
.v-data-table {
  border-radius: 12px;
  overflow: hidden;
}

.v-data-table th {
  background-color: #3f51b5;
  color: white;
  font-weight: bold;
}

.v-data-table tbody tr:hover {
  background-color: #f0f4ff;
}

.v-chip {
  border-radius: 16px;
  font-weight: bold;
}

/* Button Styling */
.v-btn {
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.v-btn.primary {
  background-color: #3f51b5;
  color: white;
}

.v-btn.primary:hover {
  background-color: #2c3b93;
}

.v-btn.text {
  color: #3f51b5;
}

.v-btn.icon {
  background-color: transparent;
  color: #3f51b5;
}

.v-btn.icon:hover {
  background-color: #e8eaf6;
}

/* Icon Styling */
.v-icon {
  font-size: 1.2rem;
}

.v-icon[title] {
  cursor: pointer;
}

/* Dialog Styling */
.v-dialog .v-card {
  background-color: #ffffff;
  border-radius: 12px;
}

.v-dialog .v-card-title {
  font-weight: bold;
  font-size: 1.3rem;
}

.v-dialog .v-card-actions {
  border-top: 1px solid #e0e0e0;
}

/* Input Fields */
.v-text-field, .v-textarea {
  font-size: 0.9rem;
  border-radius: 8px;
}

/* Add New Item Button */
.router-link .v-btn {
  font-size: 0.9rem;
  padding: 0.7rem 1.5rem;
  display: flex;
  align-items: center;
}

.router-link .v-btn v-icon {
  margin-right: 8px;
}

/* Dialog Action Buttons */
.v-dialog .v-btn {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }

  .v-card-title {
    font-size: 1rem;
  }

  .v-data-table th, .v-data-table td {
    font-size: 0.9rem;
  }
}
</style>
