import React from "react";
import Main from "./Main/Main";
import Menu from "./Menu/Menu";
import Chat from "./Chat/Chat";
import "./allgame.css";

function Allgames(props) {
  return (
    <div className="allgame">
      <Menu />
      <Main />
      <Chat />
    </div>
  );
}

export default Allgames;
