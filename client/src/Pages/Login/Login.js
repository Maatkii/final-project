import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions/Actions";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "../../utils";
const Login = () => {
  const navigate = useNavigate();
  const { loading, isAuth, role, error } = useSelector(
    (state) => state.LoginReducer
  );
  useEffect(() => {
    setTimeout(() => {
      /* eslint-disable-next-line*/
      if (isAuth && role == 1) {
        navigate("/dashboard-instructor");
        /* eslint-disable-next-line*/
      } else if (isAuth && role == 2) {
        navigate("/dashboard-student");
      }
    }, 2000);
    /* eslint-disable-next-line*/
  }, [isAuth]);

  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = (e) => {
    if (!loginDetails.email.includes("@")) {
      errorToast("Email Not Valid");
    }
    e.preventDefault();
    dispatch(login(loginDetails));
  };

  useEffect(() => {
    errorToast(error);
  }, [error]);

  return (
    <>
      <h4>Put Your login Page Code Here</h4>
    </>
  );
};

export default Login;
