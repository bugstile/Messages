import React, { Component } from 'react';

function Message(props){
    return (
        <p id={'msg' + props.id} key={props.id}>
        <span className="Username">
            {props.author}
        </span>
        <span className="Message">
            {props.message}
        </span>
        </p>
    );
}

export class Messages extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            data: [],
            loaded: false
        }
    }

    fetchMessages(){
        return fetch('https://5b6c5f2bc06fb600146274d8.mockapi.io/storytel/messages/')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                data: data.result,
                loaded: true
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }

    parentRefresh(props){
        if(props){
            this.setState({loaded: props}, function(){
                this.fetchMessages();
            })
        }
    }

    componentDidMount(){
        this.fetchMessages();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

  render() {
    if(this.state.loaded){
        return(
            this.state.data.map(e =>
                <Message key={e.id} id={e.id} author={e.author} message={e.message}/>
            )
        );
    } else {
        return(<p>...</p>);
    }
  }
}