import React from "react";
import Image from "next/image";
import Header from "../components/Header";
import BImage from "./../public/assets/signup.png";
import Signin from "../components/Signin";

function signin() {
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
          <Header />
          <Signin />
        </div>
      </div>
    </div>
  );
}

export default signin;
