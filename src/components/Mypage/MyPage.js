import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert";
import { delGameItem } from "../../actions/mypageAction";
import { ethers } from "ethers";
import { useWallet } from "use-wallet";
import { AtariToken } from "../contract";
import { saveDepositAmount } from "../../actions/mypageAction";
import { MotionInView } from "../../animate/index";
import {
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
} from "../../animate/variants";
import "./mypage.css";
import "./mypage_responsive.css";
import "react-confirm-alert/src/react-confirm-alert.css";

function MyPage(props) {
  const wallet = useWallet();

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
      NotificationManager.error("Please Log In", "", 3000);
    }
  });

  const [gameItems, setGameItems] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [loadingImg, setLoadingImg] = useState(false);

  useEffect(() => {
    setGameItems(props.gamelist.gamelist);
  }, [props]);

  const setDeposit = (e) => {
    if (e.target.value < 0) {
      setDepositAmount(0);
    } else {
      setDepositAmount(e.target.value);
    }
  };

  const setWithdraw = (e) => {
    if (e.target.value < 0) {
      setWithdrawAmount(0);
    } else {
      setWithdrawAmount(e.target.value);
    }
  };

  const delGameItem = (id) => {
    confirmAlert({
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            props.delGameItem({
              g_id: id,
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleConfirm = async (depAmount) => {
    if (depAmount <= 0) {
      NotificationManager.error("Please Input Amount.", "", 2000);
    } else {
      if (wallet.status === "connected") {
        try {
          setLoadingImg(true);
          var deposit_Amount = ethers.utils.parseUnits(depAmount, 0);
          const provider = new ethers.providers.Web3Provider(wallet.ethereum);
          const signer = await provider.getSigner();
          var signedAtariToken = AtariToken.connect(signer);
          var tx = await signedAtariToken.transfer(
            "0xBC376CF52515278d153e22948415288b30212bcE",
            deposit_Amount
          );
          await tx.wait();
          // tx.hash
          await setLoadingImg(false);
          await props.saveDepositAmount({
            user_id: props.auth.user.id,
            depAmount: Number(depAmount),
          });
          await setDepositAmount(0);
        } catch (err) {
          NotificationManager.error("Deposit Failed!", "", 3000);
          setLoadingImg(false);
        }
      } else {
        wallet.connect();
      }
    }
  };

  return (
    <div className="mypage">
      <div className="mygame-title textalign">My Account</div>
      <div className="myaccount-info">
        <div className="myinfo">
          <div className="card-block">
            <MotionInView variants={varFadeInLeft}>
              <div className="myinfo-title textalign upper">My Information</div>
              <div className="myinfo-content">
                <div className="myinfo-content-item">
                  <span>Name:</span>
                  <span>{props.auth.user.name}</span>
                </div>
                <div className="myinfo-content-item">
                  <span>Email:</span>
                  <span>{props.auth.user.email}</span>
                </div>
                <div className="myinfo-content-item">
                  <span>Account:</span>
                  <span>
                    {props.auth.isAuthenticated
                      ? props.auth.user.account.substring(0, 6) +
                        "..." +
                        props.auth.user.account.substring(
                          props.auth.user.account.length - 4
                        )
                      : ""}
                  </span>
                </div>
                <div className="myinfo-content-item">
                  <span>Balance:</span>
                  <span>
                    <span
                      style={{ color: "var(--block_clr)", fontWeight: "bold" }}
                    >
                      {props.auth.user.balance}
                    </span>{" "}
                    ATAI
                  </span>
                </div>
              </div>
            </MotionInView>
          </div>
          <div className="card-block">
            <MotionInView variants={varFadeInDown}>
              <div className="myinfo-title textalign upper">Deposit</div>
              <div className="myinfo-content">
                <div className="myinfo-content-item">
                  <span>Deposit Amount:</span>
                  <div className="deposit-input-block">
                    <span>ATAI</span>
                    <input
                      type="number"
                      className="deposit-amount-input"
                      value={depositAmount}
                      min={0}
                      onChange={(e) => {
                        setDeposit(e);
                      }}
                    />
                  </div>
                </div>
                <div className="myinfo-content-item">
                  <span className="deposit-total">Total:</span>
                  <span>{Number(depositAmount).toFixed(0)} ATAI</span>
                </div>
                <div className="myinfo-content-item">
                  <div
                    className="myinfo-content-btn textalign"
                    onClick={() =>
                      handleConfirm(Number(depositAmount).toFixed(0))
                    }
                  >
                    {wallet.status !== "connected" ? (
                      "Wallet Connect"
                    ) : loadingImg ? (
                      <img src="assets/image/box.gif" alt="loadimage" />
                    ) : (
                      "Confirm and Pay " +
                      Number(depositAmount).toFixed(0) +
                      " ATAI"
                    )}
                  </div>
                </div>
              </div>
            </MotionInView>
          </div>
          <div className="card-block">
            <MotionInView variants={varFadeInRight}>
              <div className="myinfo-title textalign">Withdraw</div>
              <div className="myinfo-content">
                <div className="myinfo-content-item">
                  <span>Remand Amount:</span>
                  <span>{props.auth.user.name}</span>
                </div>
                <div className="myinfo-content-item">
                  <span>Withdraw Amount:</span>
                  <div className="deposit-input-block">
                    <span>ATAI</span>
                    <input
                      type="number"
                      className="deposit-amount-input"
                      value={withdrawAmount}
                      min={0}
                      onChange={(e) => {
                        setWithdraw(e);
                      }}
                    />
                  </div>
                </div>
                <div className="myinfo-content-item">
                  <div className="myinfo-content-btn textalign">
                    Withdraw funs
                  </div>
                </div>
              </div>
            </MotionInView>
          </div>
        </div>
      </div>

      <div className="mygame">
        <div className="mygame-title textalign">My Games</div>
        <div className="mygame-submit textalign">
          <MotionInView variants={varFadeInRight}>
            <div className="mygame-submit-btn">
              <Link className="link-btn" to="/upload-game">
                Submit
              </Link>
            </div>
          </MotionInView>
        </div>
        <div className="mygame-list textalign">
          <MotionInView variants={varFadeInDown}>
            {gameItems.filter((glist) => {
              return glist.user_id === props.auth.user.id;
            }).length > 0 ? (
              gameItems
                .filter((glist) => {
                  return glist.user_id === props.auth.user.id;
                })
                .map((list, index) => (
                  <div className="mygame-list-item" key={index}>
                    <div className="mygame-list-image-item">
                      <img src={list.game_img_src} alt={list.game_img_src} />
                    </div>
                    <div className="mygame-list-item-back"></div>
                    <div className="mygame-list-item-hover">
                      <div className="mygame-list-item-title">{list.name}</div>
                      <div className="mygame-list-item-btns">
                        <div
                          className="mygame-list-item-btn"
                          onClick={() => delGameItem(list._id)}
                        >
                          <i className="fa fa-trash-o" />
                        </div>
                        <div className="mygame-list-item-btn">
                          <Link to={`/upload-game/${list._id}`}>
                            <i className="fa fa-eye" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div>No Games</div>
            )}
          </MotionInView>
        </div>
      </div>
    </div>
  );
}

MyPage.propTypes = {
  auth: PropTypes.object.isRequired,
  gamelist: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  gamelist: state.gamelist,
});

export default connect(mapStateToProps, { delGameItem, saveDepositAmount })(
  withRouter(MyPage)
);
