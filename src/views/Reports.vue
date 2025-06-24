<script setup>
import { ref, onMounted, nextTick } from 'vue'
import api from '@/plugin/axios'

// State
const reports = ref([])
const newReport = ref({ user_id: '', joined_date: '', exits_date: '' })
const editReport = ref({ id: null, user_id: '', joined_date: '', exits_date: '' })
const showEditModal = ref(false)
const showAddModal = ref(false)
const showDeleteConfirm = ref(null)
const isLoading = ref(false)
const error = ref(null)

// Refs for modals
const addModal = ref(null)
const editModal = ref(null)
const deleteModal = ref(null)

// Load reports
const fetchReports = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await api.get('/reports')
    reports.value = response.data.data
  } catch (err) {
    if (err.response?.status === 422) {
      error.value = Object.values(err.response.data.errors).flat().join(', ')
    } else {
      error.value = 'Failed to load reports'
    }
    console.error("Error loading reports:", err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchReports)

// Add report
const addReport = async () => {
  if (!newReport.value.user_id || !newReport.value.joined_date || !newReport.value.exits_date) {
    alert('Please fill in all fields.')
    return
  }
  if (newReport.value.exits_date < newReport.value.joined_date) {
    alert('Exits date must be on or after joined date.')
    return
  }
  try {
    isLoading.value = true
    error.value = null
    const response = await api.post('/reports', { ...newReport.value })
    reports.value.push(response.data.data)
    newReport.value = { user_id: '', joined_date: '', exits_date: '' }
    showAddModal.value = false
  } catch (err) {
    if (err.response?.status === 422) {
      error.value = Object.values(err.response.data.errors).flat().join(', ')
    } else {
      error.value = 'Failed to add report'
    }
    console.error("Error adding report:", err.response?.data || err)
  } finally {
    isLoading.value = false
  }
}

// Open edit modal
const openEditModal = (report) => {
  editReport.value = {
    id: report.id,
    user_id: report.user_id,
    joined_date: report.joined_date,
    exits_date: report.exits_date
  }
  showEditModal.value = true
  nextTick(() => editModal.value?.focus())
}

// Update report
const updateReport = async () => {
  if (editReport.value.exits_date && editReport.value.exits_date < editReport.value.joined_date) {
    alert('Exits date must be on or after joined date.')
    return
  }
  try {
    isLoading.value = true
    error.value = null
    const response = await api.put(`/reports/${editReport.value.id}`, {
      user_id: editReport.value.user_id,
      joined_date: editReport.value.joined_date,
      exits_date: editReport.value.exits_date,
    })
    const index = reports.value.findIndex(r => r.id === editReport.value.id)
    if (index !== -1) reports.value[index] = response.data.data
    showEditModal.value = false
  } catch (err) {
    if (err.response?.status === 422) {
      error.value = Object.values(err.response.data.errors).flat().join(', ')
    } else {
      error.value = 'Failed to update report'
    }
    console.error("Error updating report:", err.response?.data || err)
  } finally {
    isLoading.value = false
  }
}

// Open delete modal
const openDeleteModal = (id) => {
  showDeleteConfirm.value = id
  nextTick(() => deleteModal.value?.focus())
}

// Delete report
const confirmDelete = async () => {
  if (showDeleteConfirm.value) {
    try {
      isLoading.value = true
      error.value = null
      await api.delete(`/reports/${showDeleteConfirm.value}`)
      reports.value = reports.value.filter(r => r.id !== showDeleteConfirm.value)
      showDeleteConfirm.value = null
    } catch (err) {
      error.value = 'Failed to delete report'
      console.error("Error deleting report:", err)
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="bg-white rounded-lg shadow-md p-10">
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{{ error }}</div>

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Reports List</h3>
        <button @click="showAddModal = true" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          ➕ Add Report
        </button>
      </div>

      <div v-if="isLoading" class="text-gray-500">Loading reports...</div>

      <div class="overflow-x-auto" v-if="!isLoading">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exits Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr v-if="reports.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">No reports available.</td>
            </tr>
            <tr v-for="report in reports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ report.user?.name || 'No User' }}</td>
              <td class="px-6 py-4">{{ report.joined_date }}</td>
              <td class="px-6 py-4">{{ report.exits_date }}</td>
              <td class="px-6 py-4 flex space-x-4">
                <button @click="openEditModal(report)" class="text-blue-600 hover:text-blue-900"><i class="fas fa-edit"></i></button>
                <button @click="openDeleteModal(report.id)" class="text-red-600 hover:text-red-900"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="addModal">
        <h3 class="text-lg font-semibold mb-4">Add Report</h3>
        <form @submit.prevent="addReport" class="space-y-4">
          <input
            v-model="newReport.user_id"
            type="number"
            placeholder="User ID"
            required
            class="w-full border p-2 rounded"
          />
          <input v-model="newReport.joined_date" type="date" required class="w-full border p-2 rounded" />
          <input v-model="newReport.exits_date" type="date" required class="w-full border p-2 rounded" />
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Save</button>
            <button type="button" @click="showAddModal = false" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="editModal">
        <h3 class="text-lg font-semibold mb-4">Edit Report</h3>
        <form @submit.prevent="updateReport" class="space-y-4">
          <input
            v-model="editReport.user_id"
            type="number"
            placeholder="User ID"
            required
            class="w-full border p-2 rounded"
          />
          <input v-model="editReport.joined_date" type="date" required class="w-full border p-2 rounded" />
          <input v-model="editReport.exits_date" type="date" required class="w-full border p-2 rounded" />
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Save</button>
            <button type="button" @click="showEditModal = false" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 bg-gray-600 bg-opacity-80 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="deleteModal" tabindex="-1">
        <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p class="mb-4">Are you sure you want to delete this report?</p>
        <div class="flex space-x-2">
          <button @click="confirmDelete" class="w-full bg-red-600 text-white py-2 rounded">Delete</button>
          <button @click="showDeleteConfirm = null" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>