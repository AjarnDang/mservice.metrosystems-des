import React, { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { tokens } from "../theme";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserInfomation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const [user, setUser] = useState([]);
  const MySwal = withReactContent(Swal);

  //Fecth all user
  useEffect(() => {
    const fecthAllUser = async () => {
      try {
        const res = await axios.get("https://charming-goat-flannel-nightgown.cyclic.app/users");
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllUser();
  }, []);

  //Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete("https://charming-goat-flannel-nightgown.cyclic.app/deleteuser/" + id);
      MySwal.fire({
        html: <i>User has been deleted successfully!</i>,
        icon: "success",
      }).then((value) => {
        window.location.reload();
      });
    } catch (err) {
      MySwal.fire({
        html: <i>Fail to delete User!</i>,
        icon: "error",
      });
    }
  };

  const columns = [
    {
      field: "id",
      label: "#",
      renderCell: ({ row: { id } }) => {
        return (
          <Link
            to={{ pathname: "/userupdate/" + user.id }}
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
    {
      field: "title",
      label: "Full Name",
      flex: 0,
      cellClassName: "name-column--cell",
    },
    { field: "age", label: "Age", flex: 0, type: "number" },
    { field: "phone", label: "Phone Number", flex: 1 },
    { field: "email", label: "Email", flex: 1 },
    // { field: "jobtitle",label: "Job Title",   flex: 0 },
    { field: "company", label: "Company", flex: 0 },
    { field: "status", label: "Status", flex: 1 },
    { field: "checked_in", label: "Checked in", flex: 0 },
    { field: "checked_out", label: "Checked out", flex: 0 },
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
          <div className="row my-4">
            <div className="col-lg-6 col-md-12 mb-2">
              <h1>User Infomation</h1>
            </div>
            <div className="col-lg-6 col-md-12 right-button-header">
              <Button
                href="/useradd"
                variant="contained"
                style={{
                  color: "#fff",
                  backgroundColor: colors.blueAccent[600],
                  boxShadow: "none",
                }}
              >
                <PersonAddAlt1Icon
                  style={{
                    width: "28px",
                    height: "28px",
                    marginRight: "10px",
                    alignItems: "center",
                  }}
                />
                Add New
              </Button>
            </div>
          </div>
          <div className="card border-0 shadow-sm">
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
                  <TableBody key={user.id}>
                    {user
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user, index) => {
                        let ustatus = "";
                        if (user.status === 0) {
                          ustatus = (
                            <span className="bg-secondary text-white p-2 rounded">
                              Not registered
                            </span>
                          );
                        } else if (user.status === 1) {
                          ustatus = (
                            <span className="bg-success text-white p-2 rounded">
                              Signed in
                            </span>
                          );
                        } else {
                          ustatus = (
                            <span className="bg-danger text-white p-2 rounded">
                              Signed out
                            </span>
                          );
                        }

                        let ucheck_in = "";
                        let savedTime1 = user.checked_in;
                        let formatedDate1 = new Date(savedTime1).toLocaleString();
                        if (formatedDate1 === '1/1/1970, 7:00:00 AM') {
                          ucheck_in = <span>Unchecked in</span>
                        } else {
                          ucheck_in = formatedDate1
                        }

                        let ucheck_out = "";
                        let savedTime2 = user.checked_out;
                        let formatedDate2 = new Date(savedTime2).toLocaleString();
                        if (formatedDate2 === '1/1/1970, 7:00:00 AM') {
                          ucheck_out = <span>Unchecked out</span>
                        } else {
                          ucheck_out = formatedDate2
                        }

                        return (
                          <TableRow>
                            <TableCell>
                              {rowsPerPage * page + 1 + index}
                            </TableCell>
                            <TableCell>
                              {user.title} {user.fname} {user.lname}
                            </TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            {/* <TableCell style={{ minWidth: "100px" }}>{user.jobtitle}</TableCell> */}
                            <TableCell>{user.company}</TableCell>
                            <TableCell>{ustatus}</TableCell>
                            <TableCell>{ucheck_in}</TableCell>
                            <TableCell>{ucheck_out}</TableCell>
                            <TableCell style={{ minWidth: "170px" }}>
                              <button
                                className="edit-button btn btn-warning"
                                style={{ marginRight: "7px" }}
                              >
                                <Link
                                  to={`/UserUpdate/${user.id}`}
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
                                onClick={() => handleDelete(user.id)}
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
                count={user.length}
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
};

export default UserInfomation;
