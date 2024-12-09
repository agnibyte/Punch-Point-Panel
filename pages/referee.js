import React, { useEffect, useState } from "react";
import RefreeWrapper from "@/components/refreeWrapper";
import { getCookie } from "@/utils/utils";
import { useRouter } from "next/router";

export default function Referee() {
  const router = useRouter();
  useEffect(() => {
    const isLoginCheck = getCookie("temp_auth");

    if (isLoginCheck != "true") {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <RefreeWrapper />
    </>
  );
}
