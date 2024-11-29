<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import MerchandiseCollege from '@/components/layout/MerchandiseCollege.vue'

const theme = ref('light')
const drawer = ref(false)

const images = [
  {
    src: 'public/e98b82627662e62ab553b39ebe51174a.jpg',
    price: '₱350',
    name: 'College Tee',
  },
  {
    src: 'public/45573a304bbfe6132dbac1cf25da78fd.jpg',
    price: '₱500',
    name: 'Outfits',
  },
  {
    src: 'public/ef74f22d91a1496a8c3c6223eb56c80f.jpg',
    price: '₱50',
    name: 'Accessories',
  },
  {
    src: 'public/df92d76bfd8fa56352d2b916bfb4b973.jpg',
    price: '₱100',
    name: 'Lanyard',
  },
]
const modalVisible = ref(false)
const selectedImage = ref({})
const quantity = ref(1) // Initial quantity set to 1

// Function to open the modal and set the selected image
const openModal = image => {
  selectedImage.value = image
  modalVisible.value = true
  quantity.value = 1 // Reset quantity when opening the modal
}

// Function for "Buy Now" button action
const buyNow = () => {
  alert(
    `You are purchasing ${quantity.value} ${selectedImage.value.name}(s) for ${selectedImage.value.price} each.`,
  )
  // Implement logic for the "Buy Now" action, e.g., add to cart or checkout
}

// Functions to increment and decrement the quantity
const incrementQuantity = () => {
  quantity.value += 1
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1
  }
}
const currentSet = ref(0)

function nextSet() {
  currentSet.value = (currentSet.value + 1) % images.length
}

