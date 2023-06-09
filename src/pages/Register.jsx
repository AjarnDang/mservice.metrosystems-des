import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "../assets/css/register.css";

function Register() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const CurrYear = new Date().getFullYear();

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
      navigate("/qrcodegenerator");
      MySwal.fire({
        html: <i>Register successfully!</i>,
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (err) {
        MySwal.fire({
        html: <i>{err}</i>,
        icon: "error",
        })
    }
  };

  return (
    <body className="signup-body">
      <div className="container">
        <div className="signup-form d-flex align-items-center justify-content-center">
          <Form className="form-bg-white my-3" onSubmit={handleSubmit}>
            <h1 className="text-center text-white font-weight-bolder">
              Registration
            </h1>
            <Row className="mb-3 reg-row">
              <Col lg={2} md={2} sm="auto">
                <Form.Group controlId="formBasicTitle">
                  <Form.Label className="label">
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
              <Col lg={5} md={5} sm="auto">
                <Form.Group controlId="formBasicFirstname">
                  <Form.Label className="label">
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
              <Col lg={5} md={5} sm="auto">
                <Form.Group controlId="formBasicLastname">
                  <Form.Label className="label">
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

            <Row className="mb-3 reg-row">
              <Col lg={4} md={4} sm="auto">
                <Form.Group controlId="formBasicAge">
                  <Form.Label className="label">Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    onChange={handleChange}
                    className="w-100"
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm="auto">
                <Form.Group controlId="formBasicPhone">
                  <Form.Label className="label">
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
              <Col lg={4} md={4} sm="auto">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="label">
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

            <Row className="mb-3 reg-row">
              <Col lg={6} md={6} sm="auto">
                <Form.Group controlId="formBasicJobTitle">
                  <Form.Label className="label">
                    Job Title <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="jobtitle"
                    onChange={handleChange}
                    className="w-100"
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={6} md={6} sm="auto">
                <Form.Group controlId="formBasicCompany">
                  <Form.Label className="label">
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

            <Row className="mb-3 reg-row">
              <Col>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label className="label">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    onChange={handleChange}
                    className="w-100"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3 reg-row">
              <Col>           
                  <button
                    type="submit"
                    className="btn btn-success px-4"
                    style={{marginRight:"10px"}}
                  >
                    Submit
                  </button>     
                  <a href="/qrcodegenerator" className="btn text-primary text-decoration-none">
                    Get QR Code
                </a>       
              </Col>                           
            </Row>
          </Form>
        </div>
        <div
          className="text-center"
          style={{
            position: "absolute",
            bottom: "0",
          }}
        ></div>

        <div id="copy-right">
          © Copyright Metro Systems Corporation Plc {CurrYear}.
        </div>
      </div>
    </body>
  );
}

export default Register;
