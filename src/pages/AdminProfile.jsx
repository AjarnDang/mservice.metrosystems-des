import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

function AdminProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const MySwal = withReactContent(Swal);

  const [admin, setAdmin] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fecthAllAdmin();
  }, []);

  const fecthAllAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:3333/admin");
      setAdmin(res.data);
      await parseJwt(token);
      console.log(parseJwt(token));
      profilesAuth(res.data, parseJwt(token));
    } catch (err) {
      console.log(err);
    }
  };

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const [updateAdmin, setUpdateAdmin] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:3333/updateadmin/"+updateAdmin.id, updateAdmin);
      navigate("/adminsettings");
      MySwal.fire({
        html: <i>Admin has been updated successfully!</i>,
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (err) {
        MySwal.fire({
        html: <i>Fail to update Admin!</i>,
        icon: "error",
        })
    }
  };

  const [adminAuth, setAdminAuth] = useState({});
  const profilesAuth = (data, email) => {
    console.log(email.email);
    if (data) {
      data.map((item) => {
        if (item.email == email.email) {
          setUpdateAdmin(item);
          //   console.log(email);
          //   console.log(item);
        }
      });
    }
  };
  console.log(adminAuth);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="30px">
          <div className="card p-4 border-0 shadow-sm">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-12">
                <Avatar
                  src="/broken-image.jpg"
                  sx={{
                    backgroundColor: `${colors.blueAccent[300]} !important`,
                  }}
                  style={{
                    width: "170px",
                    height: "170px",
                  }}
                />
              </div>
              <div className="col-xl-7 col-lg-8 col-md-9 col-sm-12 ml-auto d-flex align-items-center">
                <div>
                  <h2>{adminAuth.username}</h2>
                  <h5>
                    {adminAuth.fname} {adminAuth.lname}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div class="card border-0 shadow-sm mt-4">
            <div class="card-header bg-white p-3">
              <h5 className="pb-0 mb-0">General Infomation</h5>
            </div>
            <div class="card-body">
              <form>
                <div className="form-group row">
                  <div className="col-md-6 col-sm-12">
                    <label class="form-label">Username</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="username" 
                      value={updateAdmin.username}
                      onChange={handleChange} 
                      />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label class="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      name="password" 
                      value="" 
                      onChange={handleChange}
                      />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-md-6 col-sm-12">
                    <label class="form-label">First name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="fname" 
                      value={updateAdmin.fname}
                      onChange={handleChange} 
                      />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label class="form-label">Last name</label>
                    <input 
                      type="lname" 
                      className="form-control" 
                      name="lname" 
                      value={updateAdmin.lname}
                      onChange={handleChange} 
                      />
                  </div>
                </div>
                <div className="form-group row mt-3">
                  <div className="col-12">
                    <label class="form-label">Email</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="fname" 
                      value={updateAdmin.email} 
                      onChange={handleChange}
                      />
                  </div>
                </div>
                <button 
                  onChange={handleSubmit} 
                  className="btn btn-primary mt-4 px-4"
                  >
                   Update
                  </button>
              </form>
            </div>
          </div>
        </Box>
      </main>
    </div>
  );
}
export default AdminProfile;
