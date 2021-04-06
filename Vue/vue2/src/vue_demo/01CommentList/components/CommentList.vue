<template>
  <div class="comment-main">
    <span>CommentList</span>
    <h2 v-show="comments.length===0">暂无评论, 请添加!</h2>
    <ul>
        <li v-for="(comment, index) in comments" :key="index"><CommentItem :comment='comment' :index='index' :deleteComment='deleteComment'/></li>
    </ul>
  </div>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  name: 'CommentList',
  data () {
    return {
      
    }
  },
//   props: ['comments','deleteComment'],
  props:{
      comments:{
          type: Array,
          required: true,
          default: []
      },
      deleteComment:{
          type: Function,
          required: true
      }
  },
  components: {CommentItem},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-main{
    width: 70%;
    border: 0px solid gray;
}
</style>