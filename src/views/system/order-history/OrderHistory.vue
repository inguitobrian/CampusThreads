<!-- OrderHistory.vue -->
<template>
  <v-container>
    <h2 class="text-center">Your Purchase History</h2>

    <v-container class="mt-4">
      <!-- Loading Indicator -->
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            size="50"
          ></v-progress-circular>
        </v-col>
      </v-row>

      <!-- Error Message -->
      <v-row v-if="error">
        <v-col cols="12" class="text-center">
          <v-alert type="error" border="left" prominent outlined color="error">
            {{ errorMessage }}
          </v-alert>
          <v-btn @click="fetchUserOrders" color="primary" outlined>Retry</v-btn>
        </v-col>
      </v-row>

      <!-- Order List -->
      <v-row v-if="userOrders.length && !loading && !error">
        <v-col
          cols="12"
          v-for="order in userOrders"
          :key="order.id"
          class="mt-3"
        >
          <v-card class="order-card" outlined @click="openOrderDetails(order)">
            <v-card-title class="order-title">{{
              order.merchandise_name
            }}</v-card-title>
            <v-card-subtitle class="text-body-2"
              >Order ID: {{ order.id }}</v-card-subtitle
            >
            <v-card-text class="order-details">
              <p><strong>Quantity:</strong> {{ order.qty }}</p>
              <p><strong>Total Price:</strong> {{ order.formattedPrice }}</p>
              <p>
                <strong>Order Date:</strong> {{ formatDate(order.created_at) }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <p v-else-if="!loading && !error">No purchases found.</p>

      <!-- Pagination -->
      <v-pagination
        v-if="totalPages > 1"
        v-model="page"
        :length="totalPages"
        class="mt-3 pagination"
        color="primary"
        @input="fetchUserOrders"
      ></v-pagination>
    </v-container>

    <!-- Order Detail Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ selectedOrder?.merchandise_name }}</v-card-title>
        <v-card-subtitle class="text-body-2">
          Order ID: {{ selectedOrder?.id }}
        </v-card-subtitle>
        <v-card-text>
          <p><strong>Quantity:</strong> {{ selectedOrder?.qty }}</p>
          <p>
            <strong>Total Price:</strong> {{ selectedOrder?.formattedPrice }}
          </p>
          <p>
            <strong>Order Date:</strong>
            {{ selectedOrder ? formatDate(selectedOrder.created_at) : '' }}
          </p>
          <!-- Additional order details can be added here -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { supabase } from '@/utils/supabase.js'

export default {
  data() {
    return {
      userOrders: [],
      id: null,
      loading: true,
      error: false,
      errorMessage: '',
      page: 1,
      totalPages: 1,
      dialog: false,
      selectedOrder: null,
    }
  },
  methods: {
    async fetchUserOrders() {
      this.loading = true
      this.error = false

      if (this.id) {
        const { data, count, error } = await supabase
          .from('transactions')
          .select(
            `id, qty, created_at, merchandise:merchandises(id, name, price)`,
            { count: 'exact' },
          )
          .eq('user_id', this.id)
          .range((this.page - 1) * 10, this.page * 10 - 1)

        if (error) {
          this.error = true
          this.errorMessage =
            'There was an issue fetching your order history. Please try again.'
          console.error('Error fetching user orders:', error.message)
        } else {
          this.userOrders = data.map(order => {
            const totalPrice = order.qty * order.merchandise.price
            return {
              ...order,
              merchandise_name: order.merchandise.name,
              formattedPrice: new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP',
              }).format(totalPrice),
            }
          })
          this.totalPages = Math.ceil(count / 10)
        }
      } else {
        alert('You must be logged in to view your order history.')
      }
      this.loading = false
    },
    async fetchUserId() {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Error fetching user:', error.message)
      } else if (data && data.user) {
        this.id = data.user.id
        await this.fetchUserOrders()
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    openOrderDetails(order) {
      this.selectedOrder = order
      this.dialog = true
    },
  },
  async created() {
    await this.fetchUserId()
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
.order-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}
.order-card:hover {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
.order-title {
  font-size: 1.25rem;
  font-weight: 500;
}
.order-details p {
  margin: 0;
}
.pagination {
  justify-content: center;
}
</style>
