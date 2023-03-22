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
      
    </body>
  );
}

export default QrCodeGenerator;
