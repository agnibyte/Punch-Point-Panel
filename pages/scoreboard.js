import GradientBackground from "@/components/GradientBackground";
import Scoreboard from "@/components/Scoreboard";
import { getCookie } from "@/utils/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SetUp() {
  const router = useRouter();
  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");

    if (isLoginCheck != "true") {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {/* <GradientBackground> */}
      <Scoreboard />
    </>
  );
}
