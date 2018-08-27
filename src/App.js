import React, { Component } from "react";
import "./App.css";
import { Messages } from "./Messages.js";
import { Send } from "./Send.js";
import { Welcome } from "./Welcome.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  updatingData = data => {
    this.setState({ status: data }, () => {
      this.msg.parentRefresh(this.state.status);
    });
  };

  whoIsTheAuthor = data => {
    this.setState({ author: data });
  };

  editingMessage = data => {
    this.ftr.editingMessage(data);
  };

  render() {
    return (
      <div className="App">
        <Welcome callbackFromParent={this.whoIsTheAuthor.bind(this)} />
        <div className="Messages">
          <Send
            author={this.state.author}
            callbackFromParent={this.updatingData.bind(this)}
            ref={data => {
              this.ftr = data;
            }}
          />
          <div className="Content">
            <Messages
              author={this.state.author}
              editingMessage={this.editingMessage}
              ref={data => {
                this.msg = data;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
