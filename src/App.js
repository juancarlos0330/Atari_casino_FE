import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  setCurrentUser,
  logoutUser,
  getUserGamelist,
} from "./actions/authAction";
import { user_connections } from "./actions/userconnectAction";
import store from "./store";
import Allgames from "./components/Allgames";
import socketIOClient from "socket.io-client";
import { UseWalletProvider } from "use-wallet";
import LoadingScreen from "react-loading-screen";

import "react-notifications/lib/notifications.css";
const SERVER = require("./config/config").GAMESERVERURI;
const socket = socketIOClient(SERVER);
socket.on("users-connects", (usercon) => {
  store.dispatch(user_connections(usercon));
});
// Check for token
if (sessionStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(sessionStorage.jwtToken);

  // Decode token and get user info and exp
  const decoded = jwt_decode(sessionStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Get user gamelist
  store.dispatch(getUserGamelist());

  socket.emit("user-connected", { id: decoded.id });

  socket.on("user-connect", (usercon) => {
    store.dispatch(user_connections(usercon));
  });

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  }

  render() {
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor="var(--menu_backclr)"
        spinnerColor="red"
        textColor="var(--block_clr)"
        text="Loading..."
        logoSrc="assets/image/bfg_back_img.png"
      >
        <UseWalletProvider
          chainId={1337}
          connectors={{ portis: { dAppId: "login" } }}
        >
          <Provider store={store}>
            <Router>
              <Switch>
                <Allgames />
              </Switch>
            </Router>
            <NotificationContainer />
          </Provider>
        </UseWalletProvider>
      </LoadingScreen>
    );
  }
}

export default App;
