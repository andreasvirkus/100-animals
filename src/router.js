import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(/* webpackChunkName: "reg" */ './views/Register.vue')
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () =>
        import(/* webpackChunkName: "confirm" */ './views/Confirm.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/reg',
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "reg" */ './views/Register.vue')
    },
    {
      path: '/submit',
      name: 'submit',
      component: () =>
        import(/* webpackChunkName: "submit" */ './views/Submit.vue')
    },
    {
      path: '/confirmed',
      name: 'confirmed',
      component: () =>
        import(/* webpackChunkName: "confirmed" */ './views/ConfirmSubmit.vue')
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
