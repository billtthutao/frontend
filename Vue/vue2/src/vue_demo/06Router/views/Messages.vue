<template>
  <div class="msg-main">
    <ul>
      <li v-for="(item) in messages" :key="item.id">
        <router-link :to="`/home/messages/${item.id}`">{{item.title}}</router-link>
        <button @click="push(item.id)">Push</button>
        <button @click="replace(item.id)">Replace</button>
      </li>
    </ul>
    <button @click="go">Go</button>
    <button @click="back">Back</button>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    go(){
      this.$router.go(1)
    },
    back(){
      this.$router.back()
    },
    push(id){
      this.$router.push('/home/messages/'+id)
    },
    replace(id){
      this.$router.replace('/home/messages/'+id)
    }
  },
  mounted() {
    setTimeout(()=>{
      this.messages = [
        {
          id: 1,
          title: 'message001'
        },
        {
          id: 2,
          title: 'message002'
        },
        {
          id: 3,
          title: 'message003'
        },
      ]
    },1000)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>