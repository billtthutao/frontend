<template>
  <div class="hello-main">
    <div class="hello-nav">
        <router-link class="hello-link" :to="`/about?userid=${userid}`">About</router-link>
      <router-link class="hello-link" to='/home'>Home</router-link>
    </div>
    <div class="hello-body">
      <!-- 缓存路由 -->
      <keep-alive>
        <router-view :msg="msg"/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userid: 10
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello-main{
  display: flex;
}
.hello-nav{
  width: 10%;
  border: 1px gray solid;
}
.hello-body{
  width: 70%;
}
.hello-link{
  display: block;
}
/* .router-link-active{
  color: blue;
} */
.active-link{
    color: blue;
}
</style>
