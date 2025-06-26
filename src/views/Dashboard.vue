<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
      <p class="text-gray-600">Welcome back! Here's what's happening in your library today.</p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-flex items-center gap-3">
        <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-600 text-lg">Loading dashboard data...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-600 font-medium">{{ error }}</p>
        <button 
          @click="loadDashboard" 
          class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-else>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Books Card -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" @click="navigateTo('/books')">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-800">{{ dashboardData.books || 0 }}</p>
                <p class="text-sm text-gray-500">+12% from last month</p>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">Total Books</h3>
            <p class="text-sm text-gray-500">Available in library</p>
          </div>
          <div class="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        </div>

        <!-- Users Card -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" @click="navigateTo('/users')">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-800">{{ dashboardData.users || 0 }}</p>
                <p class="text-sm text-gray-500">+8% from last month</p>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">Active Users</h3>
            <p class="text-sm text-gray-500">Registered members</p>
          </div>
          <div class="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
        </div>

        <!-- Borrowings Card -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" @click="navigateTo('/borrowings')">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-800">{{ dashboardData.borrowings || 0 }}</p>
                <p class="text-sm text-gray-500">+15% from last month</p>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">Active Borrowings</h3>
            <p class="text-sm text-gray-500">Currently borrowed</p>
          </div>
          <div class="h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
        </div>

        <!-- Reports Card -->
        <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer" @click="navigateTo('/reports')">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div class="text-right">
                <p class="text-3xl font-bold text-gray-800">{{ dashboardData.reports || 0 }}</p>
                <p class="text-sm text-gray-500">Generated this month</p>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">Reports</h3>
            <p class="text-sm text-gray-500">System reports</p>
          </div>
          <div class="h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
        </div>
      </div>

      <!-- Quick Actions & Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Quick Actions Card -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Quick Actions
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <button 
              @click="handleQuickAction('add-book')"
              class="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200 group transform hover:scale-105 active:scale-95"
              :class="{ 'ring-2 ring-blue-500 bg-blue-100': selectedAction === 'add-book' }"
            >
              <svg class="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              <p class="text-sm font-medium text-gray-700">Add Book</p>
            </button>
            
            <button 
              @click="handleQuickAction('add-user')"
              class="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all duration-200 group transform hover:scale-105 active:scale-95"
              :class="{ 'ring-2 ring-purple-500 bg-purple-100': selectedAction === 'add-user' }"
            >
              <svg class="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              <p class="text-sm font-medium text-gray-700">Add User</p>
            </button>
            
            <button 
              @click="handleQuickAction('new-borrowing')"
              class="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-all duration-200 group transform hover:scale-105 active:scale-95"
              :class="{ 'ring-2 ring-green-500 bg-green-100': selectedAction === 'new-borrowing' }"
            >
              <svg class="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
              </svg>
              <p class="text-sm font-medium text-gray-700">New Borrowing</p>
            </button>
            
            <button 
              @click="handleQuickAction('generate-report')"
              class="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all duration-200 group transform hover:scale-105 active:scale-95"
              :class="{ 'ring-2 ring-orange-500 bg-orange-100': selectedAction === 'generate-report' }"
            >
              <svg class="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <p class="text-sm font-medium text-gray-700">Generate Report</p>
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Recent Activity
            </h2>
            <button 
              @click="refreshActivity" 
              class="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
              :class="{ 'animate-spin': refreshing }"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-4 max-h-64 overflow-y-auto">
            <div 
              v-for="(activity, index) in recentActivities" 
              :key="index"
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              @click="viewActivityDetails(activity)"
            >
              <div 
                class="w-2 h-2 rounded-full flex-shrink-0"
                :class="getActivityColor(activity.type)"
              ></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-800 truncate">{{ activity.message }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
              <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Feedback -->
      <div v-if="actionMessage" class="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {{ actionMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugin/axios'

export default {
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const error = ref(null)
    const selectedAction = ref(null)
    const actionMessage = ref('')
    const refreshing = ref(false)
    
    const dashboardData = ref({
      books: 0,
      users: 0,
      borrowings: 0,
      reports: 0
    })

    const recentActivities = ref([
      {
        type: 'book',
        message: 'New book added: "Vue.js Guide"',
        time: '2 minutes ago',
        id: 1
      },
      {
        type: 'return',
        message: 'Book returned by John Doe',
        time: '15 minutes ago',
        id: 2
      },
      {
        type: 'user',
        message: 'New user registered: Jane Smith',
        time: '1 hour ago',
        id: 3
      },
      {
        type: 'borrowing',
        message: 'Book borrowed by Alice Johnson',
        time: '2 hours ago',
        id: 4
      },
      {
        type: 'report',
        message: 'Monthly report generated',
        time: '3 hours ago',
        id: 5
      }
    ])

    const loadDashboard = async () => {
      try {
        isLoading.value = true
        error.value = null
        const response = await api.get('/dashboard')
        dashboardData.value = response.data.data
      } catch (err) {
        error.value = 'Failed to load dashboard data'
        console.error('Error loading dashboard:', err)
      } finally {
        isLoading.value = false
      }
    }

    const navigateTo = (path) => {
      router.push(path)
    }

    const handleQuickAction = (action) => {
      selectedAction.value = action
      
      // Clear previous selection after animation
      setTimeout(() => {
        selectedAction.value = null
      }, 200)

      switch (action) {
        case 'add-book':
          showActionMessage('Navigating to Add Book...')
          setTimeout(() => router.push('/books'), 1000)
          break
        case 'add-user':
          showActionMessage('Navigating to Add User...')
          setTimeout(() => router.push('/users'), 1000)
          break
        case 'new-borrowing':
          showActionMessage('Navigating to New Borrowing...')
          setTimeout(() => router.push('/borrowings'), 1000)
          break
        case 'generate-report':
          showActionMessage('Generating Report...')
          setTimeout(() => router.push('/reports'), 1000)
          break
      }
    }

    const showActionMessage = (message) => {
      actionMessage.value = message
      setTimeout(() => {
        actionMessage.value = ''
      }, 3000)
    }

    const refreshActivity = async () => {
      refreshing.value = true
      // Simulate API call to refresh activities
      setTimeout(() => {
        refreshing.value = false
        showActionMessage('Activity refreshed!')
      }, 1000)
    }

    const viewActivityDetails = (activity) => {
      showActionMessage(`Viewing details for: ${activity.message}`)
      // Navigate to relevant section based on activity type
      switch (activity.type) {
        case 'book':
          router.push('/books')
          break
        case 'user':
          router.push('/users')
          break
        case 'borrowing':
        case 'return':
          router.push('/borrowings')
          break
        case 'report':
          router.push('/reports')
          break
      }
    }

    const getActivityColor = (type) => {
      const colors = {
        book: 'bg-blue-500',
        user: 'bg-purple-500',
        borrowing: 'bg-green-500',
        return: 'bg-green-500',
        report: 'bg-orange-500'
      }
      return colors[type] || 'bg-gray-500'
    }

    onMounted(() => {
      loadDashboard()
    })

    return {
      isLoading,
      error,
      dashboardData,
      selectedAction,
      actionMessage,
      refreshing,
      recentActivities,
      loadDashboard,
      navigateTo,
      handleQuickAction,
      refreshActivity,
      viewActivityDetails,
      getActivityColor
    }
  }
}
</script>