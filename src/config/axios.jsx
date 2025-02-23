import axios from "axios";

const API = axios.create({
  baseURL: "http://167.99.75.7:8001/", // Replace with your API URL
  timeout: 10000, // Timeout in ms
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default API;
