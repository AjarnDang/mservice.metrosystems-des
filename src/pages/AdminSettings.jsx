import React, { useState, useEffect } from "react";
import { tokens } from "../theme";
import { Box, Button, useTheme } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import LaunchIcon from "@mui/icons-material/Launch";
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
        const res = await axios.get("https://charming-goat-flannel-nightgown.cyclic.app/admin");
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
      await axios.delete("https://charming-goat-flannel-nightgown.cyclic.app/deleteadmin/" +id);
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

  const columns = [
    {
      field: "id",
      label: "#",
      renderCell: ({ row: { id } }) => {
        return (
          <Link
            to={{ pathname: "adminupdate/" + admin.id }}
            style={{ textDecoration: "none", color: colors.grey[100] }}
          >
            {id}{" "}
            <LaunchIcon
              style={{ opacity: "0.5", margin: "0 0 10px 5px", width: "13px" }}
            />
          </Link>
        );
      },
    },
    { field: "username", label: "Username", flex: 0, type: "number" },
    {
      field: "fullname",
      label: "Full Name",
      flex: 0,
      cellClassName: "name-column--cell",
    },
    { field: "email", label: "Email", flex: 1 },
    { field: "created_at", label: "Created", flex: 0 },
    { field: "action", label: "Action", flex: 1 },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <div className="row my-4 w-100">
            <div className="col-lg-6 col-md-12 mb-2">
              <span className="h1 span-h1">Admin Panel</span>
            </div>
            <div className="col-lg-6 col-md-12 right-button-header">
              <Button href="/adminadd" variant="contained" style={{ color: "#fff", backgroundColor: colors.blueAccent[600], boxShadow: "none",}}>
                <PersonAddAlt1Icon style={{ width: "28px", height: "28px", marginRight: "10px", alignItems: "center",}}/>
                Add New
              </Button>
            </div>
          </div>
          {/* <div className="card border-0 shadow-sm p-4">
            <div className="all-admin" key={admin.id}>
              <table className="table table-borderless">
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
                {admin.map((admin) => { 
                    const savedTime = admin.created_at;
                    const formatedDate = new Date(savedTime).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }); 
                  return (          
                  <tbody>
                    <tr>
                      <td>{num++}</td>
                      <td>{admin.username}</td>
                      <td>{admin.fname} {admin.lname}</td>
                      <td>{admin.email}</td>
                      <td>{formatedDate}</td>
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
                )})}
              </table>
            </div>
          </div> */}

          <div className="card border-0 shadow-sm w-100">
            <Paper sx={{ width: "100%", overflow: "hidden", height: "auto" }}>
              <TableContainer sx={{ maxHeight: 685 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody key={admin.id}>
                    {admin
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((admin, index) => {
                        const savedTime = admin.created_at;
                        const formatedDate = new Date(savedTime).toLocaleString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        });
                        return (
                          <TableRow>
                            <TableCell>
                              {rowsPerPage * page + 1 + index}
                            </TableCell>
                            <TableCell>{admin.username}</TableCell>
                            <TableCell>
                              {admin.fname} {admin.lname}
                            </TableCell>
                            <TableCell>{admin.email}</TableCell>
                            <TableCell>{formatedDate}</TableCell>

                            <TableCell style={{ minWidth: "170px" }}>
                              <button
                                className="edit-button btn btn-warning"
                                style={{ marginRight: "7px" }}
                              >
                                <Link
                                  to={{ pathname: "/AdminUpdate/" + admin.id }}
                                  style={{
                                    textDecoration: "none",
                                    color: "#000",
                                  }}
                                >
                                  Edit
                                </Link>
                              </button>
                              <button
                                className="delete-button btn btn-danger"
                                onClick={() => handleDelete(admin.id)}
                              >
                                Delete
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={admin.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Box>
      </main>
    </div>
  );
}

export default AdminSettings;
