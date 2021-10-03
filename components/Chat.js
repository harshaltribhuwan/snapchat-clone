import { Avatar } from "@material-ui/core";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { selectImage } from "../features/appSlice";
// import { selectUser } from "../features/appSlice";
import { db } from "../firebase";
import "./Chat.css";

const Chat = ({ id, username, imageUrl, profilePic, timestamp, read }) => {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/chat/view");
    }
  };
  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>

      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </div>
  );
};

export default Chat;
