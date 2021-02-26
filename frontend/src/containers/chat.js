import React, { Component } from 'react';
import Sitepanel from './sitepanel/sitepanel';
import WebSocketInstance from '../websocket';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.waitForSocketConnection(() => {
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this));
            
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    waitForSocketConnection(callback) {
        const component = this;

        setTimeout(() => {
            if (WebSocketInstance.state() === 1) {
                console.log('connection is secure');
                callback();
                return;
            } else {
                console.log('waiting for connection...');
                component.waitForSocketConnection(callback);
            }
        }, 100);
    }

    setMessages(messages) {
        this.setState({
            messages: messages.reverse()
        });
    }

    addMessage(message) {
        console.log(this.state.messages)
        this.setState({
            messages: [...this.state.messages, message]
        });
    }

    renderMessages = messages => {
        const currentUser = 'amin';
        return messages.map(message => (
            <li
                key={message.id}
                className={message.author === currentUser ? 'sent' : 'replies'}>
                <img src="" />
                <p>{message.content}</p>
            </li>
        ))
    }

    sendMessageHandler = e => {
        e.preventDefault()
        const messageObj = {
            from: 'amin',
            content: this.state.message
        }
        WebSocketInstance.newChatMessage(messageObj)
        this.setState({
            message: ''
        })
    }
    
    messageChangeHandler = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        const messages = this.state.messages;

        return (
            <div id="frame">
                <Sitepanel />

                <div className="content">
                    <div className="contact-profile">
                        <img src="./img/harveyspecter.png" alt="" />
                        <p>username</p>
                        <div className="social-media">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="messages">
                        <ul id="chat-log">
                            {
                                messages && this.renderMessages(messages)
                            }
                        </ul>
                    </div>
                    <div className="message-input">
                        <form onSubmit={this.sendMessageHandler}>
                            <div className="wrap">
                                <input
                                    onChange={this.messageChangeHandler}
                                    value={this.state.message}
                                 id="chat-message-input" type="text" placeholder="Write your message..." />
                                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button id="chat-message-submit" className="submit">
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
          </div>
        )
    }
}

export default Chat;