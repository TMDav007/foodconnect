import React from "react";
import Image from "next/image";
import foodConnect from "./../public/assets/FoodConnect.svg";

function Header() {
  return (
    <div>
      <header className="font-inter relative bg-white">
        <nav className="flex items-center container justify-between mx-auto p-6 ">
          <div className="pt-2">
            <Image
              src={foodConnect}
              alt="foodConnect"
              className="cursor-pointer transition duration-700 ease-in-out hover:drop-shadow-lg"
            />
          </div>
          <div className="hidden md:flex space-x-12 text-xl">
            <a
              href="#"
              className="transition duration-700 text-brownBlack ease-in-out border-transparent border-b-2 hover:border-brightRed cursor-pointer"
            >
              Home
            </a>
            <a
              href="#"
              className="transition duration-700  text-brownBlack ease-in-out border-transparent border-b-2 hover:border-brightRed cursor-pointer"
            >
              About Us
            </a>
            <a
              href="#"
              className="transition duration-700 text-brownBlack ease-in-out border-transparent border-b-2 hover:border-brightRed cursor-pointer"
            >
              Contact Us
            </a>
          </div>
          <div className="hidden md:flex items-center justify-between text-xl">
            <a href="#" className="text-brightRed px-7 transition duration-700 ease-in-out hover:opacity-60">Sign in</a> 
            <a
              href="#"
              className=" p-4 px-12 pt-3 text-white bg-brightRed rounded-full cursor-pointer baseline transition duration-700 ease-in-out hover:opacity-60"
            >
              Get Started
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
