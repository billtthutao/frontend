<template>
  <div class="row">
    <h2 v-show="stateObj.isFirst">请输入进行搜索.....</h2>
    <h2 v-show="stateObj.isLoading">Load........</h2>
    <h2 v-show="stateObj.isError">{error}</h2>

    <div class="card" v-for="(user) in stateObj.users" :key="user.href">
      <a :href='user.href' target="_blank" rel="noreferrer">
        <img :src='user.imgSrc' style="width: '100px"
        alt='https://avatars.githubusercontent.com/u/6412038?v=3' />
      </a>
      <p class="card-text">{{user.name}}</p>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";

export default {
  name: "ItemList",
  data() {
    return {
      stateObj: {
        users: [],
        isFirst: true,
        isLoading: false,
        isError: false,
        error: null,
      },
    };
  },
  mounted() {
    this.token = PubSub.subscribe("show", (msg, stateObj) => {
      this.stateObj = stateObj;
    });
  },

  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }
  
  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }
  
  .card-text {
    font-size: 85%;
  }
</style>