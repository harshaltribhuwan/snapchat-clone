import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./components/WebcamCapture";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import { login, logout, selectUser } from "./features/appSlice";
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  });
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
              alt=""
            />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                  <Route path="/preview">
                    <Preview />
                  </Route>
                  <Route path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/chat/view">
                    <ChatView />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
