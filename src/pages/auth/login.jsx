import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../config/axios";
import { Button, TextField } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      const response = await API.post("/api/admin/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("id", response.data.data.id);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-5 w-72">
        <h1 className="text-2xl font-semibold">Login</h1>
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && (
          <p className="text-red-500 text-sm">
            * Email or password is incorrect
          </p>
        )}
        <div className="flex justify-end">
          <Button
            variant="outlined"
            onClick={onSubmitHandler}
            style={{ color: "#fff", borderColor: "#fff" }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
