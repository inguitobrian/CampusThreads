<template>
  <v-container>
    <h1 class="text-center mb-4">Your Paid Orders</h1>

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
          <v-btn @click="fetchPaidOrders" color="primary" outlined class="mt-2">
            Retry
          </v-btn>
        </v-col>
      </v-row>

      <!-- Paid Orders List -->
      <v-row
        v-if="paidOrders.length && !loading && !error"
        dense
        class="order-grid"
      >
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="order in paidOrders"
          :key="order.id"
        >
          <v-card class="order-card" outlined>
            <v-img
              src="/paidicon.svg"
              alt="Paid Icon"
              width="30"
              height="30"
              class="paid-icon"
            ></v-img>

            <v-img
              :src="order.image"
              alt="Merchandise Image"
              class="order-image"
              contain
            ></v-img>
            <v-card-title class="order-title">
              {{ order.merchandise_name }}
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Order ID: {{ order.id }}
            </v-card-subtitle>
            <v-card-text class="order-details">
              <p><strong>Quantity:</strong> {{ order.qty }}</p>
              <p><strong>Total Price:</strong> {{ order.formattedPrice }}</p>
              <p>
                <strong>Purchase Date:</strong>
                {{ formatDate(order.created_at) }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <p v-else-if="!loading && !error" class="text-center">
        No Paid Orders found.
      </p>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

// Define reactive variables
const paidOrders = ref([])
const loading = ref(true)
const error = ref(false)
const errorMessage = ref('')

// Track user session state
const user = ref(null)

// Helper function to format the date
const formatDate = date => {
  return new Date(date).toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Fetch paid orders of the logged-in user
const fetchPaidOrders = async () => {
  if (!user.value || !user.value.id) {
    error.value = true
    errorMessage.value = 'You need to be logged in to view your orders.'
    loading.value = false
    return
  }

  loading.value = true
  error.value = false

  try {
    // Fetch only the paid orders for the logged-in user
    const { data, error: fetchError } = await supabase
      .from('transactions')
      .select(
        `id, qty, created_at, merchandise:merchandises(id, name, price, image)`,
      )
      .eq('status', 'paid') // Only paid orders
      .eq('user_id', user.value.id) // Filter by logged-in user's ID

    if (fetchError) {
      error.value = true
      errorMessage.value =
        'There was an issue fetching your paid orders. Please try again.'
      console.error('Error fetching paid orders:', fetchError.message)
    } else {
      // Map data to include formatted price and relevant merchandise info
      paidOrders.value = data.map(order => {
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
    }
  } catch (e) {
    console.error('Unexpected error:', e.message)
    error.value = true
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  }

  loading.value = false
}

// Fetch user session on component mount
onMounted(() => {
  // Track user session and authentication changes
  const session = supabase.auth.getSession()
  user.value = session?.user

  if (user.value) {
    fetchPaidOrders()
  }

  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user
    if (user.value) {
      fetchPaidOrders()
    }
  })
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

.paid-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 5px;
}
</style>
