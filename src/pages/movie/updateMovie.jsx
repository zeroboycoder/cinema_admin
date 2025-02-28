import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import API from "../../config/axios";
import moment from "moment";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UpdateMovie = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [showingDate, setShowingDate] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const movieId = location.pathname.split("/update/")[1];

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/api/user/movies/by-id/${movieId}`);
      console.log(response.data.data);
      setName(response.data.data.name);
      setGenre(response.data.data.genres.join(","));
      setDuration(response.data.data.duration);
      setDescription(response.data.data.description);
      const movie_dates = await Promise.all(
        response.data.data.movie_dates.map((dates) =>
          moment(dates.date).format("DD MMM YYYY")
        )
      );
      setShowingDate(movie_dates.join(","));
      setPreview(response.data.data.image);
    };
    fetchData();
  }, [movieId]);

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("image", file);
      formData.append("name", name);
      formData.append("genre", genre);
      formData.append("duration", duration);
      formData.append("movie_dates", showingDate);
      formData.append("description", description);
      formData.append("movieId", movieId);

      await API.put("/api/admin/movies/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setName("");
      setGenre("");
      setDuration("");
      setDescription("");
      setShowingDate("");
      setFile();
      setPreview();
      setLoading(false);
      navigator("/movies");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <h1 className="mb-4 text-3xl font-medium">Update Movie</h1>
      <div className="container flex flex-col gap-6">
        <TextField
          required
          id="outlined-required"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          required
          id="outlined-required"
          label="Genre"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
        <TextField
          required
          id="outlined-required"
          label="Duration"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <TextField
          required
          id="outlined-required"
          label="Showing Date"
          onChange={(e) => setShowingDate(e.target.value)}
          value={showingDate}
        />
        <TextField
          required
          id="outlined-required"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          multiline
          rows={3}
          maxRowsows={5}
        />
        <Button
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CloudUpload />}
          style={{ color: "#FC6D19" }}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
            multiple
          />
        </Button>
        {preview && (
          <img src={preview} alt="preview" width={100} height={180} />
        )}
        <div className="flex justify-end">
          {loading ? (
            <Button
              variant="outlined"
              onClick={onSubmitHandler}
              style={{ color: "#FC6D19", borderColor: "#FC6D19" }}
              disabled
            >
              Loading...
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={onSubmitHandler}
              style={{ color: "#FC6D19", borderColor: "#FC6D19" }}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;
