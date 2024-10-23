import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import { Dialog, Slide } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import NotificationManager from "react-notifications/lib/NotificationManager";
import Signpage from "./Signpage";
import IframeBlock from "./IframeBlock";
import { saveBalance } from "../../actions/mypageAction";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./header.css";
import "./header_responsive.css";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isIframeModalShow: false,
      isBalanceModalShow: false,
      flag_iframe: true,
      isTagVal: 0,
      glink: "",
      glinks: "",
      gameItems: [],
      gbalance: 0,
      gid: "",
      gamebalance: 0,
      gamename: "",
      real_gamebalance: 0,
    };
  }
  socket;

  componentWillMount() {
    this.setState({
      gameItems: this.props.gamelist.gamelist,
    });
  }

  componentDidMount() {
    this.setState({
      flag_iframe: false,
      gameItems: this.props.gamelist.gamelist,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      gameItems: nextProps.gamelist.gamelist,
    });
  }

  handlemodalclose = () => {
    this.setState({
      isShowModal: false,
    });
  };

  logOutPage = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  confirmBalance = async (glink, id) => {
    if (this.props.auth.isAuthenticated && sessionStorage.jwtToken) {
      const reqData = {
        token: sessionStorage.jwtToken,
        game_id: id,
      };
      axios.post("/api/games/getbalance", reqData).then((res) => {
        this.setState({
          gamebalance: res.data.balance,
          real_gamebalance: res.data.real_balance,
          gamename: res.data.name,
        });
      });
      this.setState({
        isBalanceModalShow: true,
        glink: glink,
        gid: id,
        gbalance: 0,
      });
    } else {
      NotificationManager.warning("Please Sign Up", "", 3000);
    }
  };

  showIframePad = async (glink, id) => {
    if (this.state.gbalance < this.props.auth.user.balance) {
      this.setState({
        isBalanceModalShow: false,
      });
      if (this.props.auth.isAuthenticated && sessionStorage.jwtToken) {
        await this.props.saveBalance({
          user_id: this.props.auth.user.id,
          game_id: id,
          balance: Number(this.state.gbalance),
          account: this.props.auth.user.account,
        });
        await this.setState({
          isIframeModalShow: true,
          glinks: glink,
        });

        window.onmessage = (e) => {
          if (e.data.name === "iframe_message") {
            const msg_data = {
              game_id: id,
              name: "iframe_message",
              token: sessionStorage.jwtToken,
            };
            document
              .querySelector("#gameIframe")
              .contentWindow.postMessage(msg_data, "*");
          }
        };
      } else {
        NotificationManager.warning("Please Sign Up", "", 3000);
      }
    } else {
      NotificationManager.error("Balance is high!", "", 3000);
    }
  };

  handleiframemodalclose = () => {
    this.setState({
      isIframeModalShow: false,
      glink: "",
      glinks: "",
    });
  };

  handlebalancemodalclose = () => {
    this.setState({
      isBalanceModalShow: false,
      glink: "",
      glinks: "",
    });
  };

  render() {
    return (
      <div className="header m_lr_auto">
        <div className="header-user-sign">
          {this.props.auth.isAuthenticated ? (
            <>
              <span className="header-user-sign-in">
                {this.props.auth.user.balance}{" "}
                <Link to="/mypage" className="link-btn">
                  My Page
                </Link>
              </span>
              <span className="header-user-sign-in" onClick={this.logOutPage}>
                Log Out
              </span>
            </>
          ) : (
            <>
              <span
                className="header-user-sign-in"
                onClick={() => {
                  this.setState({
                    isShowModal: true,
                    isTagVal: 0,
                  });
                }}
              >
                Log In
              </span>
              <span
                className="header-user-sign-up"
                onClick={() => {
                  this.setState({
                    isShowModal: true,
                    isTagVal: 1,
                  });
                }}
              >
                Sign Up
              </span>
            </>
          )}
        </div>
        <div className="header-content">
          <div className="header-intro">
            <div className="header-title-block">
              <p className="header-intro-title1">Atari Casino</p>
              <p className="header-intro-title2">Lorem lpsum</p>
              <p className="header-intro-title3">
                We are building the token that will power the future of the
                interactive entertainment industry
              </p>
            </div>
            <div className="header-game-block">
              <div className="header-game-block-item">
                <img src="assets/image/3500_game_ico.png" alt="games3500" />
                <div>3 500 + Games</div>
              </div>
              <div className="header-game-block-stick"></div>
              <div className="header-game-block-item">
                <img
                  src="assets/image/blockchain_game_ico.png"
                  alt="games3500"
                />
                <div>Full blockchain Games</div>
              </div>
              <div className="header-game-block-stick"></div>
              <div className="header-game-block-item">
                <img src="assets/image/own_game_ico.png" alt="games3500" />
                <div>Submit your own Game</div>
              </div>
            </div>
            <div className="header-sign-block">
              <div className="header-sign-btn">Sign Up</div>
            </div>
          </div>
          <div className="header-imgs">
            <div className="main-back-right-imgs">
              <img
                src="assets/image/bfg_back_img.png"
                alt="mainbackrightimgs"
              />
            </div>
            <div className="main-back-right-img-slot">
              <img
                src="assets/image/slot_machine.png"
                alt="mainbackrightimgs"
              />
            </div>
          </div>
        </div>
        <div className="header-carsoul-block">
          {this.state.gameItems.filter((glist) => {
            return glist.approve_flag === true;
          }).length === 0 ? (
            <div className="no-game-item">No Game Item</div>
          ) : (
            <OwlCarousel className="owl-theme" items={3} autoplay nav>
              {this.state.gameItems
                .filter((glist) => {
                  return glist.approve_flag === true;
                })
                .map((list, index) => (
                  <div
                    className="header-carsoul-block-item"
                    key={index}
                    onClick={() =>
                      this.confirmBalance(list.frontendurl, list._id)
                    }
                  >
                    <div className="header-carsoul-img-block">
                      <img
                        src={list.game_img_src}
                        alt="carouselitemimg"
                        height="100%"
                        className="header-carsoul-block-img"
                      />
                    </div>
                    <div className="header-carsoul-block-content">
                      <div className="header-carsoul-game-type upper">
                        {list.name}
                      </div>
                      <div className="header-carsoul-game-title">
                        {list.name}
                      </div>
                    </div>
                  </div>
                ))}
            </OwlCarousel>
          )}
        </div>
        <Dialog
          className="SignInDialog"
          open={this.state.isShowModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handlemodalclose}
        >
          <>
            <Signpage
              tabValue={this.state.isTagVal}
              handlemodalclose={this.handlemodalclose}
            />
          </>
        </Dialog>
        <Dialog
          className="IframeDialog"
          open={this.state.isIframeModalShow}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="xl"
        >
          <IframeBlock
            nstate={this.state.isIframeModalShow}
            glink={this.state.glinks}
            s_socket={this.state.s_socket}
            handleiframemodalclose={this.handleiframemodalclose}
          />
        </Dialog>
        <Dialog
          className="BalanceDialog"
          open={this.state.isBalanceModalShow}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="xl"
        >
          <div className="balance-modal-main">
            <div className="balance-modal-title">{this.state.gamename}</div>
            <div className="balance-input-block">
              <span>Game ID:</span>
              <span>{this.state.gid}</span>
            </div>
            <div className="balance-input-block">
              Amount:
              <input
                required
                className="balance-input"
                type="number"
                value={this.state.gbalance}
                onChange={(e) => {
                  this.setState({
                    gbalance: e.target.value,
                  });
                }}
                placeholder="Please input amount"
              />
            </div>
            <div className="balance-input-block">
              <span>Current Amount:</span>
              <span style={{ color: "var(--block_clr)" }}>
                {this.state.gamebalance} ATAI
              </span>
            </div>
            <div className="balance-input-block">
              <span>Total:</span>
              <span style={{ color: "var(--block_clr)" }}>
                {Number(this.state.gbalance) + Number(this.state.gamebalance)}{" "}
                ATAI
              </span>
            </div>
            <div className="balance-input-block">
              <span>Game Amount:</span>
              <span style={{ color: "var(--block_clr)" }}>
                {this.state.real_gamebalance} ATAI
              </span>
            </div>
            <div className="balance-button-block">
              <div
                className="balance-btn agree-btn"
                onClick={() => {
                  this.showIframePad(this.state.glink, this.state.gid);
                }}
              >
                Agree
              </div>
              <div
                className="balance-btn no-btn"
                onClick={() => {
                  this.handlebalancemodalclose();
                }}
              >
                No
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  gamelist: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  gamelist: state.gamelist,
});

export default connect(mapStateToProps, { logoutUser, saveBalance })(
  withRouter(Header)
);
