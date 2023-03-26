import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

  // const [admin, setAdmin] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fecthAllAdmin();
  }, []);

  const fecthAllAdmin = async () => {
    try {
      const res = await axios.get("https://charming-goat-flannel-nightgown.cyclic.app/admin");
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

  const [admin, setAdmin] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("https://charming-goat-flannel-nightgown.cyclic.app/updateadmin/"+admin.id, admin);
      navigate("/adminprofile");
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

  // const profilesAuth = (data, email) => {
  //   console.log(email.email);
  //   if (data) {
  //     data.map((item) => {
  //       if (item.email == email.email) {
  //         setAdminAuth(item);
  //         //   console.log(email);
  //         //   console.log(item);
  //       }
  //     });
  //   }
  // };
  // console.log(adminAuth);

  const [adminAuth, setAdminAuth] = useState({});
  const profilesAuth = (data, email) => {
    console.log(email.email);
    if (data) {
      data.map((item) => {
        if (item.email == email.email) {
          setAdmin(item);
          //   console.log(email);
          //   console.log(item);
        }
      });
    }
  };
  console.log(admin);

  const savedTime = admin.created_at;
  const formatedDate = new Date(savedTime).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

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
              <div className="col-xl-7 col-lg-8 col-md-9 col-sm-12 ml-auto d-flex align-items-center text-truncate">
                <div className="text-black">
                  <small>Admin ID : {admin.id}</small>
                  <h2>{admin.username}</h2>
                  <h5>{admin.fname} {admin.lname}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-header bg-white p-3">
              <div className="row text-black">
                <div className="col-xl-6 col-md-12 text-start">
                  <h5 className="pb-0 mb-0">General Infomation</h5>
                </div>
                <div className="col-xl-6 col-md-12 text-end">
                  <span className="pb-0 mb-0">Created : {formatedDate}</span>
                </div>
              </div>
              
            </div>
            <div className="card-body text-black">
            <Form>
              <Row className="mb-3">
                <Col lg={6} md={12} sm={12}>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label className="label mt-2">
                      Username <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      onChange={handleChange}
                      placeholder="johndoe123"
                      value={admin.username}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="label mt-2">
                      Password <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="xxxxxxxx"
                      onChange={handleChange}               
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={6} md={12} sm={12}>
                  <Form.Group controlId="formBasicFirstname">
                    <Form.Label className="label mt-2">
                      First name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      onChange={handleChange}
                      value={admin.fname}
                      placeholder="John"                     
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <Form.Group controlId="formBasicLastname">
                    <Form.Label className="label mt-2">
                      Last name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      onChange={handleChange}
                      value={admin.lname}
                      placeholder="Doe"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={12} md={12} sm={12}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="label mt-2">
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="example@gmail.com"
                      value={admin.email}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button onClick={handleSubmit}>Update</Button>
            </Form>
            </div>
          </div>
        </Box>
      </main>
    </div>
  );
}
export default AdminProfile;
