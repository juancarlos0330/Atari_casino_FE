import React, { Component } from "react";
import "./games.css";
import "./games_responsive.css";

const rows = [];
for (var i = 0; i < 12; i++) {
  rows.push(
    <div className="games-sec2-block-item" key={i}>
      <img
        src="assets/image/jackpot_block_image.png"
        alt="jackpotblockimage"
        width="100%"
      />
    </div>
  );
}

class Games extends Component {
  render() {
    return (
      <div className="games m_lr_auto">
        <div className="games-sec1">
          <div className="games-sec1-intro">
            <div className="games-sec1-title1">Atari Casino</div>
            <div className="games-sec1-title2">Lorem lpsum</div>
            <div className="games-sec1-title3">
              We are building the token that will power the future of the
              interactive entertainment industry
            </div>
          </div>
          <div className="games-sec1-img">
            <img
              src="assets/image/jackpot_img.png"
              alt="jackpotimage"
              className="games-sec1-jack-img"
            />
            <img
              src="assets/image/jackpot_back_img.png"
              alt="jackpotbackimage"
              className="games-sec1-img-back"
            />
          </div>
          <div className="games-sec1-content">
            <div className="games-sec1-content-title1">Total Jackpots</div>
            <div className="games-sec1-content-title2 upper">5.34546 Atai</div>
          </div>
          <div className="games-sec1-show-block">
            <div className="games-sec1-show-btn">
              All games
              <i className="fa fa-arrow-right" />
            </div>
          </div>
        </div>
        <div className="games-sec2">{rows}</div>
      </div>
    );
  }
}

export default Games;
