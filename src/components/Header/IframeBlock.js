import React, { Component } from "react";

class IframeBlock extends Component {
  render() {
    return (
      <>
        <div className="header-iframe-block">
          <div
            id="sign-dialog-close-btn"
            className="sign-dialog-close-btn"
            onClick={this.props.handleiframemodalclose}
          >
            <i className="fa fa-close"></i>
          </div>

          {React.createElement("iframe", {
            id: "gameIframe",
            src: this.props.glink,
            title: "Casino game host",
          })}
        </div>
      </>
    );
  }
}

export default IframeBlock;
