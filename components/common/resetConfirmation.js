import React from "react";

const ResetConfirmation = ({
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <div className="p-4">
      <p className="text-black m-5">
        Are You Sure Want To Reset Current Match?
      </p>

      <div className="flex justify-end">
        <div className="flex space-x-4 my-3 ">
          {/* Yes Button */}
          <button
            onClick={() => {
              onConfirm();
            }}
            className="px-6 py-2 bg-violet-700 text-white rounded  hover:bg-violet-950 transition duration-300"
          >
            {confirmText}
          </button>

          {/* No Button */}
          <button
            onClick={() => {
              onCancel();
            }}
            className="px-6 py-2 bg-transparent text-orange-500 rounded border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmation;
