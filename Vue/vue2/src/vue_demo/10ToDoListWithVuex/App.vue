<template>
  <div id="app">
    <div class="header">
      <h1>ToDo List</h1>
    </div>
    <AddItem />
    <ItemList />
    <ItemTotal />
  </div>
</template>

<script>
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import ItemTotal from "./components/ItemTotal";

export default {
  name: "App",
  components: {
    AddItem,
    ItemList,
    ItemTotal,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.header {
  background-color: lightgray;
  height: 100px;
  text-align: center; /* 水平居中 */
  line-height: 100px; /* line-height = height */
}
</style>
