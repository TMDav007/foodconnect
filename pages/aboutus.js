import React from "react";
import Header from "../components/Header";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import Layout from "../hoc/Layout";

function aboutus() {
  return (
    <div className="bg-lightOrange">
      <Layout
        title="FoodConnect | Aboutus"
        content="Aboutus page for FoodConnect"
      />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default aboutus;
