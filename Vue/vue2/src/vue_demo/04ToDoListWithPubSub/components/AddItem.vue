<template>
  <div class="add-main">
    <input type="text" v-model="name" @keyup.13="addItem({name,done:false})">
  </div>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: 'AddToDoItem',
//   props:['comments','submitComment'],
  props:{
      // addItem:{
      //     type: Function,
      //     required: true
      // }
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    addItem(item){
      PubSub.publish('addItem',item)
    }
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-main{
    width: 30%;
    border: 0px solid gray;
}
</style>