import axios from "axios";

const baseConfig = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default baseConfig;
