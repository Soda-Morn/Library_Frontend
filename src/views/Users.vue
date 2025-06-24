<script setup>
import { ref, onMounted, nextTick } from 'vue'
import api from '@/plugin/axios'

// State
const users = ref([])
const newUser = ref({ name: '', email: '', password: '' })
const editUser = ref({ id: null, name: '', email: '', password: '' })
const showEditModal = ref(false)
const showAddModal = ref(false)
const showDeleteConfirm = ref(null)
const isLoading = ref(false)
const error = ref(null)
const modal = ref(null)

// Load users on mount
onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null
    const response = await api.get('/users')
    users.value = response.data.data
  } catch (err) {
    error.value = 'Failed to load users'
    console.error("Error loading users:", err)
  } finally {
    isLoading.value = false
  }
})

// Add new user
const addUser = async () => {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.password) {
    alert('Please fill in all fields.')
    return
  }

  try {
    isLoading.value = true
    error.value = null
    const response = await api.post('/users', { ...newUser.value })
    users.value.push(response.data.data)
    newUser.value = { name: '', email: '', password: '' }
    showAddModal.value = false
  } catch (err) {
    error.value = 'Failed to add user'
    console.error("Error adding user:", err)
  } finally {
    isLoading.value = false
  }
}

// Open edit modal
const openEditModal = (user) => {
  editUser.value = { ...user, password: '' } // Do not preload password
  showEditModal.value = true
  nextTick(() => modal.value?.focus())
}

// Update user
const updateUser = async () => {
  try {
    isLoading.value = true
    error.value = null
    const updateData = {
      name: editUser.value.name,
      email: editUser.value.email,
    }

    if (editUser.value.password) {
      updateData.password = editUser.value.password
    }

    const response = await api.put(`/users/${editUser.value.id}`, updateData)
    const index = users.value.findIndex(u => u.id === editUser.value.id)
    if (index !== -1) users.value[index] = response.data.data
    showEditModal.value = false
  } catch (err) {
    error.value = 'Failed to update user'
    console.error("Error updating user:", err)
  } finally {
    isLoading.value = false
  }
}

// Delete user
const confirmDelete = async () => {
  if (showDeleteConfirm.value) {
    try {
      isLoading.value = true
      error.value = null
      await api.delete(`/users/${showDeleteConfirm.value}`)
      users.value = users.value.filter(u => u.id !== showDeleteConfirm.value)
      showDeleteConfirm.value = null
    } catch (err) {
      error.value = 'Failed to delete user'
      console.error("Error deleting user:", err)
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
        <h3 class="text-lg font-semibold text-gray-800">Users List</h3>
        <button @click="showAddModal = true"
          class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
          ➕ Add User
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="users.length === 0 && !isLoading">
              <td colspan="3" class="px-6 py-4 text-center text-gray-500">No users available.</td>
            </tr>
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">{{ user.name }}</td>
              <td class="px-6 py-4">{{ user.email }}</td>
              <td class="px-6 py-4 flex space-x-2">
                <button @click="openEditModal(user)" class="text-indigo-600 hover:text-indigo-900"><i class="fas fa-edit"></i></button>
                <button @click="showDeleteConfirm = user.id" class="text-red-600 hover:text-red-900"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="modal">
        <h3 class="text-lg font-semibold mb-4">Add User</h3>
        <form @submit.prevent="addUser" class="space-y-4">
          <input v-model="newUser.name" placeholder="Name" required class="w-full border p-2 rounded" />
          <input v-model="newUser.email" placeholder="Email" required class="w-full border p-2 rounded" type="email" />
          <input v-model="newUser.password" placeholder="Password" required class="w-full border p-2 rounded" type="password" />
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded">Save</button>
            <button @click="showAddModal = false" type="button" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md" ref="modal">
        <h3 class="text-lg font-semibold mb-4">Edit User</h3>
        <form @submit.prevent="updateUser" class="space-y-4">
          <input v-model="editUser.name" placeholder="Name" required class="w-full border p-2 rounded" />
          <input v-model="editUser.email" placeholder="Email" required class="w-full border p-2 rounded" type="email" />
          <input v-model="editUser.password" placeholder="New Password (leave blank to keep current)" class="w-full border p-2 rounded" type="password" />
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded">Save</button>
            <button @click="showEditModal = false" type="button" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Confirm Deletion</h3>
        <p class="mb-4">Are you sure you want to delete this user?</p>
        <div class="flex space-x-2">
          <button @click="confirmDelete" class="w-full bg-red-600 text-white py-2 rounded">Delete</button>
          <button @click="showDeleteConfirm = null" class="w-full bg-gray-300 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
