import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import Stats from '@/components/main-content/Stats.vue'
import Discover from '@/components/main-content/Discover.vue'
import WhatsNew from '@/components/main-content/WhatsNew.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          redirect: '/stats'
        },
        {
          path: '/stats',
          name: 'stats',
          component: Stats
        },
        {
          path: '/discover',
          name: 'discover',
          component: Discover
        },
        {
          path: '/new',
          name: 'new',
          component: WhatsNew
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
