import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import moment from "moment";
import API from "../../config/axios";

const MovieDetail = () => {
  const [movie, setMovie] = useState();
  const [runtime, setRuntime] = useState();
  const location = useLocation();

  useEffect(() => {
    const id = location.pathname.split("/upcoming-movies/")[1];
    const fetchData = async () => {
      const response = await API.get(`/api/admin/movies/upcoming/lists/${id}`);
      setMovie(response.data.data);
      const hour = moment
        .duration(response.data.data.duration, "minutes")
        .asHours();
      const minute = moment
        .duration(response.data.data.duration, "minutes")
        .asMinutes();
      if (`${Math.floor(minute % 60)}` > 0)
        setRuntime(`${Math.floor(hour)}hrs ${Math.floor(minute % 60)}min`);
      else setRuntime(`${Math.floor(hour)}hrs`);
    };
    fetchData();
  }, [location]);

  return (
    <>
      {movie ? (
        <div className="flex flex-col gap-4 p-5">
          <div className="flex gap-5">
            <img src={movie?.image} width={200} />
            <div className="flex flex-col gap-1.5">
              <h1 className="text-3xl font-bold">{movie.name}</h1>
              <p>Genre : {movie.genres.join(", ")}</p>
              <p>Duration : {runtime}</p>
              <p>Movie Date : {moment(movie.date).format("DD MMM YYYY")}</p>
            </div>
          </div>
          <p>{movie?.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MovieDetail;
