import cookie from "cookie";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../../store/authSlice";

const API_URL = process.env.NEXT_PUBLIC_DATABASE_URL;
// const baseQuery = fetchBaseQuery({
//   baseUrl: API_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.originalStatus === 401) {
//     console.log("sending refresh token");
//     const refreshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log(refreshResult, "refre");
//     if (refreshResult?.data) {
//       const user = api.getState().auth.user;
//       //store the new token
//       api.dispatch(
//         setCredentials({
//           ...refreshResult.data,
//           user,
//         })
//       );
//       //retry the original query with the new access tokens
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result
// };

// export const apiSlice = createApi({
//     baseQuery, baseQueryWithReauth,
//     endpoints: builder => ({})
// })

export default async (req, res) => {
  if (req.method === "POST") {
    const body = JSON.stringify(req.body);
    try {
      const apiRes = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await apiRes.json();

      //console.log(apiRes, data, "ëre");
      if (apiRes.status === 200) {
        const tokens = JSON.parse(data?.data.tokens.replace(/'/g, '"'));
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", tokens.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60,
            sameSite: "strict",
            path: "/api/",
          }),
          cookie.serialize("refresh", tokens.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
            path: "/api/",
          }),
        ]);
        //return data
        return res.status(200).json({
          success: "Logged in successfully",
          data,
        });
      } else {
          //throw Error(res.statusText);
        return res.status(apiRes.status).json({
          error: "Authentication failed",
          message:data.error
        });
      }
    } catch (err) {
      console.log(err.json(), "err");
      return res.status(500).json({
        error: "Something went wrong while authenticating, try again",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
