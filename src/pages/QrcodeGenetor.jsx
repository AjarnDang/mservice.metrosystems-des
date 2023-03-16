import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
import * as yup from "yup";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const QrcodeGenetor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

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
    console.log(inputs);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fname: inputs.fname,
      lname: inputs.lname,
      age: inputs.age,
      email: inputs.email,
      phone: inputs.phone,
      jobtitle: inputs.jobtitle,
      company: inputs.company,
      description: inputs.description,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/users/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "ok") {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          }).then((value) => {
            //token สำหรับยืนยันตัวตนว่าเข้าสู่ระบบแล้ว
            localStorage.setItem("token", result.accessToken);
            navigate("/");
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (

      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px">
            <div className="row my-4">
              <div className="col-lg-6 col-md-12 mb-2">
                <span className="h1 span-h1">QR Code Generator</span>
                <span className="span-user-id">User ID : 1</span>
              </div>
              <div className="col-lg-6 col-md-12 right-button-header">
                <Button
                  href="./RegisterAdmin"
                  variant="contained"
                  style={{
                    color: "#fff",
                    backgroundColor: colors.blueAccent[600],
                    boxShadow: "none",
                    padding: "8px 2em",
                  }}
                >
                  Print
                </Button>
              </div>
            </div>

            <div className="card border-0 shadow-sm p-4">
              <div className="row w-100">
                <div className="col-lg-3 col-md-12 col-sm-12 mb-3 img-wrapper">
                  <img
                    className="img-fluid"
                    src="https://www.mindphp.com/forums/download/file.php?id=560"
                  />
                  <Button
                    style={{
                      background: "transparent",
                      color: colors.blueAccent[600],
                      width: "100%",
                      marginTop: "20px",
                    }}
                  >
                    Generate QR Code
                  </Button>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12">
                  <Form style={{ color: "#000" }} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col lg={2} md={12} sm={12}>
                        <Form.Group controlId="formBasicTitle">
                          <Form.Label className="label mt-2">
                            Title <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select defaultValue="Choose Title" disabled>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Ms.</option>
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
                            value={inputs.fname || "John"}
                            onChange={handleChange}
                            placeholder="John"
                            className="w-100"
                            readOnly
                            disabled
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
                            value={inputs.lname || "Doe"}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="w-100"
                            readOnly
                            disabled
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
                            value={inputs.age || "25"}
                            onChange={handleChange}
                            placeholder="25"
                            className="w-100"
                            readOnly
                            disabled
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
                            value={inputs.email || "johndoe@gmail.com"}
                            onChange={handleChange}
                            placeholder="example@gmail.com"
                            className="w-100"
                            readOnly
                            disabled
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
                            value={inputs.phone || "0812345678"}
                            onChange={handleChange}
                            placeholder="08XXXXXXXX"
                            className="w-100"
                            maxLength={10}
                            minLength={10}
                            readOnly
                            disabled
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
                            value={inputs.jobtitle || "Senior Engineer"}
                            onChange={handleChange}
                            placeholder="Senior Engineer"
                            className="w-100"
                            readOnly
                            disabled
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
                            value={inputs.company || "SomeCompany Co.Ltd"}
                            onChange={handleChange}
                            placeholder="Example Company Co.Ltd"
                            className="w-100"
                            readOnly
                            disabled
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
                            value={
                              inputs.description ||
                              "Interested in OEE to productive improvement"
                            }
                            onChange={handleChange}
                            placeholder="Interested in OEE to productive improvement"
                            className="w-100"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </div>
          </Box>
        </main>
      </div>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default QrcodeGenetor;
