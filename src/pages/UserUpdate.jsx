import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import axios from "axios";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const UserUpdate = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const location = useLocation();

  const userId = location.pathname.split("/")[2];
  const { id } = useParams();

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
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("https://charming-goat-flannel-nightgown.cyclic.app/usersupdate/" + userId, user);
      console.log(userId);
      navigate("/userinfomation");
      MySwal.fire({
        html: <i>Updated successfully!</i>,
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (err) {
      MySwal.fire({
        html: <i>Fail to Update!</i>,
        icon: "error",
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://charming-goat-flannel-nightgown.cyclic.app/users/${id}`);
      setUser(res.data.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let user_qrcode = "";
  let user_download = "";
  if (user.qrcode === "") {
    user_qrcode = (
      <div
        className="d-flex align-items-center justify-content-center bg-secondary rounded"
        style={{ height: "80px" }}
      >
        <div className="text-white text-center">
          This user has no QR Code. <br />
          you can delete and create new user.
        </div>
      </div>
    );
    user_download = "";
  } else {
    user_qrcode = <img src={user.qrcode} className="img-fluid" />;
    user_download = (
      <a
        href={user.qrcode}
        download="qrcode-mservice.metrosystems-des.png"
        className="btn btn-primary border-0"
        style={{
          color: "#fff",
          backgroundColor: colors.blueAccent[600],
          boxShadow: "none",
          padding: "8px 2em",
        }}
      >
        Download QR Code
      </a>
    );
  }

  const savedTime = user.created_at;
  const formatedDate = new Date(savedTime).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  console.log(formatedDate);

  let ucheck_in = "";
  let savedTime1 = user.checked_in;
  let formatedDate1 = new Date(savedTime1).toLocaleString();
  if (formatedDate1 === "1/1/1970, 7:00:00 AM") {
    ucheck_in = <span>Unchecked in</span>;
  } else {
    ucheck_in = formatedDate1;
  }

  let ucheck_out = "";
  let savedTime2 = user.checked_out;
  let formatedDate2 = new Date(savedTime2).toLocaleString();
  if (formatedDate2 === "1/1/1970, 7:00:00 AM") {
    ucheck_out = <span>Unchecked out</span>;
  } else {
    ucheck_out = formatedDate2;
  }

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <div className="row w-100">
            <div className="col-lg-6 col-md-12 mb-2">
              <span className="h1 span-h1">Register Infomation</span>
              <span className="span-user-id">User ID : {id}</span>
            </div>
          </div>

          <div className="row w-100">
            <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 mt-4">
              <div className="card border-0 shadow-sm p-4">
                <Form style={{ color: "#000" }} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col lg={2} md={12} sm={12}>
                      <Form.Group controlId="formBasicTitle">
                        <Form.Label className="label mt-2">
                          Title <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="title"
                          onChange={handleChange}
                          value={user.title}
                          required
                        >
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                          <option value="Ms.">Ms.</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col lg={5} md={12} sm={12}>
                      <Form.Group controlId="formBasicFirstname">
                        <Form.Label className="label mt-2">
                          First name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="fname"
                          onChange={handleChange}
                          value={user.fname}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={5} md={12} sm={12}>
                      <Form.Group controlId="formBasicLastname">
                        <Form.Label className="label mt-2">
                          Last Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="lname"
                          onChange={handleChange}
                          value={user.lname}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group controlId="formBasicAge">
                        <Form.Label className="label mt-2">Age</Form.Label>
                        <Form.Control
                          type="number"
                          name="age"
                          onChange={handleChange}
                          value={user.age}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label className="label mt-2">
                          Email <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={user.email}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group controlId="formBasicPhone">
                        <Form.Label className="label mt-2">
                          Phone <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          value={user.phone}
                          maxLength={10}
                          minLength={10}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group controlId="formBasicJobTitle">
                        <Form.Label className="label mt-2">
                          Job Title <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="jobtitle"
                          onChange={handleChange}
                          value={user.jobtitle}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group controlId="formBasicCompany">
                        <Form.Label className="label mt-2">
                          Company <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="company"
                          onChange={handleChange}
                          value={user.company}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group controlId="formBasicTitle">
                        <Form.Label className="label mt-2">
                          Description
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={8}
                          name="description"
                          onChange={handleChange}
                          value={user.description}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="right-button-footer">
                    <Button
                      onClick={handleSubmit}
                      variant="primary"
                      style={{ marginRight: "15px" }}
                    >
                      Update
                    </Button>
                    <Link to="/userinfomation">
                      <Button variant="danger">Cancel</Button>
                    </Link>
                  </div>
                </Form>
              </div>
            </div>

            <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 mt-4">
              <div className="card border-0 shadow-sm p-4 d-flex">
                <div className="img-wrapper">{user_qrcode}</div>
                <div className="text-center mt-3">{user_download}</div>
                <span
                  style={{
                    textAlign: "center",
                    bottom: "0",
                    marginTop: "40px",
                  }}
                >
                  Created: {formatedDate}
                </span>
              </div>

              <div className="card border-0 shadow-sm p-4 d-flex my-4">
                <div className="row p-0">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">Checked in : </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">{ucheck_in}</div>
                </div>
                <div className="row p-0">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4">Checked out : </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-xs-8">{ucheck_out}</div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </main>
    </div>
  );
};

export default UserUpdate;
