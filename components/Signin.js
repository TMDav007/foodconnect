import React from "react";
import Image from "next/image";
import Google from "./../public/assets/google.svg";

function Signin() {
  return (
    <div className="relative mt-28 mx-auto py-5 w-2/6 bg-white rounded-md border border-borderColor">
      <p className="p-8 font-medium text-xl">
        <span className="text-brightRed tracking-wide">Sign in</span> to get
        started
      </p>

      <form className="mx-auto w-4/5">
        <div>
          <label className="block">
            <span className="block text-lg text-brownBlack">Full Name</span>
            <input
              type="email"
              className="mt-1 w-full px-3 py-4 border shadow-sm border-slate-300 rounded-md focus:outline-none"
            />
            <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
          </label>
        </div>

        <div className="">
          <p className="py-3 px-6 w-44 text-center mx-auto rounded-md bg-brightRed text-white text-lg transition duration-700 hover:opacity-70 cursor-pointer">
            Sign in
          </p>
          <div className="flex justify-center mt-3">
            <p className=" text-center mt-4 pr-3"> Or Sign In with </p>
            <Image
              src={Google}
              alt="Google"
              className="hover:opacity-70  cursor-pointer"
            />
          </div>
        </div>
        <div>
          <p className="text-center mt-4">
            Don't have an Account?{" "}
            <a
              className="text-brightRed hover:opacity-70  cursor-pointer"
              href=""
            >
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;
