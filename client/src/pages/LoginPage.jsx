import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { authAsyncThunk } from "../redux/asyncThunk/user.asyncThunk";
import { AiOutlineLoading } from "react-icons/ai";
import { logo6 } from "../assets";
import LoadingSvg from "../component/LoadingSvg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { status } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(authAsyncThunk.loginAsyncThunk(data));
  };

  return (
    <div
      className="mainDiv"
      style={{
        background: `url(${logo6})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-80"
        >
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              defaultValue="rsc1401590@gmail.com"
              id="email"
              type="text"
              {...register("email", { required: true })}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              defaultValue="12345"
              id="password"
              type="password"
              {...register("password", { required: true })}
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={status === "pending"}
              type="submit"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {status === "pending" ? <LoadingSvg /> : "Log In "}
            </button>
           
          </div>
          <div>
            <span className="text-sm" >Do not have an account?</span>{" "}
            <Link to={"/register"}>Sign up</Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
