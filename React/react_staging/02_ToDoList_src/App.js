import React from 'react';
import Header from './components/Header/Header';
import List from './components/List/List'
import Footer from './components/Footer/Footer';

class App extends React.Component{

  state = {toDoList:[{id:'1',name:'学习',done:true},{id:'2',name:'吃饭',done:false},{id:'3',name:'睡觉',done:false}]}

  addToDoItem = item => {
    let {toDoList} = this.state;
    toDoList.unshift(item)
    this.setState({toDoList:toDoList})
  }

  changeItemDoneStatus = (id,done) => {
    let {toDoList} = this.state;
    toDoList.map(item => {
      if(item.id === id){
        item.done = done;
      }

      return item;
    })

    this.setState({toDoList:toDoList})
  }

  deleteToDo = (id) => {
    if(window.confirm('确定删除吗?')){
      let {toDoList} = this.state;
      toDoList = toDoList.filter(item => item.id !== id)
      this.setState({toDoList:toDoList})
    }
  }

  deleteCompletedToDos = ids => {
    if(window.confirm('确定删除吗?')){
      let {toDoList} = this.state;
      toDoList = toDoList.filter(item => ids.indexOf(item.id) < 0)
      this.setState({toDoList:toDoList})
    }
  }

  allSelectHandle = (done) => {
    let {toDoList} = this.state;
    toDoList = toDoList.map(item => {return {...item,done}})
    this.setState({toDoList:toDoList})
  }

  render(){
    return (
      <div className="App">
        <Header addToDoItem={this.addToDoItem}/>
        <List deleteToDo={this.deleteToDo} changeItemDoneStatus={this.changeItemDoneStatus} toDos={this.state.toDoList}/>
        <Footer allSelectHandle={this.allSelectHandle} deleteCompletedToDos={this.deleteCompletedToDos} toDos={this.state.toDoList}/>
      </div>
    );
  }
}

export default App;
