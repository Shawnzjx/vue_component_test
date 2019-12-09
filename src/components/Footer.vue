<template>
  <div class="todo-footer">
    <label>
      <!-- name  -string   用位置命名插槽 -->
      <!-- <input type="checkbox" v-model="isCheckAll"/> -->
      <slot name="left"/> 
    </label>
    <span>
      <!-- <span>已完成{{completedSize}}</span> / 全部{{this.todos.length}} -->
      <slot name="middle"/>
    </span>
    <!-- <button class="btn btn-danger" v-show="completedSize>0" @click="clearCompletedTodo">清除已完成任务</button> -->
    <slot name="right"></slot>   
  </div>
</template>

<script type="text/ecmascript-6">
  export default {


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
