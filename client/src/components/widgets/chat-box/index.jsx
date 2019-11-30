import React from "react";

import { onRecieveMessage, onSendMessage, onSaveUserId } from "__API/sockets";

import "./styles.scss";

class ChatBox extends React.Component {
  state = {
    messages: [],
    activeMessage: "",
    userId: null
  };

  componentDidMount = () => {
    onRecieveMessage(this.recieveMessage);
    onSaveUserId(this.saveUserId);
  };

  onMessageType = evt => {
    let value = evt.target.value;
    this.setState({
      activeMessage: value
    });
  };

  onKeyDown = evt => {
    if (evt.keyCode == 13) {
      if (!this.state.activeMessage.trim()) {
        return;
      }
      let messageData = {
        text: this.state.activeMessage,
        timestamp: Date.now(),
        userId: this.state.userId
      };
      this.setState(
        {
          activeMessage: ""
        },
        () => {
          this.sendMessage(messageData);
        }
      );
    }
  };

  sendMessage = messageData => {
    onSendMessage(messageData);
    this.addMessageToList(messageData);
  };

  recieveMessage = messageData => {
    messageData && this.addMessageToList(messageData);
  };
  saveUserId = userId => {
    if (userId) {
      this.setState({
        userId: userId
      });
    }
  };

  addMessageToList = message => {
    this.setState(
      {
        messages: this.state.messages.concat([message])
      },
      () => {
        let height = this.chatBoxOutput.scrollHeight;
        this.chatBoxOutput.scroll(0, height);
      }
    );
  };

  render = () => {
    return (
      <div className="widget__container chat-box__container">
        <div className="widget__body chat-box__body">
          <div
            className="chat-box__output"
            ref={ref => (this.chatBoxOutput = ref)}
          >
            <div className="clearfix chat-box__list">
              {this.state.messages.map((msg, index) => {
                let messageSource = "";
                let date = new Date(msg.timestamp);
                if (msg.userId == this.state.userId) {
                  messageSource = "sent";
                } else {
                  messageSource = "recieve";
                }
                return (
                  <div
                    className={`chat-item chat-item--${messageSource}`}
                    key={index}
                  >
                    <div className="chat-item__text">{msg.text}</div>
                    <div className="chat-item__timestamp">
                      {date.toDateString()} {date.toLocaleTimeString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chat-box__input">
            <input
              autoFocus
              placeholder="enter your message..."
              tabIndex="1"
              value={this.state.activeMessage}
              onChange={this.onMessageType}
              onKeyDown={this.onKeyDown}
            />
          </div>
        </div>
      </div>
    );
  };
}

export default ChatBox;
