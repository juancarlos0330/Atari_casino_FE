import React, { Component } from "react";

import "./atari.css";
import "./atari_responsive.css";

class Atari extends Component {
  render() {
    return (
      <div className="atari m_lr_auto">
        <div className="atari_sec1">
          <div className="atari_sec1_1">Atari Casino</div>
          <div className="atari_sec1_2">Lorem Ipsum</div>
          <div className="atari_sec1_3">
            We are building the token that will power the future of the
            interactive entertainment industry
          </div>
        </div>
        <div className="atari_sec2">
          <img
            src="assets/image/atari_mark_img.png"
            alt="atarimarkimg"
            width="100%"
          />
        </div>
      </div>
    );
  }
}

export default Atari;
