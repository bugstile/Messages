import { Component } from "react";

export class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  generateID() {
    return Math.floor(Math.random() * 10000000);
  }

  welcomeAuthor() {
    let id;
    if (isNaN(parseInt(localStorage.getItem("author"), 10))) {
      id = this.generateID();
      localStorage.setItem("author", id);
    } else {
      id = localStorage.getItem("author");
    }
    this.setState({ author: id }, () => {
      this.setState({ loading: false });
      this.props.setAuthor(this.state.author);
    });
  }

  componentDidMount() {
    this.welcomeAuthor();
  }

  render() {
    return null;
  }
}
