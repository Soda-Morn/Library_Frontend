<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">📖 Book List</h2>
    <table class="w-full text-left bg-white shadow rounded-lg overflow-hidden">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Author</th>
          <th class="px-4 py-2">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id" class="border-b">
          <td class="px-4 py-2">{{ book.id }}</td>
          <td class="px-4 py-2">{{ book.title }}</td>
          <td class="px-4 py-2">{{ book.author }}</td>
          <td class="px-4 py-2">{{ book.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy" },
  { id: 2, title: "1984", author: "George Orwell", category: "Dystopian" },
]
</script>
