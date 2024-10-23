import React, { Component } from "react";

import "./Variety.css";
import "./variety_responsive.css";

const rows = [];
for (let i = 0; i < 18; i++) {
  rows.push(
    <div className="variety-content-block-item" key={i}>
      <img
        src="assets/image/variety_block_image.png"
        alt="varietyblockimage"
        width="100%"
      />
    </div>
  );
}

class Variety extends Component {
  render() {
    return (
      <div className="variety-main">
        <div className="variety m_lr_auto">
          <div className="variety-content">
            <div className="variety-title-block">
              <div className="upper variety-title1">more than 3500 games</div>
              <div className="variety-title2">Huge variety of slots</div>
            </div>
            <div className="variety-content-block">{rows}</div>
            <div className="variety-btn-block">
              <div className="variety-show-btn">All games</div>
            </div>
          </div>
        </div>
        <div className="variety-content-img">
          <div className="variety-back-img1">
            <div className="variety-back-img1-1">
              <img src="assets/image/variety_back_1.png" alt="backimg1" />
            </div>
            <div className="variety-back-img1-2">
              <img src="assets/image/variety_back_2.png" alt="backimg2" />
            </div>
          </div>
          <div className="variety-back-img2">
            <div className="variety-back-img2-1">
              <img src="assets/image/variety_back_3.png" alt="backimg3" />
            </div>
          </div>
          <div className="variety-backg-img1">
            <img src="assets/image/dice_img_1.png" alt="diceimg1" />
          </div>
          <div className="variety-backg-img2">
            <img src="assets/image/dice_img_2.png" alt="diceimg2" />
          </div>
          <div className="variety-backg-img3">
            <img src="assets/image/dice_img_3.png" alt="diceimg3" />
          </div>
          <div className="variety-backg-img4">
            <img src="assets/image/dice_img_4.png" alt="diceimg4" />
          </div>
          <div className="variety-backg-img5">
            <img src="assets/image/dice_img_5.png" alt="diceimg5" />
          </div>
        </div>
      </div>
    );
  }
}

export default Variety;
