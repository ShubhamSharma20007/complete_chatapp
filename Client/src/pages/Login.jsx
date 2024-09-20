import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { email, password } = data;
    if ((!email, !password)) {
      toast.error("All fields are required");
    }
    handlePostRequest(data);
  };

  const handlePostRequest = async (data) => {
    const { email, password } = data;
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      const result = await res.data;
      if (res.status === 200) {
        localStorage.setItem("chat-app-user", JSON.stringify(result.user));
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  

 
 
  return (
    <div class="w-full flex flex-col justify-center md:p-0 px-5  items-center   min-h-screen  bg-zinc-300">
      <form
        class="bg-white max-w-md w-full   shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <div className=" gap-4">
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <p>
            Create a new account{" "}
            <Link
              to={"/register"}
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
      <p class="text-center text-zinc-800 text-xs">
        &copy;2024 Chat Application. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
