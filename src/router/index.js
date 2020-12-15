import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('../views/Home/Welcome.vue') },
      { path: '/users', component: () => import('../views/User/index.vue') },
      { path: '/rights', component: () => import('../views/Power/Rights/index.vue') },
      { path: '/roles', component: () => import('../views/Power/Roles/index.vue') },
      { path: '/categories', component: () => import('../views/Goods/Cate/index.vue') },
      { path: '/params', component: () => import('../views/Goods/Params/index.vue') },
      { path: '/goods', component: () => import('../views/Goods/List/index.vue') },
      // { path: '/goods/add', component: () => import('../views/Goods/index.vue') },
      { path: '/orders', component: () => import('../views/Order/index.vue') },
      { path: '/reports', component: () => import('../views/Report/index.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
