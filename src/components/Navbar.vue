<template>
  <header class="h-16 fixed top-0 left-64 right-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
    <!-- Left: App Title with Icon -->
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>
      <div>
        <h1 class="text-lg font-bold text-gray-800">Library Management System</h1>
        <p class="text-xs text-gray-500 -mt-0.5">Admin Dashboard</p>
      </div>
    </div>

    <!-- Right: Notifications & Admin Profile -->
    <div class="flex items-center gap-4">
      <!-- Divider -->
      <div class="h-6 w-px bg-gray-200"></div>

      <!-- Admin Profile -->
      <div v-if="admin" class="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors relative">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-semibold text-gray-800">{{ admin.name }}</p>
          <p class="text-xs text-gray-500">{{ admin.email }}</p>
        </div>

        <div class="relative">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            {{ getInitials(admin.name) }}
          </div>
          <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
        </div>

        <!-- Dropdown Arrow -->
        <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>

        <!-- Dropdown Menu -->
        <div class="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
          <div class="py-2">
            <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
              <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Profile
            </a>
            <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
              <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Settings
            </a>
            <hr class="my-1 border-gray-100">
            <a href="#" class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
              <svg class="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Sign Out
            </a>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <div class="h-4 bg-gray-200 rounded animate-pulse mb-1 w-20"></div>
          <div class="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
        </div>
        <div class="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugin/axios'

const admin = ref(null)
const adminId = 1

onMounted(async () => {
  try {
    const response = await api.get(`/admins/${adminId}`)
    admin.value = response.data.data
  } catch (error) {
    console.error('Failed to load admin info:', error)
  }
})

function getInitials(name) {
  if (!name) return 'A'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>