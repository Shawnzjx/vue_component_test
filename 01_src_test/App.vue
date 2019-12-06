<template>
  <div>
    <h1>{{title}}</h1>
    <Blogs/>
  </div>
</template>

<script>
import Blogs from './components/Blogs'
export default {    //暴露一个配置对象
  data() {
    return {
      title: 'Hello,Vue!'
    }
  },

  components: {
    Blogs
  }
}
</script>

<style scoped>
  h1{
    color: hotpink
  }
</style>