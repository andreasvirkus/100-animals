import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () => import(/* webpackChunkName: "submit" */ './views/Submit.vue')
    },
    {
      path: '/*',
      name: 'not-found',
      component: {
        render: h => h('main', {}, `404!`)
      }
    }
  ]
})
