import React, { Component } from "react";

export class Send extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      author: "50000",
      sent: false,
      sendable: false,
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
      this.handleSubmit(event);
    }
  };

  messageEvaluation(message) {
    if (message.length > 255) {
      this.setState({ sendable: false });
      return false;
    } else {
      this.setState({ sendable: true });
      return true;
    }
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
    document.getElementById("submit").removeAttribute("disabled");
  }

  handleSubmit() {
    if (this.state.sendable) {
      let details = {
        message: this.state.message
      };
      let url =
        "https://5b6c5f2bc06fb600146274d8.mockapi.io/storytel/messages/";

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
              this.setState({
                message: "",
                author: this.props.author
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
  }

  render() {
    return (
      <div className="Send">
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
