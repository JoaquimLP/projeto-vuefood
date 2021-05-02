import Home from '@/views/pages/Home'
import Product from '@/views/pages/Products'
import Cart from '@/views/pages/Cart'
import Login from '@/views/pages/auth/Login'
import Register from '@/views/pages/auth/Register'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefoultTemplate'),
    children: [
      {
        path: '/',
        component: Home,
        name: 'site.home'
      },
      {
        path: '/loja/:companyFlag',
        component: Product,
        name: 'site.products',
        props: true,
      },
      {
        path: '/carinho',
        component: Cart,
        name: 'site.cart'
      },
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/AuthTemplate'),
    children: [
      {
        path: '/entrar',
        component: Login,
        name: 'auth.login'
      },
      {
        path: '/registrar',
        component: Register,
        name: 'auth.register'
      },
    ]
  }

]

export default routes
