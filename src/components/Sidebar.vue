<template>
  <aside
    class="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed shadow-2xl"
  >
    <!-- Header -->
    <div class="p-6 border-b border-gray-700">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
        </div>
        <div>
          <h1 class="font-bold text-lg text-white">Library</h1>
          <p class="text-xs text-gray-300">Management System</p>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="mt-6 px-4 space-y-2">
      <!-- Dashboard -->
      <RouterLink
        to="/"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
          ></path>
        </svg>
        <span class="font-medium">Dashboard</span>
      </RouterLink>

      <!-- Books -->
      <RouterLink
        to="/books"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/books',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/books'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          ></path>
        </svg>
        <span class="font-medium">Books</span>
      </RouterLink>

      <!-- Users -->
      <RouterLink
        to="/users"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/users',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/users'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          ></path>
        </svg>
        <span class="font-medium">Users</span>
      </RouterLink>

      <!-- Borrowings -->
      <RouterLink
        to="/borrowings"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/borrowings',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/borrowings'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          ></path>
        </svg>
        <span class="font-medium">Borrowings</span>
      </RouterLink>

      <!-- Reports -->
      <RouterLink
        to="/reports"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/reports',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/reports'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
        <span class="font-medium">Reports</span>
      </RouterLink>

      <!-- Categories -->
      <RouterLink
        to="/categories"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/categories',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/categories'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          ></path>
        </svg>
        <span class="font-medium">Categories</span>
      </RouterLink>

      <!-- Suppliers -->
      <RouterLink
        to="/supplier"
        class="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-700/50 hover:translate-x-1"
        :class="{
          'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg font-semibold':
            $route.path === '/supplier',
        }"
      >
        <svg
          class="w-5 h-5 transition-colors"
          :class="
            $route.path === '/supplier'
              ? 'text-white'
              : 'text-gray-400 group-hover:text-white'
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
        <span class="font-medium">Suppliers</span>
      </RouterLink>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
      <div class="flex items-center gap-3 text-sm text-gray-400">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>System Online</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
const $route = useRoute();
</script>