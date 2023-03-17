import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import '../assets/css/login.css';
import spaLogo from "../assets/img/logo-black.png";


function Login() {
  const MySwal = withReactContent(Swal)
  const CurrYear = new Date().getFullYear();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
        username: data.get('username'),
        password: data.get('password'),
    }
    fetch("http://localhost:3333/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.status === 'ok') {
                localStorage.setItem('token', data.token);
                MySwal.fire({
                  html: <i>Login Success!</i>,
                  icon: "success",
                }).then((value) => {
                  window.location = "/dashboard"
                });
            } else {
              MySwal.fire({
                html: <i>Error, Username or Password is wrong!</i>,
                icon: "error",
                })
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  };


  return (
    <body className="signin-body">
    <div className='container'>
      <div className='signin-form align-items-center justify-content-center'>
        <div className="bg-white rounded">
          <form onSubmit={handleSubmit}>
            <div className="text-center align-center">
              <img src={spaLogo} alt="The SuperAppIOT Logo" width={270} />
              <h4 className="mb-4 mt-3">Login</h4>
            </div>
            <div className="form-group">
              <input className="form-control" type="text" name="username" placeholder="Username" />
              
            </div>
            <div className="form-group mt-3">
              <input className="form-control" type="password" name="password" placeholder="Password" />
             
            </div>
            <div className="form-group mt-2">
              <label className="form-check-label">
                <input type="checkbox" className="form-check-input" />
                &nbsp; Remember me
              </label>
            </div>
            <div className="justify-content-center text-center w-100 mt-5">
              <input className="btn btn-primary px-4" type="submit" value="Login" />
              
            </div>
          </form>
        </div>
      </div> 
      <div id="copy-right">
      © Copyright Metro Systems Corporation Plc {CurrYear}. 
    </div>  
    </div>
    </body>
  )
}

export default Login