function prevSet() {
  currentSet.value = (currentSet.value - 1 + images.length) % images.length
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-responsive class="border rounded">
        <v-app
          :theme="theme"
          style="
            background: linear-gradient(to right, #add8e6, #fdfd96);
            font-family: 'Roboto', sans-serif;
          "
        >
          <!-- Main Content -->
          <v-main>
            <v-container fluid>
              <v-img
                src="public/pexels-manelandsean-17328274.jpg"
                height="400px"
                cover
              >
                <div class="e-text">College of Education</div>
              </v-img>

              <v-container>
                <h1
                  class="text-h4 font-weight-bold"
                  style="font-size: 2rem; text-align: left; padding-top: 50px"
                >
                  Featured
                </h1>
              </v-container>

              <v-container fluid>
                <v-row>
                  <v-col cols="6">
                    <v-parallax
                      height="500"
                      src="public/df92d76bfd8fa56352d2b916bfb4b973.jpg"
                    >
                      <v-overlay>
                        <template v-slot:activator="{ props }">
                          <v-container
                            v-bind="props"
                            class="fill-height d-flex flex-column justify-space-between align-start"
                          >
                            <h2
                              class="text-h4"
                              style="
                                writing-mode: vertical-rl;
                                text-orientation: mixed;
                                color: white;
                                font-weight: bold;
                                margin-left: 20px;
                                margin-top: 200px;
                              "
                            >
                              LANYARDS
                            </h2>
                            <v-btn
                              outlined
                              class="text-none"
                              style="
                                margin-left: 20px;
                                margin-bottom: 20px;
                                color: black;
                                border-color: black;
                              "
                            >
                              Shop Now
                              <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                          </v-container>
                        </template>
                      </v-overlay>
                    </v-parallax>
                  </v-col>

                  <v-col cols="6">
                    <v-parallax
                      height="500"
                      src="public/e98b82627662e62ab553b39ebe51174a.jpg"
                    >
                      <v-overlay>
                        <template v-slot:activator="{ props }">
                          <v-container
                            v-bind="props"
                            class="fill-height d-flex flex-column justify-space-between align-start"
                          >
                            <h2
                              class="text-h4"
                              style="
                                writing-mode: vertical-rl;
                                text-orientation: mixed;
                                color: white;
                                font-weight: bold;
                                margin-left: 20px;
                                margin-top: 200px;
                              "
                            >
                              UNIFORMS
                            </h2>
                            <v-btn
                              outlined
                              class="text-none"
                              style="
                                margin-left: 20px;
                                margin-bottom: 20px;
                                color: black;
                                border-color: black;
                              "
                            >
                              Shop Now
                              <v-icon right>mdi-arrow-right</v-icon>
                            </v-btn>
                          </v-container>
                        </template>
                      </v-overlay>
                    </v-parallax>
                  </v-col>
                </v-row>
              </v-container>
              <v-container class="text-center mt-8">
                <h1
                  class="text-h4 font-weight-bold mb-4"
                  style="font-size: 2rem"
                >
                  "Nurture, inspire, and lead—wear merch that celebrates your
                  path in education."
                </h1>
                <p
                  class="text-body-1"
                  style="
                    font-size: 1rem;
                    font-weight: bold;
                    max-width: 900px;
                    margin: 0 auto;
                  "
                >
                  "For those who ignite learning—show your university spirit
                  with pride."
                </p>
              </v-container>
              <v-responsive
                class="video-fullscreen"
                aspect-ratio="1/1"
                style="height: 100vh"
              >
                <video
                  autoplay
                  loop
                  playsinline
                  controls
                  style="width: 100%; height: 100%; object-fit: cover"
                >
                  <source
                    src="\videos\465051289_9085493988152168_3587781794123977083_n.mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </v-responsive>
              <v-container class="text-left mt-8">
                <h1
                  class="text-h4 font-weight-bold mb-4"
                  style="font-size: 2rem; text-align: left"
                >
                  Don’t miss
                </h1>
                <p
                  class="text-body-1"
                  style="
                    font-size: 1rem;
                    font-weight: bold;
                    max-width: 900px;
                    margin: 0;
                    text-align: left;
                  "
                >
                  "This is your chance—don’t miss out on the must-have merch of
                  the season!"
                </p>
              </v-container>

              <v-container>
                <v-row>
                  <!-- Product Cards -->
                  <v-col
                    v-for="(image, index) in images"
                    :key="index"
                    cols="6"
                    md="3"
                  >
                    <v-card
                      class="mx-auto product-card"
                      outlined
                      @click="openModal(image)"
                    >
                      <v-img :src="image.src" height="300px" cover>
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height"
                            align="center"
                            justify="center"
                          >
                            <v-spinner></v-spinner>
                          </v-row>
                        </template>
                        <!-- Overlay with Product Name and Price -->
                        <div class="product-overlay">
                          <span class="product-name">{{ image.name }}</span>
                        </div>
                      </v-img>
                    </v-card>
                  </v-col>
                </v-row>

                <!-- Modal for displaying the image in full size -->
                <v-dialog v-model="modalVisible" max-width="800px">
                  <v-card class="e-card">
                    <!-- Large Image -->
                    <v-img
                      :src="selectedImage.src"
                      height="500px"
                      class="d-flex align-center justify-center"
                      contain
                    ></v-img>

                    <!-- Product Info -->
                    <v-card-title class="text-center text-white">
                      <span class="product-name">{{ selectedImage.name }}</span>
                    </v-card-title>
                  </v-card>
                </v-dialog>
              </v-container>
              <div>
                <MerchandiseCollege :collegeId="6" collegeName="CED College" />
              </div>
            </v-container>
          </v-main>
        </v-app>
      </v-responsive>
    </template>
  </AppLayout>
</template>

<style>
.bg-login {
  background-color: #71885a;
}

.bg-student {
  background-color: #8fa477;
}

.bg-admin {
  background-color: #acbd99;
}

.v-input--selection-controls
  .v-input--checkbox
  .v-input__control
  .v-input__slot {
  color: #63794e;
}

.nav-bar {
  min-height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

.nav-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.search-bar {
  min-width: 300px;
  max-width: 500px;
  margin-right: 20px;
}

.search-bar {
  min-height: 40px;
}
.image-overlay {
  position: relative;
}

.e-text {
  position: absolute;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center alignment */
  color: white; /* Set text color to white */
  font-size: 3rem; /* Larger text */
  font-weight: bold;
  text-align: center;
  background-color: rgba(94, 94, 237, 0.3); /* Darker background for contrast */
  padding: 15px 30px;
  border-radius: 10px;
}

.v-btn {
  margin: 5px;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Hover effect for buttons */
}

.social-icons-row {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.v-icon {
  transition: transform 0.3s ease;
}

.v-icon:hover {
  transform: scale(1.2); /* Hover effect for icons */
}

.product-card {
  position: relative;
  cursor: pointer;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-price {
  font-size: 16px;
}

.v-img {
  transition: transform 0.3s ease;
}

.product-card:hover .v-img {
  transform: scale(1.05);
}

/* Modal Styles */
.v-dialog__content {
  padding: 0 !important;
}

.e-card {
  background: linear-gradient(
    135deg,
    #f9e36b,
    #1e3d58
  ); /* Lighter yellow to darker blue */
  color: white;
  border-radius: 10px;
}

.v-card-title {
  font-size: 20px;
  font-weight: bold;
}

.v-card-subtitle {
  font-size: 18px;
}

.v-btn.e-btn {
  background: linear-gradient(
    45deg,
    #f9e36b,
    #1e3d58
  ); /* Lighter yellow to darker blue */
  color: white;
  font-weight: bold;
  border-radius: 5px;
  text-transform: uppercase;
  padding: 10px 20px;
}

.v-btn.e-btn:hover {
  background: linear-gradient(
    45deg,
    #1e3d58,
    #f9e36b
  ); /* Reverse gradient on hover */
}

/* Quantity Input Styles */
.quantity-input {
  width: 80px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 0 10px;
}

/* Responsive Design for Modal */
@media (max-width: 600px) {
  .v-img {
    height: 400px;
  }

  .e-card {
    border-radius: 5px;
  }

  .v-card-title,
  .v-card-subtitle {
    font-size: 16px;
  }

  .v-btn.e-btn {
    font-size: 14px;
  }
}
</style>
