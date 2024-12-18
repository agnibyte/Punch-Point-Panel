import { postApiData } from "@/utils/services/apiService";
import { getConstant, setCookie } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl flex flex-col md:flex-row items-stretch">
        {/* Left Section - Embedded Video or Play Button */}
        <div className="flex-1 flex items-center justify-center p-4 bg-gray-200 rounded-l-lg">
          {/* For Desktop */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/lVLKVuJsYxw"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            className="rounded-lg w-full h-full hidden md:block"
          ></iframe>

          {/* For Mobile */}
          <button
            onClick={() =>
              window.open("https://www.youtube.com/watch?v=lVLKVuJsYxw", "_blank")
            }
            className="bg-blue-600 text-white text-sm font-semibold py-3 px-5 rounded-lg shadow-md hover:bg-blue-700 transition-all md:hidden"
          >
            ▶ Play Video
          </button>
        </div>

        {/* Login Form Section */}
        <div className="flex-1 w-full p-6 md:p-10">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/image.png"
              alt="Logo"
              width={80}
              height={80}
              className="w-20 h-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                User ID
              </label>
              <input
                id="user_id"
                type="text"
                {...register("user_id", { required: "User ID is required" })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.user_id && <p className="text-red-500 text-xs mt-1">{errors.user_id.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? "👀" : "🙈"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            {loginError && <p className="text-red-500 text-center mt-3">{loginError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
