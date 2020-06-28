/*
 * @Author: your name
 * @Date: 2020-03-25 04:55:00
 * @LastEditTime: 2020-04-22 01:50:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\main.js
 */
import devtools from '@vue/devtools'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/*插件*/
 import {
   BootstrapVue,
   LayoutPlugin
 } from 'bootstrap-vue'

/*公共CSS*/
import './css/commonality/GlobalCSS.css'
//BootstrapVue配置
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'


/*公共JS*/
import config from './js/lib/config.js'

/*JS数据结构*/
import Stack from './js/lib/DataStructure/Stack.js'
import Queue from './js/lib/DataStructure/Queue.js'
import LinkedList from './js/lib/DataStructure/LinkedList.js'
import Tree from './js/lib/DataStructure/Tree.js'

/**JS Tool 类 */
import File from './js/lib/libary.js'


/*Vue use*/
// Vue.use(FilmPath)
Vue.use(config)

/*DataStructure*/
Vue.use(Stack)
Vue.use(Queue)
Vue.use(LinkedList)
Vue.use(Tree)

/**JS Tool 类 */
Vue.use(File)

//BootstrapVue配置
Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (process.env.NODE_ENV === 'development') {
  devtools.connect('localhost', 8098)
}
