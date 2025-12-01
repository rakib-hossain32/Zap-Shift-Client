import React, { useRef,  } from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { signInUser,  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef()
  
  // console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    // console.log(data);
    const { email, password } = data;
    
    // console.log(email, password)

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");

        
      })
      .catch((err) => toast.error(err.message));
  };

  const handleForgotPass = () => { 
    
    // console.log(emailRef.current.value)
// passwordReset()
   }

  return (
    <div className="mt-10">
      <h2
        className="text-secondary text-5xl
font-extrabold"
      >
        Welcome Back
      </h2>
      <p className="text-zinc-600">Login with ZapShift</p>
      <div className="mt-7">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
              Email
            </label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              {...register("email", {
                required: true,
              })}
              placeholder="name@example.com"
              // autocomplete="email"
              className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-secondary focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">type valid email</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              placeholder="Password"
              // autocomplete="new-password"
              className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-secondary focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">password must be 6 digit or longer</p>
            )}
          </div>
          <div className="mb-2 ">
            <button
              type="button"
              onClick={handleForgotPass}
              className="text-sm text-gray-400 hover:text-indigo-500 underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
          <button className="py-2.5 font-medium w-full rounded bg-lime-500 text-white transition-colors duration-300 hover:bg-lime-600 cursor-pointer">
            Login
          </button>
          <p className="mt-5 text-gray-500">
            Create a new account{" "}
            <Link
              state={location.state}
              to={"/register"}
              className="underline hover:text-blue-500 text-blue-700"
            >
              register
            </Link>
          </p>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
