<template>
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
              <v-btn color="primary" @click="updateMerchandise">Update</v-btn>
              <v-btn @click="closeEditDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      merchandiseList: [],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'desc' },
        { text: 'Price', value: 'price' },
        { text: 'Type', value: 'type' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      showEditDialog: false,
      showStockDialog: false,
      showAddMerchandiseDialog: false, // New dialog state for add merchandise
      formValid: false,
      editItem: {},
      newStock: {
        merchandise_id: null,
        quantity: 1, // Default quantity set to 1
      },
      userCollegeId: null, // Store user's college ID
      rules: {
        required: value => !!value || 'This field is required',
        isNumber: value =>
          !isNaN(parseFloat(value)) || 'This field must be a number',
      },
    }
  },
  computed: {
    // Filter merchandise based on user's college ID
    filteredMerchandiseList() {
      return this.merchandiseList.filter(
        item => item.college_id === this.userCollegeId,
      )
    },
  },
  methods: {
    async fetchUserCollege() {
      try {
        // Fetch the user's details
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()

        if (error) {
          console.error('Error fetching user details:', error.message)
          return
        }

        // Access the college ID from user's metadata
        const collegeId = user?.user_metadata?.college_id
        if (!collegeId) {
          console.error('College ID not found in user metadata.')
          return
        }

        // Store the college ID for use in filtering
        this.userCollegeId = collegeId
      } catch (error) {
        console.error('Error fetching user college:', error.message)
      }
    },
    increaseQuantity() {
      this.newStock.quantity += 1
    },

    // Decrease quantity by 1, but keep it at a minimum of 1
    decreaseQuantity() {
      if (this.newStock.quantity > 1) {
        this.newStock.quantity -= 1
      }
    },
    async fetchMerchandise() {
      const { data, error } = await supabase.from('merchandises').select(`
          id, name, desc, price, type, college_id,
          stocks_in (quantity)  
        `)

      if (error) {
        console.error('Error fetching merchandise:', error.message)
      } else {
        this.merchandiseList = data.map(item => ({
          ...item,
          quantity: item.stocks_in
            ? item.stocks_in.reduce((acc, stock) => acc + stock.quantity, 0)
            : 0,
        }))
      }
    },
    openAddMerchandiseDialog() {
      this.showAddMerchandiseDialog = true
    },
    closeAddMerchandiseDialog() {
      this.showAddMerchandiseDialog = false
    },
    editMerchandise(item) {
      this.editItem = { ...item }
      this.showEditDialog = true
    },
    closeEditDialog() {
      this.showEditDialog = false
    },
    async updateMerchandise() {
      const { error } = await supabase
        .from('merchandises')
        .update({
          name: this.editItem.name,
          desc: this.editItem.desc,
          price: this.editItem.price,
          type: this.editItem.type,
        })
        .eq('id', this.editItem.id)

      if (error) {
        console.error('Error updating merchandise:', error.message)
      } else {
        this.closeEditDialog()
        await this.fetchMerchandise()
      }
    },
    async deleteMerchandise(id) {
      try {
        // First, delete associated records in stocks_in
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

        // Now, delete the merchandise item itself
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
          await this.fetchMerchandise() // Refresh the merchandise list
        }
      } catch (error) {
        console.error('Error deleting merchandise:', error.message)
      }
    },

    openStockDialog(merchandiseId) {
      this.newStock.merchandise_id = merchandiseId
      this.newStock.quantity = 1 // Default quantity set to 1
      this.showStockDialog = true
    },
    closeStockDialog() {
      this.showStockDialog = false
    },
    async addStock() {
      if (this.formValid) {
        try {
          // Fetch the merchandise name for the given merchandise ID
          const { data: merchandise, error: merchandiseError } = await supabase
            .from('merchandises')
            .select('name')
            .eq('id', this.newStock.merchandise_id)
            .single()

          if (merchandiseError) {
            console.error(
              'Error fetching merchandise name:',
              merchandiseError.message,
            )
            return
          }

          // Fetch existing stock records for this merchandise
          const { data: stockRecords, error: fetchError } = await supabase
            .from('stocks_in')
            .select('id, quantity')
            .eq('merchandise_id', this.newStock.merchandise_id)

          if (fetchError) {
            console.error('Error fetching stock:', fetchError.message)
            return
          }

          if (stockRecords && stockRecords.length > 0) {
            // If stock exists, update the quantity of the first stock record
            const totalQuantity =
              stockRecords.reduce((acc, record) => acc + record.quantity, 0) +
              this.newStock.quantity
            const stockId = stockRecords[0].id

            const { error: updateError } = await supabase
              .from('stocks_in')
              .update({ quantity: totalQuantity, name: merchandise.name }) // Update with merchandise name
              .eq('id', stockId)

            if (updateError) {
              console.error('Error updating stock:', updateError.message)
            } else {
              console.log('Stock updated successfully')
              this.closeStockDialog()
              await this.fetchMerchandise()
            }
          } else {
            // If no stock exists, insert a new row with merchandise name
            const { error: insertError } = await supabase
              .from('stocks_in')
              .insert([
                {
                  merchandise_id: this.newStock.merchandise_id,
                  quantity: this.newStock.quantity,
                  name: merchandise.name, // Insert merchandise name
                },
              ])

            if (insertError) {
              console.error('Error adding stock:', insertError.message)
            } else {
              console.log('Stock added successfully')
              this.closeStockDialog()
              await this.fetchMerchandise()
            }
          }
        } catch (error) {
          console.error('Error adding stock:', error.message)
        }
      }
    },
    // Method to handle stock reduction after a purchase
    async purchaseMerchandise(merchandiseId) {
      try {
        // Fetch the current stock quantity for the merchandise
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

          // Update the stock quantity in the database
          const { error: updateError } = await supabase
            .from('stocks_in')
            .update({ quantity: updatedQuantity })
            .eq('id', stockRecord.id)

          if (updateError) {
            console.error('Error updating stock quantity:', updateError.message)
          } else {
            console.log('Stock quantity updated successfully')
            await this.fetchMerchandise() // Refresh merchandise list to show updated quantity
          }
        } else {
          console.log('Insufficient stock to complete purchase')
        }
      } catch (error) {
        console.error('Error processing purchase:', error.message)
      }
    },
  },
  mounted() {
    this.fetchUserCollege()
    this.fetchMerchandise()
  },
}
</script>

<style scoped></style>
