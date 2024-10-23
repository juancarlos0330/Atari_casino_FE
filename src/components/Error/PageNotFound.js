import React from "react";
import "./pagenotfound.css";
import "./pagenotfound_responsive.css";

function PageNotFound(props) {
  return (
    <div className="pagenotfound">
      <div className="page-img">
        <img src="assets/image/404page.gif" alt="404pageimage" />
      </div>
      <div className="page-content">
        <h2>Oops! Page not found.</h2>
        <h1>404</h1>
        <p>We can't find the page you're looking for</p>
        <a className="link-btn upper" href="/">
          Go Back HOME
        </a>
      </div>
    </div>
  );
}

export default PageNotFound;
