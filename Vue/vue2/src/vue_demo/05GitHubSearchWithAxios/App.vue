<template>
  <div id="app">
    <div class="header">
      <h1>Github Search</h1>
    </div>
    <div class="main">
      <Search/>
      <ItemList/>
    </div>
  </div>
</template>

<script>
import Search from "./components/Search";
import ItemList from "./components/ItemList";

export default {
  name: "App",
  components: {
    Search,
    ItemList,
  },
  data() {
    return {
    };
  },
  methods: {
  },
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
