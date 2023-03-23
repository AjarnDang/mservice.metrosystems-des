import React, { useState, useEffect } from "react";
// import QRCode from "qrcode";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
// import { response } from "express";

function QrCodeGenerator() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [user, setUser] = useState("");
  const CurrYear = new Date().getFullYear();
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
            <h1 className="text-center text-white font-weight-bolder">
              QR Code Generator
            </h1>
            <div className="card-body p-3">
              <div class="form-group row">
                <div class="col-md-auto my-2">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your registered email"
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="col-md-auto my-2">
                  <button class=" btn btn-primary" onClick={getQRCode}>
                    Confirm
                  </button>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-auto" id="qrCodeEl">
                  {qrcode && (
                    <>
                      <img
                        src={qrcode}
                        width="500px"
                        className="border-1"
                        style={{ border: "1px solid black" }}
                      />
                      <br />
                      <a
                        id=""
                        className="btn btn-success mt-3"
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
            <div className="card-footer bg-white px-3 py-2">
              <a href="/register" class="text-decoration-none">
                Go back
              </a>
            </div>
          </div>
        </div>
        <div id="copy-right">
          © Copyright Metro Systems Corporation Plc {CurrYear}.
        </div>
      </div>
    </body>
  );
}

export default QrCodeGenerator;
