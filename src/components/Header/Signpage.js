import React, { Component } from "react";
import { Box, Container, Tab, Tabs } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import LoginTab from "./LoginTab";
import SignUpTab from "./SignUpTab";

const AntTabs = withStyles({
  root: {
    borderBottom: "2px solid rgb(60, 63, 66)",
  },
  indicator: {
    height: "2px",
    backgroundColor: "var(--block_clr)",
  },
  flexContainer: {
    justifyContent: "center",
  },
})(Tabs);

const AntTab = withStyles({
  root: {
    textTransform: "none",
    minWidth: "50px",
  },
  wrapper: {
    color: "white",
    fontSize: "15px !important",
    "&:focus": {
      color: "var(--block_clr)",
    },
    "&:hover": {
      color: "var(--block_clr)",
    },
  },
  selected: {
    "& > span": {
      color: "var(--block_clr)",
    },
  },
})((props) => <Tab disableRipple {...props} />);

class Signpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isLog: true,
      isReg: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tabValue === 0) {
      this.setState({
        value: nextProps.tabValue,
        isLog: true,
        isReg: false,
      });
    } else {
      this.setState({
        value: nextProps.tabValue,
        isLog: false,
        isReg: true,
      });
    }
  }

  handleTabs = (event, newValue) => {
    if (newValue === 0) {
      this.setState({
        value: newValue,
        isLog: true,
        isReg: false,
      });
    } else {
      this.setState({
        value: newValue,
        isLog: false,
        isReg: true,
      });
    }
  };

  render() {
    return (
      <Box className="signpagebox">
        <div
          id="sign-dialog-close-btn"
          className="sign-dialog-close-btn"
          onClick={this.props.handlemodalclose}
        >
          <i className="fa fa-close"></i>
        </div>
        <Container maxWidth="xs" className="signpagecontainer">
          <div className="sign-logo">
            <Link to="/">
              <img
                className="sign-logo-img"
                src="assets/image/logo.png"
                alt="logo"
              ></img>
            </Link>
          </div>
          <AntTabs
            value={this.state.value}
            onChange={this.handleTabs}
            aria-label="signpageTab"
          >
            <AntTab label="Log In" />
            <AntTab label="Sign Up" />
          </AntTabs>
          {this.state.value === 0 ? (
            <LoginTab handlemodalclose={this.props.handlemodalclose} />
          ) : (
            <SignUpTab handlemodalclose={this.props.handlemodalclose} />
          )}
          {this.state.isLog ? (
            <div className="sign-reg-here">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  this.setState({
                    value: 1,
                    isLog: false,
                    isReg: true,
                  });
                }}
              >
                Register Here
              </span>
            </div>
          ) : (
            <></>
          )}
          {this.state.isReg ? (
            <div className="sign-reg-here">
              Already have an account?{" "}
              <span
                onClick={() => {
                  this.setState({
                    value: 0,
                    isLog: true,
                    isReg: false,
                  });
                }}
              >
                Login here
              </span>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Box>
    );
  }
}

export default Signpage;
