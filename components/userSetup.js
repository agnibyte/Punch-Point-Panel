import { postApiData } from "@/utils/services/apiService";
import Image from "next/image";
import React, { useState } from "react";

export default function UserSetup() {
  // State for form data
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    confirm_password: "",
    role: "",
  });

  // State for success/error messages
  const [creationError, setCreationError] = useState(null);
  const [creationSuccess, setCreationSuccess] = useState(null);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input value changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target; // Get field name and value
    setFormData((prev) => ({ ...prev, [name]: value })); // Update state dynamically
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_id, password, confirm_password, role } = formData;

    // Password validation
    if (password !== confirm_password) {
      setCreationError("Passwords do not match.");
      setCreationSuccess(null);
      return;
    }

    try {
      const payload = { user_id, password, role };
      console.log("payload", payload);

      const response = await postApiData("REGISTER_NEW_USER", payload);

      if (response.status) {
        setCreationSuccess("User created successfully!");
        setCreationError(null);
        setFormData({
          user_id: "",
          password: "",
          confirm_password: "",
          role: "",
        }); // Reset form
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

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/image.png"
            alt="Logo"
            width={128}
            height={128}
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* User ID Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              User ID
            </label>
            <input
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              type="text"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter User ID"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option
                value=""
                disabled
              >
                Select Role
              </option>
              <option value="fight_admin">Fight Admin</option>
              <option value="red_referee">Red Referee</option>
              <option value="blue_referee">Blue Referee</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create User
          </button>

          {/* Success & Error Messages */}
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
            All rights reserved to{" "}
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
}
