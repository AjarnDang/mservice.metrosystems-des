import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminProfile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const MySwal = withReactContent(Swal);

  const [admin, setAdmin] = useState([]);
  const [adminAuth, setAdminAuth] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
		fecthAllAdmin();
	}, []);

	const fecthAllAdmin = async () => {
		try {
			const res = await axios.get("http://localhost:3333/admin");
			setAdmin(res.data);
			await parseJwt(token);
			profilesAuth(res.data, parseJwt(token));
		} catch (err) {
			console.log(err);
		}
	};

	function parseJwt(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split("")
				.map(function (c) {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}

	const profilesAuth = (data, email) => {
		if (data) {
			data.map((item) => {
				if ((item.email = email)) {
					setAdminAuth(item);
          console.log(email)
				}
			});
		}
	};

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="30px">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12 ml-auto d-flex align-items-center">
              <div>
                <h1>{adminAuth.username}</h1>
                <h5>{adminAuth.fname} {adminAuth.lname}</h5> 
              </div>
            </div>
          </div>
        </Box>
      </main>
    </div>
  );
}
export default AdminProfile;
