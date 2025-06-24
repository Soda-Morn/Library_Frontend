<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h2 class="text-2xl font-semibold text-gray-800 mb-6">Book Management</h2>
    
    <!-- Add Book Button -->
    <div class="mb-6">
      <button @click="showAddModal = true" class="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center justify-center">
        <span class="mr-2">➕</span> Add Book
      </button>
    </div>

    <!-- Books Table -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Books List</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="book in books" :key="book.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">{{ book.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ book.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ book.supplierName || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ book.categoryName || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button @click="openEditModal(book)" class="text-indigo-600 hover:text-indigo-900"><i class="fas fa-edit"></i></button>
                <button @click="deleteBook(book.id)" class="text-red-600 hover:text-red-900"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Book Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Book</h3>
        <form @submit.prevent="addBook" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <div class="mt-1 relative">
              <input v-model="newBook.title" id="title" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter book title">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-book"></i></span>
            </div>
          </div>
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <div class="mt-1 relative">
              <input v-model="newBook.description" id="description" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter description">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-info-circle"></i></span>
            </div>
          </div>
          <div>
            <label for="supplier_id" class="block text-sm font-medium text-gray-700">Supplier ID</label>
            <div class="mt-1 relative">
              <input v-model="newBook.supplier_id" id="supplier_id" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter supplier ID">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-truck"></i></span>
            </div>
          </div>
          <div>
            <label for="category_id" class="block text-sm font-medium text-gray-700">Category ID</label>
            <div class="mt-1 relative">
              <input v-model="newBook.category_id" id="category_id" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter category ID">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-list"></i></span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">Save</button>
            <button @click="showAddModal = false" class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Book Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Edit Book</h3>
        <form @submit.prevent="updateBook" class="space-y-4">
          <div>
            <label for="edit-title" class="block text-sm font-medium text-gray-700">Title</label>
            <div class="mt-1 relative">
              <input v-model="editBook.title" id="edit-title" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter book title">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-book"></i></span>
            </div>
          </div>
          <div>
            <label for="edit-description" class="block text-sm font-medium text-gray-700">Description</label>
            <div class="mt-1 relative">
              <input v-model="editBook.description" id="edit-description" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter description">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-info-circle"></i></span>
            </div>
          </div>
          <div>
            <label for="edit-supplier_id" class="block text-sm font-medium text-gray-700">Supplier ID</label>
            <div class="mt-1 relative">
              <input v-model="editBook.supplier_id" id="edit-supplier_id" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter supplier ID">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-truck"></i></span>
            </div>
          </div>
          <div>
            <label for="edit-category_id" class="block text-sm font-medium text-gray-700">Category ID</label>
            <div class="mt-1 relative">
              <input v-model="editBook.category_id" id="edit-category_id" type="text" required class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out" placeholder="Enter category ID">
              <span class="absolute left-3 top-2 text-gray-400"><i class="fas fa-list"></i></span>
            </div>
          </div>
          <div class="flex space-x-2">
            <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">Save</button>
            <button @click="showEditModal = false" class="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from "@/plugin/axios"

const books = ref([])
const newBook = ref({ title: '', description: '', supplier_id: '', category_id: '' })
const editBook = ref({ id: null, title: '', description: '', supplier_id: '', category_id: '' })
const showAddModal = ref(false)
const showEditModal = ref(false)
const suppliers = ref({})
const categories = ref({})

onMounted(async () => {
  try {
    const [booksResponse, suppliersResponse, categoriesResponse] = await Promise.all([
      api.get('/books'),
      api.get('/suppliers'),
      api.get('/categories')
    ])
    books.value = booksResponse.data.data
    suppliers.value = suppliersResponse.data.reduce((acc, supplier) => ({ ...acc, [supplier.id]: supplier.name }), {})
    categories.value = categoriesResponse.data.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {})
    books.value = books.value.map(book => ({
      ...book,
      supplierName: suppliers.value[book.supplier_id] || 'N/A',
      categoryName: categories.value[book.category_id] || 'N/A'
    }))
  } catch (error) {
    console.error("Error loading data:", error)
  }
})

const addBook = async () => {
  try {
    await api.post('/books', newBook.value)
    newBook.value = { title: '', description: '', supplier_id: '', category_id: '' }
    showAddModal.value = false
    const [booksResponse, suppliersResponse, categoriesResponse] = await Promise.all([
      api.get('/books'),
      api.get('/suppliers'),
      api.get('/categories')
    ])
    books.value = booksResponse.data.data
    suppliers.value = suppliersResponse.data.reduce((acc, supplier) => ({ ...acc, [supplier.id]: supplier.name }), {})
    categories.value = categoriesResponse.data.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {})
    books.value = books.value.map(book => ({
      ...book,
      supplierName: suppliers.value[book.supplier_id] || 'N/A',
      categoryName: categories.value[book.category_id] || 'N/A'
    }))
  } catch (error) {
    console.error("Error adding book:", error)
  }
}

const openEditModal = (book) => {
  editBook.value = { ...book }
  showEditModal.value = true
}

const updateBook = async () => {
  try {
    await api.put(`/books/${editBook.value.id}`, editBook.value)
    showEditModal.value = false
    const [booksResponse, suppliersResponse, categoriesResponse] = await Promise.all([
      api.get('/books'),
      api.get('/suppliers'),
      api.get('/categories')
    ])
    books.value = booksResponse.data.data
    suppliers.value = suppliersResponse.data.reduce((acc, supplier) => ({ ...acc, [supplier.id]: supplier.name }), {})
    categories.value = categoriesResponse.data.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {})
    books.value = books.value.map(book => ({
      ...book,
      supplierName: suppliers.value[book.supplier_id] || 'N/A',
      categoryName: categories.value[book.category_id] || 'N/A'
    }))
  } catch (error) {
    console.error("Error updating book:", error)
  }
}

const deleteBook = async (id) => {
  if (confirm('Are you sure you want to delete this book?')) {
    try {
      await api.delete(`/books/${id}`)
      const [booksResponse, suppliersResponse, categoriesResponse] = await Promise.all([
        api.get('/books'),
        api.get('/suppliers'),
        api.get('/categories')
      ])
      books.value = booksResponse.data.data
      suppliers.value = suppliersResponse.data.reduce((acc, supplier) => ({ ...acc, [supplier.id]: supplier.name }), {})
      categories.value = categoriesResponse.data.reduce((acc, category) => ({ ...acc, [category.id]: category.name }), {})
      books.value = books.value.map(book => ({
        ...book,
        supplierName: suppliers.value[book.supplier_id] || 'N/A',
        categoryName: categories.value[book.category_id] || 'N/A'
      }))
    } catch (error) {
      console.error("Error deleting book:", error)
    }
  }
}
</script>