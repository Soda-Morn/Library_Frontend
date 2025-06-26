<template>
  <div>
    <Sidebar /> 
    <Navbar />
    <main class="ml-64 pt-20 p-6 bg-gray-100 min-h-screen">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
</script>
