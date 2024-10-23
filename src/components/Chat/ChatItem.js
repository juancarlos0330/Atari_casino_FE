import React, { Component } from "react";

class ChatItem extends Component {
  render() {
    return (
      <div className="chat-item-main">
        <i className="fa fa-futbol-o futbolicon" />{" "}
        <span>{this.props.name}:</span> {this.props.children}
      </div>
    );
  }
}

export default ChatItem;
