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
    if (!data.matchNo) {
      return; // Validation handled by React Hook Form
    }

    const matchNumber = data.matchNo.match(/\d+/)?.[0] || ""; // Extracts the number from the match string
    const formData = {
      ...data,
      matchDetails: {
        match: data.matchNo,
        no: matchNumber,
      },
    };

    console.log(formData);

    reset();
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Match Details</h2>

        {/* Player in Red Corner */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Player in Red Corner
          </label>
          <input
            {...register("playerRed", { required: "This field is required." })}
            type="text"
            placeholder="Enter Red Corner Player"
            className={`w-full p-3 border rounded-lg focus:ring-2 ${
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

        {/* Player in Blue Corner */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Player in Blue Corner
          </label>
          <input
            {...register("playerBlue", { required: "This field is required." })}
            type="text"
            placeholder="Enter Blue Corner Player"
            className={`w-full p-3 border rounded-lg focus:ring-2 ${
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

        {/* Match Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Match No.
          </label>
          <Controller
            name="matchNo"
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 ${
                      errors.matchNo
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-gray-500"
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
          {errors.matchNo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.matchNo.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
