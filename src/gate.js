const GATE_KEY = "uz-trip-2026-gate";
const PASS = "1234";

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
  const root = document.getElementById("app");
  root.innerHTML = `
    <main class="gate">
      <form class="gate-card">
        <p class="eyebrow">Uzbekistan 2026</p>
        <h1>Lịch trình riêng</h1>
        <p class="muted">Nhập mật khẩu để mở trên máy này. Lần sau máy nhớ, không hỏi lại.</p>
        <label class="gate-label" for="gate-pass">Mật khẩu</label>
        <input id="gate-pass" name="password" type="password" inputmode="numeric" autocomplete="current-password" enterkeyhint="go" required />
        <p class="gate-error" role="alert"></p>
        <button class="btn btn-primary" type="submit">Mở lịch</button>
      </form>
    </main>`;

  const form = root.querySelector("form");
  const input = root.querySelector("#gate-pass");
  const error = root.querySelector(".gate-error");
  input.focus();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() !== PASS) {
      error.textContent = "Sai mật khẩu.";
      input.select();
      return;
    }
    rememberPass();
    openTrip();
  });
}

if (savedPass() === PASS) openTrip();
else showGate();
