import Vue from 'vue'
// import Vue from 'vue/dist/vue.runtime.common' //少了解析vue的
// import Vue from 'vue/dist/vue.esm.js'
import App from './App' //引入自定义组件

// Vue.component('App',App) //注册全局组件
Vue.config.productionTip = false //不显示不是开发环境的提示

new Vue({
  //注册局部组件
  components: { //注册组件(后面才能写组件标签)
    App
  },
  template: '<App/>'
}).$mount('#root')
