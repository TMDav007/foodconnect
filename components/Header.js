import React from "react";
import Image from "next/image";
import foodConnect from "./../public/assets/FoodConnect.svg";
import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  return (
    <div>
      <header className="font-inter sticky bg-white">
        <nav className="flex items-center container justify-between mx-auto p-6">
          <div className="pt-2">
            <Image
              src={foodConnect}
              alt="foodConnect"
              className="cursor-pointer transition duration-700 ease-in-out hover:drop-shadow-lg"
            />
          </div>
          <div className="hidden md:flex space-x-12 text-xl">
            <Link href="/">
              <a className={`transition duration-700  ease-in-out border-transparent border-b-2  hover:border-brightRed cursor-pointer ${router.pathname == "/" ? "opacity-50" : "opacity-100"}`}>
                Home
              </a>
            </Link>

            <Link href="/aboutus">
              <a className={`transition duration-700  ease-in-out border-transparent border-b-2  hover:border-brightRed cursor-pointer ${router.pathname == "/aboutus" ? "opacity-50" : "opacity-100"}`}>
                About Us
              </a>
            </Link>

            <Link href="/contactus">
              <a className={`transition duration-700  ease-in-out border-transparent border-b-2  hover:border-brightRed cursor-pointer ${router.pathname == "/contactus" ? "opacity-50" : "opacity-100"}`}>
                Contact Us
              </a>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-between text-xl">
            <Link href="/signin">
              <a className={`text-brightRed px-7 transition duration-700 ease-in-out hover:opacity-60 ${router.pathname == "/signin" ? "opacity-60" : "opacity-100"}`}>
                Sign in
              </a>
            </Link>

            <Link href="/signup">
              <a className={` p-4 px-12 pt-3 text-white bg-brightRed rounded-full cursor-pointer baseline transition duration-700 ease-in-out hover:opacity-60" ${router.pathname == "/signup"? "opacity-60" : "opacity-100" }`}>
                Get Started
              </a>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
