import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box,
         IconButton,
         Typography,
         useTheme,
        } from "@mui/material";    
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import LogoutIcon from '@mui/icons-material/Logout';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState(""); //dashboard

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch("https://charming-goat-flannel-nightgown.cyclic.app/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer '+token, 
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if(data.status == 'ok') {
                console.log('Authen Success')
            } else {
              localStorage.removeItem('token');
              MySwal.fire({
                html: <i>Error, Authen Failed!</i>,
                icon: "error",
                }).then((value) => {
                  window.location = "/"
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
  }, [])

  const Logout = () => {
    if (Logout) {
      MySwal.fire({
        html: <i>Log Out Success!</i>,
        icon: 'success'
      }).then((value) => {

      //ลบ Token และออกจากระบบ
      localStorage.removeItem("token");
      navigate("/");
      })
    }   
  };
  
    return (
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.blueAccent[600]} !important`,
            minHeight: "100vh",
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            color: "#fff !important",
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#fff !important",
          },
          "& .pro-menu-item.active": {
            color: "#fff !important",
            backgroundColor: `${colors.blueAccent[300]} !important`,
            borderRadius: "5px",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}

            {!isCollapsed && (
              <Box mb="10px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100%"
                    height="auto"
                    padding="0 10%"
                    src={`../../assets/SPA-Logo-White.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
              </Box>
            )}

            <Box
              paddingLeft={isCollapsed ? undefined : "20px"}
              paddingRight={isCollapsed ? undefined : "20px"}
            >
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                margin="0 0 10px 0"
              />
              <Item
                title="User Infomation"
                to="/userinfomation"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Registration (Admin)"
                to="/useradd"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Registration (User)"
                to="/register"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              {/* <Item
                title="QR Code Generator"
                to="/qrcodegenetor"
                icon={<ContactsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              /> */}

              <Button 
              onClick={Logout}
              style={{
                backgroundColor:"transparent",
                border:"none",
                width:"100%",
                textAlign:"left",
                padding: "10px 35px 10px 27px",
                fontSize:"14px"
              }}
              >
                <LogoutIcon 
                  style={{
                    marginRight:"14px",
                  }}
                /> Log out
              </Button>             

              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={
                  isCollapsed ? (
                    <NavigateNextOutlinedIcon
                      style={{
                        borderRadius: "50%",
                        color: "#616161",
                        backgroundColor: "#fff",
                      }}
                    />
                  ) : undefined
                }
                style={{
                  margin: "10px 0 0px 0",
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    ml="15px"
                  >
                    <IconButton
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      style={{
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        color: "#616161",
                      }}
                    >
                      <NavigateBeforeOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    );
  };

export default Sidebar;
