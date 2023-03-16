import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "../assets/css/login.css";
import spaLogo from "../assets/img/logo-black.png";

function LoginAPI() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
      expiresIn: 6000000,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            //token สำหรับยืนยันตัวตนว่าเข้าสู่ระบบแล้ว
            localStorage.setItem("token", result.accessToken);
            navigate("/dashboard");
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
    console.log(inputs);
  };
  return (
    <body className="signin-body">
      <div className="container">
        <div className="signin-form d-flex align-items-center justify-content-center">
          <div className="bg-white rounded">
            <form onSubmit={handleSubmit}>
              <div className="text-center align-center">
                <img src={spaLogo} alt="The SuperAppIOT Logo" width={270} />
                <h4 className="mb-4 mt-3">Login</h4>
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={inputs.username || ""}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
              <div className="form-group mt-3">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-group mt-2">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  &nbsp; Remember me
                </label>
              </div>
              <div className="justify-content-center text-center w-100 mt-5">
                <input
                  className="btn btn-primary px-4"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}

export default LoginAPI;
