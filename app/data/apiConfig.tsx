import axios from "axios";

const baseConfig = axios.create({
  baseURL: "https://hackathon-pr.onrender.com/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default baseConfig;
