import { Routes, Route } from "react-router";
import Layout from "./hoc/layout";
import DashboardPage from "./pages/dashboard/dashboard";
import MoviePage from "./pages/movie/movie";
import MovieDetailPage from "./pages/movie/movieDetail";
import CreateMoviePage from "./pages/movie/createMovie";
import UpcomingMoviePage from "./pages/upcomingMovie/upcomingMovie";
import UpcomingMovieDetailPage from "./pages/upcomingMovie/upcomingMovieDetail";
import CreateUpcomingMoviePage from "./pages/upcomingMovie/createUpcomingMovie";
import UserPage from "./pages/user/user";
import BookingPage from "./pages/booking/booking";
import BookingDetailPage from "./pages/booking/bookingDetail";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/users" Component={UserPage} />
        <Route path="/movies" Component={MoviePage} />
        <Route path="/movies/create" Component={CreateMoviePage} />
        <Route path="/movies/:id" Component={MovieDetailPage} />
        <Route path="/upcoming-movies" Component={UpcomingMoviePage} />
        <Route
          path="/upcoming-movies/create"
          Component={CreateUpcomingMoviePage}
        />
        <Route
          path="/upcoming-movies/:id"
          Component={UpcomingMovieDetailPage}
        />
        <Route path="/bookings" Component={BookingPage} />
        <Route path="/bookings/:id" Component={BookingDetailPage} />
        <Route path="/" Component={DashboardPage} />
      </Routes>
    </Layout>
  );
};

export default App;
