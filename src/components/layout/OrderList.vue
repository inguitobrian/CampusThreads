<template>
  <div class="order-list-container">
    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>

    <!-- Display Purchases Table -->
    <div v-else>
      <table v-if="userPurchases.length > 0" class="purchases-table">
        <thead>
          <tr>
            <th>Merchandise</th>
            <th>User ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="purchase in userPurchases" :key="purchase.id">
            <td>
              <div class="merchandise-item">
                <img
                  :src="purchase.image"
                  alt="Merchandise Image"
                  class="merchandise-image"
                />
                <span class="merchandise-name">{{
                  purchase.merchandise_name
                }}</span>
              </div>
            </td>
            <td>{{ purchase.user_id }}</td>
            <td>{{ purchase.qty }}</td>
            <td>{{ purchase.totalPrice }}</td>
            <td>{{ new Date(purchase.created_at).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>

      <!-- No Purchases Found -->
      <div v-else class="no-purchases">
        <p>No purchases found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthUserStore } from '@/stores/authUser'
import { supabase } from '@/utils/supabase.js'

// State variables
const loading = ref(false)
const error = ref(false)
const errorMessage = ref('')
const userPurchases = ref([])

// Accessing authStore
const authStore = useAuthUserStore()

// Fetch purchases filtered by the logged-in user's college ID
const fetchUserPurchases = async () => {
  loading.value = true
  error.value = false
  errorMessage.value = ''

  try {
    if (!authStore.isLoggedIn) {
      throw new Error('User is not logged in.')
    }

    const collegeId = authStore.userData?.college_id
    if (!collegeId) {
      throw new Error('User college_id is not available.')
    }

    const { data: transactions, error: transactionError } = await supabase
      .from('transactions')
      .select(
        `id, user_id, qty, created_at, merchandise:merchandises(id, name, price, image, college_id)`,
      )
      .eq('status', 'paid')
      .order('created_at', { ascending: false })

    if (transactionError) {
      throw new Error(
        'Error fetching transactions: ' + transactionError.message,
      )
    }

    // Filter the transactions to ensure the merchandise belongs to the user's college
    userPurchases.value = transactions
      .map(transaction => {
        const merchandise = transaction.merchandise
        if (!merchandise) {
          return null
        }

        // Check if merchandise belongs to the user's college
        if (merchandise.college_id !== collegeId) {
          return null
        }

        const totalPrice = transaction.qty * (merchandise.price || 0)
        return {
          id: transaction.id,
          user_id: transaction.user_id,
          merchandise_name: merchandise.name,
          qty: transaction.qty,
          totalPrice: new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
          }).format(totalPrice),
          created_at: transaction.created_at,
          image: merchandise.image,
          college_id: merchandise.college_id,
        }
      })
      .filter(purchase => purchase !== null) // Filter out transactions without valid merchandise
  } catch (fetchError) {
    error.value = true
    errorMessage.value =
      'There was an issue fetching the purchase history. Please try again.'
  } finally {
    loading.value = false
  }
}

// Fetch user purchases when the component is mounted
onMounted(async () => {
  await authStore.getUserInformation() // Fetch user data from the auth store
  fetchUserPurchases() // Then fetch purchases using the college_id
})
</script>

<style scoped>
/* Container */
.order-list-container {
  padding: 20px;
  background-color: #f4f7fa;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Loading Spinner */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-spinner .spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #1f8ef1;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.loading-spinner p {
  margin-top: 10px;
  color: #555;
  font-size: 16px;
}

/* Error Message */
.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

/* Purchases Table */
.purchases-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.purchases-table th,
.purchases-table td {
  padding: 12px 15px;
  text-align: left;
}

.purchases-table th {
  background-color: #40513b;
  color: white;
}

.purchases-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.purchases-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.merchandise-item {
  display: flex;
  align-items: center;
}

.merchandise-image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
}

.merchandise-name {
  font-weight: bold;
  color: #333;
}

/* No Purchases Found */
.no-purchases {
  text-align: center;
  color: #888;
  font-size: 18px;
  margin-top: 20px;
}

/* Animation for spinner */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
