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
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

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
        setCookie("auth_role", response.user);
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
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/image.png"
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* User ID Input */}
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

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle input type
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 3c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.313 0-6-2.687-6-6s2.687-6 6-6 6 2.687 6 6-2.687 6-6 6zm0-9c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 2a1 1 0 110 2 1 1 0 010-2z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.94 4.94C1.708 6.172 1 8.003 1 10s.708 3.828 1.94 5.06l1.42-1.42C3.394 12.394 3 11.23 3 10c0-2.485 2.014-4.5 4.5-4.5.895 0 1.733.252 2.437.685l1.416-1.416A7.952 7.952 0 0010 3zm7.26 2.79c.663.398 1.24.94 1.705 1.536l1.42-1.42A8.98 8.98 0 0015 10c0 2.208-.785 4.227-2.09 5.79l1.42 1.42C15.66 15.66 17 12.947 17 10s-1.34-5.66-3.8-7.46zM4.04 8.04L5.465 9.465a4.467 4.467 0 01.85-.63L4.04 8.04zm8.06 7.92l1.42-1.42a4.467 4.467 0 01-.63-.85l-1.42 1.42zM7.535 5.535L6.12 6.95A4.467 4.467 0 016.95 7.535L7.535 5.535z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Login Error Message */}
          {loginError && (
            <p className="text-red-500 text-center mt-4">{loginError}</p>
          )}
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            All rights are reserved to{" "}
            <span className="font-semibold text-gray-700">Sports Mardani</span>{" "}
            and{" "}
            <a
              href="https://www.agni-byte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              AgniByte Private Limited
            </a>{" "}
            2024.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
