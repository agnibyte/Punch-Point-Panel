import { postApiData } from "@/utils/services/apiService";

export default function UserSetup({}) {
  const newUuser = {};

  const onclick = async () => {
    const payload = {
      user_id: "fightreferee1",
      hash_password: "fightreferee@m1",
      role: "red_referee",
    };
    const response = await postApiData("REGISTER_NEW_USER", payload);
    if (response.status) {
    } else {
    }
  };

  return (
    <>
      <button
        onClick={onclick}
        className="text-xl text-white"
      >
        {" "}
        create user
      </button>
    </>
  );
}
