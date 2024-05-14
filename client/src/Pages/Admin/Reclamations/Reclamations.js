import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_admin_reclamations } from "../../../redux/actions/adminAction";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, url } from "../../../utils";
import axios from "axios";
import { add_Chat, add_selectedChat } from "../../../redux/actions/chatActions";

const Reclamations = () => {
  const { reclamations } = useSelector((state) => state.adminReducer);
  const { chats } = useSelector((state) => state.ChatReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(get_admin_reclamations());
  }, []);
  const accessChat = async (userId) => {
    try {
      const config = {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      };
      const { data } = await axios.post(
        `${url}/api/v1/chat`,
        {
          userId,
        },
        config
      );
      if (!chats.find((c) => c._id === data._id))
        dispatch(add_Chat([data, ...chats]));
      dispatch(add_selectedChat(data));
      navigate("/messages");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div>
      <div class="col-xl-12 col-md-12">
        <div class="section-headline margin-bottom-30">
          <h4>Reclamations</h4>
        </div>
        <table class="basic-table">
          <tbody>
            <tr>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>description</th>
              <th>Account Type</th>
              <th>Contact</th>
            </tr>

            {reclamations?.map((el, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={el.user.avatar} alt="" className="user-avatar" />
                  </td>
                  <td>
                    {el.user.firstName}
                    {el.user.lastName}
                  </td>
                  <td>{el.description}</td>
                  <td>{el.user.role}</td>
                  <td>
                    <button onClick={() => accessChat(el.user._id)}>
                      contact
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reclamations;
