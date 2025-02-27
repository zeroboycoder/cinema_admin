import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import API from "../../config/axios";

const Movie = () => {
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const response = await API.get(
        `/api/admin/movies/upcoming/lists?page=${page}&pageSize=10&order=DESC`
      );
      setMovies(response.data.data.data);
      setPage(response.data.data.currentPage);
      setTotalPage(response.data.data.totalPage);
    };
    fetchData();
  }, [page]);

  const movieLists = movies?.map((movie, i) => (
    <Card className="my-4" key={i} style={{ backgroundColor: "#1f293d" }}>
      <div
        className="flex"
        onClick={() => navigate(`/upcoming-movies/${movie.id}`)}
      >
        <img src={movie.image} width={120} height={240} />
        <div className="px-4 py-3 text-white">
          <h1 className="text-xl font-bold">{movie.name}</h1>
          <p>
            {movie.description.length > 100
              ? movie.description.substring(0, 100) + "..."
              : movie.description}
          </p>
        </div>
      </div>
    </Card>
  ));

  return (
    <div className="container mx-10 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Movies</h1>
        <Button
          variant="outlined"
          onClick={() => navigate("/upcoming-movies/create")}
          style={{
            color: "#FC6D19",
            borderColor: "#FC6D19",
            textTransform: "none",
          }}
        >
          Create Upcoming Movie
        </Button>
      </div>
      <div className="">{movieLists}</div>

      {/* pagination */}
      <div className="flex justify-end mt-2">
        <Pagination count={totalPage} onChange={(e, value) => setPage(value)} />
      </div>
    </div>
  );
};

export default Movie;
