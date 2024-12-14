import { postApiData } from "@/utils/services/apiService";
import { getConstant, setCookie } from "@/utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const Login = ({ test }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  const onSubmit = async (data) => {
    const { user_id, password } = data;

    setLoading(true);
    try {
      const payload = {
        user_id: user_id,
        password: password,
      };
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouseX = 0,
      mouseY = 0,
      stopTimer = null,
      isMoving = false;

    const drawLines = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMoving) {
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(mouseX - 50, mouseY);
        ctx.lineTo(mouseX + 50, mouseY);
        ctx.stroke();

        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(mouseX, mouseY - 50);
        ctx.lineTo(mouseX, mouseY + 50);
        ctx.stroke();

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(mouseX - 35, mouseY - 35);
        ctx.lineTo(mouseX + 35, mouseY + 35);
        ctx.stroke();
      } else {
        // Draw circle when the mouse stops
        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(drawLines);
    };

    const onMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      isMoving = true;

      clearTimeout(stopTimer);
      stopTimer = setTimeout(() => {
        isMoving = false;
      }, 200);
    };

    window.addEventListener("mousemove", onMouseMove);
    drawLines();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl z-10">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/image.png"
            alt="Logo"
            className="w-32 h-auto"
            width={"128"}
            height={"128"}
          />
        </div>
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
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? "👀" : "🙈"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? getConstant("LOADING_TEXT") : "Login"}
          </button>
          {loginError && (
            <p className="text-red-500 text-center mt-4">{loginError}</p>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            All rights are reserved to{" "}
            <span className="font-semibold text-gray-700">
              Mardani Sports Federation India
            </span>{" "}
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
