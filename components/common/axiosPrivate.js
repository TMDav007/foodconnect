import axios from "axios";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { memoizedRefreshToken } from "./refreshToken";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import AuthContext from "../../context/GlobalContext";

//axios.defaults.baseURL = process.env.NEXT_PUBLIC_DATABASE_URL;
let requestToken;
let expiryiTme = Date.now() * 2;
let dt = new Date();
let newDate = dt.setMinutes(dt.getMinutes() + 1);
const privateApi = axios.create({
  //baseURL: `https://dashboard.quichealth.com.ng`,
  baseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
//   //headers: {
//     "Access-Control-Allow-Headers": "Origin,Content-Type",
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//     "Content-Type": "application/json; charset=UTF-8",
//   },
  //withCredentials: true,
  credentials: "include",
});

const refreshAuthLogic = (failedRequest) =>
  memoizedRefreshToken().then((tokenRefreshResponse) => {
    // get the new token
    failedRequest.response.config.headers.authorization = `Bearer ${tokenRefreshResponse.access}`; // set the new token as the authorization header.
    return Promise.resolve();
  });

createAuthRefreshInterceptor(privateApi, refreshAuthLogic);

privateApi.interceptors.request.use(
  async (request, NextApiRequest) => {
    let session = await getSession({ NextApiRequest });
    //     //convert string to JSON


    session = JSON.parse(session.accessToken.replace(/'/g, '"'));
    // requestToken = session?.access;
    if (Date.now() > newDate) {
      console.log("here");
      requestToken = "";
    }
    if (!requestToken) {
      memoizedRefreshToken().then((tokenRefreshResponse) => {
        requestToken = tokenRefreshResponse.access;
        console.log(requestToken, "token");
      });
      newDate = dt.setMinutes(dt.getMinutes() + 1);
    }
    console.log(newDate, dt, dt.getMilliseconds());
    console.log(Date.now(), expiryiTme, "time");
    console.log(requestToken, "treskd");
    request.headers.authorization = `Bearer ${requestToken}`;
    //requestToken='';
    return request;
  },
  (error) => Promise.reject(error)
);

// privateApi.interceptors.request.use(
//   async (config, NextApiRequest) => {
//     let session = await getSession({ NextApiRequest });
//     //convert string to JSON
//     session = JSON.parse(session.accessToken.replace(/'/g, '"'));
//     requestToken = session?.access

//     if (session?.access) {
//       config.headers = {
//         ...config.headers,
//         authorization: `bearer ${requestToken}`,
//       };
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// privateApi.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error?.config;

//     // console.log(config, "error")

//     if (error?.response?.status === 401 ) {
//         apiError = true
//         requestToken = ''
//         console.log(error, "ddd")
//         //return axios(config)
//     //   config.sent = true;
//     //   const result = await memoizedRefreshToken();
//     //   console.log(result?.access, "result");
//     //   requestToken=result?.access
//     //  // delete config.headers.common['authorization'];
//     //   if (result?.access) {
//     //     config.headers = {
//     //       ...config.headers,
//     //       authorization: `Bearer ${requestToken}`,
//     //     };
//         //axios.defaults.headers.common['authorization'] = `Bearer ${result?.access}`;
//         // axios.defaults.headers.common['authorization'] = `Bearer ${result?.access}`
//       //}

//       //console.log(axios(config), "congig")

//       return privateApi(config);
//     }
//     return Promise.reject(error);
//   }
// );

export const axiosPrivate = privateApi;
