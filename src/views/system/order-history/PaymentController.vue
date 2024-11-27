<template>
  <div class="payment-page">
    <v-container>
      <h2 class="text-center mb-4">Processing Your Payment</h2>
      <v-progress-circular
        indeterminate
        color="primary"
        size="70"
      ></v-progress-circular>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const createPaymentLink = async order => {
  const AUTH_PAY = 'sk_test_15chmAX2kkA3B2DRmVYxizaZ' // Replace with your actual secret key
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${btoa(AUTH_PAY)}`,
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount: Math.round(
            parseFloat(order.formattedPrice.replace(/[₱,]/g, '')) * 100,
          ), // Convert PHP to centavos
          description: `Payment for ${order.merchandise_name}`,
          remarks: `Order ID: ${order.id}`,
        },
      },
    }),
  }

  try {
    const response = await fetch('https://api.paymongo.com/v1/links', options)
    const data = await response.json()

    if (data?.data?.attributes?.checkout_url) {
      window.location.href = data.data.attributes.checkout_url // Redirect to payment page
    } else {
      console.error('Failed to get checkout URL:', data)
      alert('Failed to create payment link. Please try again.')
      router.back()
    }
  } catch (error) {
    console.error('Error creating payment link:', error.message)
    alert('There was an error processing your payment.')
    router.back()
  }
}

onMounted(() => {
  const orderQuery = route.query.order
  if (orderQuery) {
    const order = JSON.parse(decodeURIComponent(orderQuery))
    createPaymentLink(order)
  } else {
    router.push('/') // Redirect back if no order data
  }
})
</script>

<style scoped>
.payment-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}
</style>
