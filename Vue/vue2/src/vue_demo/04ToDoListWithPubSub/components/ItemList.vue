<template>
  <div class="comment-main">
    <span>CommentList</span>
    <h2 v-show="toDoList.length === 0">暂无todo, 请添加!</h2>
    <ul>
      <li v-for="(item, index) in toDoList" :key="index">
        <input type="checkbox" @click="checkItem(index, $event)" :checked='item.done'/><span>{{item.name}}</span><button @click='deleteItem(index)'>删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'

export default {
  name: "ToDoList",
  data() {
    return {};
  },
  //   props: ['comments','deleteComment'],
  props: {
    toDoList: {
      type: Array,
      required: true,
      default: [],
    },
  },
  methods: {
    checkItem(index, event) {
      PubSub.publish('updateItem',{index,done:event.target.checked})
    },
    deleteItem(item){
      PubSub.publish('deleteItem',item)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-main {
  width: 70%;
  border: 0px solid gray;
}
</style>