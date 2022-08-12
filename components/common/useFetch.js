import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import cookie from "cookie";
import { newRefreshToken } from "./refreshToken";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
let useFetch = () => {
  let config = {};
  let originalRequest = async (url, config) => {
    url = `${API_URL}/${url}`;
    console.log(config, "heree o");
    let response = await fetch(url, config);
    let data = await response.json();
    //console.log("Requesting", data, response);
    return { response, data };
  };

  let callFetch = async (url, token, res) => {

    let newAccess = {};
    let access = token.access ?? false;
    let refresh = token.refresh ?? false;
    
    if (!access) {
      newAccess = await newRefreshToken(token.refresh, res);
      //console.log( newAccess, "here2");
    } else {
        newAccess.access = token.access
    }

    config["headers"] = {
      Authorization: `Bearer ${newAccess.access}`,
    };

    let { response, data } = await originalRequest(url, config);
    return { response, data };
  };

  return callFetch;
};

export default useFetch;
