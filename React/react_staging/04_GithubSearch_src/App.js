import React from 'react';
import Search from './components/Search/Search'
import List from './components/List/List'

class App extends React.Component{
  state = {users:[],
           isFirst: true,
           isLoading: false,
           isError: false,
           error: null
  }

  updateAppState = (stateObj) => {
    this.setState(stateObj);
  }

  render(){
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState}/>
        <List {...this.state}/>
    </div>
    );
  }
}

export default App;
