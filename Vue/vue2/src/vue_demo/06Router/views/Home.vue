<template>
  <div class="home-main">
    <router-link to='/home/news'>News</router-link>
    <router-link to='/home/messages'>Messages</router-link>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>