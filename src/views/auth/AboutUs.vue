<script setup>
import AppLayout from '@/components/layout/AppLayout.vue';
import { ref } from 'vue';

</script>
<template>
  <AppLayout>
<template #content>
  <div class="about-us container">
    <!-- Left Section: Images and Ratings -->
    <div class="left">
      <div class="image-container">
        <img src="https://via.placeholder.com/300x400" alt="Product Image 1" />
      </div>
      <div class="image-container">
        <img src="https://via.placeholder.com/300x400" alt="Product Image 2" />
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
          Welcome to <b>CampusThread</b>, your go-to destination for university merchandise! We offer stylish apparel and accessories that celebrate your campus pride. Whether you're a student, alumni, or faculty, our collection is designed for comfort and durability, making it easy to show off your school spirit. Join the CampusThread community today and wear your pride with style!
        </p>
        <button class="explore-btn">EXPLORE MORE</button>
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

/* Left section styles */
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-container img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.avatars {
  display: flex;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>
