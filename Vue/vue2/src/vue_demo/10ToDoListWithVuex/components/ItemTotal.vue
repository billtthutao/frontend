<template>
  <div class="hello">
    <input
      type="checkbox"
      :checked="todoTotal === doneTotal && todoTotal !== 0"
      @click="checkList"
    /><span class="msg"
      >{{ doneTotal }}/{{ todoTotal }}---<button @click="remDoneToDo">
        删除已完成任务
      </button></span
    >
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      todoTotal: "todoTotal",
      doneTotal: "doneTotal",
    }),
    ...mapState({ toDoList: "toDoList" }),
  },
  methods: {
    ...mapActions([
      "addToDo",
      "delToDo",
      "remDoneToDo",
      "updateToDo",
      "updateAllToDo",
    ]),
    checkList(event) {
      this.updateAllToDo(event.target.checked);
    },
  },
  //深度监控toDoList，任何改动就会进行缓存
  watch: {
    toDoList: {
      deep: true,
      handler: function (value) {
        window.localStorage.setItem(
          "todos",
          JSON.stringify(this.toDoList) || "[]"
        );
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
