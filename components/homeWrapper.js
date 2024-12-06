import React from "react";
import Link from "next/link";
import { useState } from "react";
import CommonModal from "./common/commonModal";
import MatchForm from "./common/matchForm";

export default function HomeWrapper() {
  const [setUpMatchModal, setSetUpMatchModal] = useState(false);
  const onClickSetup = () => {
    setSetUpMatchModal(true);
  };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-red-500 to-blue-500 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">Punch Point Panel</h1>
        <nav className="flex space-x-4">
          <button
            onClick={onClickSetup}
            className="px-4 py-2 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-200"
          >
            Setup Match with form
          </button>
          <Link
            href="/setup"
            className="px-4 py-2 bg-white text-red-500 rounded-lg font-semibold hover:bg-gray-200"
          >
            Setup Match
          </Link>
          <Link
            href="/results"
            className="px-4 py-2 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Results
          </Link>
        </nav>
      </div>

      <CommonModal
        modalOpen={setUpMatchModal}
        setModalOpen={setSetUpMatchModal}
        backDrop={false}
      >
        <MatchForm />
      </CommonModal>
    </>
  );
}
