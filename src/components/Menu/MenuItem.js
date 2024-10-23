import React from "react";
import { Link } from "react-router-dom";

function MenuItem(props) {
  return (
    <div
      className="m_list_item flex row"
      onClick={() => {
        props.closeBtn();
      }}
    >
      <Link to={props.to} className="link-btn">
        <i className="fa fa-user m_list_item_img" />
        {props.name}
      </Link>
    </div>
  );
}

export default MenuItem;
