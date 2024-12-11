import { postApiData } from "@/utils/services/apiService";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [creationError, setCreationError] = useState(null);
  const [creationSuccess, setCreationSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { user_id, password, confirm_password, role } = data;

    if (password !== confirm_password) {
      setCreationError("Passwords do not match.");
      setCreationSuccess(null);
      return;
    }

    try {
      const payload = {
        user_id,
        password,
        role,
      };
      const response = await postApiData("CREATE_USER", payload);

      if (response.status) {
        setCreationSuccess("User created successfully!");
        reset();
        setCreationError(null);
      } else {
        setCreationError(response.message);
        setCreationSuccess(null);
      }
    } catch (error) {
      console.error("User creation failed:", error);
      setCreationError("An unexpected error occurred.");
      setCreationSuccess(null);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <image
            src="/images/image.png"
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirm_password"
              className="block text-sm font-medium text-gray-600"
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
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Role Input */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a role
              </option>
              <option value="fight_admin">Fight Admin</option>
              <option value="red_referee">Red Referee</option>
              <option value="blue_referee">Blue Referee</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create User
          </button>

          {/* Success and Error Messages */}
          {creationSuccess && (
            <p className="text-green-500 text-center mt-4">{creationSuccess}</p>
          )}
          {creationError && (
            <p className="text-red-500 text-center mt-4">{creationError}</p>
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

export default CreateUser;
