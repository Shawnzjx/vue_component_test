<template>
  <li 
    :style="{background:bgColor}" 
    @mouseenter="handleEnter(true)" 
    @mouseleave="handleEnter(false)"
  >
    <label>
      <input type="checkbox" v-model="todo.completed"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script type="text/ecmascript-6">

  export default {
    /*
      1. 绑定事件监听
      2. 设计数据
      3. 在监听回调中,更新数据
    */
    //声明属性的属性名和属性值类型
    props:{
      todo:Object,
      index:Number,
      deleteTodo:Function,
      updateTodo:Function,
    },

    data() {
      return {
        isShow:false,
        bgColor:'#fff',
      }
    },

    computed: {
      isComplete:{
        get(){
          return this.todo.completed
        },
        set(value){
          this.updateTodo(this.todo,value)
        }
      }
    },

    methods: {
      //进入为true  离开为false
      handleEnter(isEnter){
        if (isEnter) {
          this.isShow = true
          this.bgColor = '#ccc'
        } else {
          this.isShow = false
          this.bgColor = '#fff'
        }
      },
      //删除的点击事件
      deleteItem(){
        if (window.confirm('确定要删除吗')) {
          this.deleteTodo(this.index)
        }
      }
    },
  }
</script>

<style scoped>

  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
 
</style>
