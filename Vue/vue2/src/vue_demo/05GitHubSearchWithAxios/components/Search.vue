<template>
  <div class="add-main">
    <span>请输入关键字查询：</span><input type="text" v-model="name" @keyup.13="search(name)">
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import axios from 'axios'

export default {
  name: 'Search',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    search(name){
      PubSub.publish('show',{users:[],isFirst:false,isLoading:true,isError:false,error:null})

      axios.get(`https://api.github.com/search/users?q=${name}`).then(
        response => {
          let users = [];
          response.data.items.forEach(item => {
            let user = {name:item.login,href:item.html_url,imgSrc:item.avatar_url}
            users.push(user)
          })
          PubSub.publish('show',{users:users,isFirst:false,isLoading:false,isError:false,error:null})
        },
        error => {
          PubSub.publish('show',{users:[],isFirst:false,isLoading:false,isError:true,error:error.message})
        }
      )
    }

  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>