import React from "react";
import moment from "moment";

import { getUserData } from "__SERVICES/auth";

import { Status, Message } from "__CONSTANTS";

import { TextInput, Validator } from "__COMPONENTS/shared/";

import "./styles.scss";

class ChatBox extends React.Component {
  state = {
    activeMessage: ""
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

      const { friend, sendMessage } = this.props;
      const { activeMessage } = this.state;
      const userData = getUserData();

      let messageData = {
        content: activeMessage,
        timestamp: Date.now(),
        sender: userData._id,
        reciever: friend._id,
        type: Message.type.DIRECT
      };
      this.setState(
        {
          activeMessage: ""
        },
        () => {
          sendMessage(messageData);
        }
      );
    }
  };

  getMessageDisplayTime = timestamp => {
    const msgDate = moment(timestamp);
    const today = moment();

    if (today.diff(msgDate, "days") === 0) {
      return msgDate.format("HH:mm a");
    } else if (today.diff(msgDate, "year") === 0) {
      return msgDate.format("DD MMM [at] HH:mm a");
    }
    return msgDate.format("DD MMM YYYY [at] HH:mm a");
  };

  render = () => {
    const { status, data, friend } = this.props;
    return (
      <div className="widget__container chat-box__container">
        <div className="widget__container-inner">
          <div className="widget__body chat-box__body">
            <div
              className="chat-box__output"
              ref={ref => (this.chatBoxOutput = ref)}
            >
              <div className="clearfix chat-box__list">
                {data &&
                  data.map((msg, index) => {
                    let messageSource = "";
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
                        <div className="chat-item__text-wrapper ts-sm">
                          <div className="chat-item__text">{msg.content}</div>
                        </div>
                        <div className="chat-item__timestamp ts-xs">
                          {this.getMessageDisplayTime(msg.timestamp)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="chat-box__input">
              <TextInput
                name="chat-input-box"
                value={this.state.activeMessage}
                onChange={this.onMessageType}
                onKeyDown={this.onKeyDown}
                placeholder="enter your message..."
                tabIndex="1"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default ChatBox;
