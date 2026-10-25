import { getLang } from "./i18n.js";
import { en } from "./en.js";

/** @param {string} value */
export function tr(value) {
  if (typeof value !== "string" || getLang() !== "en") return value;
  return Object.prototype.hasOwnProperty.call(en, value) ? en[value] : value;
}
