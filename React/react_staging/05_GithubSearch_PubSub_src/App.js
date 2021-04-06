import React from 'react';
import Search from './components/Search/Search'
import List from './components/List/List'

class App extends React.Component{

  render(){
    return (
      <div className="container">
        <Search/>
        <List/>
    </div>
    );
  }
}

export default App;
