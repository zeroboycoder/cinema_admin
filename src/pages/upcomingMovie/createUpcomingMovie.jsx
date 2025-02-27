import { useState } from "react";
import { styled } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import API from "../../config/axios";

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

const CreateMovie = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const onSubmitHandler = async () => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("name", name);
    formData.append("genre", genre);
    formData.append("duration", duration);
    formData.append("description", description);

    await API.post("/api/admin/movies/upcoming/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setName("");
    setGenre("");
    setDuration("");
    setDescription("");
    setFile();
    setPreview();
  };

  return (
    <div className="container p-5">
      <h1 className="mb-4 text-3xl font-medium">Create Movie</h1>
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
          <Button variant="contained" onClick={onSubmitHandler}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
