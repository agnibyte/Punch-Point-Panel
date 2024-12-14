import { useState } from "react";
import { useRouter } from "next/router";

export default function TraditionalMardaniSetUpForm({
  setTraditionalMatchModal,
}) {
  const [participantName, setParticipantName] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleMardaniMatchSubmit = () => {
    if (!participantName.trim()) {
      setError("Participant name is required.");
      return;
    }
    router.push(
      `/mardani-scoreboard?participant=${encodeURIComponent(participantName)}`
    );
    setTraditionalMatchModal(false); // Close the modal
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col items-center  p-6 shadow-md w-full  space-y-6">

        <div className="w-4/5">
          <label
            htmlFor="participantName"
            className="block text-gray-700 font-medium mb-2"
          >
            Participant Name
          </label>
          <input
            type="text"
            id="participantName"
            value={participantName}
            onChange={(e) => {
              setParticipantName(e.target.value);
              setError("");
            }}
            placeholder="Enter Participant Name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleMardaniMatchSubmit}
          className="w-1/3 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md transition-transform hover:bg-green-600 transform active:scale-95"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
