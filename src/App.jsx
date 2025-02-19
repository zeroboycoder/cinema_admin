import { Routes, Route } from "react-router";
import Layout from "./hoc/layout";
import DashboardPage from "./pages/dashboard/dashboard";
import MoviePage from "./pages/movie/movie";
import UserPage from "./pages/user/user";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/users" Component={UserPage} />
        <Route path="/movies" Component={MoviePage} />
        <Route path="/" Component={DashboardPage} />
      </Routes>
    </Layout>
  );
};

export default App;
