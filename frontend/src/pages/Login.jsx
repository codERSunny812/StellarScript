import { useState } from "react";
import logo from "../images/logos/StellarScript.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api_base_url } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    fetch(api_base_url + "/users/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("user", JSON.stringify(data));
          window.location.href = "/";
        } else {
          toast.error(data.msg);
        }
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <form
          onSubmit={submitForm}
          className="w-full max-w-[90vw] sm:max-w-[50vw] md:max-w-[30vw] lg:max-w-[25vw] flex flex-col items-center bg-[#0f0e0e] p-4 sm:p-6 rounded-lg shadow-xl shadow-black/50"
        >
          <img className="w-[200px] sm:w-[230px] object-cover" src={logo} alt="" />

          <div className="inputBox w-full mt-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="inputBox w-full mt-3">
            <input
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <p className="text-gray-400 text-[14px] mt-3 self-start">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-blue-500">
              Sign Up
            </Link>
          </p>

          <button className="w-full btnNormal mt-3 bg-blue-500 transition-all hover:bg-blue-600 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
