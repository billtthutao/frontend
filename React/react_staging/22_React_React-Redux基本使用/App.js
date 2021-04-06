import React from 'react';
import Header from './containers/Header/Header'
import Panel from './containers/Panel/Panel'
import store from './redux/store'

class App extends React.Component {

  render() {
    return (
      <div>
        <Header store={store}/>
        <Panel store={store}/>
      </div>
    );
  }
}

export default App;
