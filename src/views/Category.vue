<script setup>
import { ref, onMounted, nextTick } from 'vue'
import api from '@/plugin/axios'

// State
const categories = ref([])
const newCategory = ref({ name: '' })
const editCategory = ref({ id: null, name: '' })
const showEditModal = ref(false)
const showAddModal = ref(false) // New state for add modal
const showDeleteConfirm = ref(null)
const isLoading = ref(false)
const error = ref(null)
const modal = ref(null)

// Load categories on mount
onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await api.get('/categories')
    categories.value = response.data
  } catch (err) {
    error.value = 'Failed to load categories'
    console.error("Error loading categories:", err)
  } finally {
    isLoading.value = false
  }
})

// Add new category
const addCategory = async () => {
  if (!newCategory.value.name.trim()) {
    alert('Please enter a category name.')
    return
  }

  try {
    isLoading.value = true
    error.value = null
    const response = await api.post('/categories', { name: newCategory.value.name.trim() })
    categories.value.push(response.data)
    newCategory.value = { name: '' }
    showAddModal.value = false // Close modal after adding
  } catch (err) {
    error.value = 'Failed to add category'
    console.error("Error adding category:", err)
  } finally {
    isLoading.value = false
  }
}

// Open edit modal
const openEditModal = (category) => {
  editCategory.value = { ...category }
  showEditModal.value = true
  nextTick(() => modal.value?.focus())
}

// Update category
const updateCategory = async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await api.put(`/categories/${editCategory.value.id}`, { name: editCategory.value.name.trim() })
    const index = categories.value.findIndex(c => c.id === editCategory.value.id)
    if (index !== -1) categories.value[index] = response.data
    showEditModal.value = false
  } catch (err) {
    error.value = 'Failed to update category'
    console.error("Error updating category:", err)
  } finally {
    isLoading.value = false
  }
}

// Delete category
const confirmDelete = async () => {
  if (showDeleteConfirm.value) {
    try {
      isLoading.value = true
      error.value = null
      await api.delete(`/categories/${showDeleteConfirm.value}`)
      categories.value = categories.value.filter(c => c.id !== showDeleteConfirm.value)
      showDeleteConfirm.value = null
    } catch (err) {
      error.value = 'Failed to delete category'
      console.error("Error deleting category:", err)
    } finally {
      isLoading.value = false
    }
  }
}
</script>


<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Category Table with Add Button -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Categories List</h3>
        <button @click="showAddModal = !showAddModal"
          class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center"
          :disabled="isLoading">
          <span v-if="isLoading" class="animate-spin mr-2">⌀</span>
          <span class="mr-2">➕</span> Add Category
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200" aria-live="polite">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="categories.length === 0 && !isLoading" class="text-center">
              <td colspan="2" class="px-6 py-4 text-gray-500">No categories available.</td>
            </tr>
            <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ category.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button @click="openEditModal(category)" class="text-indigo-600 hover:text-indigo-900"
                  :disabled="isLoading">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="showDeleteConfirm = category.id" class="text-red-600 hover:text-red-900"
                  :disabled="isLoading">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" role="dialog"
      aria-labelledby="add-modal-title" @keydown.esc="showAddModal = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" tabindex="0" ref="modal">
        <h3 id="add-modal-title" class="text-lg font-semibold text-gray-800 mb-4">Add Category</h3>
        <form @submit.prevent="addCategory" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Category Name</label>
            <div class="mt-1 relative">
              <input v-model="newCategory.name" id="name" type="text" required
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out"
                placeholder="Enter category name" :disabled="isLoading">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-tag"></i></span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              :disabled="isLoading">
              Save
            </button>
            <button @click="showAddModal = false"
              class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
              :disabled="isLoading">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" role="dialog"
      aria-labelledby="edit-modal-title" @keydown.esc="showEditModal = false">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" tabindex="0" ref="modal">
        <h3 id="edit-modal-title" class="text-lg font-semibold text-gray-800 mb-4">Edit Category</h3>
        <form @submit.prevent="updateCategory" class="space-y-4">
          <div>
            <label for="edit-name" class="block text-sm font-medium text-gray-700">Category Name</label>
            <div class="mt-1 relative">
              <input v-model="editCategory.name" id="edit-name" type="text" required
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out"
                placeholder="Enter category name" :disabled="isLoading">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-tag"></i></span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              :disabled="isLoading">
              Save
            </button>
            <button @click="showEditModal = false"
              class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
              :disabled="isLoading">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center" role="dialog"
      aria-labelledby="delete-modal-title" @keydown.esc="showDeleteConfirm = null">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" tabindex="0">
        <h3 id="delete-modal-title" class="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
        <p class="text-gray-600 mb-6">Are you sure you want to delete this category?</p>
        <div class="flex space-x-2">
          <button @click="confirmDelete"
            class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            :disabled="isLoading">
            Delete
          </button>
          <button @click="showDeleteConfirm = null"
            class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out"
            :disabled="isLoading">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>