<script setup>
import { ref, onMounted, nextTick } from 'vue'
import api from '@/plugin/axios'

// State
const reports = ref([])
const newReport = ref({ joined_date: '', exits_date: '', user_id: '' })
const editReport = ref({ id: null, joined_date: '', exits_date: '', user_id: '' })
const showEditModal = ref(false)
const showAddModal = ref(false)
const showDeleteConfirm = ref(null)
const isLoading = ref(false)
const error = ref(null)
const modal = ref(null)

// Debug click event
const handleAddButtonClick = () => {
  console.log('Add Report button clicked, setting showAddModal to true');
  showAddModal.value = true;
  nextTick(() => {
    console.log('Modal should be visible, showAddModal:', showAddModal.value);
    if (modal.value) {
      modal.value.focus();
    } else {
      console.warn('Modal ref is not set');
    }
  });
}

// Load reports on mount
onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await api.get('/reports')
    reports.value = response.data.data
  } catch (err) {
    error.value = 'Failed to load reports'
    console.error("Error loading reports:", err)
  } finally {
    isLoading.value = false
  }
})

// Add new report
const addReport = async () => {
  if (!newReport.value.joined_date || !newReport.value.exits_date || !newReport.value.user_id) {
    alert('Please fill in all fields.')
    return
  }

  try {
    isLoading.value = true
    error.value = null
    const response = await api.post('/reports', { ...newReport.value })
    reports.value.push(response.data.data)
    newReport.value = { joined_date: '', exits_date: '', user_id: '' }
    showAddModal.value = false
  } catch (err) {
    error.value = 'Failed to add report'
    console.error("Error adding report:", err)
  } finally {
    isLoading.value = false
  }
}

// Open edit modal
const openEditModal = (report) => {
  editReport.value = { ...report }
  showEditModal.value = true
  nextTick(() => modal.value?.focus())
}

// Update report
const updateReport = async () => {
  try {
    isLoading.value = true
    error.value = null
    const updateData = {
      joined_date: editReport.value.joined_date,
      exits_date: editReport.value.exits_date,
      user_id: editReport.value.user_id,
    }

    const response = await api.put(`/reports/${editReport.value.id}`, updateData)
    const index = reports.value.findIndex(r => r.id === editReport.value.id)
    if (index !== -1) reports.value[index] = response.data.data
    showEditModal.value = false
  } catch (err) {
    error.value = 'Failed to update report'
    console.error("Error updating report:", err)
  } finally {
    isLoading.value = false
  }
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
    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{{ error }}</div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Reports List</h3>
        <button
          @click="handleAddButtonClick"
          class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :disabled="isLoading"
        >
          ➕ Add Report
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exits Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="reports.length === 0 && !isLoading">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500">No reports available.</td>
            </tr>
            <tr v-for="report in reports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ report.joined_date }}</td>
              <td class="px-6 py-4">{{ report.exits_date }}</td>
              <td class="px-6 py-4">{{ report.user_id }}</td>
              <td class="px-6 py-4 flex space-x-2">
                <button @click="openEditModal(report)" class="text-indigo-600 hover:text-indigo-900">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="showDeleteConfirm = report.id" class="text-red-600 hover:text-red-900">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Report Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="modal">
        <h3 class="text-lg font-semibold mb-4">Add Report</h3>
        <form @submit.prevent="addReport" class="space-y-4">
          <input v-model="newReport.joined_date" placeholder="Joined Date" required class="w-full border p-2 rounded" type="date" />
          <input v-model="newReport.exits_date" placeholder="Exits Date" required class="w-full border p-2 rounded" type="date" />
          <input v-model="newReport.user_id" placeholder="User ID" required class="w-full border p-2 rounded" type="number" />
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded" :disabled="isLoading">Save</button>
            <button @click="showAddModal = false" type="button" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Report Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="modal">
        <h3 class="text-lg font-semibold mb-4">Edit Report</h3>
        <form @submit.prevent="updateReport" class="space-y-4">
          <input v-model="editReport.joined_date" placeholder="Joined Date" required class="w-full border p-2 rounded" type="date" />
          <input v-model="editReport.exits_date" placeholder="Exits Date" required class="w-full border p-2 rounded" type="date" />
          <input v-model="editReport.user_id" placeholder="User ID" required class="w-full border p-2 rounded" type="number" />
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded" :disabled="isLoading">Save</button>
            <button @click="showEditModal = false" type="button" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p class="mb-4">Are you sure you want to delete this report?</p>
        <div class="flex space-x-2">
          <button @click="confirmDelete" class="w-full bg-red-600 text-white py-2 rounded" :disabled="isLoading">Delete</button>
          <button @click="showDeleteConfirm = null" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>