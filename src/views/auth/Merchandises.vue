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
        <h2 class="text-center">College Merchandises</h2>
        <!-- Filter Buttons -->
        <div class="text-center d-flex justify-center gap-4">
          <v-btn class="mx-2" @click="activeType = ''">All</v-btn>
          <v-btn class="mx-2" @click="activeType = 'Lanyard'">Lanyards</v-btn>
          <v-btn class="mx-2" @click="activeType = 'Uniform'">Uniforms</v-btn>
          <v-btn class="mx-2" @click="activeType = 'Accessories'"
            >Accessories</v-btn
          >
        </div>

        <!-- Merchandise Display -->
        <v-container class="mt-3">
          <v-row>
            <v-col
              cols="12"
              md="4"
              v-for="item in filteredMerchandise"
              :key="item.id"
              class="mt-3"
            >
              <v-card @click="openDetailModal(item)">
                <v-img :src="item.image" height="200px"></v-img>
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
                <v-btn icon @click="decreaseQuantity"
                  ><v-icon>mdi-minus</v-icon></v-btn
                >
                <v-text-field
                  label="Quantity"
                  v-model="quantity"
                  type="number"
                  min="1"
                  class="mx-2"
                  readonly
                ></v-text-field>
                <v-btn icon @click="increaseQuantity"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </div>
              <div><strong>Total Price:</strong> ₱{{ totalPrice }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="confirmPurchase"
                >Confirm Purchase</v-btn
              >
              <v-btn text @click="isDetailModalOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped>
.v-card-subtitle {
  max-height: 50px;
  overflow-y: auto;
  white-space: normal;
  overflow-wrap: break-word;
}
</style>
