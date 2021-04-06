<template>
  <div class="add-main">
    <input
      type="text"
      v-model="name"
      @keyup.13="addToDo({ name, done: false })"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "AddToDoItem",
  //   props:['comments','submitComment'],
  props: {
    // addItem:{
    //     type: Function,
    //     required: true
    // }
  },
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions(["addToDo", "delToDo", "remDoneToDo", "updateToDo"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-main {
  width: 30%;
  border: 0px solid gray;
}
</style>