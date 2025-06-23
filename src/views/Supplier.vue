<template>
  <div class="p-10 ml-64 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold mb-6 flex items-center gap-2">
      <span>🏬</span> Suppliers
    </h2>
    <div class="bg-white rounded-xl shadow p-6 mb-8 max-w-xl">
      <input 
        v-model="newSupplier.name" 
        type="text" 
        placeholder="Supplier Name" 
        class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <input 
        v-model="newSupplier.address" 
        type="text" 
        placeholder="Address" 
        class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <input 
        v-model="newSupplier.email" 
        type="text" 
        placeholder="email" 
        class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <button 
        @click="addSupplier" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg shadow"
      >
        ➕ Add Supplier
      </button>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="supplier in suppliers" :key="supplier.id" class="bg-white rounded-xl p-5 shadow hover:shadow-md transition">
        <h3 class="text-lg font-bold text-gray-800 mb-1">{{ supplier.name }}</h3>
        <p class="text-sm text-gray-500 mb-4"> {{ supplier.address }}</p>
        <p class="text-sm text-gray-500 mb-4"> {{ supplier.email }}</p>
        <div class="flex gap-2">
          <button 
            @click="openEditModal(supplier)" 
            class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
          >
            ✏️ Edit
          </button>
          <button 
            @click="deleteSupplier(supplier.id)" 
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-bold mb-4">Edit Supplier</h3>
        <input 
          v-model="editSupplier.name" 
          type="text" 
          placeholder="Supplier Name" 
          class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        />
        <input 
          v-model="editSupplier.address" 
          type="text" 
          placeholder="Address" 
          class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        />
        <input 
          v-model="editSupplier.email" 
          type="text" 
          placeholder="Email" 
          class="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
        />
        <div class="flex gap-2">
          <button 
            @click="updateSupplier" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg"
          >
            Save
          </button>
          <button 
            @click="showEditModal = false" 
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold w-full py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from "@/plugin/axios"

const suppliers = ref([]) 
const newSupplier = ref({ name: '', address: '', email:'', })
const editSupplier = ref({ id: null, name: '', address: '', email:'' })
const showEditModal = ref(false)

onMounted(async () => {
    try {
        const response = await api.get('/suppliers')
        suppliers.value = response.data 
    } catch (error) {
        console.error("Error Loading supplier", error)
    }
})

const addSupplier = async () => {
  try {
    await api.post('/suppliers', newSupplier.value)
    newSupplier.value = { name: '', address: '', email:'' }
    const response = await api.get('/suppliers')
    suppliers.value = response.data
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
    suppliers.value = response.data
  } catch (error) {
    console.error("Error updating supplier:", error)
  }
}

const deleteSupplier = async (id) => {
  if (confirm('Are you sure you want to delete this supplier?')) {
    try {
      await api.delete(`/suppliers/${id}`)
      const response = await api.get('/suppliers')
      suppliers.value = response.data
    } catch (error) {
      console.error("Error deleting supplier:", error)
    }
  }
}
</script>