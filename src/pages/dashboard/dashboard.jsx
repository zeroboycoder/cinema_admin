import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import API from "../../config/axios";
import moment from "moment";

const Dashboard = () => {
  const [userCount, setUserCont] = useState([]);
  const [movieCount, setMovieCont] = useState([]);
  const [bookingCount, setBookingCont] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const dashboardCountResponse = await API.get(
        `/api/admin/dashboards/count`
      );
      const dashboardCount = dashboardCountResponse.data.data;
      setUserCont(dashboardCount.totalUsers);
      setMovieCont(dashboardCount.totalMovies);
      setBookingCont(dashboardCount.totalBookings);

      const userResponse = await API.get(
        `/api/admin/users/lists?page=1&pageSize=5&order=DESC`
      );
      const userData = userResponse.data.data.data;
      setUsers(userData);

      const response = await API.get(
        `/api/admin/movies/bookings?page=1&pageSize=5&order=DESC`
      );
      setBookings(response.data.data.data);
    };
    fetchData();
  }, []);

  const userRows = users.map((user) => {
    return {
      name: user.name,
      email: user.email,
      status: user.status === true ? "Active" : "Inactive",
      createdAt: moment(user.createdAt).format("DD MMM YYYY"),
    };
  });

  const bookingRows = bookings.map((booking) => {
    return {
      id: booking.id,
      name: booking.user.name,
      movie: booking.movie.name,
      seat: booking.seat_number,
      date: moment(booking.date).format("DD MMM YYYY"),
      time: booking.time,
    };
  });

  return (
    <div className="container p-5">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {/* Cards */}
      <div className="flex gap-7">
        {/* set box shadow color */}
        <Box sx={{ boxShadow: 2 }}>
          <Card variant="outlined">
            <div className="p-5 w-56">
              <h1 className="text-xl font-bold">Total Users</h1>
              <p>{userCount}</p>
            </div>
          </Card>
        </Box>
        <Box sx={{ boxShadow: 2 }}>
          <Card variant="outlined">
            <div className="p-5 w-56 shadow-md">
              <h1 className="text-xl font-bold">Total Movies</h1>
              <p>{movieCount}</p>
            </div>
          </Card>
        </Box>
        <Box sx={{ boxShadow: 2 }}>
          <Card variant="outlined">
            <div className="p-5 w-56 shadow-md">
              <h1 className="text-xl font-bold">Total Bookings</h1>
              <p>{bookingCount}</p>
            </div>
          </Card>
        </Box>
      </div>

      {/* Last 5 users */}
      <div className="my-5">
        <h1 className="text-2xl font-bold">Last 5 Users</h1>
      </div>
      <div>
        <h1 className="text-2xl font-bold">
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
                {userRows.map((row) => (
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
        </h1>
      </div>

      {/* Last 5 bookings */}
      <div className="my-5">
        <h1 className="text-2xl font-bold">Last 5 Bookings</h1>
      </div>
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
            {bookingRows.map((row) => (
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
    </div>
  );
};

export default Dashboard;
