import axios from "axios";

export const api = axios.create({
  baseURL: 'https://jobboard-backend-seven.vercel.app/api',
  withCredentials: true,
});
