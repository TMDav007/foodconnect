import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Google from "./../public/assets/google.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { login, setCredentials } from "../store/authSlice";

export default function Signin({ signIn, providers }) {
  const dispatch = useDispatch();
  const {loading, isAuthenticated} = useSelector((state) => state.auth);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      //dispatch(reset_register_success());
    }
  }, [dispatch]);

    useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const onSubmit = async (loginData) => {
    //console.log(loginData);
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      try {
        const res = await dispatch(login(loginData)).unwrap();
        console.log(res);
      } catch (err) {
        console.log(err, "errr");
      }
    }
    console.log(isAuthenticated, "äurhejs");
    if (typeof window !== "undefined" && isAuthenticated) {
      router.push("/dashboard");
    }
    // const res = await signIn("credentials", {
    //   email: loginData.email,
    //   password: loginData.password,
    //   callbackUrl: `${window.location.origin}/dashboard`,
    //   redirect: false,
    // });

    // if (res?.error) console.log(res.error)
    // if (res.url) router.push(res.url);
  };

  return (
    <div className="relative mt-28 mx-auto py-5 w-2/6 bg-white rounded-md border border-borderColor">
      <p className="p-8 font-medium text-xl">
        Welcome back!
        <span className="text-brightRed tracking-wide"> Sign in</span>
      </p>

      <form className="mx-auto w-4/5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block">
            <span className="block text-lg text-brownBlack">Email</span>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              className={`mt-1 w-full px-3 py-4 border shadow-sm border-transparent focus:order-slate-300 focus:ring-0 ${
                errors.email ? "border-pink-600" : "border-slate-300"
              } rounded-md focus:outline-none `}
            />
            <p className="mt-2 mb-3 peer-invalid:visible text-pink-600 text-sm">
              {errors.email?.message}
            </p>
          </label>
        </div>

        <div className="relative">
          <div>
            <label className="block">
              <span className="block text-lg text-brownBlack">Password</span>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be greater than 5",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className={`mt-1 w-full px-3 py-4 border shadow-sm border-transparent focus:order-slate-300 focus:ring-0 ${
                  errors.password ? "border-pink-600" : "border-slate-300"
                } rounded-md focus:outline-none `}
              />
              <p className="mt-2 peer-invalid:visible text-pink-600 mb-4 text-sm">
                {errors.password?.message}
              </p>
            </label>
          </div>
          <div
            className="absolute text-2xl top-12 right-5 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>

        <div className="">
          <button className="py-3 flex justify-center px-6 w-44 text-center mx-auto rounded-md bg-brightRed text-white text-lg transition duration-700 hover:opacity-70 cursor-pointer">
            Sign in
          </button>
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

// Signin.getInitialProps = async (context) => {
//   const { req, res } = context;
//   const session = await getSession({ req });
//   console.log("Im working")
//   if (session && res & session.accessToken) {
//     res.writeHead(302, {
//       location: "/",
//     });
//     res.end();
//   }

//   return {
//     session: undefined,
//     providers: await provider(context),
//   };
// };
