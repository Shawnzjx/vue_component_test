<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--<Header @addTodo="addTodo"/>  g给当前header绑定事件监听 -->
      <Header ref="header"/>
      <List
        :todos="todos"
       />
      <Footer>
        <!-- 在父组件中解析好了后传入的 -->
        <input type="checkbox" v-model="isCheckAll" slot="left"/>
        <span slot="middle">
          <span>已完成{{completedSize}}</span> / 全部{{this.todos.length}}
        </span>
        <button class="btn btn-danger" v-show="completedSize>0" @click="clearCompletedTodo" slot="right">清除已完成任务</button>

      </Footer>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import PubSub from 'pubsub-js'
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'
  import {saveTodos,readTodos} from './utils/storageUtils'

  export default {

    data() {
      return {
        //数据为todos数组
        todos:[]
      }
    },

    computed: {
      completedSize(){
        return this.todos.reduce((preTotal,todo,index)=> preTotal + (todo.completed?1:0),0)
      },

      isCheckAll:{
        get(){
          //读属性值就会自动调用对应的getter方法
          return this.todos.length === this.completedSize && this.todos.length>0
        },
        set(value){ //value代表当前勾选状态的布尔值   监视checkAll
          this.checkAll(value)
        }
      }
    },

    mounted() {
      //订阅消息
      PubSub.subscribe('updateTodo',(msg,{todo,isCheck})=> {
        this.updateTodo(todo,isCheck)
      })

      //给<Header/>绑定事件监听
      this.$refs.header.$on('addTodo',this.addTodo)

      //通过globalEvevntBus来绑定事件监听
      this.$globalEvevntBus.$on('deleteTodo',this.deleteTodo)

      //模拟异步读取数据
      setTimeout(() => {
        //读取local中保存的todos, 更新数据
        this.todos = readTodos()
      }, 1000);
    },

    //在组件销毁前,移出自定义监听
    beforeDestroy() {
      this.$refs.header.$off('addTodo')
      this.$globalEvevntBus.$off('deleteTodo')
    },

    methods: {
      //添加一个todo
      addTodo(todo){
        this.todos.unshift(todo)
      },
      //删除一个todo  通过下标删除一个
      deleteTodo(index){
        this.todos.splice(index,1)
      },
      //清除已完成的todo
      clearCompletedTodo(){
        //过滤产生新的数组
        this.todos = this.todos.filter((todo,index)=> !todo.completed)
      },
      //全选/全不选  todos数组的每一项是否完成
      checkAll(isCheckAll){
        this.todos.forEach(todo=> todo.completed = isCheckAll)
      },
      //更新todo
      updateTodo(todo,isCheck){
        todo.completed = isCheck
      }

    },
    //深度监视(本身和内部所有层次的数据)
    watch: {
      todos:{
        deep:true,
        //最新的todos值
        // handler(value){
        //   //将todos保存的local中(以json形式)
        //   //localStorage.setItem('todos_key',JSON.stringify(value))
        //   saveTodos(value)
        // }
        handler:saveTodos //因为函数的参数和函数体中的函数调用参数一致,可省略简写
      }
    },


    components: {
      Header,
      List,
      Footer,
    }
  }
</script>

<style scoped>

  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
 
</style>
