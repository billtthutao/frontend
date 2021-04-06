<template>
  <div id="app">
    <div class="header">
      <h1>Counter Demo</h1>
    </div>
    <div class="main">
      <Header/>
      <Panel/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Panel from './components/Panel'

export default {
  name: "App",
  components: {
    Header,
    Panel
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
