<template>
  <div id="app">
    <div class="header">
      <h1>ToDo List</h1>
    </div>
    <div class="main">
      <AddItem/>
      <ItemList :toDoList='toDoList'/>
      <ItemTotal :toDoList='toDoList'/>
    </div>
  </div>
</template>

<script>
import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import ItemTotal from "./components/ItemTotal";
import PubSub from 'pubsub-js'

export default {
  name: "App",
  components: {
    AddItem,
    ItemList,
    ItemTotal
  },
  data() {
    return {
      toDoList: JSON.parse(window.localStorage.getItem('todos') || '[]'),
    };
  },
  watch:{
    toDoList:{
      deep: true,
      handler: function(value){
        window.localStorage.setItem('todos',JSON.stringify(this.toDoList) || '[]')
      }
    }
  },
  methods: {
    addItem(item) {
      this.toDoList.unshift(item)
    },
    updateItem(index,done) {
      const item = this.toDoList[index]
      item.done = done
      this.toDoList.splice(index,1,item)
    },
    deleteItem(index){
      this.toDoList.splice(index,1)
    }
  },
  mounted() {
        this.token1 = PubSub.subscribe('addItem',(msg,item) => {
            this.addItem(item)
        }),
        this.token2 = PubSub.subscribe('updateItem',(msg,data) => {
            this.updateItem(data.index,data.done)
        })
        ,
        this.token3 = PubSub.subscribe('deleteItem',(msg,index) => {
            this.deleteItem(index)
        })
  },
  beforeMount() {
    PubSub.unsubscribe(this.token1)
    PubSub.unsubscribe(this.token2)
    PubSub.unsubscribe(this.token3)
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
