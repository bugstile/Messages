import React, { Component } from "react";
import { Loader } from "./Loader.js";

function Actions(props) {
  if (props.currentAuthor === props.author) {
    return (
      <div className="Actions" id={props.id}>
        <div className="Action Edit" onClick={props.onEdit}>
          Edit
        </div>
        <div className="Action Remove" onClick={props.onRemove}>
          Remove
        </div>
      </div>
    );
  }
}

function Message(props) {
  return (
    <div id={"msg" + props.id} key={props.id} className="MessageContainer">
      <div className="MessageContent">{props.message}</div>
      <div className="MessageFooter">
        <div className="User">
          by <span className="Author">{props.author}</span>
        </div>
        {Actions(props)}
      </div>
    </div>
  );
}

export class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      editing: false
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  fetchMessages() {
    return fetch("http://localhost:3000/result/")
      .then(response => response.json())
      .then(data => {
        document.getElementById("newMessage").classList.add("Hide");
        document.getElementById("newMessage").classList.remove("Display");
        this.setState({
          data: data.reverse()
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleEdit(props) {
    this.setState({ editing: true });
    let details = this.state.data.find(
      item => item.id === parseInt(props.target.parentElement.id, 10)
    );
    details.bool = true;
    this.props.editingMessage(details);
    document.getElementById("input").focus();
  }

  handleRemove(props) {
    let something = "msg" + props.target.parentElement.id;
    document.getElementById(something).style.display = "none";
    return fetch(
      "http://localhost:3000/result/" + props.target.parentElement.id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      }
    )
      .then(response => {
        response.json().then(() => {
          this.setState({ editing: false });
          this.fetchMessages();
          this.props.editingMessage({ bool: false });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  editing(props) {
    if (!props) {
      this.setState({ editing: false });
    }
  }

  refreshMessages(props) {
    if (props) {
      this.setState({ loaded: props }, function() {
        this.fetchMessages();
      });
    }
  }

  componentDidMount() {
    this.fetchMessages().then(() => {
      this.setState({ author: this.props.author, loaded: true });
    });
  }

  render() {
    if (this.state.loaded) {
      return this.state.data.map(e => (
        <Message
          onEdit={this.handleEdit}
          onRemove={this.handleRemove}
          currentAuthor={this.props.author}
          key={e.id}
          id={e.id}
          author={e.author}
          message={e.message}
        />
      ));
    } else {
      return <Loader />;
    }
  }
}
