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
    <div className="container justify-content-center p-5">
      <div className="form-group row">
        <div className="col-xs-6 col-sm-6 col-md-6">
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6">
          <button className="btn btn-qrcode btn-primary" onClick={getQRCode}>
            Generate
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 " id="qrCodeEl">
          {qrcode && (
            <>
              <img src={qrcode} width="100%" />
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
  );
}

export default QrCodeGenerator;
