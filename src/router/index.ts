import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountdownCard from '@/components/CountdownCard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/new-year',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: ':to',
          component: CountdownCard,
        }
      ]
    },
  ],
})

export default router
