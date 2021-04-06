<template>
  <div class="comment-main">
    <span>CommentList</span>
    <h2 v-show="toDoList.length === 0">暂无todo, 请添加!</h2>
    <ul>
      <li v-for="(item, index) in toDoList" :key="index">
        <input
          type="checkbox"
          @click="updateToDo(index)"
          :checked="item.done"
        /><span>{{ item.name }}</span
        ><button @click="delToDo(index)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ToDoList",
  mounted() {
    this.loadToDo()
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["addToDo", "delToDo", "remDoneToDo", "updateToDo", "loadToDo"]),
  },
  computed: {
    ...mapState({ toDoList: "toDoList" }),
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