import React, { Component } from "react";
import { Picker } from "emoji-mart";
import NotificationManager from "react-notifications/lib/NotificationManager";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import ChatItem from "./ChatItem";
import { user_connections } from "../../actions/userconnectAction";
import { saveMsg, getMsgs } from "../../actions/chatAction";
import isEmpty from "../../validation/isEmpty";

import "emoji-mart/css/emoji-mart.css";
import "./chat.css";

const SERVER = require("../../config/config").GAMESERVERURI;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatlists: [],
      isEmojiShow: false,
      chatinputheight: 25,
      chatbottomstatus: false,
      isNewmsg: false,
    };
  }

  socket;

  componentDidMount() {
    this.configureSocket();
    this.props.getMsgs();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chatlists: nextProps.chatlist.chatlist,
    });
  }

  componentDidUpdate() {
    const messages = document.querySelector("#chatscrollcontent");
    if (this.state.chatbottomstatus) {
      messages.scrollTop = messages.scrollHeight;
    }
  }

  configureSocket = () => {
    const socket = socketIOClient(SERVER);

    socket.on("receive-msg", async () => {
      const messages = document.querySelector("#chatscrollcontent");
      if (
        messages.scrollTop ===
        messages.scrollHeight - messages.clientHeight
      ) {
        this.setState({
          chatbottomstatus: true,
        });
      } else {
        this.setState({
          chatbottomstatus: false,
          isNewmsg: true,
        });
      }
      this.props.getMsgs();
    });

    this.socket = socket;
  };

  shownewmsg = () => {
    const messages = document.querySelector("#chatscrollcontent");
    messages.scrollTop = messages.scrollHeight;
    this.setState({
      isNewmsg: false,
    });
  };

  emojiblkshow = () => {
    this.setState({
      isEmojiShow: !this.state.isEmojiShow,
    });
  };

  add_msg = async (val) => {
    // save chat content
    await this.props.saveMsg({
      id: this.props.auth.user.id,
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      content: val,
    });

    await this.socket.emit("send-msg");

    //  When scroll was bottom status,
    const messages = document.querySelector("#chatscrollcontent");
    if (messages.scrollTop === messages.scrollHeight - messages.clientHeight) {
      this.setState({
        chatbottomstatus: true,
      });
    } else {
      this.setState({
        chatbottomstatus: false,
      });
    }
  };

  getCaret = (el) => {
    if (el.selectionStart) {
      return el.selectionStart;
    } else if (document.selection) {
      el.focus();

      const r = document.selection.createRange();
      if (r == null) {
        return 0;
      }

      const re = el.createTextRange(),
        rc = re.duplicate();
      re.moveToBookmark(r.getBookmark());
      rc.setEndPoint("EndToStart", re);

      return rc.text.length;
    }
    return 0;
  };

  sendmsg = (e) => {
    if (e.target.value.trim() === "") {
      const x = e || window.event;
      const key = x.keyCode || x.which;
      if (key === 13) {
        e.preventDefault();
      }
      return false;
    } else {
      const x = e || window.event;
      const key = x.keyCode || x.which;
      if (key === 13 && e.shiftKey) {
        this.setState({
          chatinputheight: this.state.chatinputheight + 12,
        });
        document.querySelector("#chatinput").style.height =
          this.state.chatinputheight + "px";
        const content = e.target.value;
        const carent = this.getCaret(e.target);
        this.value =
          content.substring(0, carent) +
          "\n" +
          content.substring(carent, content.length - 1);
        e.stopPropagation();
      } else if (key === 13) {
        if (!this.props.auth.isAuthenticated) {
          e.preventDefault();
          NotificationManager.warning("Please Sign Up", "", 3000);
        } else {
          e.preventDefault();
          this.setState({
            chatinputheight: 25,
            isEmojiShow: false,
          });
          document.querySelector("#chatinput").style.height = "25px";
          this.add_msg(e.target.value);
          document.querySelector("#chatinput").value = "";
          const messages = document.querySelector("#chatscrollcontent");
          messages.scrollTop = messages.scrollHeight;
        }
      }
    }
  };

  closeBtn = () => {
    document
      .querySelector("#chat")
      .setAttribute("style", "right: -300px; opacity: 0.6;");
    document
      .querySelector("#chatshow")
      .setAttribute("style", "display: block;");
    document.querySelector("#main").setAttribute("style", "opacity: 1;");
  };

  onchat_click = () => {
    if (document.querySelector("#chatinput").value.trim() === "") {
      return false;
    } else {
      if (!this.props.auth.isAuthenticated) {
        NotificationManager.warning("Please Sign In", "", 3000);
      } else {
        this.setState({
          chatinputheight: 25,
          isEmojiShow: false,
        });
        document.querySelector("#chatinput").style.height = "25px";
        this.add_msg(document.querySelector("#chatinput").value);
        document.querySelector("#chatinput").value = "";
        const messages = document.querySelector("#chatscrollcontent");
        messages.scrollTop = messages.scrollHeight;
      }
    }
  };

  render() {
    return (
      <div id="chat" className="chat">
        <div className="chat-title">
          <div
            className="flex-1"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <i className="fa fa-times" />
          </div>
          <div className="chat-title-main">Chat Room</div>
          <div className="flex-1"></div>
        </div>
        <div className="chat-main-content">
          <div id="chatscrollcontent" className="chat-content">
            {isEmpty(this.state.chatlists) ? (
              <div className="chat-content-no">No Message</div>
            ) : (
              this.state.chatlists
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((list, index) => (
                  <ChatItem key={index} name={list.name} person={list.email}>
                    {list.content}
                  </ChatItem>
                ))
            )}
          </div>
          <div className="chat-act">
            {this.state.isNewmsg ? (
              <div className="newmsgbtn" onClick={this.shownewmsg}>
                &#8595;&#8595;&#8595;
              </div>
            ) : null}
            <div className="chat-act-input">
              {this.state.isEmojiShow ? (
                <div className="chat-act-emoji-block">
                  <Picker
                    onSelect={(emoji) => {
                      document.querySelector("#chatinput").value +=
                        emoji.native;
                    }}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "25px",
                      width: "250px",
                      overflowY: "auto",
                      border: "0px solid rgb(44, 49, 55)",
                    }}
                    title="Pick you"
                  />
                </div>
              ) : null}
              <textarea
                type="text"
                id="chatinput"
                className="chat-act-input-this"
                placeholder="Send a message"
                onKeyPress={this.sendmsg}
                maxLength="1000"
              ></textarea>

              <div className="chat-act-emojiicon" onClick={this.emojiblkshow}>
                {/* eslint-disable-next-line */}
                {!this.state.isEmojiShow ? (
                  <i className="fa fa-smile-o emojii"></i>
                ) : (
                  <i className="fa fa-angle-down emojii"></i>
                )}
              </div>
            </div>
            <div className="chat-act-conmain">
              <div className="chat-act-con">
                <div className="chat-act-con-circle"></div>
                Online: {this.props.usercon.user_con}
              </div>
              <div className="chat-act-send">
                <div
                  className="chat-act-send-btn upper"
                  onClick={() => this.onchat_click()}
                >
                  chat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  usercon: PropTypes.object.isRequired,
  chatlist: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  usercon: state.usercon,
  chatlist: state.chatlist,
});

export default connect(mapStateToProps, { user_connections, saveMsg, getMsgs })(
  withRouter(Chat)
);
