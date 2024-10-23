import React, { Component } from "react";

import "./footer.css";
import "./footer_responsive.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer m_lr_auto">
        <div className="footer-list">
          <div className="footer-list-sec list-sec1">
            <img
              className="footer-list-sec-title"
              src="assets/image/atari_mark.png"
              alt="atarimarkimage"
            />
            <p>
              Atari stands firmly in support of financial freedom and the
              liberty that blockchain provides globally for anyone to
              voluntarily participate in a permissionless and decentralized
              network.
            </p>
          </div>
          <div className="footer-list-sec list-sec2">
            <div className="footer-list-sec-title">Quick Links</div>
            <p>Home</p>
            <p>Vision</p>
            <p>About</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
          <div className="footer-list-sec list-sec3">
            <div className="footer-list-sec-title">Address</div>
            <p>292 Main Street GX11 1AA Gibrator</p>
            <div
              className="footer-list-sec-title"
              style={{ marginTop: "20px" }}
            >
              Email
            </div>
            <p>token@atari.com</p>
          </div>
          <div className="footer-list-sec list-sec4">
            <div className="footer-list-sec-title">Follow Us</div>
            <div className="footer-list-sec-icons">
              <i className="fa fa-apple" />
              <i className="fa fa-twitter" />
              <i className="fa fa-facebook" />
              <i className="fa fa-paper-plane" />
              <i className="fa fa-gamepad" />
            </div>
          </div>
        </div>
        <div className="footer-link">
          <div className="footer-link-item">Privacy Policy</div>
          <div className="footer-link-item">Terms of Use</div>
          <div className="footer-link-item">Risk Factors</div>
          <div className="footer-link-item">Regulatory Oversight</div>
          <div className="footer-link-item">Atari Token Disclaimer</div>
          <div className="footer-link-item">AML / CFT Policy</div>
          <div className="footer-link-item">Atari Token Improvement Policy</div>
          <div className="footer-link-item">Cookie Policy</div>
        </div>
        <div className="footer-link-intro">
          <div className="footer-link-intro-item">
            Copyright @2021 Atari Chain, Limited. All rights Reserved.
          </div>
          <div className="footer-link-intro-item">
            Ataro and the Atari logo are trademarks owned by Atari Interactive,
            Inc. All other trademarks are the property of their respective
            owners
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
