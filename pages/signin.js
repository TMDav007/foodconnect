import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import BImage from "./../public/assets/signup.png";
import Signin from "../components/Signin";
import { providers, getSession, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Layout from "../hoc/Layout";

export default function signin({ providers }) {

  return (
    <div className="relative">
      <div className="z-40 bg-black opacity-90 bg-no-repeat bg-center bg-cover h-screen">
        <Image
          src={BImage}
          alt="signup"
          layout="fill"
          objectFit="cover"
          className=""
        />
        <div className="absolute inset-0 z-50 ">
          <Layout
            title="FoodConnect | Login"
            content="Login page for FoodConnect"
          />
          <Signin signIn={signIn} />
        </div>
      </div>
    </div>
  );
}

signin.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  console.log("Im working", session)
  if (session && res && session.access) {
    res.writeHead(302, {
      location: "/dashboard",
    });
    res.end();
  }

  return {
    session: undefined,
    //providers: await providers('credentials'),
  };
};
