import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { calculateTimeSince, getSender, url } from "../../utils";
import {
  add_Chat,
  add_selectedChat,
  fetchChats,
} from "../../redux/actions/chatActions";
import { current } from "../../redux/actions/Actions";
import { Link } from "react-router-dom";
const MessageSideBar = ({ fetchAgain }) => {
  const { chats, selectedChat } = useSelector((state) => state.ChatReducer);
  const { user } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, []);
  useEffect(() => {
    dispatch(fetchChats());
  }, [user, fetchAgain]);

  useEffect(() => {
    if (chats.length > 0) {
      dispatch(add_selectedChat(chats[0]));
    }
  }, [chats]);

  return (
    <div>
      {/* Messages */}
      <div className="messages-inbox">
        <div className="messages-headline">
          <div className="input-with-icon">
            <input id="autocomplete-input" type="text" placeholder="Search" />
            <i className="fa-regular fa-search" />
          </div>
        </div>
        <ul>
          {chats?.length > 0 ? (
            chats.map((chat, index) => {
              return (
                // add className active-message for active discussion
                <li
                  className={
                    selectedChat?._id === chat._id ? "active-message" : ""
                  }
                  key={index}
                  onClick={() => dispatch(add_selectedChat(chat))}
                >
                  <Link to="#">
                    <div className="message-avatar">
                      <i className="status-icon status-offline" />
                      <img
                        src={
                          chat.users.find((el) => el._id !== user._id).avatar
                        }
                        alt=""
                      />
                    </div>
                    <div className="message-by">
                      <div className="message-by-headline">
                        <h5>{`${getSender(user, chat?.users).firstName} ${
                          getSender(user, chat?.users).lastName
                        } `}</h5>
                        <span>{calculateTimeSince(chat.updatedAt)}</span>
                      </div>
                      <p>{chat?.latestMessage?.message}</p>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <li>
              <a href="#">
                <div className="message-avatar">
                  <p>There's No Chat yet ! </p>
                </div>
              </a>
            </li>
          )}
        </ul>
      </div>
      {/* Messages / End */}
    </div>
  );
};

export default MessageSideBar;
