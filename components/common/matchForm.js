import { useForm, Controller } from "react-hook-form";
import { Combobox } from "@headlessui/react";
import { useState } from "react";

const matchNumbers = Array.from({ length: 50 }, (_, i) => `Match ${i + 1}`);

export default function MatchForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [query, setQuery] = useState("");

  const filteredMatches =
    query === ""
      ? matchNumbers
      : matchNumbers.filter((match) =>
          match.toLowerCase().includes(query.toLowerCase())
        );

  const onSubmit = (data) => {
    const matchNumber = data.matchName?.match(/\d+/)?.[0] || ""; // Extract match number
    const formData = {
      ...data,
      matchName: data.matchName,
      matchDetails: {
        matchName: data.matchName,
        matchNo: matchNumber,
      },
    };

    console.log(formData);
    // reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-h-[70vh] overflow-y-auto  rounded-lg  space-y-8"
      >
        {" "}
        {/* Title */}
        <div className="m-4 md:m-8">
          <p className="text-center text-gray-600">
            Please fill out the match and player details below.
          </p>
          {/* Match Number */}
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Match Number
          </label>
          <Controller
            name="matchName"
            control={control}
            rules={{ required: "Please select a match." }}
            render={({ field }) => (
              <Combobox
                value={field.value || ""}
                onChange={(value) => field.onChange(value)}
              >
                <div className="relative">
                  <Combobox.Input
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Match No."
                    className={`w-full p-4 border rounded-lg text-gray-700 focus:ring-2 ${
                      errors.matchName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-indigo-500"
                    }`}
                  />
                  <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg z-10">
                    {filteredMatches.length > 0 ? (
                      filteredMatches.map((match, idx) => (
                        <Combobox.Option
                          key={idx}
                          value={match}
                          className={({ active }) =>
                            `cursor-pointer select-none px-4 py-2 ${
                              active ? "bg-gray-200" : ""
                            }`
                          }
                        >
                          {match}
                        </Combobox.Option>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No results found
                      </div>
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            )}
          />
          {errors.matchName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.matchName.message}
            </p>
          )}
        </div>
        {/* Players' Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4 md:m-8">
          {/* Red Corner */}
          <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              Red Corner
            </h3>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Player Name
              </label>
              <input
                {...register("playerRed", {
                  required: "This field is required.",
                })}
                type="text"
                placeholder="Enter Red Corner Player Name"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.playerRed
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
              />
              {errors.playerRed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.playerRed.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <input
                {...register("stateRed", {
                  required: "This field is required.",
                })}
                type="text"
                placeholder="Enter State"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.stateRed
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
              />
              {errors.stateRed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stateRed.message}
                </p>
              )}
            </div>
          </div>

          {/* Blue Corner */}
          <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Blue Corner
            </h3>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Player Name
              </label>
              <input
                {...register("playerBlue", {
                  required: "This field is required.",
                })}
                type="text"
                placeholder="Enter Blue Corner Player Name"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.playerBlue
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
              />
              {errors.playerBlue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.playerBlue.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">
                State
              </label>
              <input
                {...register("stateBlue", {
                  required: "This field is required.",
                })}
                type="text"
                placeholder="Enter State"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.stateBlue
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
              />
              {errors.stateBlue && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stateBlue.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Additional Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-4 md:m-8">
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              {...register("category", { required: "This field is required." })}
              type="text"
              placeholder="Enter Category"
              className="w-full p-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              {...register("age", { required: "This field is required." })}
              type="number"
              placeholder="Enter Age"
              className="w-full p-4 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Weight (kg)
            </label>
            <input
              {...register("weight", { required: "This field is required." })}
              type="number"
              placeholder="Enter Weight"
              className="w-full p-4 border rounded-lg"
            />
          </div>
        </div>
        <div className="sticky bottom-0 bg-white shadow-lg p-4">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
