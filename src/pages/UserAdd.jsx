import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { Box, TextField, useTheme, Link } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserAdd = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [user, setUser] = useState({
    title: "",
    fname: "",
    lname: "",
    age: "",
    phone: "",
    email: "",
    jobtitle: "",
    company: "",
    description: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://charming-goat-flannel-nightgown.cyclic.app/useradd2", user);
      navigate("/userinfomation");
      MySwal.fire({
        html: <i>User has been added successfully!</i>,
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (err) {
        MySwal.fire({
        html: <i>Fail to add User!</i>,
        icon: "error",
        })
    }
  };

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <div className="row my-4">
            <div className="col-lg-6 col-md-12">
              <h1>Registration</h1>
            </div>
            <div className="col-lg-6 col-md-12 right-button-header right-button-import">
              <button
                className="border-0 bg-transparent"
                style={{ color: colors.grey[100] }}
              >
                <FileDownloadIcon style={{ width: "28px", height: "28px" }} />{" "}
                Import User
              </button>
            </div>
          </div>

          <div className="card border-0 shadow-sm p-4">
            <Form className="form-bg-white" onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col lg={2} md={12} sm={12}>
                  <Form.Group controlId="formBasicTitle">
                    <Form.Label
                      className="label mt-2"
                      style={{ color: "#000" }}
                    >
                      Title <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select 
                      name="title" 
                      onChange={handleChange}
                      required
                      >
                      <option>Choose Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={5} md={12} sm={12}>
                  <Form.Group controlId="formBasicFirstname">
                    <Form.Label
                      className="label mt-2"
                      style={{ color: "#000" }}
                    >
                      First name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="fname"
                      onChange={handleChange}
                      className="w-100"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={5} md={12} sm={12}>
                  <Form.Group controlId="formBasicLastname">
                    <Form.Label
                      className="label mt-2"
                      style={{ color: "#000" }}
                    >
                      Last Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lname"
                      onChange={handleChange}
                      className="w-100"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col lg={4} md={12} sm={12}>
                  <Form.Group
                    controlId="formBasicAge"
                    style={{ color: "#000" }}
                  >
                    <Form.Label className="label mt-2">Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      onChange={handleChange}
                      className="w-100"
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  <Form.Group controlId="formBasicPhone">
                    <Form.Label
                      className="label mt-2"
                      style={{ color: "#000" }}
                    >
                      Phone <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      className="w-100"
                      maxLength={10}
                      minLength={10}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={12} sm={12}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label
                      className="label mt-2"
                      style={{ color: "#000" }}
                    >
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="w-100"
                      required
                    />
                  </Form.Group>
                </Col>
                
              </Row>

              <Row className="mb-3">
                <Col lg={6} md={12} sm={12}>
                  <Form.Group
                    controlId="formBasicJobTitle"
                    style={{ color: "#000" }}
                  >
                    <Form.Label className="label mt-2">
                      Job Title <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="jobtitle"
                      onChange={handleChange}
                      className="w-100"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <Form.Group
                    controlId="formBasicCompany"
                    style={{ color: "#000" }}
                  >
                    <Form.Label className="label mt-2">
                      Company <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      onChange={handleChange}
                      className="w-100"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group controlId="formBasicTitle">
                    <Form.Label
                      className="label mt-2"
                      style={{ color: "#000" }}
                    >
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={8}
                      name="description"
                      onChange={handleChange}
                      className="w-100"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="submit-right">
                <Link href="./QrcodeGenetor">
                  <Button
                    style={{
                      backgroundColor: colors.blueAccent[600],
                      border: 0,
                    }}
                    type="submit"
                    className="px-5 py-2 mt-5"
                  >
                    Submit
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </Box>
      </main>
    </div>
  );
};

export default UserAdd;
