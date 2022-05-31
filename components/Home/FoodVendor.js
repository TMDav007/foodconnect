import Image from "next/image";
import React from "react";
import { SectionBreaker } from "./PopularRecipe";
import Star from "../../public/assets/star.svg";
import foodVendor1 from "../../public/assets/foodVendor1.png";
import foodVendor2 from "../../public/assets/foodVender2.png";
import foodVendor3 from "../../public/assets/foodVender3.png";
import bike from "../../public/assets/bike.svg";
import checked from "../../public/assets/checked.svg";

function FoodVendor() {
  const Vendor = ({ vendorImage, vendorName }) => {
    return (
      <>
        <div className="grid w-92">
          <Image src={vendorImage} />
          <div className="flex ml-5 gap-3 pt-2 items-center">
            <p className="font-medium text-xl">{vendorName}</p>
            <div className="relative top-1">
              <Image src={Star} />
              <Image src={Star} />
              <Image src={Star} />
              <Image src={Star} />
              <Image src={Star} />
            </div>
          </div>

          <div className="ml-5 pt-2 text-md items-center">
            <div className="flex justify-even gap-3">
              <div className="w-7">
                <Image src={bike} />
              </div>

              <p>Delivery Available</p>
            </div>
            <div className="flex justify-even gap-3">
              <div className="w-7">
                <Image src={checked} />
              </div>

              <p>Open 8am - Closed 10pm</p>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="pt-14 container mx-auto">
      <SectionBreaker name={"Food Vendors"} />

      <div className="pt-4 text-brownBlack flex justify-between">
        <Vendor vendorImage={foodVendor1} vendorName={"Radish and Dishes"} />
        <Vendor vendorImage={foodVendor2} vendorName={"Cook and Groom"} />
        <Vendor vendorImage={foodVendor3} vendorName={"Sweet and Spices"} />
        
      </div>
    </div>
  );
}

export default FoodVendor;
