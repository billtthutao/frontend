import React from 'react';
import Header from './components/Header/Header'
import Panel from './components/Panel/Panel'
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
