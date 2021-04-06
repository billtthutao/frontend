<template>
  <div class="hello">
    <span class="msg">{{comment.username}}说{{comment.msg}}---<button @click='deleteComment(index)'>删除</button></span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
//   props:['comment','index','deleteComment'],
  props:{
      comment:{
          type: Object,
          required: true
      },
      deleteComment:{
          type: Function,
          required: true
      },
      index: Number
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
