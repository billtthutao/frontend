<template>
  <div class="news-main">
    <ul>
      <li v-for="(item, index) in news" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      news: []
    }
  },
  mounted() {
    setTimeout(()=>{
      this.news = ['News001','News002','News002']
    },1000)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>