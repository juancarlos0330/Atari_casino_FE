import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import MenuIcon from "./MenuIcon";
import ChatIcon from "./ChatIcon";
import MainBackImg from "./MainBackImg";
import FirstDash from "./FirstDash";
import MyPage from "../Mypage/MyPage";
import GameSubmit from "../Mypage/GameSubmit";
import EditGameSubmit from "../Mypage/EditGameSubmit";
import PageNotFound from "../Error/PageNotFound";

import "./main.css";

class Main extends Component {
  showBtn = () => {
    document.querySelector("#menu").setAttribute("style", "left: 0px");
    document.querySelector("#menushow").setAttribute("style", "display: none;");
    document.querySelector("#main").setAttribute("style", "opacity: 0.3;");
  };

  chatshowBtn = () => {
    document.querySelector("#chat").setAttribute("style", "right: 0px");
    document.querySelector("#chatshow").setAttribute("style", "display: none;");
    document.querySelector("#main").setAttribute("style", "opacity: 0.3;");
  };

  render() {
    return (
      <>
        <div className="main" id="main">
          <MenuIcon showBtn={this.showBtn} />
          <MainBackImg />
          <Switch>
            <Route path="/" exact component={FirstDash} />
            <Route path="/mypage" exact component={MyPage} />
            <Route path="/upload-game" exact component={GameSubmit} />
            <Route path="/upload-game/:g_id" exact component={EditGameSubmit} />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
          <Footer />
          <ChatIcon chatshowBtn={this.chatshowBtn} />
        </div>
      </>
    );
  }
}

export default Main;
