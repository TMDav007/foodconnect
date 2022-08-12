import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import Signup from "../components/Signup";
import BImage from "./../public/assets/signup.png";
import Layout from "../hoc/Layout";

function signup() {
  return (
    <div className="relative ">
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
            title="FoodConnect | Signup"
            content="Sign up page for FoodConnect"
          />
          <Signup />
        </div>
      </div>
    </div>
  );
}

export default signup;
