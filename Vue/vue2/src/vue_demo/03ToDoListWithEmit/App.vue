<template>
  <div id="app">
    <div class="header">
      <h1>ToDo List</h1>
    </div>
    <div class="main">
      <AddItem @addItem='addItem'/>
      <ItemList :toDoList='toDoList' :updateItem='updateItem' :deleteItem='deleteItem'/>
      <ItemTotal :toDoList='toDoList' :deleteItem='deleteItem'/>
    </div>
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
