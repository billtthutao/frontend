import React from 'react';
import SetState from './components/1_setState/SetState'
import LazyLoad from './components/2_lazyLoad/LazyLoad'
import StateHook from './components/3_stateHook/StateHook'
import EffectHook from './components/4_EffectHook/EffectHook'
import RefHook from './components/5_RefHook/RefHook'
import ContextDemo from './components/6_Context/ContextDemo'

class App extends React.Component {

  render() {

    return (
      <div>
        <SetState/>
        <hr></hr>
        <LazyLoad/>
        <hr></hr>
        <StateHook/>
        <hr></hr>
        <EffectHook/>
        <hr></hr>
        <RefHook/>
        <hr></hr>
        <ContextDemo/>
      </div>
    );
  }
}

export default App;
