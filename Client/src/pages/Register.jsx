import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate= useNavigate()
  const { register, handleSubmit } = useForm();
  function onSubmit(data) {
    const { username, email, password, con_password } = data;
    if ((!username, !email, !password, !con_password)) {
      toast.error("please fill all the field");
      return;
    } else if (password.length < 6 || username.length < 3) {
      toast.error(
        "password must be 6 character and username must be 3 character"
      );
      return;
    } else if (data.password !== data.con_password) {
      toast.error("password not match");
      return;
    } else {
      const handleRegister = async (data) => {
        try {
          const { username, email, password } = data;
          const res = await axios.post("/auth/register", {
            username,
            email,
            password,
            con_password,
          });
          const result = await res.data;
          console.log(res,result);
          if (res.status === 201) {
            toast.success("Register Successfully");
            setTimeout(()=>{
              navigate("/login");
            },2000)
          }
       
        } catch (error) {
          console.log(error);
        }
      };

      handleRegister(data);
    }
  }

  return (
    <div class="w-full flex flex-col justify-center md:p-0 px-5  items-center bg-zinc-300  min-h-screen">
      <form
        class="bg-white max-w-md  shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
        </div>
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
        <div className="flex gap-4">
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              {...register("password")}
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="password"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Confirm-Password
            </label>
            <input
              {...register("con_password")}
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="con-password"
              type="text"
              placeholder="con-password"
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
            Already have a account ?{" "}
            <Link
              to={"/login"}
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      <p class="text-center text-white text-xs">
        &copy;2024 Chat Application. All rights reserved.
      </p>
    </div>
  );
};

export default Register;
