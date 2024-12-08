import React, { useEffect, useState } from "react";
import RefreeWrapper from "@/components/refreeWrapper";
import { getCookie } from "@/utils/utils";

export default function Referee() {
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
