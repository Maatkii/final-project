import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from "react";
import { errorToast } from "../../utils";
import { useSelector } from "react-redux";
const FormC = ({ registredUser, setRegistredUser, handleSubmit }) => {
  const { loading, error } = useSelector((state) => state.LoginReducer);
  useEffect(() => {
    errorToast(error);
  }, [error]);
  const handleChange = (e) => {
    setRegistredUser({ ...registredUser, [e.target.name]: e.target.value });
  };
  return (
    <div className="register-client">
      <h2>Sign up to find work you love</h2>
      <div className="container d-flex justify-content-center">
        <div className="row form-register">
          <div className="col-lg-6">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="first Name"
                name="firstName"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="your Email"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Phone
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="your Phone Number"
                name="phoneNumber"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Password (8 or more characters)"
                name="password"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="button"
            className="air3-btn air3-btn-primary air3-btn-block-sm"
            onClick={handleSubmit}
          >
            {loading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : (
              "Create my account"
            )}
          </button>
          <p className="text-center text-body mt-4x mb-6x">
            Already have an account ?
            <Link to="/Login" className="up-n-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormC;
