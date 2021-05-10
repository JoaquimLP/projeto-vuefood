import Home from '@/views/pages/Home'
import Product from '@/views/pages/Products'
import Cart from '@/views/pages/Cart'
import Login from '@/views/pages/auth/Login'
import Register from '@/views/pages/auth/Register'
import Pedidos from '@/views/pages/auth/pedidos/Pedidos'
import DetalhesPedidos from '@/views/pages/DetalhesPedidos'
import LoadMesaEmpresa from '@/views/pages/LoadMesaEmpresa'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefoultTemplate'),
    children: [
      {
        path: '/:token/:token_table',
        component: LoadMesaEmpresa,
        name: 'mesa.empresa',
        props: true,
      },
      {
        path: '/pedidos/:identify',
        component: DetalhesPedidos,
        name: 'site.pedidos',
        props: true,
      },
      {
        path: '/meus-pedidos',
        component: Pedidos,
        name: 'site.auth.pedidos'
      },
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
