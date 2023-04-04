import axios from "axios";

export default axios.create({
  headers: {
    baseURL: "/api",
    "Content-type": "application/json",
  },
});
