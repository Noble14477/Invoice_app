import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Loader from "../../components/Loader";
import { ErrorMessage, SuccessMessage } from "../../components/PopupMessage";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitUserInfo = async (e) => {
    e.preventDefault();

    // console.log(userInfo);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
      setSuccess("Login successful!");
      const user = JSON.stringify(userInfo);
      localStorage.setItem("user", user);
      setLoading(false);
      setUserInfo({
        email: "",
        password: "",
      });
      navigate("/invoice");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed!");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      {success && <SuccessMessage message={success} />}
      {error && <ErrorMessage message={error} />}
      <div className="flex flex-col justify-center items-center w-full h-[90vh]">
        <form
          action=""
          className="shadow-xl py-20 px-8 w-[80%] md:w-[60%] lg:w-[30%] rounded-lg bg-white"
          onSubmit={submitUserInfo}
        >
          <h1 className="text-3xl text-center font-bold pb-4">Login</h1>
          {/* <p className="text-center">Fill the form below to get started</p> */}
          <div className="input-group">
            <input
              onChange={handleChange}
              placeholder="Email"
              id="email"
              value={userInfo.email}
              type="text"
              name="email"
              className="border border-[#9e9e9e] rounded-xl w-full p-3 text-sm text-dark"
            />
            <label className="user-label" htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              onChange={handleChange}
              id="password"
              placeholder="Password"
              value={userInfo.password}
              type="password"
              name="password"
              className="border border-[#9e9e9e] rounded-xl w-full p-3 text-sm text-dark"
            />
            <label className="user-label" htmlFor="password">Password</label>
          </div>

          <div className="float-right py-4">
            {" "}
            <Link to="/forgot-password" className="text-primary font-semibold ">
              Forgot password?.
            </Link>
          </div>
          <button type="submit" className="bg-primary w-full mt-7 text-sm flex justify-center items-center gap-4 py-2 rounded-md text-white text-md">
            Submit
            <svg
              fill="white"
              viewBox="0 0 448 512"
              height="1em"
              className="arrow"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
            </svg>
          </button>

          <p className=" flex justify-between items-center mt-4 gap-4 ">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-lg text-primary font-semibold "
            >
              Register.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
