import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Box, Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import { withStyles } from "@material-ui/core/styles";
import { useWallet } from "use-wallet";
import { ethers } from "ethers";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "var(--block_clr)",
      fontSize: "15px !important",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "var(--block_clr)",
      fontSize: "15px !important",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
      fontSize: "15px !important",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "12px !important",
    },
    "& legend": {
      width: "fit-content !important",
    },
    "& legend > span": {
      fontSize: "10px !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "var(--menu_list_clr)",
        fontSize: "15px !important",
      },
      "&:hover fieldset": {
        borderColor: "var(--hover_clr)",
        fontSize: "15px !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--block_clr)",
        fontSize: "15px !important",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "var(--menu_list_clr)",
      fontSize: "15px !important",
      overflowWrap: "break-word",
    },
  },
})(TextField);

function SignUpTab(props) {
  const wallet = useWallet();

  const [status, setStatus] = useState({
    msg: "Welcome to a ATARI casino",
    sig: "",
    address: "",
  });

  const [signstatus, setSignstatus] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.handlemodalclose();
    } // eslint-disable-next-line
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

  const connect_wallet = async (signdata) => {
    await setSignstatus({ name: signdata.name, email: signdata.email });
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
      const regData = await {
        name: signstatus.name,
        email: signstatus.email,
        account: actualAddress,
      };
      await props.registerUser(regData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={{
        reg_username: "",
        reg_email: "",
      }}
      validationSchema={Yup.object().shape({
        reg_username: Yup.string().max(255).required("Useranme is required"),
        reg_email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (e) => {
        const signdata = {
          name: e.reg_username,
          email: e.reg_email,
        };
        connect_wallet(signdata);
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        isValid,
      }) => (
        <form onSubmit={handleSubmit}>
          <CssTextField
            error={Boolean(touched.reg_username && errors.reg_username)}
            fullWidth
            helperText={touched.reg_username && errors.reg_username}
            label="Username"
            margin="normal"
            name="reg_username"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.reg_username}
            variant="outlined"
          />
          <CssTextField
            error={Boolean(touched.reg_email && errors.reg_email)}
            fullWidth
            helperText={touched.reg_email && errors.reg_email}
            label="Email Address"
            margin="normal"
            name="reg_email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.reg_email}
            variant="outlined"
          />
          <Box sx={{ py: 2 }}>
            {wallet.status === "connected" ? (
              <Button
                className={!isValid ? "login-disable-btn" : "login-enable-btn"}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up
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
                wallet connect
              </Button>
            )}
          </Box>
        </form>
      )}
    </Formik>
  );
}

SignUpTab.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(SignUpTab)
);
