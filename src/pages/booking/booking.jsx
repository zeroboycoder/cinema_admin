import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import API from "../../config/axios";
import moment from "moment";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(
        `/api/admin/movies/bookings?page=${page}&pageSize=10&order=DESC`
      );
      console.log(response.data);
      setBookings(response.data.data.data);
      setPage(response.data.data.currentPage);
      setTotalPage(response.data.data.totalPage);
    };
    fetchData();
  }, [page]);

  const rows = bookings.map((booking) => {
    return {
      id: booking.id,
      name: booking.user.name,
      movie: booking.movie.name,
      seat: booking.seat_numbers.join(", "),
      date: moment(booking.date).format("DD MMM YYYY"),
      time: booking.time,
    };
  });

  return (
    <div className="container p-5">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Movie</TableCell>
              <TableCell align="right">Seat</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right"></TableCell>
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
                <TableCell align="right">{row.movie}</TableCell>
                <TableCell align="right">{row.seat}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      navigate(`/bookings/${row.id}`);
                    }}
                  >
                    Detail
                  </Button>
                </TableCell>
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

export default Booking;
