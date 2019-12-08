<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <List
        :todos="todos"
        :deleteTodo="deleteTodo"
        :updateTodo="updateTodo"
       />
      <Footer
        :todos="todos"
        :clearCompletedTodo="clearCompletedTodo"
        :checkAll="checkAll"
      />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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

    mounted() {
      //模拟异步读取数据
      setTimeout(() => {
        //读取local中保存的todos, 更新数据
        this.todos = readTodos()
      }, 1000);
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
        handler:saveTodos
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
