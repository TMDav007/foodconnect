import Image from "next/image";
import React from "react";
import foodConnect from "./../public/assets/FoodConnect(1).svg";
import tweet from "./../public/assets/tweet.svg";
import fb from "./../public/assets/fb.svg";
import insta from "./../public/assets/insta.svg";

function Footer() {
  return (
    <div className="flex justify-between bg-orange text-fairOrange text-lg mt-20 p-12 py-20">
      <div className="w-1/4">
        <div className="mb-9">
          <Image src={foodConnect} />
        </div>
        <div className="flex justify-between mt-9">
          <Image src={tweet} />
          <Image src={fb} />
          <Image src={insta} />
        </div>
      </div>

      <div className="flex justify-between text-fairOrange w-2/5 mr-7">
        <div className="grid">
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            About
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            News
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Hiring
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            HomePage
          </a>
        </div>
        <div className="grid">
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Services
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Recipes
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Vendors
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            HomePage
          </a>
        </div>
        <div className="grid">
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Socials
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Twitter
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Facebook
          </a>
          <a className="py-2 transition duration-700 ease-in-out hover:opacity-60" href="#">
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
