import React, { useEffect, useState } from "react";
import { Box, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";
// import { NotificationManager } from "react-notifications";

function LoginTab(props) {
  const wallet = useWallet();

  const [status, setStatus] = useState({
    msg: "Welcome to a ATARI casino",
    sig: "",
    address: "",
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.handlemodalclose();
    }
    // eslint-disable-next-line
  }, [props.auth.isAuthenticated]);

  useEffect(() => {
    if (wallet.status !== "connected") {
      wallet.reset();
    } // eslint-disable-next-line
  }, [wallet.status]);

  useEffect(() => {
    if (wallet.status === "connected") {
      getAddressfromSignHash();
    } // eslint-disable-next-line
  }, [status.sig]);

  const connect_wallet = async () => {
    await getSignature();
  };

  const getSignature = async () => {
    if (wallet.status === "connected") {
      try {
        const provider = new ethers.providers.Web3Provider(wallet.ethereum);
        const signer = await provider.getSigner();
        const signature = await signer.signMessage(status.msg);
        await setStatus({ ...status, sig: signature });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getAddressfromSignHash = async () => {
    try {
      const actualAddress = await ethers.utils.verifyMessage(
        status.msg,
        status.sig
      );
      await setStatus({ ...status, address: actualAddress });
      const loginData = await {
        msg: status.msg,
        sig: status.sig,
        address: actualAddress,
      };
      await props.loginUser(loginData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      {wallet.status === "connected" ? (
        <Button
          className="login-enable-btn"
          color="primary"
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={() => connect_wallet()}
        >
          sign in
        </Button>
      ) : (
        <Button
          className="login-enable-btn"
          color="primary"
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={() => wallet.connect()}
        >
          connect
        </Button>
      )}
    </Box>
  );
}

LoginTab.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginTab));
