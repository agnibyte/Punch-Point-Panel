import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postApiData } from "@/utils/services/apiService";
import { setCookie } from "@/utils/utils";
import Image from "next/image";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [signupError, setSignupError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const onSubmit = async (data) => {
    const { user_id, password, confirm_password, login_type } = data;
    if (password !== confirm_password) {
      setSignupError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const payload = { user_id, password, login_type };
      const response = await postApiData("SIGNUP_USER", payload); // Update endpoint to SIGNUP_USER

      if (response.status) {
        setCookie("temp_auth", true);
        setCookie("auth_role", response.user);
        setCookie("auth_user", response.userId);
        router.push("/"); // Redirect to homepage or dashboard after successful signup
      } else {
        setSignupError(response.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setSignupError("An error occurred during signup.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const formTimer = setTimeout(() => setIsFormLoading(false), 1000);
    return () => clearTimeout(formTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Header Section */}
      <header className="bg-purple/20 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/images/image.png"
              alt="Logo"
              width={50}
              height={50}
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
            <span className="text-xl font-bold text-white">
              3rd National Mardani Sports Championship 2024
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center py-10">
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-lg shadow-xl flex flex-col items-stretch overflow-hidden">
          {/* Signup Form Section */}
          <div className="flex-1 w-full p-8 md:p-12 bg-white/80 backdrop-blur-md">
            {isFormLoading ? (
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 animate-pulse rounded-lg"></div>
                <div className="h-12 bg-gray-300 animate-pulse rounded-lg"></div>
                <div className="h-12 bg-gray-300 animate-pulse rounded-lg"></div>
                <div className="h-10 bg-gray-300 animate-pulse rounded-lg"></div>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold text-center text-gray-800 mb-6">
                  Sign Up
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="user_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      User ID
                    </label>
                    <input
                      id="user_id"
                      type="text"
                      {...register("user_id", {
                        required: "User ID is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />
                    {errors.user_id && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.user_id.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3 text-gray-600"
                      >
                        {showPassword ? "👀" : "🙈"}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirm_password"
                        type={showPassword ? "text" : "password"}
                        {...register("confirm_password", {
                          required: "Please confirm your password",
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      />
                    </div>
                    {errors.confirm_password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.confirm_password.message}
                      </p>
                    )}
                  </div>

                  {/* Login Type Selection */}
                  <div>
                    <label
                      htmlFor="login_type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Login Type
                    </label>
                    <select
                      id="login_type"
                      {...register("login_type", {
                        required: "Please select a login type",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    >
                      <option value="">-- Select Login Type --</option>
                      <option value="fight_admin">Main Admin</option>
                      <optgroup label="Mardani Referees">
                        <option value="red_referee">Red Mardani Referee</option>
                        <option value="blue_referee">Blue Mardani Referee</option>
                      </optgroup>
                      <optgroup label="Traditional Referees">
                        <option value="traditional_referee_1">
                          Traditional Referee 1
                        </option>
                        <option value="traditional_referee_2">
                          Traditional Referee 2
                        </option>
                        <option value="traditional_referee_3">
                          Traditional Referee 3
                        </option>
                        <option value="traditional_referee_4">
                          Traditional Referee 4
                        </option>
                      </optgroup>
                    </select>
                    {errors.login_type && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.login_type.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                  {signupError && (
                    <p className="text-red-500 text-center mt-3">
                      {signupError}
                    </p>
                  )}
                </form>
                <p className="text-center text-gray-600 mt-4">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-500 hover:underline">
                    Log in
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            © 2024 Mardani Sports Federation India. All rights reserved.
          </p>
          <p className="text-sm mt-2">
            Developed by{" "}
            <a
              href="https://www.agni-byte.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              AgniByte Private Limited
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
