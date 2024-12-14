import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomSearch from "./customSearch";
import { useRouter } from "next/router";

export default function StartMardaniMatchModal({ pendingMatches, refereePath  }) {
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

  // Function to handle match number selection
  const handleMatchChange = (value) => {
    setSelectedMatch(value); // Update state
    setValue("matchNumber", value); // Update form value
    clearErrors("matchNumber"); // Clear any validation errors
  };
  const onClickContinue = () => {
    localStorage.setItem("currentMatch", selectedMatch.value);
    router.push(refereePath);
  };

  return (
    <form
      onSubmit={handleSubmit(onClickContinue)}
      className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 min-h-full"
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
