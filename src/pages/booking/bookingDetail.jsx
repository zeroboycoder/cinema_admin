import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import API from "../../config/axios";
import moment from "moment";

const BookingDetail = () => {
  const [booking, setBooking] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/api/admin/movies/bookings/${id}`);
      setBooking(response.data.data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {booking ? (
        <div className="container p-5">
          <h1 className="text-3xl font-bold mb-4">Booking detail</h1>
          <TableContainer className="border border-gray-400">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">{booking?.user?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="right">{booking?.user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Movie</TableCell>
                  <TableCell align="right">{booking?.movie?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Seat</TableCell>
                  <TableCell align="right">
                    {booking?.seat_numbers.join(", ")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="right">
                    {moment(booking?.date).format("DD MMM YYYY")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="right">{booking?.time}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BookingDetail;
