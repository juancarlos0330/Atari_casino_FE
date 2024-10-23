import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

class Menu extends Component {
  closeBtn = () => {
    document
      .querySelector("#menu")
      .setAttribute("style", "left: -300px; opacity: 0.6;");
    document
      .querySelector("#menushow")
      .setAttribute("style", "display: block;");
    document.querySelector("#main").setAttribute("style", "opacity: 1;");
  };

  render() {
    return (
      <div id="menu" className="menu flex col">
        <div
          className="menu-close"
          onClick={() => {
            this.closeBtn();
          }}
        >
          <i className="fa fa-close" />
        </div>
        <div
          className="m_lr_auto menu-logo"
          onClick={() => {
            this.closeBtn();
          }}
        >
          <Link to="/">
            <img src="assets/image/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="m_list m_lr_auto flex col">
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/mypage" className="link-btn">
              <i className="fa fa-user m_list_item_img" />
              My Page
            </Link>
          </div>
          {/* <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-car m_list_item_img" />
              Farming
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-gamepad m_list_item_img" />
              All games
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-resistance m_list_item_img" />
              Staking
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-dropbox m_list_item_img" />
              Boxes
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-viacoin m_list_item_img" />
              About BFG
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-briefcase m_list_item_img" />
              Cashback
              <i className="fa fa-chevron-right m_list_item_prev_img" />
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-user-secret m_list_item_img" />
              Referral
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-gift m_list_item_img" />
              Bonuses
              <i className="fa fa-chevron-right m_list_item_prev_img" />
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-tag m_list_item_img m_list_item_img" />
              Promotions
            </Link>
          </div>
          <div
            className="m_list_item flex row"
            onClick={() => {
              this.closeBtn();
            }}
          >
            <Link to="/" className="link-btn">
              <i className="fa fa-file-text m_list_item_img" />
              News
            </Link>
          </div> */}
        </div>
        {/* <div className="m-lang upper">
          en
          <i className="fa fa-chevron-right m_list_item_prev_img" />
        </div> */}
      </div>
    );
  }
}

export default Menu;
