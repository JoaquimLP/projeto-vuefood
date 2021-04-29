import Home from '@/views/pages/Home'
import Product from '@/views/pages/Products'
import Cart from '@/views/pages/Cart'

const routes = [
    {
        path: '/',
        component: Home,
        name: 'site.home'
    },
    {
        path: '/loja',
        component: Product,
        name: 'site.products'
    },
    {
        path: '/carinho',
        component: Cart,
        name: 'site.cart'
    },

]

export default routes
