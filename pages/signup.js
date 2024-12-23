import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { postApiData } from "@/utils/services/apiService";
import { setCookie } from "@/utils/utils";
import Image from "next/image";

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
  const [isFormLoading, setIsFormLoading] = useState(true);

  const onSubmit = async (data) => {
    const { user_id, password, login_type } = data; // Login type added
    setLoading(true);
    try {
      const payload = { user_id, password, login_type }; // Include login_type in the payload
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
      setLoginError("An error occurred during login.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const formTimer = setTimeout(() => setIsFormLoading(false), 1000);
    return () => clearTimeout(formTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Header Section */}
      <header className="bg-purpule/20 backdrop-blur-md shadow-md sticky top-0 z-10">
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
      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-lg shadow-xl flex flex-col items-stretch overflow-hidden">
          {/* Login Form Section */}
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
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/image.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="w-20 h-auto"
                  />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                  Login
                </h2>
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

                      {/* Admin Option */}
                      <option value="fight_admin">Main Admin</option>

                      {/* Mardani Referees */}
                      <optgroup label="Mardani Referees">
                        <option value="red_referee">Red Mardani Referee</option>
                        <option value="blue_referee">
                          Blue Mardani Referee
                        </option>
                      </optgroup>

                      {/* Traditional Referees */}
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
                    {loading ? "Loading..." : "Login"}
                  </button>
                  {loginError && (
                    <p className="text-red-500 text-center mt-3">
                      {loginError}
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
    </div>
  );
};

export default Login;
