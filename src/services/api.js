import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7120"
});

export default api;