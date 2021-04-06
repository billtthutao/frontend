import React from 'react';
import axios from 'axios';

class App extends React.Component{

  getStudents = () => {
    axios.get('http://localhost:3000/api1/students').then(
      response => {console.log('获取数据成功',response.data)},
      error => {console.log('获取数据失败',error)}
    )
  }

  getCars = () => {
    axios.get('http://localhost:3000/api2/cars').then(
      response => {console.log('获取数据成功',response.data)},
      error => {console.log('获取数据失败',error)}
    )
  }

  render(){
    return (
      <div className="App">
        <input onClick={this.getStudents} type='button' value='获取Student数据'></input>
        <input onClick={this.getCars} type='button' value='获取Cars数据'></input>
      </div>
    );
  }
}

export default App;
