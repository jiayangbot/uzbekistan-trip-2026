const LANG_KEY = "uz-trip-2026-lang";

/** @typedef {"vi" | "en"} Lang */
/** @typedef {{ vi: string, en: string }} Copy */

/** @returns {Lang} */
export function getLang() {
  try {
    return localStorage.getItem(LANG_KEY) === "en" ? "en" : "vi";
  } catch {
    return "vi";
  }
}

/** @param {Lang} lang */
export function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
}

/** @param {Copy} copy */
export function pick(copy) {
  return getLang() === "en" ? copy.en : copy.vi;
}

/** @param {string} vi @param {string} en */
export function t(vi, en) {
  return getLang() === "en" ? en : vi;
}

export function applyLang() {
  document.documentElement.lang = getLang();
}
