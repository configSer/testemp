import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Zhang',
    age:20,
    msg:"我是一个粉刷匠"
  },
  mutations:{
    newAuther(state,msg){
      state.msg = msg;
    }
  }
})

export default store
