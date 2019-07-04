import Vue from 'vue'
import Router from 'vue-router'

// import Home from './views/Home.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'home',
      component: Register
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/reg',
      name: 'register',
      component: () => import(/* webpackChunkName: "reg" */ './views/Register.vue')
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
