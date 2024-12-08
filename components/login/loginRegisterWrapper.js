// components/Login.js
import { postApiData } from "@/utils/services/apiService";
import { setCookie } from "@/utils/utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Login = ({ test }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (data) => {
    const { user_id, password } = data;

    try {
      const payload = {
        user_id: user_id,
        password: password,
      };
      const response = await postApiData("VERIFY_USER", payload);

      if (response.status) {
        setCookie("temp_auth", true);
        router.push("/");
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-600"
            >
              User ID
            </label>
            <input
              id="user_id"
              type="text"
              {...register("user_id", { required: "User ID is required" })}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.user_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.user_id.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          {loginError && (
            <p className="text-red-500 text-center mb-4">{loginError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
