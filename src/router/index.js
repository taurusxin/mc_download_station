import Vue from 'vue'
import VueRouter from 'vue-router'
import empty from '../components/empty'
import detail from '../components/detail'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: empty,
    meta: {
      title: 'Rhyland Minecraft'
    }
  },
  {
    path: '/:name',
    name: 'Detail',
    component: detail,
    meta: {
      title: 'Rhyland Minecraft'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: routes
})

export default router
