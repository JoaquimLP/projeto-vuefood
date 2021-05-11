import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes.map.js'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = 'VueFood'
  if(to.hasOwnProperty('meta'))
    document.title = to.meta.title
  next()
})

export default router
