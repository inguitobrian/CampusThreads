<template>
  <div>
    <h2 class="text-center mb-4">{{ collegeName }} Merchandise</h2>

    <!-- Merchandise Display -->
    <v-container class="mt-3">
      <v-row>
        <v-col
          v-for="item in filteredMerchandise"
          :key="item.id"
          cols="12"
          md="4"
          class="mb-4"
        >
          <v-card @click="openDetailModal(item)" class="product-card">
            <v-img :src="item.image" height="200px" class="product-img"></v-img>
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle>{{ item.desc }}</v-card-subtitle>
            <v-card-text>
              <strong>Price:</strong> ₱{{ item.price }} <br />
              <strong>College:</strong> {{ item.college_name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Merchandise Detail Modal -->
    <v-dialog v-model="isDetailModalOpen" max-width="500px">
      <v-card>
        <v-card-title>{{ selectedMerchandise?.name }}</v-card-title>
        <v-card-subtitle>{{ selectedMerchandise?.desc }}</v-card-subtitle>
        <v-card-text>
          <v-img :src="selectedMerchandise?.image" height="200px"></v-img>
          <div><strong>Price:</strong> ₱{{ selectedMerchandise?.price }}</div>
          <div>
            <strong>College:</strong> {{ selectedMerchandise?.college_name }}
          </div>
          <div>
            <strong>Available Quantity:</strong>
            {{ selectedMerchandise?.availableQuantity }}
          </div>
          <div class="d-flex align-center">
            <v-btn icon @click="decreaseQuantity">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-text-field
              label="Quantity"
              v-model="quantity"
              type="number"
              min="1"
              class="mx-2"
              readonly
            />
            <v-btn icon @click="increaseQuantity">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
          <div><strong>Total Price:</strong> ₱{{ totalPrice }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            style="color: #40513b"
            @click="confirmPurchase"
            class="font-weight-bold"
            >Add to Orders</v-btn
          >
          <v-btn
            text
            @click="isDetailModalOpen = false"
            class="font-weight-medium"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/utils/supabase.js'

const props = defineProps({
  collegeId: {
    type: Number,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
})

const merchandiseList = ref([])
const isDetailModalOpen = ref(false)
const selectedMerchandise = ref(null)
const userId = ref(null)
const quantity = ref(1) // Initial quantity set to 1

// Computed properties
const filteredMerchandise = computed(() =>
  merchandiseList.value.filter(item => item.college_id === props.collegeId),
)

const totalPrice = computed(() =>
  selectedMerchandise.value
    ? selectedMerchandise.value.price * quantity.value
    : 0,
)

// Methods
async function fetchMerchandise() {
  const { data, error } = await supabase.from('merchandises').select(`
    id, name, desc, price, type, image, college_id,
    colleges (name),
    stocks_in (quantity)
  `)
  if (error) {
    console.error('Error fetching merchandise:', error.message)
  } else {
    merchandiseList.value = data.map(item => {
      const availableQuantity =
        item.stocks_in.length > 0 ? item.stocks_in[0].quantity : 0
      return {
        ...item,
        college_name: item.colleges ? item.colleges.name : 'Unknown College',
        availableQuantity,
      }
    })
  }
}

function openDetailModal(item) {
  selectedMerchandise.value = item
  isDetailModalOpen.value = true
}

function increaseQuantity() {
  quantity.value++
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--
  }
}

async function confirmPurchase() {
  if (quantity.value > 0 && userId.value) {
    const { data: stockData, error: stockError } = await supabase
      .from('stocks_in')
      .select('quantity')
      .eq('merchandise_id', selectedMerchandise.value.id)
      .single()
    if (stockError) {
      console.error('Error fetching stock data:', stockError.message)
      return
    }

    const availableQuantity = stockData?.quantity || 0
    if (availableQuantity < quantity.value) {
      alert('Not enough stock available.')
      return
    }

    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        qty: quantity.value,
        merchandise_id: selectedMerchandise.value.id,
        user_id: userId.value,
        created_at: new Date(),
      })
    if (transactionError) {
      console.error('Error adding transaction:', transactionError.message)
      return
    }

    const { error: stockUpdateError } = await supabase
      .from('stocks_in')
      .update({
        quantity: availableQuantity - quantity.value,
      })
      .eq('merchandise_id', selectedMerchandise.value.id)
    if (stockUpdateError) {
      console.error('Error updating stock:', stockUpdateError.message)
      return
    }

    isDetailModalOpen.value = false
    alert('Purchase successful!')
  } else {
    alert('You must be logged in to make a purchase.')
  }
}

async function fetchUserId() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error.message)
  } else if (data && data.user) {
    userId.value = data.user.id
  }
}

// Lifecycle hooks
onMounted(async () => {
  await fetchUserId()
  await fetchMerchandise()
})
</script>
