import React from "react";
import { SectionBreaker } from "./PopularRecipe";

function Subscribe() {
  return (
    <div className="pt-14 container mx-auto ">
      <SectionBreaker name={"Subscribe to our Newsletter"} />

      <div className="mt-4 container pb-24 bg-orange text-inter">
        <p className="text-center mx-auto  text-fairOrange text-xl w-2/6 pt-12">
          Subscribe to get updates on available discounts and Promo prices
        </p>
        <div className="bg-white px-2 py-3 w-8/12 mx-auto mt-4 rounded-md ">
          <div className="flex py-2">
            <input
              type="email"
              name="email"
              className="mt-1 px-3 py-3 bg-white  border-slate-300 placeholder:text-gray focus:outline-none placeholder:text-lg block md:text-md sm:text-sm w-5/6"
              placeholder="Enter your Email Address"
            />

            <span className="bg-orange text-fairOrange rounded-md px-9 py-3 transition duration-700 ease-in-out cursor-pointer hover:opacity-80">
              Subscribe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
