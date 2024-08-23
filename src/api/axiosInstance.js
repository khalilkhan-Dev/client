import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Adjust this if needed
});

export default axiosInstance;
