import React, { useState, useEffect } from "react";
import QRCode from "qrcode";


function QrCodeGenerator() {
  const [url, setUrl] = useState('')
  const [qrcode, setQrcode] = useState('')
  const GenerateQrcode = () => {
    QRCode.toDataURL(url, {
      width: 800,
      margin: 1,
      color: {
        dark:'#000000',
        light:'#0fffff'
      }
    }, (err, url) => {
      
      if (err) {
        console.log(err)
      } else {
        console.log(url)
        setQrcode(url)
      }
    })
  }

  return (
    <div className="container justify-content-center p-5">
      <div className="form-group row">
        <div className="col-xs-6 col-sm-6 col-md-6">
          <input
            type="text"
            placeholder="e.g. https://google.com"
            className="form-control"
            onChange={(evt) => setUrl(evt.target.value)}

          />
        </div>
        <div className="col-xs-6 col-sm-6 col-md-6">
          <button
            className="btn btn-qrcode btn-primary"
            onClick={GenerateQrcode}
          >
            Generate
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          {qrcode && <>
            <img src={qrcode} width="100%" />
            <a href={qrcode} download="qrcode.png">Download</a>
          </>}
        </div>
      </div>
    </div>
  )
}

export default QrCodeGenerator