<template>
  <div id="app">
    <div class="header">
      <h1>Vue Router Demo</h1>
    </div>
    <div class="main">
      <RouterDemo/>
    </div>
  </div>
</template>

<script>
import RouterDemo from './components/RouterDemo'

export default {
  name: "App",
  components: {
    RouterDemo
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
