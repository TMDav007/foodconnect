import React from "react";
import Image from "next/image";
import trusted1 from "./../../public/assets/trusted1.svg";
import trusted2 from "./../../public/assets/trusted2.svg";
import trusted3 from "./../../public/assets/trusted3.svg";
import trusted4 from "./../../public/assets/trusted4.svg";
import heroImg from "./../../public/assets/heroImg.jpeg";

function Hero() {
  return (
    <section id="hero">
      <div className="container flex flex-col-reverse md:flex-row items-center px-6 mx-auto md:justify-between mt-20 space-y-0 md:space-y-0">
        <div className="flex flex-col mb-32 space-y-12 md:w-2/5">
          <h1 className="max-w-md text-4xl text-black font-semibold text-center md:max-w-2xl md:text-4xl md:text-left">
            Get <span className="text-brightRed">Nigerian food recipes </span>{" "}
            and connect with your favourite{" "}
            <span className="text-brightRed">food vendors </span>
          </h1>
          <p className="max-w-sm text-center font-inter text-brownBlack text-xl leading-8 tracking-wide md:max-w-lg md:text-left">
            FoodConnect is your sure plug to get varieties of recipes, and
            employ services of food vendors of your choice.
          </p>
          <div className="max-w-md flex flex-col justify-between p-5 rounded-xl dropShadow-3xl bg-white md:max-w-2xl">
            <div>
              <p className="max-w-sm text-center text-xl mb-4 md:max-w-2xl">
                Trusted by
              </p>
            </div>
            <div className="flex justify-between items-center">
              <Image
                src={trusted1}
                alt="foodConnect"
                className="transition duration-700"
              />
              <Image
                src={trusted2}
                alt="foodConnect"
                className="transition duration-700"
              />
              <Image
                src={trusted3}
                alt="foodConnect"
                className="transition duration-700"
              />
              <Image
                src={trusted4}
                alt="foodConnect"
                className="transition duration-700"
              />
            </div>
          </div>
        </div>
        <div className="relative bottom-5 md:w-1/2 md:flex justify-end ">
          <Image
            src={heroImg}
            alt="foodConnect"
            className="bg-auto transition duration-700 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
