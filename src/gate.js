import { applyLang, getLang, setLang, t } from "./i18n.js";

const GATE_KEY = "uz-trip-2026-gate";
const PASS = "higo";

function savedPass() {
  try {
    return localStorage.getItem(GATE_KEY);
  } catch {
    return null;
  }
}

function rememberPass() {
  localStorage.setItem(GATE_KEY, PASS);
}

function openTrip() {
  document.body.classList.add("is-open");
  // Trip data stays out of this file until the password matches.
  return import("./main.js");
}

function showGate() {
  applyLang();
  const root = document.getElementById("app");
  const current = getLang();
  root.innerHTML = `
    <main class="gate">
      <form class="gate-card">
        <div class="lang-switch" role="group" aria-label="${t("Ngôn ngữ", "Language")}">
          <button type="button" data-lang="vi" aria-pressed="${current === "vi"}">VI</button>
          <button type="button" data-lang="en" aria-pressed="${current === "en"}">EN</button>
        </div>
        <p class="eyebrow">Uzbekistan 2026</p>
        <h1>${t("Lịch trình riêng", "Private itinerary")}</h1>
        <p class="muted">${t("Nhập mật khẩu để mở trên máy này. Lần sau máy nhớ, không hỏi lại.", "Enter the password to open it on this phone. This phone remembers it next time.")}</p>
        <label class="gate-label" for="gate-pass">${t("Mật khẩu", "Password")}</label>
        <input id="gate-pass" name="password" type="password" autocomplete="current-password" enterkeyhint="go" required />
        <p class="gate-error" role="alert"></p>
        <button class="btn btn-primary" type="submit">${t("Mở lịch", "Open")}</button>
      </form>
    </main>`;

  const form = root.querySelector("form");
  const input = root.querySelector("#gate-pass");
  const error = root.querySelector(".gate-error");
  input.focus();
  root.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-lang");
      if (value !== "vi" && value !== "en") return;
      setLang(value);
      showGate();
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() !== PASS) {
      error.textContent = t("Sai mật khẩu.", "Wrong password.");
      input.select();
      return;
    }
    rememberPass();
    openTrip();
  });
}

if (savedPass() === PASS) openTrip();
else showGate();
