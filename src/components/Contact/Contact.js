import React, { Component } from "react";
import "./contact.css";
import "./contact_responsive.css";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="contact-title textalign">Get In Touch!</div>
        <div className="contact-content">
          <div className="contact-content-name-email">
            <div className="contact-content-name">
              <div
                className="contact-content-item"
                data-placeholder="Enter Name *"
                contentEditable
              ></div>
            </div>
            <div className="contact-content-email">
              <div
                className="contact-content-item"
                data-placeholder="Enter Email *"
                contentEditable
              ></div>
            </div>
          </div>
          <div className="contact-content-subject">
            <div
              className="contact-content-item"
              data-placeholder="Enter Subject *"
              contentEditable
            ></div>
          </div>
          <div className="contact-content-msg">
            <div
              className="contact-content-item"
              data-placeholder="Message *"
              contentEditable
            ></div>
          </div>
        </div>
        <div className="contact-content-submit">
          <div className="contact-content-subbtn upper">
            submit
            <i className="fa fa-arrow-right" />
          </div>
        </div>
        <div className="contact-news-block">
          <div className="contact-news-title">Newsletter</div>
          <div
            className="contact-news-email"
            data-placeholder="Enter Email Address"
            contentEditable
          ></div>
          <div className="contact-news-subbtn upper">
            submit
            <i className="fa fa-arrow-right" />
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
