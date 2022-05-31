import Image from "next/image";
import React from "react";
import { SectionBreaker } from "./PopularRecipe";
import Test1 from "./../../public/assets/test1.png";
import Test2 from "./../../public/assets/test2.png";
import Test3 from "./../../public/assets/test3.png";

function Testimonial() {
  const TestiMony = ({ image, name, location, comment, third }) => {
    return (
      <div className="p-4  grid text-brownBlack justify-between border border-orange rounded-lg bg-lightBrown w-96 ">
        <div className="grid px-4 grid-cols-layout items-center">
          <div className=" ">
            <Image src={image} />
          </div>
          <div className={`${third ? "pl-4" : ""}`}>
            <p className="text-xl font-medium">{name}</p>
            <p className="text-md font-light">{location}</p>
          </div>
        </div>

        <div>
          <p className='text-md tracking-wide leading-7 px-4 font-light '>{comment}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="pt-14 container mx-auto">
      <SectionBreaker name={"Testimonials"} />
      <div className="flex gap-6 mt-4 justify-between">
        <TestiMony
          image={Test1}
          name={"Remi Folorunsho"}
          location={"Lagos, Nigeria"}
          comment={
            "FoodConnect is my number one go to for food recipes and fast vendor services. I love their services."
          }
        />
        <TestiMony
          image={Test2}
          name={"Mr. Williams"}
          location={"Kano, Nigeria"}
          comment={
            "When i moved to Kano I found it hard to prepare some of northern dishes. Thank God for FoodConnect!."
          }
        />
        <TestiMony
          image={Test3}
          name={"Miss Fatia"}
          location={"Chicago, USA"}
          comment={
            "FoodConnect all the way!!!."
          }
          third={true}
        />
      </div>
    </div>
  );
}

export default Testimonial;
