import React from "react";

function MenuIcon(props) {
  return (
    <div
      id="menushow"
      className="menu-show"
      onClick={() => {
        props.showBtn();
      }}
    >
      <i className="fa fa-th-list" />
    </div>
  );
}

export default MenuIcon;
