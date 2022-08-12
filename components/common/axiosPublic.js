import axios from "axios";

export const api = axios.create({
  //baseURL: `https://dashboard.quichealth.com.ng`,
  baseURL: process.env.NEXT_PUBLIC_DATABASE_URL,

  //withCredentials: true,
});
