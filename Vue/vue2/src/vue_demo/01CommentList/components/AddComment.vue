<template>
  <div class="add-main">
    <span>姓名:</span><input type="text" v-model="username"><br><br><br>
    <span>评论:</span><textarea rows="5" v-model="msg"></textarea><br><br>
    <button @click="submitComment(username,msg)">提交</button>
  </div>
</template>

<script>
export default {
  name: 'AddComment',
//   props:['comments','submitComment'],
  props:{
      comments:{
          type: Array,
          required: true,
          default: []
      },
      submitComment:{
          type: Function,
          required: true
      }
  },
  data () {
    return {
      username: '',
      msg: ''
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