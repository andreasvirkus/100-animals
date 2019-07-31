import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.use(VCalendar, {
  firstDayOfWeek: 2
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
