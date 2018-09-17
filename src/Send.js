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
          document.getElementById("editing").classList.remove("Hide");
          document.getElementById("editing").classList.add("Display");
          document.getElementById("input").value = props.message;
        }
      );
    } else {
      this.setState(
        {
          editing: props.bool
        },
        () => {
          document.getElementById("editing").classList.add("Hide");
          document.getElementById("editing").classList.remove("Display");
        }
      );
    }
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      if (this.messageEvaluation(event.target.value)) {
        this.handleSubmit(event);
      }
    }
  };

  handleKeyUp = event => {
    if (event.key === "Escape" && this.state.editing) {
      this.setState({ editing: false, message: "", messageID: "" });
      document.getElementById("input").value = "";
      document.getElementById("editing").classList.remove("Display");
      document.getElementById("editing").classList.add("Hide");
    }
  };

  messageEvaluation(message) {
    function handleErrorPresentation(error) {
      document.getElementById("ErrorMessage").innerHTML = error;
      document.getElementById("Error").classList.remove("Hide");
      document.getElementById("Error").classList.add("Display");
    }

    if (message.length > 255) {
      handleErrorPresentation("Message is too long (" + message.length + ")");
      return false;
    }

    if (message.length === 0) {
      document.getElementById("Error").classList.remove("Display");
      document.getElementById("Error").classList.add("Hide");
      return false;
    }

    if (message.trim().length === 0) {
      handleErrorPresentation("Message can't be empty");
      return false;
    }

    document.getElementById("Error").classList.remove("Display");
    document.getElementById("Error").classList.add("Hide");
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

  playAnimation() {
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
      message: this.state.message,
      author: this.props.author
    };
    let url = "http://localhost:3000/result/";

    if (!this.state.editing) {
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
            this.playAnimation();
            this.setState({
              message: "",
              author: this.props.author,
              editing: false
            });
            this.props.Sent(true);
            this.resetSubmissions();
          })
        )
        .catch(error => {
          console.error(error);
        });
    } else {
      details.id = parseInt(this.state.messageID, 10);
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
            document.getElementById("editing").classList.remove("Display");
            document.getElementById("editing").classList.add("Hide");
            this.props.Sent(true);
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
          onKeyUp={this.handleKeyUp}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChange}
          placeholder="Write your message here..."
          autoComplete="off"
        />
        <div id="editing" className="Editing Hide">
          Press Escape to exit editing
        </div>
      </div>
    );
  }
}
