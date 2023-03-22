import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AdminProfileAPI() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.status === "forbidden") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            navigate("/");
          });
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="30px">
          <div class="card border-0 shadow-sm">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Profile</h6>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-2 col-lg-3 col-md-12 mb-4 text-center">
                  <img
                    class="img-profile rounded-circle"
                    src={user.avatar}
                    width="70%"
                  />
                </div>
                <div class="col-xl-10 col-lg-9 col-md-12 my-auto">
                  <div class="text-primary profile-username">
                    <span class="h4 text-uppercase mr-2">{user.username}</span>
                  </div>
                  <div class="row ">
                    <div class="col-xl-6 col-md-6 col-sm-12">
                      <span class="mr-4">
                        <b>Email :</b> {user.email}
                      </span>
                    </div>
                  </div>
                  <hr class="sidebar-divider d-md-block" />
                  <div class="row ">
                    <div class="col-xl-2 col-md-6 col-sm-6 col-xs-12">
                      <p class="m-0  font-weight-bold"><b>User ID</b></p>
                      <p class="m-0 pb-3">{user.id}</p>
                    </div>
                    <div class="col-xl-4 col-md-6 col-sm-6 col-xs-12">
                      <p class="m-0 font-weight-bold"><b>Full Name</b></p>
                      <p class="m-0 pb-3">{user.fname} {user.lname}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card border-0 shadow-sm mt-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Generel Infomation</h6>
                </div>
                <div class="card-body">
                    <form class="user">
                        <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="">Username <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="username" value={user.username} required />
                            </div>
                            <div class="col-sm-6">
                                <label for="">Password <span class="text-danger">*</span></label>
                                <input type="password" class="form-control" name="password" value="" required />
                            </div>
                        </div>
                        <div class="form-group row my-4">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                                <label for="">First Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="fname" value={user.fname} required />
                            </div>
                            <div class="col-sm-6">
                                <label for="">Last Name <span class="text-danger">*</span></label>
                                <input type="text" class="form-control" name="lname" value={user.lname} required />
                            </div>
                        </div>
                        <div class="form-group row mt-4">
                            <div class="col-sm-12 mb-3 mb-sm-0">
                                <label for="">Email <span class="text-danger">*</span></label>
                                <input type="email" class="form-control" name="email" value={user.email} required />
                            </div>
                        </div>
                        <div class="mt-4">
                            <button type="submit" name="" class="btn btn-primary px-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </Box>
      </main>
    </div>
  );
}

export default AdminProfileAPI;
