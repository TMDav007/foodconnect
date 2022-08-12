import React from "react";

import Image from "next/image";
import Layout from "../hoc/Layout";
import BImage from "./../public/assets/signup.png";
import Dashboard from "../components/Dashboard";
import { useSelector } from "react-redux";

function dashboard() {
  const { loading, user , isAuthenticated} = useSelector((state) => {
    return state.auth;
  });
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
            title="FoodConnect | Dashboard"
            content="User Dashboard for FoodConnect"
          />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

// dashboard.getInitialProps = async (context) => {

// };

export default dashboard;
