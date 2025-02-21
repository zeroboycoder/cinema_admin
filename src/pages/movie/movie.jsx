import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

const Movie = () => {
  const { page, setPage } = useState();
  const navigate = useNavigate();

  return (
    <div className="container mx-10 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Movies</h1>
        <Button variant="contained" onClick={() => navigate("/movies/create")}>
          Create Movie
        </Button>
      </div>
      <div className="">
        <Card className="my-4">
          <div className="flex">
            <img
              src="https://m.media-amazon.com/images/M/MV5BYWVjODZjNDgtYjk4ZS00OTg5LTg5NDQtZDMxZDQ4ZmM5MGJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              width={120}
              height={240}
            />
            <div className="px-4 py-3">
              <h1 className="text-xl font-bold">Ben 10 Ultimate</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                quod placeat libero molestias possimus quia saepe ratione autem
                magnam. Ad.
              </p>
            </div>
          </div>
        </Card>

        <Card className="my-4">
          <div className="flex">
            <img
              src="https://m.media-amazon.com/images/M/MV5BYWVjODZjNDgtYjk4ZS00OTg5LTg5NDQtZDMxZDQ4ZmM5MGJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              width={120}
              height={240}
            />
            <div className="px-4 py-3">
              <h1 className="text-xl font-bold">Ben 10 Ultimate</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                quod placeat libero molestias possimus quia saepe ratione autem
                magnam. Ad.
              </p>
            </div>
          </div>
        </Card>

        <Card className="my-4">
          <div className="flex">
            <img
              src="https://m.media-amazon.com/images/M/MV5BYWVjODZjNDgtYjk4ZS00OTg5LTg5NDQtZDMxZDQ4ZmM5MGJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
              width={120}
              height={240}
            />
            <div className="px-4 py-3">
              <h1 className="text-xl font-bold">Ben 10 Ultimate</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                quod placeat libero molestias possimus quia saepe ratione autem
                magnam. Ad.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* pagination */}
      <div className="flex justify-end mt-2">
        <Pagination count={page || 6} />
      </div>
    </div>
  );
};

export default Movie;
