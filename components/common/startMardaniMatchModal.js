import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomSearch from "./customSearch";
import { useRouter } from "next/router";

export default function StartMardaniMatchModal({
  pendingMatches,
  refereePath,
}) {
  // Initialize the React Hook Form
  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm();
  const router = useRouter();

  // State to manage the selected match number
  const [selectedMatch, setSelectedMatch] = useState("");
  const [timerDuration, setTimerDuration] = useState(1.5); // Default is 1.5 minutes

  // Function to handle match number selection
  const handleMatchChange = (value) => {
    setSelectedMatch(value); // Update state
    setValue("matchNumber", value); // Update form value
    clearErrors("matchNumber"); // Clear any validation errors
  };

  // Toggle between 1.5 and 3 minutes
  const handleTimerToggle = () => {
    setTimerDuration(timerDuration === 1.5 ? 3 : 1.5); // Toggle the timer
  };

  const onClickContinue = () => {
    // Save the selected match number and timer duration in localStorage
    localStorage.setItem("currentMatch", selectedMatch.value);
    localStorage.setItem("matchTimer", timerDuration);
    router.push(refereePath); // Redirect to the referee path
  };

  return (
    <form
      onSubmit={handleSubmit(onClickContinue)}
      className="p-6 bg-white shadow-lg  border border-gray-200 min-h-full"
    >
      {/* Match Number Field */}
      <div className="mb-6">
        <label
          htmlFor="matchNumber"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Match Number
        </label>
        <Controller
          control={control}
          name="matchNumber"
          rules={{ required: "Please select a match number." }}
          render={({ field }) => (
            <CustomSearch
              name="matchNumber"
              selectedValue={selectedMatch} // Bind selected value
              options={pendingMatches} // Match number options
              onChange={(value) => {
                field.onChange(value); // Update form's internal state
                handleMatchChange(value); // Update local state and handle changes
              }}
              placeholder="Please select Match Number"
              isSearchable={true}
              className="w-full p-4 border text-xl border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          )}
        />
        {/* Error message */}
        {errors?.matchNumber && (
          <span
            className="text-red-500 text-base mt-1 block"
            aria-hidden="true"
          >
            {errors.matchNumber.message}
          </span>
        )}
      </div>

      {/* Timer Duration Toggle (On/Off) */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-700 mb-2">
          Match Timer
        </label>
        <div className="flex items-center space-x-4">
          <div
            className={`relative inline-block w-10 h-5 cursor-pointer rounded-full transition-colors duration-300 ${
              timerDuration === 1.5 ? "bg-gray-500" : "bg-yellow-400"
            }`}
            onClick={handleTimerToggle}
          >
            <div
              className={`absolute top-[0.2rem] w-3 h-3 bg-white rounded-full shadow-md transition-transform duration-300 ${
                timerDuration === 1.5
                  ? "transform translate-x-1"
                  : "transform translate-x-6"
              }`}
            />
          </div>
          <span className="text-lg">
            {timerDuration == 1.5 ? "1:30" : "3:00"}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-indigo-500 text-white text-lg font-medium py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 transition focus:ring-4 focus:ring-indigo-300"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
