import { createRouter, createWebHistory } from 'vue-router'
import Books from '@/views/Books.vue'
import Borrowings from '@/views/Borrowings.vue'
import Dashboard from '@/views/Dashboard.vue'
import Users from '@/views/Users.vue'
import Report from '@/views/Reports.vue' // ✅ Ad

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/books',
      name: 'books',
      component: Books,
    },
    {
      path: '/borrowings',
      name: 'borrowings',
      component: Borrowings,
    },
    {
      path: '/reports',
      name: 'report',
      component: Report // 
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
    },
  ],
})

export default router
