import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

function LogoMenu(props) {
  const logOutPage = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  return (
    <div className="header-user-sign">
      {props.auth.isAuthenticated ? (
        <span className="header-user-sign-in" onClick={(e) => logOutPage(e)}>
          Log Out
        </span>
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
  );
}

LogoMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(LogoMenu));
