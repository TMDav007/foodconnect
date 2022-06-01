import React from "react";
import Image from "next/image";
import AboutImg from "./../public/assets/AboutImg.png";
import { SubscribeBox } from "./Home/Subscribe";

function AboutUs() {
  return (
    <div>
      <div className=" mt-32 font-Inter">
        <p className="w-2/3 leading-2 tracking-wide font-bold text-5xl text-center mx-auto">
          Expand your food making or ordering options by using our services...
        </p>
        <p className="mt-7 w-7/12 leading-2 tracking-wider font-light text-2xl text-center mx-auto">
          FoodConnect is your sure plug to get varieties of recipes, and employ
          services of food vendors of your choice.
        </p>
      </div>

      <div className="w-8/12 mt-24 mx-auto">
        <Image src={AboutImg} alt="Image" />
      </div>

      <div className="m-24 w-8/12 mx-auto">
        <p className="text-center font-bold text-4xl">Who we are</p>
        <p className="mt-7 w-4/5 leading-2 tracking-wider font-light text-lg text-center mx-auto">
          FoodConnect is designed to attend to the foodie need of our users.
          Gone are the days of scrolling non-stop to find food vendors to
          patronize. With our service, you can get food services of your choice
          by Signing Up. Also, you get to have access to thousands of food
          recipes that will help to serve your needs at any given time.{" "}
        </p>
      </div>

      <div className="m-24 w-4/5 mx-auto">
          <p className="text-center font-bold text-4xl mb-10">Subscribe</p>
          <SubscribeBox />
      </div>
    </div>
  );
}

export default AboutUs;
