import { days, hotelStays, hotelOptions, meta } from "./trip-data.js";
import { dayDetails, stayLinks, mapLink, packing, masterChecklist, sources } from "./trip-guide.js";
import { icon } from "./icons.js";

const STORE_KEY = "uz-trip-2026-checks";

const fmtMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const fmtWeekday = new Intl.DateTimeFormat("vi-VN", { weekday: "short" });
const fmtLong = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "numeric", month: "long" });

/** @typedef {"meeting" | "travel" | "flight" | "sight" | "weekend" | "work"} DayKind */
/** @typedef {"all" | "meeting" | "travel" | "move"} Filter */

function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function shortDate(iso) {
  const d = parseDate(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function perNight(total, nights) {
  return fmtMoney.format(Math.round(total / nights));
}

/** @returns {DayKind} */
function dayKind(entry) {
  if (/MEETING/i.test(entry.work)) return "meeting";
  if (/Train|tàu/i.test(entry.transfer + entry.plan)) return "travel";
  if (/Bay|sân bay|flight/i.test(entry.plan + entry.hotel)) return "flight";
  if (/Amirsoy|Registan|Shah-i-Zinda/i.test(entry.plan)) return "sight";
  if (entry.day === "Sat" || entry.day === "Sun") return "weekend";
  return "work";
}

/** @param {DayKind} kind */
function kindInfo(kind) {
  switch (kind) {
    case "meeting":
      return { label: "Họp sáng", icon: "users" };
    case "travel":
      return { label: "Đi tàu", icon: "train" };
    case "flight":
      return { label: "Bay", icon: "plane" };
    case "sight":
      return { label: "Tham quan", icon: "mountain" };
    case "weekend":
      return { label: "Cuối tuần", icon: "sun" };
    case "work":
      return { label: "Remote", icon: "briefcase" };
    default: {
      const unreachable = /** @type {never} */ (kind);
      throw new Error(`Unknown day kind: ${unreachable}`);
    }
  }
}

/** @param {Filter} filter */
function matchesFilter(filter, entry, index) {
  switch (filter) {
    case "all":
      return true;
    case "meeting":
      return dayKind(entry) === "meeting";
    case "travel":
      return dayKind(entry) === "travel" || dayKind(entry) === "flight";
    case "move":
      return index > 0 && (days[index - 1].hotel !== entry.hotel || days[index - 1].city !== entry.city);
    default: {
      const unreachable = /** @type {never} */ (filter);
      throw new Error(`Unknown filter: ${unreachable}`);
    }
  }
}

function stayOnDate(iso) {
  const t = parseDate(iso).getTime();
  return (
    hotelStays.find((s) => t >= parseDate(s.checkIn).getTime() && t < parseDate(s.checkOut).getTime()) ||
    hotelStays.find((s) => s.checkOut === iso) ||
    null
  );
}

function areaFor(stay) {
  return days.find((d) => d.date === stay.checkIn)?.area ?? "";
}

function extLink(url, label, cls = "") {
  return `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}${icon("external", 14)}<span class="sr-only"> (mở tab mới)</span></a>`;
}

function loadChecks() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

const checks = loadChecks();

function checkItem(key, text, extra = "") {
  return `<li><label class="check">
    <input type="checkbox" data-check="${key}" ${checks[key] ? "checked" : ""} />
    <span class="check-text">${extra}${text}</span>
  </label></li>`;
}

function progressText(prefix, total) {
  const done = Object.keys(checks).filter((k) => k.startsWith(prefix) && checks[k]).length;
  return `${done}/${total}`;
}

const totalNights = hotelStays.reduce((sum, s) => sum + s.nights, 0);
const diff = meta.budgetUsd - meta.quotedTotalUsd;

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#overview">Uzbekistan <span>2026</span></a>
        <nav aria-label="Các phần">
          <a href="#overview" data-nav="overview">Tổng quan</a>
          <a href="#stays" data-nav="stays">Khách sạn</a>
          <a href="#timeline" data-nav="timeline">Lịch</a>
          <a href="#prep" data-nav="prep">Chuẩn bị</a>
        </nav>
      </div>
    </header>`;
}

function renderOverview() {
  const pct = Math.min(100, Math.round((meta.quotedTotalUsd / meta.budgetUsd) * 100));
  const over = diff < 0;
  const urgent = masterChecklist.filter((c) => c.priority === "High").slice(0, 3);
  return `
    <section class="overview" id="overview" aria-labelledby="overview-title">
      <div class="hero">
        <p class="eyebrow">${meta.dates} · ${meta.guests} khách · 1 phòng</p>
        <h1 id="overview-title">Tashkent ba khu, rồi Samarkand</h1>
        <p class="lead">${meta.purpose}</p>
        <p class="source-note">Giá xem ${meta.quoteDate}. ${meta.sources}</p>
      </div>
      <div class="stats">
        <article class="card budget-card">
          <h2 class="card-label">${icon("wallet")} Ngân sách khách sạn</h2>
          <p class="big-number">${fmtMoney.format(meta.quotedTotalUsd)} <span>/ ${fmtMoney.format(meta.budgetUsd)}</span></p>
          <div class="meter ${over ? "over" : ""}" role="img" aria-label="Quote bằng ${pct}% ngân sách">
            <span style="width:${pct}%"></span>
          </div>
          <p class="status ${over ? "is-over" : "is-ok"}">
            ${icon(over ? "alert" : "check", 16)}
            ${over ? "Vượt" : "Còn"} ${fmtMoney.format(Math.abs(diff))} ·
            ${perNight(meta.quotedTotalUsd, totalNights)}/đêm so với trần ${perNight(meta.budgetUsd, totalNights)}/đêm
          </p>
        </article>
        <article class="card">
          <h2 class="card-label">${icon("bed")} Lưu trú</h2>
          <p class="big-number">${totalNights} <span>đêm</span></p>
          <p class="muted">${hotelStays.length} lần nhận phòng · 3 khu Tashkent + Samarkand</p>
        </article>
        <article class="card">
          <h2 class="card-label">${icon("alert")} Việc gấp</h2>
          <ul class="mini-list">${urgent.map((c) => `<li>${c.label}</li>`).join("")}</ul>
          <a class="text-link" href="#prep">Xem checklist</a>
        </article>
      </div>
    </section>`;
}

function renderStays() {
  const start = parseDate(days[0].date).getTime();
  const span = parseDate(days[days.length - 1].date).getTime() + 86400000 - start;
  const strip = hotelStays
    .map((s, i) => {
      const left = ((parseDate(s.checkIn).getTime() - start) / span) * 100;
      const width = ((parseDate(s.checkOut).getTime() - parseDate(s.checkIn).getTime()) / span) * 100;
      return `<span class="seg seg-${i}" style="left:${left}%;width:${width}%" title="${s.name}, ${s.nights} đêm"></span>`;
    })
    .join("");

  const cards = hotelStays
    .map((s, i) => {
      const links = stayLinks(s);
      return `
        <li class="card stay-card">
          <div class="stay-head">
            <span class="stay-index seg-${i}" aria-hidden="true">${i + 1}</span>
            <div>
              <h3>${s.name}</h3>
              <p class="muted">${icon("pin", 14)} ${areaFor(s)}</p>
            </div>
          </div>
          <p class="stay-dates">${shortDate(s.checkIn)} → ${shortDate(s.checkOut)} · ${s.nights} đêm</p>
          <p class="stay-price"><strong>${perNight(s.actualTotal, s.nights)}</strong>/đêm <span>· ${fmtMoney.format(s.actualTotal)} tổng</span></p>
          <ul class="facts">
            <li>Ăn sáng: ${s.breakfast}</li>
            <li>Hủy: ${s.cancel}</li>
          </ul>
          ${
            links
              ? `<div class="actions">
                  ${extLink(links.trip, "Trip.com", "btn btn-primary")}
                  ${extLink(links.booking, "Booking", "btn")}
                  ${extLink(links.map, "Bản đồ", "btn")}
                </div>`
              : ""
          }
        </li>`;
    })
    .join("");

  const groups = new Map();
  for (const o of hotelOptions) {
    if (!groups.has(o.segment)) groups.set(o.segment, []);
    groups.get(o.segment).push(o);
  }
  const options = [...groups.entries()]
    .map(
      ([segment, opts]) => `
      <div class="option-group">
        <h4>${segment}</h4>
        <ul>
          ${opts
            .map(
              (o) => `
            <li class="option ${o.tier === "recommended" ? "is-picked" : ""}">
              <div class="option-top">
                <strong>${o.name}</strong>
                <span class="num">${o.total != null ? fmtMoney.format(o.total) : "—"}</span>
              </div>
              ${o.tier === "recommended" ? `<span class="tag tag-ok">${icon("check", 12)} Đang chọn</span>` : ""}
              <p class="muted">${o.area} · ${o.score} · ${o.breakfast} · ${o.cancel}</p>
              <p>${o.why}</p>
            </li>`,
            )
            .join("")}
        </ul>
      </div>`,
    )
    .join("");

  return `
    <section class="section" id="stays" aria-labelledby="stays-title">
      <div class="section-head">
        <h2 id="stays-title">Khách sạn theo chặng</h2>
        <p class="muted">Giá Trip.com cho 2 người, đã gồm thuế và ăn sáng. Bấm để mở đúng ngày.</p>
      </div>
      <div class="strip" aria-hidden="true">${strip}</div>
      <ol class="stay-grid">${cards}</ol>
      <details class="card alternatives">
        <summary>${icon("swap")} Phương án khác để so giá <span class="muted">(${hotelOptions.length})</span>${icon("chevron")}</summary>
        <div class="option-grid">${options}</div>
      </details>
    </section>`;
}

function renderDetail(entry, stay) {
  const detail = dayDetails[entry.date];
  if (!detail) return "";
  const links = stay ? stayLinks(stay) : null;
  const places = detail.places
    .map(
      (p) => `
      <li class="place">
        <span class="place-icon">${icon("pin", 16)}</span>
        <div>${extLink(mapLink(p.query), p.name, "place-name")}<p>${p.tip}</p></div>
      </li>`,
    )
    .join("");
  const research = detail.research
    .map((n) => `<li><p>${n.text}</p>${extLink(n.url, n.source, "source-link")}</li>`)
    .join("");
  const todo = detail.checklist.map((t, i) => checkItem(`day:${entry.date}:${i}`, t)).join("");

  return `
    <div class="detail-grid">
      <div class="detail-col">
        ${
          stay && links
            ? `<section class="block">
                <h4>${icon("bed", 16)} Khách sạn đêm nay</h4>
                <p><strong>${stay.name}</strong> · ${perNight(stay.actualTotal, stay.nights)}/đêm</p>
                <p>${icon("check", 14)} Ăn sáng ${stay.breakfast.toLowerCase()}.</p>
                <p class="muted">${stay.cancel}. ${stay.note}</p>
                <div class="actions">
                  ${extLink(links.trip, "Trip.com", "btn btn-primary")}
                  ${extLink(links.booking, "Booking", "btn")}
                  ${extLink(links.map, "Bản đồ", "btn")}
                </div>
              </section>`
            : ""
        }
        <section class="block">
          <h4>${icon("thermo", 16)} Thời tiết</h4>
          <p><strong>${detail.weather.label}</strong></p>
          <p class="muted">${detail.weather.note}</p>
          ${extLink(detail.weather.url, detail.weather.source, "source-link")}
        </section>
        ${
          detail.transport
            ? `<section class="block block-accent">
                <h4>${icon("train", 16)} ${detail.transport.title}</h4>
                <ol class="steps">${detail.transport.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
                <div class="actions">${detail.transport.links.map((l, i) => extLink(l.url, l.label, i === 0 ? "btn btn-primary" : "btn")).join("")}</div>
              </section>`
            : ""
        }
        <section class="block">
          <h4>${icon("list", 16)} Việc trong ngày <span class="count" data-progress="day:${entry.date}:">${progressText(`day:${entry.date}:`, detail.checklist.length)}</span></h4>
          <ul class="checks">${todo}</ul>
        </section>
      </div>
      <div class="detail-col">
        <section class="block">
          <h4>${icon("pin", 16)} Đi đâu</h4>
          <ul class="places">${places}</ul>
        </section>
        <section class="block">
          <h4>${icon("book", 16)} Đã đọc</h4>
          <ul class="notes">${research}</ul>
        </section>
      </div>
    </div>`;
}

function renderDay(entry, index) {
  const kind = dayKind(entry);
  const info = kindInfo(kind);
  const stay = stayOnDate(entry.date);
  const prev = index > 0 ? days[index - 1] : null;
  const moved = prev && (prev.hotel !== entry.hotel || prev.city !== entry.city);
  const d = parseDate(entry.date);
  return `
    <li class="day kind-${kind}" id="d-${entry.date}" data-index="${index}">
      <h3 class="day-heading">
        <button type="button" class="day-toggle" aria-expanded="false" aria-controls="p-${entry.date}">
          <span class="date-chip" aria-hidden="true">
            <span class="dow">${fmtWeekday.format(d)}</span>
            <span class="dnum">${d.getDate()}</span>
            <span class="mon">thg ${d.getMonth() + 1}</span>
          </span>
          <span class="day-main">
            <span class="sr-only">${fmtLong.format(d)}. </span>
            <span class="day-title">${entry.city} <span class="muted">· ${entry.area}</span></span>
            <span class="day-plan">${entry.plan}</span>
            <span class="tags">
              <span class="tag tag-${kind}">${icon(info.icon, 13)} ${info.label}</span>
              ${moved ? `<span class="tag tag-move">${icon("swap", 13)} Đổi chỗ ở</span>` : ""}
              ${stay && entry.hotel !== "Checkout / flight" ? `<span class="tag tag-plain">${icon("bed", 13)} ${entry.hotel}</span>` : ""}
              ${stay && stay.breakfast.startsWith("Đã gồm") ? `<span class="tag tag-ok">${icon("check", 13)} Ăn sáng 2 người</span>` : ""}
            </span>
          </span>
          <span class="chev">${icon("chevron", 20)}</span>
        </button>
      </h3>
      <div class="day-panel" id="p-${entry.date}" role="region" aria-label="Chi tiết ${fmtLong.format(d)}" hidden>
        ${renderDetail(entry, stay)}
      </div>
    </li>`;
}

function renderTimeline() {
  const filters = [
    ["all", "Tất cả", days.length],
    ["meeting", "Ngày họp", days.filter((d, i) => matchesFilter("meeting", d, i)).length],
    ["travel", "Tàu & bay", days.filter((d, i) => matchesFilter("travel", d, i)).length],
    ["move", "Đổi chỗ ở", days.filter((d, i) => matchesFilter("move", d, i)).length],
  ];
  return `
    <section class="section" id="timeline" aria-labelledby="timeline-title" tabindex="-1">
      <div class="section-head">
        <h2 id="timeline-title">Lịch từng ngày</h2>
        <p class="muted">Bấm một ngày để xem chỗ đi, bản đồ, khách sạn, tàu và việc cần làm.</p>
      </div>
      <div class="toolbar">
        <div class="filters" role="group" aria-label="Lọc ngày">
          ${filters
            .map(
              ([id, label, count], i) =>
                `<button type="button" class="chip" data-filter="${id}" aria-pressed="${i === 0}">${label} <span class="num">${count}</span></button>`,
            )
            .join("")}
        </div>
        <button type="button" class="btn btn-ghost" data-expand-all aria-pressed="false">Mở tất cả</button>
      </div>
      <ol class="days">${days.map(renderDay).join("")}</ol>
    </section>`;
}

function renderPrep() {
  const master = masterChecklist
    .map((c, i) => checkItem(`trip:${i}`, c.label, `<span class="prio prio-${c.priority.toLowerCase()}">${c.priority === "High" ? "Gấp" : "Vừa"}</span>`))
    .join("");
  const pack = packing
    .map((p, i) => checkItem(`pack:${i}`, `<strong>${p.item}</strong><span class="muted">${p.why}</span>`))
    .join("");
  return `
    <section class="section" id="prep" aria-labelledby="prep-title">
      <div class="section-head">
        <h2 id="prep-title">Chuẩn bị</h2>
        <p class="muted">Tick được lưu trong trình duyệt này.</p>
      </div>
      <div class="prep-grid">
        <article class="card">
          <h3>${icon("list")} Trước khi bay <span class="count" data-progress="trip:">${progressText("trip:", masterChecklist.length)}</span></h3>
          <ul class="checks">${master}</ul>
        </article>
        <article class="card">
          <h3>${icon("shirt")} Đồ mang theo <span class="count" data-progress="pack:">${progressText("pack:", packing.length)}</span></h3>
          <ul class="checks">${pack}</ul>
        </article>
        <article class="card">
          <h3>${icon("train")} Đặt tàu Afrosiyob</h3>
          <ol class="steps">
            <li>Vào ${extLink("https://eticket.uzrailpass.uz/en/", "eticket.uzrailpass.uz")}. Site cũ eticket.railway.uz chuyển tiếp sang đây.</li>
            <li>6/11: Toshkent → Samarqand, chuyến sáng. 8/11: Samarqand → Toshkent, chuyến chiều.</li>
            <li>Điền đúng số passport. Ga đi là Toshkent Markaziy, không phải ga Nam.</li>
            <li>Economy khoảng 311.000 som một người, giá giữa năm 2026. Giữ PDF offline, có mặt trước giờ tàu khoảng 40 phút.</li>
          </ol>
          ${extLink("https://oxusroad.com/en/trains/afrosiyob/", "Giá và giờ mở bán", "text-link")}
        </article>
        <article class="card">
          <h3>${icon("book")} Nguồn đã đọc</h3>
          <ul class="source-list">${sources.map((s) => `<li>${extLink(s.url, s.label)}</li>`).join("")}</ul>
        </article>
      </div>
    </section>`;
}

function setDayOpen(li, open) {
  const button = li.querySelector(".day-toggle");
  const panel = li.querySelector(".day-panel");
  button.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
  li.classList.toggle("open", open);
}

function mount() {
  const root = document.getElementById("app");
  root.innerHTML = `
    ${renderTopbar()}
    <main class="page">
      ${renderOverview()}
      ${renderStays()}
      ${renderTimeline()}
      ${renderPrep()}
      <footer class="footer">Giá là quote, chưa đặt. Kiểm tra lại tổng và điều kiện hủy trước khi trả tiền.</footer>
    </main>`;

  root.addEventListener("click", (event) => {
    const toggle = event.target.closest(".day-toggle");
    if (toggle) {
      const li = toggle.closest(".day");
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setDayOpen(li, open);
      history.replaceState(null, "", open ? `#${li.id}` : "#timeline");
      return;
    }

    const chip = event.target.closest("[data-filter]");
    if (chip) {
      const filter = /** @type {Filter} */ (chip.getAttribute("data-filter"));
      root.querySelectorAll("[data-filter]").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      root.querySelectorAll(".day").forEach((li) => {
        const index = Number(li.getAttribute("data-index"));
        li.hidden = !matchesFilter(filter, days[index], index);
      });
      return;
    }

    const expand = event.target.closest("[data-expand-all]");
    if (expand) {
      const open = expand.getAttribute("aria-pressed") !== "true";
      expand.setAttribute("aria-pressed", String(open));
      expand.textContent = open ? "Thu gọn tất cả" : "Mở tất cả";
      root.querySelectorAll(".day:not([hidden])").forEach((li) => setDayOpen(li, open));
    }
  });

  root.addEventListener("change", (event) => {
    const input = event.target.closest("input[data-check]");
    if (!input) return;
    const key = input.getAttribute("data-check");
    checks[key] = input.checked;
    localStorage.setItem(STORE_KEY, JSON.stringify(checks));
    root.querySelectorAll("[data-progress]").forEach((el) => {
      const prefix = el.getAttribute("data-progress");
      if (!key.startsWith(prefix)) return;
      const total = root.querySelectorAll(`input[data-check^="${prefix}"]`).length;
      el.textContent = progressText(prefix, total);
    });
  });

  const navLinks = root.querySelectorAll("[data-nav]");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach((a) => {
          const active = a.getAttribute("data-nav") === entry.target.id;
          if (active) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  ["overview", "stays", "timeline", "prep"].forEach((id) => observer.observe(document.getElementById(id)));

  const openFromHash = () => {
    if (!location.hash.startsWith("#d-")) return;
    const li = document.getElementById(location.hash.slice(1));
    if (!li) return;
    li.hidden = false;
    setDayOpen(li, true);
    li.scrollIntoView({ block: "start" });
  };
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
}

mount();
