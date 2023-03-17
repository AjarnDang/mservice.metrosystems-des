import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, Button, useTheme } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function AdminSettings() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const MySwal = withReactContent(Swal);
  // const navigate = useNavigate();

  const [admin, setAdmin] = useState([]);

  //Fecth all admin
  useEffect(() => {
    const fecthAllAdmin = async () => {
      try {
        const res = await axios.get("http://localhost:3333/admin");
        setAdmin(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllAdmin();
  }, []);

  //Delete admin
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3333/deleteadmin/" +id);
      MySwal.fire({
        html: <i>Admin has been added successfully!</i>,
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (err) {
      MySwal.fire({
        html: <i>Fail to add Admin!</i>,
        icon: "error",
      })
    }
  };

  // num is converted to a number then incremented.
  var num = "0";
  num++;

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="30px">
          <div className="row my-4">
            <div className="col-lg-6 col-md-12 mb-2">
              <span className="h1 span-h1">Settings</span>
            </div>
            <div className="col-lg-6 col-md-12 right-button-header">
              <Button href="/adminadd" variant="contained" style={{ color: "#fff", backgroundColor: colors.blueAccent[600], boxShadow: "none",}}>
                <PersonAddAlt1Icon style={{ width: "28px", height: "28px", marginRight: "10px", alignItems: "center",}}/>
                Add New
              </Button>
            </div>
          </div>
          <div className="card border-0 shadow-sm p-4">
            <div className="all-admin" key={admin.id}>
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Created</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {admin.map((admin) => (
                  <tbody>
                    <tr>
                      <td>{num++}</td>
                      <td>{admin.username}</td>
                      <td>{admin.fname} {admin.lname}</td>
                      <td>{admin.email}</td>
                      <td>{admin.created_at}</td>
                      <td>
                        <button 
                          className="edit-button btn btn-warning" 
                          style={{ 
                            marginRight: "10px",                      
                          }}
                          >
                      <Link to={{ pathname: "/AdminUpdate/"+admin.id }}
                          style={{ textDecoration: "none", color:"#000",}}>
                          Edit
                        </Link>
                        </button>
                        <button 
                          className="delete-button btn btn-danger" 
                          onClick={() => handleDelete(admin.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </Box>
      </main>
    </div>
  );
}

export default AdminSettings;
