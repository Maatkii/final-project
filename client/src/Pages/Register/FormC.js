import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const FormC = () => {
  return (
    <div className="register-client">
      <h2>Sign up to find work you love</h2>
      <div className="container d-flex justify-content-center">
        <div className="row form-register">
          <div className="col-lg-6">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                First Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="first Name"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Last Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="your Email"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Password (8 or more characters)"
              />
            </div>
          </div>
          <button
            type="button"
            className="air3-btn air3-btn-primary air3-btn-block-sm"
          >
            Create my account
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
