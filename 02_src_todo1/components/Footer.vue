<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
      <span>已完成{{completedSize}}</span> / 全部{{todos.length}}
    </span>
    <button class="btn btn-danger" v-show="completedSize>0" @click="clearCompletedTodo">清除已完成任务</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

    props: {
      todos:Array,
      clearCompletedTodo:Function,
      checkAll:Function,
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


  }
</script>

<style scoped>

  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
 
</style>
