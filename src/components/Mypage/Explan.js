import React from "react";
import { Link } from "react-router-dom";

function Explan(props) {
  return (
    <div className="docu-main">
      <div className="docu-title">Your game has been uploaded!</div>
      <br />
      <div>Game ID: a38s7c98797v0e87e979f</div>
      <br />
      <div>
        There are 3 APIs in this game.
        <br />
        To add the game you want to this platform, you need to follow the steps
        below. If it suits you, you can upload the game.
      </div>
      <br />
      <div className="docu-subtitle">
        1. http://casino.game.com/api/games/tokenAPI
      </div>
      <br />
      <div className="docu-content">
        First you will see tokenAPI. This API is for your game to have the your
        account information of the platform. In other words, in order for you to
        play the game, you sign up for the game with the registered address of
        the platform. It is necessary for him. <br />
        Your Account information will be stored in the platform's
        sessionStorage.
      </div>
      <br />
      <div className="docu-content">
        <img
          src="http://192.168.113.155:3000/assets/documentation/sessionstorage.png"
          alt="sessionstorage"
        />
      </div>
      <br />
      <div className="docu-content">
        As you can see in the picture above, you can get token information from
        sessionStorage. <br />
        For the next tokenAPI check, you need to pass the token information and
        game ID in json format as parameters to the API. You can verify and
        check it with the following example.
      </div>
      <br />
      <div className="docu-content">
        <img
          src="http://192.168.113.155:3000/assets/documentation/tokenapi.png"
          alt="tokenapi"
        />
      </div>
      <br />
      <div className="docu-content">
        As you can see in the figure above, you will get a respond value when
        you have completed the request for the API. Here the real_flag value is
        that your request was successful, and the balance value is your money
        amount that is stayed on this game site. You can play the game with this
        amount.
      </div>
      <br />
      <div className="docu-subtitle">
        2. http://casino.game.com/api/games/gamestatus
      </div>
      <br />
      <div className="docu-content">
        This API is an API that you must send when you start BET. This API
        request value has three parameters. <br />
        One is your token information playing this game and the other is this
        game ID.
        <br />
        It is BET amount when you start the game as the last parameter. Please
        refer to the following figure.
      </div>
      <br />
      <div className="docu-content">
        <img
          src="http://192.168.113.155:3000/assets/documentation/gamestatus.png"
          alt="gamestatus"
        />
      </div>
      <br />
      <div className="docu-content">
        Looks like this shown in the figure above, if you send this API request,
        you will receive an ID value. This is an identification ID that stores
        all the information that happens when you start this game every time you
        start this game every time. This value must be kept. You must keep this
        value and send your game information to this ID at the end of
        entertainment.
      </div>
      <br />
      <div className="docu-subtitle">
        3. http://casino.game.com/api/games/winlose
      </div>
      <br />
      <div className="docu-content">
        Finally you have to send this API request to tell you that the game is
        over. This API has five parameters.
        <br />
        (Your token information, Game ID, money obtained from the game, Win or
        Lose Information, ID received from the above API)
        <br />
        Where Win OR Lose information must be a BOOL type.
        <br /> (True // Win, false // Lose)
        <br />
        You can confirm the following figure for quick reference.
      </div>
      <br />
      <div className="docu-content">
        <img
          src="http://192.168.113.155:3000/assets/documentation/gamewinlose.png"
          alt="gamestatus"
        />
      </div>
      <br />
      <div className="docu-content">
        If there is a question on the above, or if you have any contents, please
        link it{" "}
        <Link to="/">
          <span>here</span>
        </Link>
        .
      </div>
    </div>
  );
}

export default Explan;
