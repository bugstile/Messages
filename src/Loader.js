import React, { Component } from "react";

export class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={`MessageContainer ${this.props.className}`}
      >
        <div className="MessageContent">
          <div className="loader">Loading...</div>
        </div>
      </div>
    );
  }
}
