<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importing the useRouter hook

// Create a router instance
const router = useRouter();

// Function to navigate to the home page when the "Explore More" button is clicked
const navigateToHome = () => {
  router.push('/'); // This will navigate to the home route
};
</script>

<template>
  <AppLayout>
    <template #content>
      <div class="about-us container">
        <!-- Left Section: Two Image Cards -->
        <div class="left">
          <div class="image-card">
            <div class="image-container">
              <img src="/public/e1de153b-7355-4bd9-be85-9f8b19003941.jpeg" alt="Image 1" />
            </div>
            <div class="card-info">
              <h4>Brian Inguito</h4>
              <p>Full Stack Developer</p>
            </div>
            <!-- Social Media Icons Inside the Card -->
            <div class="social-icons">
              <a href="https://facebook.com" target="_blank" class="social-icon">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" class="social-icon">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://github.com" target="_blank" class="social-icon">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>

          <div class="image-card">
            <div class="image-container">
              <img src="/public/martyyyy.jpg" alt="Image 2" />
            </div>
            <div class="card-info">
              <h4>Reymart John Eva</h4>
              <p>System Analyst / Frontend</p>
            </div>
            <!-- Social Media Icons Inside the Card -->
            <div class="social-icons">
              <a href="https://facebook.com" target="_blank" class="social-icon">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" class="social-icon">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://github.com" target="_blank" class="social-icon">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Section: Text Content -->
        <div class="right">
          <div class="stats">
            <h2>1,000+</h2>
            <p>Sales in July 2024 with 5-star ratings and happy clients.</p>
          </div>

          <div class="about-text">
            <h3>CampusThreads</h3>
            <h1>ABOUT US</h1>
            <p>
              Welcome to <b>CampusThread</b>, your go-to destination for university merchandise! We offer stylish apparel
              and accessories that celebrate your campus pride. Whether you're a student, alumni, or faculty, our collection
              is designed for comfort and durability, making it easy to show off your school spirit. Join the CampusThread
              community today and wear your pride with style!
            </p>
            <!-- Button with click event to navigate home -->
            <button class="explore-btn" @click="navigateToHome">EXPLORE MORE</button>
          </div>
        </div>
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
/* General styles */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

/* Left section styles: Image cards displayed side by side */
.left {
  flex: 1;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap; /* Allow the items to wrap when the screen is smaller */
}

/* Image card styles */
.image-card {
  flex: 1;
  max-width: 48%; /* Ensure the cards are side by side */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.image-card:hover {
  transform: scale(1.05);
}

.image-container {
  height: 250px; /* Set a fixed height for the image */
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the container without stretching */
}

.card-info {
  padding: 10px;
  background-color: #6a0dad;
  color: #fff;
  text-align: center;
}

.card-info h4 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.card-info p {
  font-size: 14px;
  margin: 5px 0;
}

/* Social Icons inside the Card */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 10px;
}

.social-icon {
  font-size: 20px;
  color: #6a0dad;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #8b00ff;
}

/* Right section styles */
.right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats h2 {
  color: #6a0dad;
  font-size: 36px;
  font-weight: bold;
  margin: 0;
}

.stats p {
  font-size: 16px;
  margin: 10px 0;
}

.about-text h3 {
  color: #6a0dad;
  font-size: 18px;
  margin: 0;
}

.about-text h1 {
  font-size: 36px;
  font-weight: bold;
  margin: 10px 0;
}

.about-text p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.explore-btn {
  background: #6a0dad;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.explore-btn:hover {
  background: #8b00ff;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .left {
    flex-direction: column;
    gap: 20px;
  }

  .image-card {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .right {
    flex: 1;
    width: 100%;
  }
}
</style>
