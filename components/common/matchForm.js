import { useForm, Controller } from "react-hook-form";
import { Combobox } from "@headlessui/react";
import { useState } from "react";
import { postApiData } from "@/utils/services/apiService";
import { getConstant } from "@/utils/utils";
import { useRouter } from "next/router";

const matchNumbers = Array.from({ length: 50 }, (_, i) => `Match ${i + 1}`);

export default function MatchForm({ setSetUpMatchModal }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  const defaultFormData = {
    matchName: "",
    playerRed: "",
    stateRed: "",
    playerBlue: "",
    stateBlue: "",
    category: "",
    age: "",
    weight: "",
    matchDetails: {},
  };

  const [query, setQuery] = useState("");
  const [formData, setFormData] = useState(defaultFormData);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [CreatedMatchNo, setCreatedMatchNo] = useState("");

  const filteredMatches =
    query === ""
      ? matchNumbers
      : matchNumbers.filter((match) =>
          match.toLowerCase().includes(query.toLowerCase())
        );

  const updateSelectedForm = (type, value) => {
    const updatedFormData = { ...formData };
    updatedFormData[type] = value;
    setFormData(updatedFormData);
    setShowSuccessMsg(false);
  };

  const onSubmit = async (data) => {
    const matchNumber = data.matchName?.match(/\d+/)?.[0] || "";
    const updatedData = {
      ...formData,
      matchDetails: {
        matchName: formData.matchName,
        matchNo: matchNumber,
      },
    };

    setFormData(updatedData);

    const payload = {
      ...updatedData,
      // matchName: formData.matchName,
      // matchNo: matchNumber,
    };
    setApiLoading(true);
    setApiError("");
    console.log("payload ADD_FIGHT_MATCH", payload);
    try {
      const response = await postApiData("ADD_FIGHT_MATCH", payload);
      console.log("response", response);
      if (response.status) {
        setCreatedMatchNo(response.matchNo);
        reset();
        setFormData(defaultFormData);
        setShowSuccessMsg(true);
      } else {
        setApiError(true);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
    setApiLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-h-[75vh] overflow-y-auto rounded-lg space-y-8"
      >
        {/* <div className="m-4 md:m-8">
         
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Match Number
          </label>
          <Controller
            name="matchName"
            control={control}
            rules={{ required: "Please select a match." }}
            render={({ field }) => (
              <Combobox
                value={formData.matchName}
                onChange={(value) => {
                  field.onChange(value);
                  updateSelectedForm("matchName", value);
                }}
              >
                <div className="relative">
                  <Combobox.Input
                    onChange={(e) => {
                      setQuery(e.target.value);
                      updateSelectedForm("matchName", e.target.value);
                    }}
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
        </div> */}

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
                type="text"
                placeholder="Enter Red Corner Player Name"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.playerRed
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
                {...register("playerRed", {
                  required: "This field is required.",
                  onChange: (e) =>
                    updateSelectedForm("playerRed", e.target.value),
                })}
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
                type="text"
                placeholder="Enter State"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.stateRed
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
                {...register("stateRed", {
                  required: "This field is required.",
                  onChange: (e) =>
                    updateSelectedForm("stateRed", e.target.value),
                })}
              />
              {errors.stateRed && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stateRed.message}
                </p>
              )}
            </div>
          </div>

          {/* Blue Corner */}
          <div className="p-6 bg-blue-50 border-r-4 border-blue-500 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Blue Corner
            </h3>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Player Name
              </label>
              <input
                type="text"
                placeholder="Enter Blue Corner Player Name"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.playerBlue
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
                {...register("playerBlue", {
                  required: "This field is required.",
                  onChange: (e) =>
                    updateSelectedForm("playerBlue", e.target.value),
                })}
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
                type="text"
                placeholder="Enter State"
                className={`w-full p-4 border rounded-lg focus:ring-2 ${
                  errors.stateBlue
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-gray-500"
                }`}
                {...register("stateBlue", {
                  required: "This field is required.",
                  onChange: (e) =>
                    updateSelectedForm("stateBlue", e.target.value),
                })}
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
              type="text"
              placeholder="Enter Category"
              className={`w-full p-4 border rounded-lg focus:ring-2 ${
                errors.category
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-500"
              }`}
              {...register("category", {
                required: "This field is required.",
                onChange: (e) => updateSelectedForm("category", e.target.value),
              })}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="text"
              maxLength="2"
              placeholder="Enter Age"
              className={`w-full p-4 border rounded-lg focus:ring-2 ${
                errors.age
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-500"
              }`}
              {...register("age", {
                required: "This field is required.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter valid number.",
                },
                onChange: (e) => updateSelectedForm("age", e.target.value),
              })}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              Weight (kg)
            </label>
            <input
              type="text"
              maxLength="3"
              placeholder="Enter Weight"
              className={`w-full p-4 border rounded-lg focus:ring-2 ${
                errors.weight
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-500"
              }`}
              {...register("weight", {
                required: "This field is required.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter valid number.",
                },
                onChange: (e) => updateSelectedForm("weight", e.target.value),
              })}
            />
            {errors.weight && (
              <p className="text-red-500 text-sm mt-1">
                {errors.weight.message}
              </p>
            )}
          </div>
        </div>

        {/* Sticky Submit Button */}
        <div className="sticky bottom-0 bg-white shadow-lg p-4 flex flex-col justify-center items-center">
          <button
            type="submit"
            className="w-1/2 bg-indigo-500 text-white text-lg p-4 rounded-lg hover:bg-indigo-600 transition"
            disabled={apiLoading}
          >
            {apiLoading ? getConstant("LOADING_TEXT") : "submit & add more"}
          </button>
          {apiError && (
            <div className=" text-red-500 text-lg mt-3">
              {getConstant("SOMETHING_WRONG_TRY_LATER")}
            </div>
          )}
          {showSuccessMsg && CreatedMatchNo && (
            <div className=" text-green-700 text-2xl my-6">
              You have successfully created the match. The match number is:{" "}
              {CreatedMatchNo}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
