<template>
  <li>
    <h3>{{blog.id}}---{{blog.title}}</h3>
  </li>
</template>


<script type="text/ecmascript-6">
/**
 * 一个组件对象就是一个小的vm
 * 组件内的回调函数的this是组件对象
 * 模板中获取数据读取组件对象的对应属性值
 */
  export default {
    //声明接收属性
    //接收的所有标签属性都会成为组件对象的属性
    props: ['blog']
  }
</script>

<style scoped>

 h3{
   color:lawngreen;
 }
</style>
