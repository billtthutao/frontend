import React from 'react';
import Header from './containers/Header/Header'
import Panel from './containers/Panel/Panel'

class App extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <Panel/>
      </div>
    );
  }
}

export default App;
