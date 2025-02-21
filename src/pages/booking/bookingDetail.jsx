import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const bookingDetail = () => {
  return (
    <div className="container p-5">
      <h1 className="text-3xl font-bold mb-4">Booking detail</h1>
      <TableContainer className="border border-gray-400">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="right">Dummy</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">dummy@test.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Movie</TableCell>
              <TableCell align="right">Ben 10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Seat</TableCell>
              <TableCell align="right">3A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="right">30 Jan 2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">Time</TableCell>
              <TableCell align="right">3:00 PM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default bookingDetail;
