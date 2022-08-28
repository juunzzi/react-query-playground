import axios from "axios";

export const API_URL = "https://jsonplaceholder.typicode.com";

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
