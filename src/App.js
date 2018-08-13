import React, { Component } from 'react';
import './App.css';
import {Messages} from './Messages.js';
import {Footer} from './Footer.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        status: false
    }
  }

  myCallback = (data) => {
    this.setState({status: data}, function(){
      this.foo.parentRefresh(this.state.status);
    })
  }

  render() {

    return <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to Storytel</h1>
      </header>

      <div className="Messages">
        {/* <Messages status={this.state.status} /> */}
        <Messages ref={
            foo => {
              this.foo = foo;
            }
          } />
        <Footer callbackFromParent={this.myCallback.bind(this)}/>
      </div>
    </div>
  }
}

export default App;