import React, { Component } from "react";
import "./rating.css";
import "./rating_responsive.css";

class Rating extends Component {
  render() {
    return (
      <div className="rating m_lr_auto">
        <div className="rating-title">Rating & Reviews</div>
        <div className="rating-review">
          <div className="rating-review-item"></div>
          <div className="rating-review-item"></div>
          <div className="rating-review-item"></div>
        </div>
        <div className="rating-content">
          <div className="rating-content-sec">
            <div className="rating-content-sec-txt">
              Atari CEO Fred Chesnais joins Yahoo Finance Live to discuss the
              gaming company’s launch of their new...
            </div>
            <div className="rating-content-sec-btn upper">
              Read more
              <i className="fa fa-arrow-right" />
            </div>
          </div>
          <div className="rating-content-sec">
            <div className="rating-content-sec-txt">
              Under CEO Fred Chesnais, Atari is a company with just 28. That’s
              pretty small for the oldest brand in video games...
            </div>
            <div className="rating-content-sec-btn upper">
              Read more
              <i className="fa fa-arrow-right" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rating;
