<template>
  <div class="p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">📘 Borrowing Records</h2>
      <button @click="showForm = true" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        ➕ Add Borrow
      </button>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-10">
      <span class="text-gray-500">Loading borrowings...</span>
    </div>

    <!-- Borrowing Table -->
    <table v-else class="min-w-full bg-white border rounded-lg shadow-md overflow-hidden">
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="py-3 px-5">#</th>
          <th class="py-3 px-5">User</th>
          <th class="py-3 px-5">Book</th>
          <th class="py-3 px-5">Borrow Date</th>
          <th class="py-3 px-5">Return Date</th>
          <th class="py-3 px-5">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(borrowing, index) in borrowings" :key="borrowing.id" class="border-t hover:bg-gray-50">
          <td class="py-2 px-5">{{ index + 1 }}</td>
          <td class="py-2 px-5">{{ borrowing.user?.name || '-' }}</td>
          <td class="py-2 px-5">{{ borrowing.book?.title || '-' }}</td>
          <td class="py-2 px-5">{{ formatDate(borrowing.borrow_date) }}</td>
          <td class="py-2 px-5">{{ formatDate(borrowing.return_date) }}</td>
          <td class="py-2 px-5">
            <span :class="statusColor(borrowing.status)" class="px-2 py-1 rounded-full text-sm font-medium">
              {{ borrowing.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Borrowing Modal -->
    <div v-if="showForm" class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 class="text-xl font-semibold mb-4">Add Borrowing</h3>

        <form @submit.prevent="submitBorrowing">
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">User ID</label>
            <input v-model="form.user_id" type="number" class="w-full border rounded px-3 py-2" required />
          </div>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Book ID</label>
            <input v-model="form.book_id" type="number" class="w-full border rounded px-3 py-2" required />
          </div>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Borrow Date</label>
            <input v-model="form.borrow_date" type="date" class="w-full border rounded px-3 py-2" />
          </div>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Return Date</label>
            <input v-model="form.return_date" type="date" class="w-full border rounded px-3 py-2" />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Status</label>
            <select v-model="form.status" class="w-full border rounded px-3 py-2">
              <option value="borrowed">Borrowed</option>
              <option value="returned">Returned</option>
              <option value="late">Late</option>
            </select>
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="showForm = false" class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugin/axios' // Axios instance

const borrowings = ref([])
const loading = ref(true)
const showForm = ref(false)

const form = ref({
  user_id: '',
  book_id: '',
  borrow_date: '',
  return_date: '',
  status: 'borrowed',
})

// Load borrowings from API
const loadBorrowings = async () => {
  loading.value = true
  try {
    const response = await api.get('/borrowings')
    borrowings.value = response.data.data ?? response.data
  } catch (error) {
    console.error('Error loading borrowings:', error)
  } finally {
    loading.value = false
  }
}

onMounted(loadBorrowings)

// Submit new borrowing
const submitBorrowing = async () => {
  try {
    await api.post('/borrowings', form.value)
    showForm.value = false
    form.value = {
      user_id: '',
      book_id: '',
      borrow_date: '',
      return_date: '',
      status: 'borrowed',
    }
    await loadBorrowings()
  } catch (error) {
    console.error('Error creating borrowing:', error)
    alert('Failed to create borrowing')
  }
}

// Format date for display
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString()
}

// Style status label
const statusColor = (status) => {
  switch (status) {
    case 'borrowed':
      return 'bg-yellow-200 text-yellow-800'
    case 'returned':
      return 'bg-green-200 text-green-800'
    case 'late':
      return 'bg-red-200 text-red-800'
    default:
      return 'bg-gray-200 text-gray-700'
  }
}
</script>
