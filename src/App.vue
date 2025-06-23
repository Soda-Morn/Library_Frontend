<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-sky-100 shadow-md">
    <nav class="container mx-auto flex justify-between items-center p-4">
      <div class="text-xl font-bold text-sky-600">Library Management</div>
      <div class="space-x-4">
        <RouterLink 
          to="/" 
          class="text-sky-700 hover:text-white hover:bg-sky-500 px-4 py-2 rounded transition"
          active-class="bg-sky-500 text-white"
        >
          Home
        </RouterLink>
        <RouterLink 
          to="/about" 
          class="text-sky-700 hover:text-white hover:bg-sky-500 px-4 py-2 rounded transition"
          active-class="bg-sky-500 text-white"
        >
          About
        </RouterLink>
      </div>
    </nav>
  </header>

  <main class="container mx-auto p-4">
    <RouterView />
  </main>
</template>
