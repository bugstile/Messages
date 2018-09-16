import React, { Component } from "react";

export class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      author: "50000",
      sent: false,
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  editingMessage(props) {
    if (props.bool) {
      this.setState(
        {
          editing: props.bool,
          message: props.message,
          messageID: props.id
        },
        () => {
          document.getElementById("input").value = props.message;
        }
      );
    } else {
      this.setState({
        editing: props.bool
      });
    }
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      if (this.messageEvaluation(this.state.message)) {
        this.handleSubmit(event);
      }
    }
  };

  messageEvaluation(message) {
    if (message.length > 255) {
      console.log("too long");
      return false;
    }

    if (message.length === 0) {
      console.log("too short");
      return false;
    }

    return true;
  }

  handleChange(event) {
    if (this.messageEvaluation(event.target.value)) {
      this.setState({ message: event.target.value });
    }
  }

  formBody(details) {
    return Object.keys(details)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");
  }

  resetSubmissions() {
    document.getElementById("input").value = "";
  }

  blurIt() {
    document.getElementById("coverInput").innerHTML = document.getElementById(
      "input"
    ).value;
    document.getElementById("input").value = " ";
    document.getElementById("coverInput").classList.add("slide-out-right");
    setTimeout(() => {
      document.getElementById("coverInput").classList.remove("slide-out-right");
      document.getElementById("coverInput").innerHTML = "";
    }, 500);
  }

  handleSubmit() {
    let details = {
      message: this.state.message
    };
    let url = "http://localhost:3000/result/";

    if (!this.state.editing) {
      details.author = this.props.author;
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: this.formBody(details)
      })
        .then(response =>
          response.json().then(() => {
            document.getElementById("newMessage").classList.remove("Hide");
            document.getElementById("newMessage").classList.add("Display");
            this.blurIt();
            this.setState({
              message: "",
              author: this.props.author,
              editing: false
            });
            this.props.callbackFromParent(true);
            this.resetSubmissions();
          })
        )
        .catch(error => {
          console.error(error);
        });
    } else {
      return fetch(url + this.state.messageID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: this.formBody(details)
      })
        .then(response =>
          response.json().then(() => {
            document.getElementById("newMessage").classList.remove("Hide");
            document.getElementById("newMessage").classList.add("Display");
            this.setState({
              message: "",
              author: this.props.author,
              editing: false
            });
            this.props.callbackFromParent(true);
            this.resetSubmissions();
          })
        )
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    return (
      <div className="Send">
        <span id="coverInput" />
        <input
          id="input"
          type="text"
          value={this.state.value}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          placeholder="Write your message here..."
          autoComplete="off"
        />
      </div>
    );
  }
}
