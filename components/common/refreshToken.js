import mem from "mem";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";

import { api } from "./axiosPublic";

const refreshTokenFn = async () => {
  // const session = JSON.parse(localStorage.getItem("session"));
  let session = await getSession({ NextApiRequest });

  //convert string to JSON
  session = JSON.parse(session.accessToken.replace(/'/g, '"'));
  const value = {};
  value.refresh = session?.refresh;

  try {
    const response = await api.post("/api/auth/api/token/refresh/", value);

    const newAccess = response.data.access;
    session.access = newAccess;
    if (!newAccess) {
      // localStorage.remoteItem("session");
      // localStorage.removeItem("user");
    }
    return session;
  } catch (error) {
    console.log(error, "refreserror");
  }
};

const maxAge = 10000;

async function refreshAccessToken(token) {
  let session = await getSession({ NextApiRequest });

  //convert string to JSON
  session = JSON.parse(session.accessToken.replace(/'/g, '"'));
  const value = {};
  value.refresh = session?.refresh;
  try {
    const response = await api.post("/api/auth/api/token/refresh/", value);

    const newAccess = response.data.access;

    //const refreshedTokens = await response.json()

    if (!response) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: newAccess,
      accessTokenExpires: Date.now() + 1 * 1000,
      refreshToken: value.refresh, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});

export const newRefreshToken = async (token, res) => {
  console.log("herereooo");
  let response = await fetch(
    `http://127.0.0.1:8000/api/auth/api/token/refresh/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token }),
    }
  );
  
  let data = await response.json();
  console.log(response, "herere");
  if (response.status === 200) {
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60,
        sameSite: "strict",
        path: "/api/",
      }),
    ]);
  }
  return data;
};
