import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import API from "../../config/axios";
import moment from "moment";

const User = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(
        `/api/admin/users/lists?page=${page}&pageSize=10&order=DESC`
      );
      const userData = response.data.data.data;
      setUsers(userData);
      setPage(response.data.data.currentPage);
      setTotalPage(response.data.data.totalPage);
    };
    fetchData();
  }, [page]);

  const rows = users.map((user) => {
    return {
      name: user.name,
      email: user.email,
      status: user.status === true ? "Active" : "Inactive",
      createdAt: moment(user.createdAt).format("DD MMM YYYY"),
    };
  });

  return (
    <div className="container p-5">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Joined Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end mt-2">
        <Pagination count={totalPage} onChange={(e, page) => setPage(page)} />
      </div>
    </div>
  );
};

export default User;
