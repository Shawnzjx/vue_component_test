<template>
  <div>
    <h2>Blog列表</h2>
    <ul>
      <Blog
        v-for="(blog, index) in blogs" 
        :key="blog.id"
        :blog="blog"
      />
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Blog from './Blog'
  export default {
    data() {
      return {
        blogs: [
          {id:1,title:'Blog1'},
          {id:2,title:'Blog2'},
          {id:3,title:'Blog3'},
        ]
      }
    },
    //注册局部组件,只在当前组件使用
    components: {
      Blog
    }
  }
</script>

<style scoped>
/*  scoped:限定当前组件的样式只对当前组件有效,
    对外部和内部的其他组件无效(局部样式)    */
 h2{
   color: darkgreen;
 }
</style>
