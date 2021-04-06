import React from 'react';
import Header from './containers/Header/Header'
import Panel from './containers/Panel/Panel'
import Person from './containers/Person/Person'

class App extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <Panel/>
        <Person/>
      </div>
    );
  }
}

export default App;
