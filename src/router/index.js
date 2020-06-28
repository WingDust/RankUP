/*
 * @Author: your name
 * @Date: 2020-03-25 04:55:00
 * @LastEditTime: 2020-04-22 03:11:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \writer5\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Setings from '../components/Setings/Setings.vue'
import Films from '../views/Films.vue'
//这样的是静态加载 应改为使用

Vue.use(VueRouter)

const routes = [
//  {
//    path: '/',
//    name: 'Home',
//    component: () =>
//      import ('../views/Home.vue')
//  },
/**设置默认路由 */
{
  path:'/',
  redirect:'Films'
},
  {
    path: '/Setings',
    name: 'Setings',
    component: () =>
      import ('../components/Setings/Setings.vue')
  },
//  {
//    path: '/FilmLayout',
//    name: 'FilmLayout',
//    component: () =>
//      import ('../components/Film/FilmLayout/FilmLayout.vue')
//  },
  {
    path: '/Films',
    name: 'Films',
    component: () =>
      import ('../views/Films.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router