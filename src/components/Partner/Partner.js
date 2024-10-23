import React, { Component } from "react";
import "./partner.css";
import "./partner_responsive.css";

class Partner extends Component {
  render() {
    return (
      <div className="partner m_lr_auto">
        <div className="partner-title textalign">Our Partners</div>
        <div className="partner-content">
          <img
            src="assets/image/com_logo_imgs.png"
            width="100%"
            alt="comlogoimages"
          />
        </div>
      </div>
    );
  }
}

export default Partner;
