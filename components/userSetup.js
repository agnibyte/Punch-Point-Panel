import { postApiData } from "@/utils/services/apiService";

export default function UserSetup({}) {
  const newUuser = {};

  const onclick = async () => {
    const payload = {
      user_id: "fightadmin",
      hash_password: "fightadmin@m1",
      role: "fight_admin",
    };
    console.log("payload REGISTER_NEW_USER", payload);
    const response = await postApiData("REGISTER_NEW_USER", payload);
    console.log("response ===", response);
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