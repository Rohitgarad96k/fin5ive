import axios from "axios";

const API = axios.create({
  baseURL: "https://fin-five-server.vercel.app", // your backend url
  headers: {
    "Content-Type": "application/json",
  },
});

export const createContact = (data) => API.post("/contacts", data);