<template>
  <aside class="w-64 h-screen bg-gray-900 text-white fixed">
    <div class="p-6 font-bold text-xl">📚 Library</div>
    <nav class="mt-4 space-y-2">
      <RouterLink
        to="/"
        class="block px-6 py-2 hover:bg-gray-700"
        :class="{ 'bg-gray-800 font-semibold': $route.path === '/' }"
      >Dashboard</RouterLink>
      
      <RouterLink
        to="/books"
        class="block px-6 py-2 hover:bg-gray-700"
        :class="{ 'bg-gray-800 font-semibold': $route.path === '/books' }"
      >Books</RouterLink>

      <RouterLink
        to="/users"
        class="block px-6 py-2 hover:bg-gray-700"
        :class="{ 'bg-gray-800 font-semibold': $route.path === '/users' }"
      >Users</RouterLink>

      <RouterLink
        to="/borrowings"
        class="block px-6 py-2 hover:bg-gray-700"
        :class="{ 'bg-gray-800 font-semibold': $route.path === '/borrowings' }"
      >Borrowings</RouterLink>

      <RouterLink
        to="/reports"
        class="block px-6 py-2 hover:bg-gray-700"
        :class="{ 'bg-gray-800 font-semibold': $route.path === '/reports' }"
      >Reports</RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
const $route = useRoute()
</script>
