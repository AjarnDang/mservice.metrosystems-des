import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";

import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import BarChart from "../components/BarChart";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const MySwal = withReactContent(Swal)
  const [user, setUser] = useState([]);
  const [userCount, setUserCount] = useState(0);

  //Fecth all user
  useEffect(() => {
    fetch('https://charming-goat-flannel-nightgown.cyclic.app/alluser')
      .then(response => response.json())
      .then(data => setUserCount(data.count));
  }, []);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="30px" key={user.id}>
          <div className="row w-100">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mt-2">
              <div className="card align-item-center border-0 shadow-sm py-5 px-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="header-card-dashboard">Total Users</span>
                    <h1 className="fw-bold lh-1">112</h1>
                  </div>
                  <div className="align-middle mt-3">
                    <span
                      className="rounded-circle p-3"
                      style={{
                        backgroundColor: "#46D19D",
                      }}
                    >
                      <PeopleOutlineOutlinedIcon
                        style={{
                          fill: "#fff",
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mt-2">
              <div className="card align-item-center border-0 shadow-sm py-5 px-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="header-card-dashboard">Active</span>
                    <h1 className="fw-bold lh-1">102</h1>
                  </div>
                  <div className="align-middle mt-3">
                    <span
                      className="rounded-circle p-3"
                      style={{
                        backgroundColor: "#9A46D1",
                      }}
                    >
                      <PeopleOutlineOutlinedIcon
                        style={{
                          fill: "#fff",
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mt-2">
              <div className="card align-item-center border-0 shadow-sm py-5 px-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="header-card-dashboard">Has QR Code</span>
                    <h1 className="fw-bold lh-1">81</h1>
                  </div>
                  <div className="align-middle mt-3">
                    <span
                      className="rounded-circle p-3"
                      style={{
                        backgroundColor: "#46C2D1",
                      }}
                    >
                      <PeopleOutlineOutlinedIcon
                        style={{
                          fill: "#fff",
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mt-2">
              <div className="card align-item-center border-0 shadow-sm py-5 px-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <span className="header-card-dashboard">Register Today</span>
                    <h1 className="fw-bold lh-1">9</h1>
                  </div>
                  <div className="align-middle mt-3">
                    <span
                      className="rounded-circle p-3"
                      style={{
                        backgroundColor: "#D8B83A",
                      }}
                    >
                      <PeopleOutlineOutlinedIcon
                        style={{
                          fill: "#fff",
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row w-100">
            <div className="col-lg-12 col-xs-12 mt-4">
              <div className="card border-0 shadow-sm py-5 px-3">
                <Box height="600px" width="100%" mt="-20px">
                  <BarChart isDashboard={true} />
                </Box>
              </div>
            </div>
          </div>
        </Box>
      </main>
    </div>
  );
};

export default Dashboard;
