import { createRouter, createWebHistory } from 'vue-router'
import WorksheetView from '@/views/WorksheetView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'worksheet',
      component: WorksheetView,
    },
  ],
})

export default router
