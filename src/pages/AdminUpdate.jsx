import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import axios from "axios";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function AdminUpdate() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const location = useLocation();
  
  const adminId = location.pathname.split("/")[2]
  const { id } = useParams();

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
      await axios.put("https://charming-goat-flannel-nightgown.cyclic.app/updateadmin/"+adminId, admin);
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

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://charming-goat-flannel-nightgown.cyclic.app/admin/${id}`);
      setAdmin(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="30px">
          <div className="row my-4">
            <div className="col-lg-6 col-md-12">
              <h1>Settings</h1>
              
            </div>
          </div>
          <div className="card border-0 shadow-sm p-4 w-100">
            <Form>
              <span className="h3 span-h1">Update Admin</span>
              <span className="span-user-id">User ID : {id}</span>
              <hr />
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
        </Box>
      </main>
    </div>
  )
}

export default AdminUpdate