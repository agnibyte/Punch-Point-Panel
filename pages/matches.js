import React, { useEffect, useState } from "react";
import AllMatchesWrapper from "@/components/allMatchesWrapper";
import { getCookie } from "@/utils/utils";
import { useRouter } from "next/router";

export default function Matches() {
  const router = useRouter();
  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");

    if (isLoginCheck != "true") {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <AllMatchesWrapper />
    </>
  );
}
