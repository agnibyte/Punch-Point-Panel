import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postApiData } from "@/utils/services/apiService";
import { setCookie } from "@/utils/utils";
import Image from "next/image";
import ReactPlayer from "react-player";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);

  const onSubmit = async (data) => {
    const { user_id, password } = data;
    setLoading(true);
    try {
      const payload = { user_id, password };
      const response = await postApiData("VERIFY_USER", payload);

      if (response.status) {
        setCookie("temp_auth", true);
        setCookie("auth_role", response.user);
        setCookie("auth_user", response.userId);
        router.push("/");
      } else {
        setLoginError(response.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const videoTimer = setTimeout(() => setIsVideoLoading(false), 1500);
    const formTimer = setTimeout(() => setIsFormLoading(false), 1000);
    return () => {
      clearTimeout(videoTimer);
      clearTimeout(formTimer);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-700 to-gray-800">
      {/* Header Section */}
      <header className="bg-gray-900/50 backdrop-blur-md shadow-md sticky top-0 z-10">
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
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-lg shadow-xl flex flex-col md:flex-row items-stretch overflow-hidden">
          {/* Left Section - Video */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-800">
            {isVideoLoading ? (
              <div className="w-full h-full bg-gray-600 animate-pulse rounded-lg"></div>
            ) : (
              <ReactPlayer
                url="https://www.youtube.com/watch?v=JvSVgaOl1ew"
                width="100%"
                height="100%"
                controls
                className="rounded-lg"
              />
            )}
          </div>

          {/* Login Form Section */}
          <div className="flex-1 w-full p-8 md:p-12 bg-gray-900">
            {isFormLoading ? (
              <div className="space-y-4">
                <div className="h-8 bg-gray-700 animate-pulse rounded-lg"></div>
                <div className="h-12 bg-gray-700 animate-pulse rounded-lg"></div>
                <div className="h-12 bg-gray-700 animate-pulse rounded-lg"></div>
                <div className="h-10 bg-gray-700 animate-pulse rounded-lg"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/image.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="w-20 h-auto"
                  />
                </div>
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                  Login
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="user_id"
                      className="block text-sm font-medium text-gray-300"
                    >
                      User ID
                    </label>
                    <input
                      id="user_id"
                      type="text"
                      {...register("user_id", {
                        required: "User ID is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
                      className="block text-sm font-medium text-gray-300"
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
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3 text-gray-500"
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-lg hover:from-green-500 hover:to-green-700 transition-all"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                  {loginError && (
                    <p className="text-red-500 text-center mt-3">
                      {loginError}
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-auto">
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

export default Login;
