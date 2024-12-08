import { constantsList } from "@/constants";
const crypto = require("crypto");
export const getConstant = (key) => {
  return constantsList[key.toUpperCase()] ?? null;
};

export const hashWithSHA256 = (input) => {
  return crypto.createHash("sha256").update(input).digest("hex");
};

export function setCookie(name, value, expiry = null) {
  let cookie = "; path=/";
  if (expiry != null) {
    let date = new Date();
    date.setTime(date.getTime() + expiry * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    cookie = expires + "; path=/";
  }

  document.cookie = name + "=" + (value || "") + cookie;
}

export const getCookie = (name) => {
  if (typeof document == "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export const getUniqueKey = (length = 12) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
