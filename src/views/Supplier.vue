<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Supplier Management</h2>
    
    <!-- Add Supplier Button -->
    <div class="mb-6">
      <button @click="showAddModal = true" class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center justify-center">
        <span class="mr-2">➕</span> Add Supplier
      </button>
    </div>


    <!-- Supplier Table -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Suppliers List</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="suppliers.length === 0" class="text-center">
              <td colspan="4" class="px-6 py-4 text-gray-500">No suppliers available.</td>
            </tr>
            <tr v-for="supplier in suppliers" :key="supplier.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ supplier.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ supplier.address }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ supplier.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button @click="openEditModal(supplier)" class="text-indigo-600 hover:text-indigo-900"><i
                    class="fas fa-edit"></i></button>
                <button @click="deleteSupplier(supplier.id)" class="text-red-600 hover:text-red-900"><i
                    class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Supplier Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Supplier</h3>
        <form @submit.prevent="addSupplier" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Supplier Name</label>
            <div class="mt-1 relative">
              <input v-model="newSupplier.name" id="name" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter supplier name">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-user"></i></span>
            </div>
          </div>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
            <div class="mt-1 relative">
              <input v-model="newSupplier.address" id="address" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter address">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-map-marker-alt"></i></span>
            </div>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1 relative">
              <input v-model="newSupplier.email" id="email" type="email" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter email">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-envelope"></i></span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">Save</button>
            <button @click="showAddModal = false" class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Edit Supplier</h3>
        <form @submit.prevent="updateSupplier" class="space-y-4">
          <div>
            <label for="edit-name" class="block text-sm font-medium text-gray-700">Supplier Name</label>
            <div class="mt-1 relative">
              <input v-model="editSupplier.name" id="edit-name" type="text" required
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out"
                placeholder="Enter supplier name">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-user"></i></span>
            </div>
          </div>
          <div>
            <label for="edit-address" class="block text-sm font-medium text-gray-700">Address</label>
            <div class="mt-1 relative">
              <input v-model="editSupplier.address" id="edit-address" type="text" required
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out"
                placeholder="Enter address">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-map-marker-alt"></i></span>
            </div>
          </div>
          <div>
            <label for="edit-email" class="block text-sm font-medium text-gray-700">Email</label>
            <div class="mt-1 relative">
              <input v-model="editSupplier.email" id="edit-email" type="email" required
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out"
                placeholder="Enter email">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-envelope"></i></span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit"
              class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">Save</button>
            <button @click="showEditModal = false"
              class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from "@/plugin/axios"

const suppliers = ref([])
const newSupplier = ref({ name: '', address: '', email: '' })
const editSupplier = ref({ id: null, name: '', address: '', email: '' })
const showAddModal = ref(false)
const showEditModal = ref(false)

onMounted(async () => {
  try {
    const response = await api.get('/suppliers')
    suppliers.value = response.data.data 
  } catch (error) {
    console.error("Error loading suppliers:", error)
  }
})

const addSupplier = async () => {
  try {
    await api.post('/suppliers', newSupplier.value)
    newSupplier.value = { name: '', address: '', email: '' }
    showAddModal.value = false
    const response = await api.get('/suppliers')
    suppliers.value = response.data.data 
  } catch (error) {
    console.error("Error adding supplier:", error)
  }
}

const openEditModal = (supplier) => {
  editSupplier.value = { ...supplier }
  showEditModal.value = true
}

const updateSupplier = async () => {
  try {
    await api.put(`/suppliers/${editSupplier.value.id}`, editSupplier.value)
    showEditModal.value = false
    const response = await api.get('/suppliers')
    suppliers.value = response.data.data 
  } catch (error) {
    console.error("Error updating supplier:", error)
  }
}

const deleteSupplier = async (id) => {
  if (confirm('Are you sure you want to delete this supplier?')) {
    try {
      await api.delete(`/suppliers/${id}`)
      const response = await api.get('/suppliers')
      suppliers.value = response.data.data 
    } catch (error) {
      console.error("Error deleting supplier:", error)
    }
  }
}
</script>
