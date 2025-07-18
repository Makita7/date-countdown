import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CountdownCard from '@/components/CountdownCard.vue'
import NothingView from '@/views/NothingView.vue'
import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'nothing',
      component: NothingView,
    },
    {
      path: '/new-year',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:to',
      name: 'countdown',
      component: CountdownCard,
      beforeEnter: (to, from, next) => {
        const store = useCounterStore();
        const exists = store.Dates.some(d => d.to === to.params.to);

        if (exists) {
          next();
        } else {
          next({ name: 'not-found' });
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
