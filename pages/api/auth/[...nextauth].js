import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../../../components/common/axiosPublic";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          const response = await api.post("api/auth/login/", credentials,{ withCredentials: true });

          //console.log(response.data.data.tokens, "heesd")
          // If no error and we have user data, return it
          if (response) {
            const user = { token: response.data.data.tokens, data: response.data.data.username };
            return user;
            
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
        }
        // const baseUrl = process.env.DATABASE_URL;
        // const response = await fetch(baseUrl + "/api/auth/login/", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // const data = await response.json();
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.accessToken= user.token);
      user && (token.user= user.data);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      //session.token = token;
     // console.log(JSON.stringify(token.username.token.tokens));
     //console.log(session.accessToken)
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
});
