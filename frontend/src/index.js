import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Chat from './containers/chat';
import WebSocketInstance from './websocket';


class App extends Component {
    componentDidMount() {
        WebSocketInstance.connect();
    }
    
    render() {
        return (
            <Chat />
        )
    }
}


ReactDom.render(<App />, document.getElementById('app'));