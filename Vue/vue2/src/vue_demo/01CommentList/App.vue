<template>
  <div id="app">
    <div class="header">
      <h1>欢迎发表对Vue的评论</h1>
    </div>
    <div class="main">
      <AddComment :comments="comments" :submitComment='submitComment'/>
      <CommentList :comments="comments" :deleteComment='deleteComment'/>
    </div>
  </div>
</template>

<script>
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";

export default {
  name: "App",
  components: {
    AddComment,
    CommentList,
  },
  data() {
    return {
      comments: [
        { username: "user1", msg: "comment1" },
        { username: "user2", msg: "comment2" },
      ],
    };
  },
  methods: {
    submitComment(username, msg) {
      this.comments.unshift({ username, msg });
    },
    deleteComment(index) {
      this.comments.splice(index, 1);
    },
  },
};
</script>

<style>
#app {
}
.header {
  background-color: lightgray;
  height: 100px;
  text-align: center; /* 水平居中 */
  line-height: 100px; /* line-height = height */
}
.main {
  display: flex;
}
</style>
