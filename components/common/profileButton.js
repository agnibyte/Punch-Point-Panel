import { convertFirstLetterCapital } from "@/utils/utils";
import { useState, useRef, useEffect } from "react";
import CommonModal from "./commonModal";
import ResetConfirmation from "./resetConfirmation";

const ProfileButton = ({ username, onclickLogOut }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [confirmationPopUp, setConfirmationPopUp] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const convetedUserName = convertFirstLetterCapital(username);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Function to close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setDropdownVisible(false); // Close dropdown if clicked outside
    }
  };

  // Set up event listener on component mount and cleanup on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Profile Button (circular) */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold"
      >
        {/* Use initial letter or profile image */}
        <span className="text-lg">{convetedUserName[0]}</span>
      </button>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg transition-all transform scale-95 opacity-0 animate-dropdown"
        >
          <div className="px-6 py-3 text-gray-800 font-semibold text-lg">
            {convetedUserName}
          </div>
          <div className="border-t border-gray-200">
            <button
              onClick={() => setConfirmationPopUp(true)}
              className="w-full text-left px-6 py-3 text-red-600 font-semibold hover:bg-gray-100 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      )}
      <CommonModal
        modalOpen={confirmationPopUp}
        setModalOpen={setConfirmationPopUp}
        backDrop={false}
      >
        <ResetConfirmation
          title={"Are You Sure Want To Log Out?"}
          onConfirm={() => {
            onclickLogOut();
          }}
          onCancel={() => {
            setConfirmationPopUp(false);
          }}
        />
      </CommonModal>
    </div>
  );
};

export default ProfileButton;
