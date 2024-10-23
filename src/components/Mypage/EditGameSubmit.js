import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MotionInView } from "../../animate";
import { varFadeInRight } from "../../animate";
import NotificationManager from "react-notifications/lib/NotificationManager";

function EditGameSubmit(props) {
  const [gid, setGId] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frontendurl, setFrontendurl] = useState("");
  const [backendurl, setBackendurl] = useState("");

  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
      NotificationManager.error("Please Log In", "", 3000);
    } else {
      props.gamelist.gamelist
        .filter((glist) => {
          return glist._id === props.match.params.g_id;
        }) // eslint-disable-next-line
        .map((list) => {
          setGId(list._id);
          setName(list.name);
          setDescription(list.description);
          setFrontendurl(list.frontendurl);
          setBackendurl(list.backendurl);
          setImageurl(list.game_img_src);
        });
    }
  });

  return (
    <MotionInView variants={varFadeInRight}>
      <div className="gamesubmit">
        <div className="gamesubmit-title-block textalign">
          <div>
            <Link to="/mypage">
              <i className="fa fa-mail-reply" />
            </Link>
          </div>
          View Game
          <div></div>
        </div>
        <div className="gamesubmit-card-block">
          <div className="gamesub-upload-block">
            <div className="gamesub-upload-preview">
              <img alt="Avatar" src={imageurl} />
            </div>
          </div>
          <div className="gamesub-content-block">
            <div className="gamesub-content-block-item">
              <span className="gamesub-content-block-item-one">Game ID</span>
              <span className="gamesub-content-block-item-sec">{gid}</span>
            </div>
            <div className="gamesub-content-block-item">
              <span className="gamesub-content-block-item-one">Name</span>
              <span className="gamesub-content-block-item-sec">{name}</span>
            </div>
            <div className="gamesub-content-block-item">
              <span className="gamesub-content-block-item-one">
                Description
              </span>
              <span className="gamesub-content-block-item-sec">
                {description}
              </span>
            </div>
            <div className="gamesub-content-block-item">
              <span className="gamesub-content-block-item-one">
                Frontend URL
              </span>
              <span className="gamesub-content-block-item-sec">
                {frontendurl}
              </span>
            </div>
            <div className="gamesub-content-block-item">
              <span className="gamesub-content-block-item-one">
                Backend URL
              </span>
              <span className="gamesub-content-block-item-sec">
                {backendurl}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MotionInView>
  );
}

EditGameSubmit.propTypes = {
  auth: PropTypes.object.isRequired,
  gamelist: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  gamelist: state.gamelist,
});

export default connect(mapStateToProps, {})(withRouter(EditGameSubmit));
