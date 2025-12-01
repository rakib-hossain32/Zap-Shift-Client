import { useForm } from "react-hook-form";
import axios from "axios";

import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin/SocialLogin";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  // console.log(location);

  const { registerUser, profileUpdate } = useAuth();

  const handleRegister = (data) => {
    // console.log(data);

    const { email, password, name, photoUrl } = data;
    const image = photoUrl[0];
    // console.log(email, password, name, image);

    // console.log(apiKey);

    registerUser(email, password)
      .then(() => {
        // console.log(result.user);

        const formData = new FormData();
        formData.append("image", image);
        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        axios.post(url, formData).then((data) => {
          const photoURL = data.data.data.url;

          // create user in the database
          const userInfo = {
            email: email,
            displayName: name,
            photoURL: photoURL,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          const userProfile = {
            displayName: name,
            photoURL: photoURL,
          };

          profileUpdate(userProfile)
            .then(() => {
              // console.log();
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className=" mt-10">
      <h2
        className="text-secondary text-5xl
font-extrabold"
      >
        Create an Account
      </h2>
      <p className="text-zinc-600">Register with ZapShift</p>
      <div className="mt-7">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              // id="email"
              placeholder="Your Name"
              // autocomplete="email"
              className="py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-secondary focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
              PhotoUrl
            </label>
            <input
              type="file"
              {...register("photoUrl")}
              // id="email"
              placeholder="example.png"
              // autocomplete="url"
              className="file-input py-2 w-full rounded border border-gray-300 bg-slate-100 px-2  text-secondary focus:ring-2 focus:ring-lime-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm text-gray-400">
              Email
            </label>
            <input
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

          <button className="py-2.5 font-medium w-full rounded bg-lime-500 text-white transition-colors duration-300 hover:bg-lime-600 cursor-pointer mt-5">
            Create account
          </button>
          <p className="mt-5 text-gray-500">
            Already have an account ?{" "}
            <Link
              state={location.state}
              to={"/login"}
              className="underline hover:text-blue-500 text-blue-700"
            >
              login
            </Link>
          </p>
        </form>

        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
