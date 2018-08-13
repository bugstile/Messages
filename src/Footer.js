import React, { Component } from 'react';

export class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: '',
            author: '50000',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
            this.handleSubmit(event);
        }
      }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event){
        let details = {
            'message': this.state.message,
            'author': this.state.author
        }
        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
        return fetch('https://5b6c5f2bc06fb600146274d8.mockapi.io/storytel/messages/', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            body: formBody
        }).then((response) => response.json()
            .then((data) => {
                this.setState({sent: true, message: ''});
                this.props.callbackFromParent(true);
                document.getElementById("input").value = '';
            })
        );
    }

  render() {
    return(
        <div className="Footer">
            <input id="input" type="text" value={this.state.value} onKeyPress={this.handleKeyPress} onChange={this.handleChange} placeholder="Write your message here..."></input>
            <button onClick={this.handleSubmit}>Send</button>
        </div>
    )
  }
}