import React from "react";

function ChatIcon(props) {
  return (
    <div
      id="chatshow"
      className="chat-show"
      onClick={() => {
        props.chatshowBtn();
      }}
    >
      <i className="fa fa-weixin" />
    </div>
  );
}

export default ChatIcon;
