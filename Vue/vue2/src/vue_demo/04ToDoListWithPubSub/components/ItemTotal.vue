<template>
  <div class="hello">
    <input type='checkbox' :checked='total===doneTotal' @click='checkList'><span class="msg">{{doneTotal}}/{{total}}---<button @click='deleteDoneItems'>删除已完成任务</button></span>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: 'HelloWorld',
//   props:['comment','index','deleteComment'],
  props:{
      toDoList:{
          type: Array,
          required: true
      }
  },
  data () {
    return {
    }
  },
  methods: {
    deleteDoneItems(){
      for(let i=0;i<this.toDoList.length;i++){
        if(this.toDoList[i].done){
          PubSub.publish('deleteItem',i)
          i--;
        }
      }
    },
    checkList(event){
        for(let i=0;i<this.toDoList.length;i++){
          PubSub.publish('updateItem',{index:i,done:event.target.checked})
        }
    }
  },
  computed:{
    total(){
      return this.toDoList.length
    },
    doneTotal(){
      return this.toDoList.filter(item => item.done).length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
