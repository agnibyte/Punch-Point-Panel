import { useForm } from "react-hook-form";
import { useState } from "react";
import { postApiData } from "@/utils/services/apiService";
import { getConstant } from "@/utils/utils";

export default function TraditionalMatchForm({ setParticipantList }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [participantId, setParticipantId] = useState("");

  const onSubmit = async (data) => {
    setApiLoading(true);
    setShowSuccessMsg(false);
    setApiError(false);

    try {
      const response = await postApiData("ADD_TRADITIONAL_MATCH", data);

      if (response.status) {
        setParticipantId(response.participantId);

        // Update participant list
        setParticipantList((prevList) => [
          ...prevList,
          { id: response.participantId, ...data },
        ]);

        reset();
        setShowSuccessMsg(true);
      } else {
        setApiError(true);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      setApiError(true);
    }

    setApiLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-h-[75vh] overflow-y-auto rounded-lg space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 m-4 md:m-8">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Participant Name
            </label>
            <input
              type="text"
              placeholder="Enter Participant Name"
              className={`w-full p-4 border rounded-lg focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-500"
              }`}
              {...register("name", {
                required: "This field is required.",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Participant City
            </label>
            <input
              type="text"
              placeholder="Enter Participant City"
              className={`w-full p-4 border rounded-lg focus:ring-2 ${
                errors.city
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-gray-500"
              }`}
              {...register("city", {
                required: "This field is required.",
              })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors.city.message}
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
            {apiLoading ? getConstant("LOADING_TEXT") : "Submit"}
          </button>

          {apiError && (
            <div className="text-red-500 text-lg mt-3">
              {getConstant("SOMETHING_WRONG_TRY_LATER")}
            </div>
          )}
          {showSuccessMsg && participantId && (
            <div className="text-green-700 text-2xl my-6 font-bold">
              Successfully added participant with ID: {participantId}
            </div>
          )}
        </div>
      </form>
    </>
  );
}
