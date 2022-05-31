import React from "react";
import sectionBreaker from "../../public/assets/sectionBreaker.svg";
import food1 from "../../public/assets/food1.png";
import food2 from "../../public/assets/food2.png";
import food3 from "../../public/assets/food3.png";
import Image from "next/image";

export const SectionBreaker = ({ name }) => {
  return (
    <>
      <div className="w-3/5 flex justify-end">
        <Image src={sectionBreaker} alt="sectionBreaker" className="" />
      </div>
      <p className="font-inter text-2xl text-center text-brownBlack">{name}</p>
    </>
  );
};

function PopularRecipe() {
  const FoodDisplay = ({ imageUrl, foodName }) => {
    return (
      <div className="snap-center flex-shrink-0 w-80 h-60 bg-lightBrown border border-orange rounded-lg grid justify-center place-content-center">
        <div className=" ">
          <Image src={imageUrl} alt={foodName} className="" />
        </div>
        <p className="text-center">{foodName}</p>
      </div>
    );
  };

  return (
    <div className="p-14">
      <SectionBreaker name={"Popular Recipe"}/>

      <div className="flex overflow-x-scroll scrollbar-hide space-center gap-10 mt-7 ml-14">
        <FoodDisplay imageUrl={food1} foodName={"Efo Riro"} />
        <FoodDisplay imageUrl={food2} foodName={"Jollof Rice"} />
        <FoodDisplay imageUrl={food3} foodName={"Yam Porridge"} />
        <FoodDisplay imageUrl={food1} foodName={"Pounded Yam"} />
        <FoodDisplay imageUrl={food1} foodName={"Pounded Yam"} />
        <div className="flex-shrink-0 w-80 h-60 bg-lightBrown border border-orange rounded-lg grid justify-center place-content-center">
          <div className=" ">
            <Image src={food1} alt="food1" className="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularRecipe;
