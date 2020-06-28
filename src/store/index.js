import Vue from 'vue'
import Vuex from 'vuex'

import {
  readSync
} from 'node-yaml'
const path = require('path')

const filelocation = path.join(__static, 'film.yaml')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 设置的储存的视频的根路径数组
    FilmPath: {
      data: readSync(filelocation),
      status:""
    } //设为一个对象来,将数据和数据的状态绑定到一起
  },
  mutations: {
    addFilmPath(state, data) {
      state.FilmPath.data = data.data
      state.FilmPath.status = data.description
    }
  },
  actions: {
    addFilmPathSync(context, data) {
      setTimeout(() => {
        context.commit('addFilmPath', data)
      }, 0)
    }
  },
  getters: {
    getFilmPath(state) {
      return state.FilmPath
    }
  },
  modules: {
  }
})