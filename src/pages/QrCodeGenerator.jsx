import React, { useState, useEffect } from "react";
// import QRCode from "qrcode";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
// import { response } from "express";

function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [user, setUser] = useState("");

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const getQRCode = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        "https://charming-goat-flannel-nightgown.cyclic.app/useremail/" + email
      );
      if (res.data.data != undefined) {
        console.log(res.data.data);
        MySwal.fire({
          html: <i>Retrieved email success</i>,
          icon: "success",
        }).then((value) => {
          //token สำหรับยืนยันตัวตนว่าเข้าสู่ระบบแล้ว
          setQrcode(res.data.data.qrcode);
          // navigate("/dashboard");
        });
      } else {
        MySwal.fire({
          html: <i>Error. Email incorrect or not found</i>,
          icon: "error",
        });
      }
    } catch (err) {
      console.log(err);
      MySwal.fire({
        html: <i>Error. Email incorrect or not found</i>,
        icon: "error",
      });
    }
  };

  //   navigate("/QrCodeGenerator");

  // MySwal.fire({
  //   html: <i>User has been added successfully!</i>,
  //   icon: "success",
  // }).then((value) => {
  //   window.location.reload();
  // });
  // } catch (err) {
  //     MySwal.fire({
  //     html: <i>Fail to add User!</i>,
  //     icon: "error",
  //     })
  // }

  return (
    <body className="signup-body">
      <div className="container">
        <div className="signup-form d-flex align-items-center justify-content-center">
          <div className="card border-0">
            <div className="card-header">
              <h3 className="mb-0">QR Code Generator</h3>
            </div>
            <div className="card-body p-3">
              <div class="form-group row">
                <div class="col-md-auto my-2">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-auto my-2">
                  <button class=" btn btn-primary" onClick={getQRCode}>
                    Generate
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-auto" id="qrCodeEl">
                  {qrcode && (
                    <>
                      <img src={qrcode} width="500px" />
                      <br />
                      <a
                        id=""
                        className="btn btn-success mt-2"
                        href={qrcode}
                        download="qrcode.png"
                      >
                        Download
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default QrCodeGenerator;
