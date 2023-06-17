import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://rsaw409-tictoe-endpoint.onrender.com"
    : "http://localhost:3001";

export const socket = io(URL);
