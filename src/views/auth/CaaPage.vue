<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import MerchandiseCollege from '@/components/layout/MerchandiseCollege.vue'

const theme = ref('light')
const drawer = ref(false)

const images = [
  {
    src: '/c5edc5c5d954cb7071e3ae0d03a1cc39.jpg',
    price: '₱300',
    name: 'College Tee',
  },
  {
    src: '/10c890b6ae753178741d818cd4125c02.jpg',
    price: '₱100',
    name: 'Outfits',
  },
  {
    src: '/697dc3a2bbf914ee70e25bc5e05fbb5e.jpg',
    price: '₱50',
    name: 'Accessories',
  },
  {
    src: '/6f025c53f15a6f1bf55f9036b9ac2971.jpg',
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
      <!-- Main Content -->
      <v-main>
        <v-container fluid>
          <!-- Banner Image -->
          <v-img src="/pexels-uraw-12512732.jpg" height="400px" cover>
            <div class="g-text">College of Agriculture and Agri-Industries</div>
          </v-img>

          <v-container>
            <h1
              class="text-h4 font-weight-bold"
              style="font-size: 2rem; text-align: left; padding-top: 50px"
            >
              Featured
            </h1>
          </v-container>

          <!-- Parallax Sections -->
          <v-container fluid>
            <v-row>
              <v-col cols="6">
                <v-parallax
                  height="500"
                  src="/6f025c53f15a6f1bf55f9036b9ac2971.jpg"
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
                          to="/merchs"
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
                  src="/c5edc5c5d954cb7071e3ae0d03a1cc39.jpg"
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
                          to="/merchs"
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
            <h1 class="text-h4 font-weight-bold mb-4" style="font-size: 2rem">
              "For those who grow, nourish, and lead—gear up with school
              spirit."
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
              "Rooted in knowledge, growing with pride—wear your agri spirit!"
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
              "This is your chance—don’t miss out on the must-have merch of the
              season!"
            </p>
          </v-container>
          <!-- Carousel Images -->
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
              <v-card class="g-card">
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
            <MerchandiseCollege :collegeId="4" collegeName="CAA College" />
          </div>
        </v-container>
      </v-main>
    </template>
  </AppLayout>
</template>

<style scoped>
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
.image-overlay {
  position: relative;
}

.g-text {
  position: absolute;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center alignment */
  color: white; /* Set text color to white */
  font-size: 3rem; /* Larger text */
  font-weight: bold;
  text-align: center;
  background-color: rgba(
    223,
    199,
    46,
    0.3
  ); /* Darker background for contrast */
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

.g-card {
  background: linear-gradient(135deg, #ece451, #776f09);
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

.v-btn.btn {
  background: linear-gradient(45deg, #c4ab0a, #ddda3f);
  color: white;
  font-weight: bold;
  border-radius: 5px;
  text-transform: uppercase;
  padding: 10px 20px;
}

.v-btn.btn:hover {
  background: linear-gradient(45deg, #ddda3f, #c4ab0a);
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

  .g-card {
    border-radius: 5px;
  }

  .v-card-title,
  .v-card-subtitle {
    font-size: 16px;
  }

  .v-btn.g-btn {
    font-size: 14px;
  }
}
</style>
