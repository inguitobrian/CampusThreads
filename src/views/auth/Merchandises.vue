<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { supabase } from '@/utils/supabase.js'

const merchandiseList = ref([])
const activeType = ref('')
const isDetailModalOpen = ref(false)
const selectedMerchandise = ref(null)
const quantity = ref(1)
const userId = ref(null)

// Computed properties
const filteredMerchandise = computed(() =>
  activeType.value
    ? merchandiseList.value.filter(item => item.type === activeType.value)
    : merchandiseList.value,
)

const totalPrice = computed(() =>
  selectedMerchandise.value
    ? selectedMerchandise.value.price * quantity.value
    : 0,
)

// Methods
async function fetchMerchandise() {
  const { data, error } = await supabase.from('merchandises').select(`
    id, name, desc, price, type, image,
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

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <h2 class="text-center mb-4">College Merchandises</h2>

        <!-- Filter Buttons -->
        <div class="text-center d-flex justify-center gap-4">
          <v-btn class="filter-btn all" @click="activeType = ''">All</v-btn>
          <v-btn class="filter-btn lanyard" @click="activeType = 'Lanyard'"
            >Lanyards</v-btn
          >
          <v-btn class="filter-btn uniform" @click="activeType = 'Uniform'"
            >Uniforms</v-btn
          >
          <v-btn
            class="filter-btn accessories"
            @click="activeType = 'Accessories'"
            >Accessories</v-btn
          >
        </div>

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
                <v-img
                  :src="item.image"
                  height="200px"
                  class="product-img"
                ></v-img>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>{{ item.desc }}</v-card-subtitle>
                <v-card-text>
                  <strong>Price:</strong> ₱{{ item.price }} <br />
                  <strong>Department:</strong> {{ item.college_name }}
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
              <div>
                <strong>Price:</strong> ₱{{ selectedMerchandise?.price }}
              </div>
              <div>
                <strong>Department:</strong>
                {{ selectedMerchandise?.college_name }}
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
              <v-btn style="color: #40513b" @click="confirmPurchase"
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
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
/* Custom styles for hover effects and transitions */
.product-card {
  border-radius: 8px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-img {
  border-radius: 8px;
}

/* Filter Button styles */
.filter-btn {
  color: #40513b;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 20px;
  transition: background-color 0.3s;
}

/* Specific colors for each button */
.filter-btn.all {
  background-color: #f1d2a9; /* Light yellow */
}

.filter-btn.lanyard {
  background-color: #f4f5a7; /* Light green */
}

.filter-btn.uniform {
  background-color: #a7e0f4; /* Light blue */
}

.filter-btn.accessories {
  background-color: #c6a9f4; /* Light purple */
}

/* Hover effects for each button */
.filter-btn:hover {
  opacity: 0.8;
}

/* Modal styles */
.v-dialog .v-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.v-card-title,
.v-card-subtitle {
  font-weight: bold;
}

.v-btn {
  font-weight: bold;
}

@media (max-width: 768px) {
  .product-card {
    margin-bottom: 20px;
  }

  .filter-btn {
    padding: 6px 15px;
  }
}
</style>
