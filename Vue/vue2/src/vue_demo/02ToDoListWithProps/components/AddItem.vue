<template>
  <div class="add-main">
    <input type="text" v-model="name" @keyup.13="addItem({name,done:false})">
  </div>
</template>

<script>
export default {
  name: 'AddToDoItem',
//   props:['comments','submitComment'],
  props:{
      addItem:{
          type: Function,
          required: true
      }
  },
  data () {
    return {
      name: ''
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