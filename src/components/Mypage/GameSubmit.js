import React, { createRef, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Dialog, Slide } from "@material-ui/core";
import { connect } from "react-redux";
import { uploadDataSave } from "../../actions/mypageAction";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { MotionInView } from "../../animate";
import { varFadeInRight } from "../../animate";
import "./gamesubmit.css";
import "./gamesubmit_responsive.css";
import Explan from "./Explan";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GameSubmit = (props) => {
  useEffect(() => {
    if (!props.auth.isAuthenticated) {
      props.history.push("/");
      NotificationManager.error("Please Log In", "", 3000);
    }
  });

  const [image, _setImage] = useState(null);
  const [selectedFile, setSeletedFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frontendurl, setFrontendurl] = useState("");
  const [backendurl, setBackendurl] = useState("");
  const [imgSelectStatus, setImgSelectStatus] = useState(true);
  const [isDocuModalShow, setDocuModalShow] = useState(false);
  const [loadingbtn, setLoadingbtn] = useState(false);

  const nameInput = useRef(null);
  const descriptionInput = useRef(null);
  const frontendurlInput = useRef(null);
  const backendurlInput = useRef(null);

  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const onImgUpload = () => {
    if (name.trim() === "") {
      nameInput.current.focus();
    } else if (description.trim() === "") {
      descriptionInput.current.focus();
    } else if (frontendurl.trim() === "") {
      frontendurlInput.current.focus();
    } else if (backendurl.trim() === "") {
      backendurlInput.current.focus();
    } else if (selectedFile === null) {
      setImgSelectStatus(false);
    } else {
      setLoadingbtn(true);
      const formData = new FormData();
      formData.append("uploadfile", selectedFile);
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("frontendurl", frontendurl.trim());
      formData.append("backendurl", backendurl.trim());
      formData.append("u_id", props.auth.user.id);
      props.uploadDataSave(formData);
      setName("");
      setDescription("");
      setFrontendurl("");
      setBackendurl("");
      _setImage(null);
      setSeletedFile(null);
      cleanup();
      setLoadingbtn(false);
      setDocuModalShow(true);
    }
  };

  const handlemodalclose = () => {
    setDocuModalShow(false);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      setSeletedFile(newImage);
      setImgSelectStatus(true);
    }
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
      setSeletedFile(null);
    }
  };

  return (
    <MotionInView variants={varFadeInRight}>
      <div className="gamesubmit">
        <div className="gamesubmit-title-block textalign">
          <div>
            <Link to="/mypage">
              <i className="fa fa-mail-reply" />
            </Link>
          </div>
          Game Submit
          <div></div>
        </div>
        <div className="gamesubmit-card-block">
          <div className="gamesub-upload-block">
            <div
              className={
                "gamesub-upload-preview " +
                (image
                  ? ""
                  : "borderblockclr " +
                    (imgSelectStatus ? "" : "bordererrclr "))
              }
            >
              {image ? (
                <img
                  alt="Avatar"
                  src={image || "assets/image/atari_mark.png"}
                />
              ) : (
                <>
                  <i className="fa fa-cloud-upload" />
                  No file chosen, yet!
                </>
              )}
            </div>
            <input
              ref={inputFileRef}
              accept="image/*"
              hidden
              id="game-coverimage-upload"
              type="file"
              onChange={handleOnChange}
            />
            <label
              htmlFor="game-coverimage-upload"
              className="game-cover-btn-block"
            >
              <div className="game-cover-btn upper" onClick={handleClick}>
                {image ? (
                  <i className="fa fa-trash-o" />
                ) : (
                  <i className="fa fa-cloud-upload" />
                )}
                {image ? "Clear" : "Upload"}
              </div>
            </label>
          </div>
          <div className="gamesub-content-block">
            <div className="gamesub-content-block-item">
              <span>
                Name <span style={{ color: "var(--block_clr)" }}>*</span>
              </span>
              <input
                required
                ref={nameInput}
                className="gamesub-content-block-input"
                type="text"
                placeholder="Game name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="gamesub-content-block-item">
              <span>
                Description <span style={{ color: "var(--block_clr)" }}>*</span>
              </span>
              <textarea
                required
                ref={descriptionInput}
                className="gamesub-content-block-input"
                placeholder="Description"
                rows={5}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="gamesub-content-block-item">
              <span>
                Frontend URL{" "}
                <span style={{ color: "var(--block_clr)" }}>*</span>
              </span>
              <input
                required
                ref={frontendurlInput}
                className="gamesub-content-block-input"
                type="url"
                placeholder="Frontend URL"
                value={frontendurl}
                onChange={(e) => setFrontendurl(e.target.value)}
              />
            </div>
            <div className="gamesub-content-block-item">
              <span>Backend URL</span>
              <input
                required
                ref={backendurlInput}
                className="gamesub-content-block-input"
                type="url"
                placeholder="Backend URL"
                value={backendurl}
                onChange={(e) => setBackendurl(e.target.value)}
              />
            </div>
            <div className="gamesub-content-block-item">
              <button
                type="submit"
                className="gamesub-content-submit-btn upper"
                onClick={() => onImgUpload()}
              >
                {loadingbtn ? (
                  <img src="assets/image/box.gif" alt="loadimage" />
                ) : (
                  "submit"
                )}
              </button>
            </div>
          </div>
        </div>
        <Dialog
          className="docudialog"
          open={isDocuModalShow}
          TransitionComponent={Transition}
          keepMounted
          onClose={handlemodalclose}
        >
          <Explan />
        </Dialog>
      </div>
    </MotionInView>
  );
};

GameSubmit.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadDataSave })(
  withRouter(GameSubmit)
);
