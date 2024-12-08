import { constantsList } from "@/constants";

export const getConstant = (key) => {
  return constantsList[key.toUpperCase()] ?? null;
};
