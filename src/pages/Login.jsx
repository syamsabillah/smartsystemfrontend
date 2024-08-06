import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../assets/Picture1.png";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FaExclamationCircle } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
// import Auth from "../utils/auth";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  // if (Auth.loggedIn()) return <Navigate to="/lessons" />;

  const url = "http://localhost:5022";

  const [showPassword, setShowPassword] = useState(false); // state for toggling password visibility
  const [login, { loading, error }] = useMutation(LOGIN); // use the useMutation hook to execute the LOGIN mutation
  const [errorMessage, setErrorMessage] = useState(""); // state for displaying error message

  // InputField Define
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log("formData ", formData);

  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();

    try {
      // Sesuaikan endpoint
      const response = await axios.post(url + "/loginpage", formData);

      console.log(response);
      if (response.status === 200) {
        navigate("/lessons");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      id="login"
      className="w-full min-h-[calc(100vh-72px)] py-14 flex justify-center hero-bg"
    >
      {/* Log In Form */}
      <form onSubmit={Auth} className="form-container-style">
        <img
          src={logo}
          alt="Sakura Study Logo"
          className="w-12 h-12 mx-auto mb-2"
        />
        <h1 className="text-2xl font-bold mb-6 text-center">Log in</h1>
        {/* Fields Container */}
        <div className="w-full flex flex-col gap-4">
          {/* Email Field Wrapper*/}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              className="form-input-style px-3 py-2"
              type="email"
              value={formData.email}
              name="email"
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Password Field Wrapper */}
          <div className="flex flex-col gap-1">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="password-input"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                required
              />
              {/* Show password button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-show-btn"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mt-6 inline-flex items-center text-sm sm:text-base">
            <FaExclamationCircle className="mr-1" />
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          className="w-full mt-6 py-3 px-6 bg-primary hover:bg-primary-shade text-white font-bold rounded-xl"
          type="submit"
        >
          {loading ? (
            <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" />
          ) : (
            "Log in"
          )}
        </button>
        {/* Sign Up Link */}
        {/* <p className="mt-6 text-gray-500 dark:text-gray-400 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold text-red-500 hover:text-primary-shade hover:underline">
            Sign up
          </Link>
        </p> */}
      </form>
    </section>
  );
};

export default Login;
