<!-- OrderHistory.vue -->
<template>
  <v-container>
    <h2 class="text-center mb-4">Your Order History</h2>

    <v-container>
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
          <v-btn @click="fetchUserOrders" color="primary" outlined class="mt-2"
            >Retry</v-btn
          >
        </v-col>
      </v-row>

      <!-- Order List -->
      <v-row
        v-if="userOrders.length && !loading && !error"
        dense
        class="order-grid"
      >
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="order in userOrders"
          :key="order.id"
        >
          <v-card class="order-card" outlined @click="openOrderDetails(order)">
            <v-img
              :src="order.image"
              alt="Merchandise Image"
              class="order-image"
              contain
            ></v-img>
            <v-card-title class="order-title">{{
              order.merchandise_name
            }}</v-card-title>
            <v-card-subtitle class="text-body-2">
              Order ID: {{ order.id }}
            </v-card-subtitle>
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

      <p v-else-if="!loading && !error" class="text-center">
        No purchases found.
      </p>

      <!-- Pagination -->
      <v-pagination
        v-if="totalPages > 1"
        v-model="page"
        :length="totalPages"
        class="mt-4 pagination"
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
          <v-img
            :src="selectedOrder?.image"
            alt="Merchandise Image"
            class="order-detail-image"
            contain
          ></v-img>
          <p><strong>Quantity:</strong> {{ selectedOrder?.qty }}</p>
          <p>
            <strong>Total Price:</strong> {{ selectedOrder?.formattedPrice }}
          </p>
          <p>
            <strong>Order Date:</strong>
            {{ selectedOrder ? formatDate(selectedOrder.created_at) : '' }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

const userOrders = ref([])
const id = ref(null)
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')
const page = ref(1)
const totalPages = ref(1)
const dialog = ref(false)
const selectedOrder = ref(null)

const formatDate = date => {
  return new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const openOrderDetails = order => {
  selectedOrder.value = order
  dialog.value = true
}

const fetchUserOrders = async () => {
  loading.value = true
  error.value = false

  if (id.value) {
    const {
      data,
      count,
      error: fetchError,
    } = await supabase
      .from('transactions')
      .select(
        `id, qty, created_at, merchandise:merchandises(id, name, price, image)`,
        { count: 'exact' },
      )
      .eq('user_id', id.value)
      .range((page.value - 1) * 10, page.value * 10 - 1)

    if (fetchError) {
      error.value = true
      errorMessage.value =
        'There was an issue fetching your order history. Please try again.'
      console.error('Error fetching user orders:', fetchError.message)
    } else {
      userOrders.value = data.map(order => {
        const totalPrice = order.qty * order.merchandise.price
        return {
          ...order,
          merchandise_name: order.merchandise.name,
          image: order.merchandise.image,
          formattedPrice: new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
          }).format(totalPrice),
        }
      })
      totalPages.value = Math.ceil(count / 10)
    }
  } else {
    alert('You must be logged in to view your order history.')
  }
  loading.value = false
}

const fetchUserId = async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error.message)
  } else if (data && data.user) {
    id.value = data.user.id
    await fetchUserOrders()
  }
}

onMounted(async () => {
  await fetchUserId()
})
</script>

<style scoped>
.text-center {
  text-align: center;
}

.order-card {
  cursor: pointer;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}

.order-image {
  height: 150px;
  object-fit: contain;
  border-radius: 4px 4px 0 0;
}

.order-title {
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 0.5rem;
}

.order-details p {
  margin: 0.3rem 0;
}

.pagination {
  justify-content: center;
}

.order-detail-image {
  height: 100px;
  object-fit: contain;
  margin-bottom: 1rem;
  border-radius: 4px;
}
</style>
