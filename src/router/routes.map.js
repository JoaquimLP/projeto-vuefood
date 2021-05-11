import Home from '@/views/pages/Home'
import Product from '@/views/pages/Products'
import Cart from '@/views/pages/Cart'
import Login from '@/views/pages/auth/Login'
import Register from '@/views/pages/auth/Register'
import Pedidos from '@/views/pages/auth/pedidos/Pedidos'
import DetalhesPedidos from '@/views/pages/DetalhesPedidos'
import LoadMesaEmpresa from '@/views/pages/LoadMesaEmpresa'
import PageNotFound from '@/views/pages/errors/PageNotFound'

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
        meta: {
          title: 'Mesas'
        },
      },
      {
        path: '/pedidos/:identify',
        component: DetalhesPedidos,
        name: 'site.pedidos',
        props: true,
        meta: {
          title: 'Detalhes do Pedido'
        },
      },
      {
        path: '/meus-pedidos',
        component: Pedidos,
        name: 'site.auth.pedidos',
        meta: {
          title: 'Meus Pedidos'
        },
      },
      {
        path: '/',
        component: Home,
        name: 'site.home',
        meta: {
          title: 'Home VueFood'
        },
      },
      {
        path: '/loja/:companyFlag',
        component: Product,
        name: 'site.products',
        props: true,
        meta: {
          title: 'Produtos'
        },
      },

      {
        path: '/carinho',
        component: Cart,
        name: 'site.cart',
        meta: {
          title: 'Carrinho'
        },
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
        name: 'auth.login',
        meta: {
          title: 'login'
        },
      },
      {
        path: '/registrar',
        component: Register,
        name: 'auth.register',
        meta: {
          title: 'Fazer cadastro'
        },
      },
    ]
  },

  {
    path: "/:catchAll(.*)",
    component: PageNotFound,
  }

]

export default routes
