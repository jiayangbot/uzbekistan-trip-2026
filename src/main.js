import { days, hotelStays, hotelOptions, meta } from "./trip-data.js";
import { dayDetails, stayLinks, mapLink, packing, masterChecklist, sources, localLife } from "./trip-guide.js";
import { daySlots, slotCost, tripFoodUsd } from "./day-slots.js";
import { icon } from "./icons.js";

const STORE_KEY = "uz-trip-2026-checks";

const fmtMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const fmtWeekday = new Intl.DateTimeFormat("vi-VN", { weekday: "short" });
const fmtLong = new Intl.DateTimeFormat("vi-VN", { weekday: "long", day: "numeric", month: "long" });

/** @typedef {"stay" | "travel" | "flight" | "sight" | "weekend" | "city"} DayKind */
/** @typedef {"all" | "weekend" | "travel" | "move"} Filter */

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
  if (/flight/i.test(entry.hotel)) return "flight";
  if (/Afrosiyob|Sharq/i.test(entry.transfer)) return "travel";
  if (entry.day === "Sat" || entry.day === "Sun") return "weekend";
  if (entry.day === "Wed") return "stay";
  if (/Amirsoy|Registan|Shah-i-Zinda/i.test(entry.plan)) return "sight";
  return "city";
}

/** @param {DayKind} kind */
function kindInfo(kind) {
  switch (kind) {
    case "stay":
      return { label: "Không đổi khách sạn", icon: "bed" };
    case "travel":
      return { label: "Đi tàu", icon: "train" };
    case "flight":
      return { label: "Bay", icon: "plane" };
    case "sight":
      return { label: "Tham quan", icon: "mountain" };
    case "weekend":
      return { label: "Cuối tuần", icon: "sun" };
    case "city":
      return { label: "Tham quan", icon: "pin" };
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
    case "weekend":
      return dayKind(entry) === "weekend";
    case "travel":
      return dayKind(entry) === "travel" || dayKind(entry) === "flight";
    case "move":
      return index > 0 && (viewDay(days[index - 1]).hotel !== viewDay(entry).hotel || days[index - 1].city !== entry.city);
    default: {
      const unreachable = /** @type {never} */ (filter);
      throw new Error(`Unknown filter: ${unreachable}`);
    }
  }
}

function stayOnDate(iso) {
  const stays = activeStays();
  const t = parseDate(iso).getTime();
  return (
    stays.find((s) => t >= parseDate(s.checkIn).getTime() && t < parseDate(s.checkOut).getTime()) ||
    stays.find((s) => s.checkOut === iso) ||
    null
  );
}

function areaFor(stay) {
  return areaByOrigin[stay.origin || stay.checkIn] || "";
}

function renderReview(stay) {
  const review = stay.review;
  if (!review) return "";
  return `
    <div class="review">
      <p>${extLink(review.url, `${review.score} · ${review.count}`, "review-link")}</p>
      <p>${review.good}</p>
      <p class="review-watch">${icon("alert", 14)} ${review.watch}</p>
    </div>`;
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
const PICK_KEY = "uz-trip-2026-picks";

/** @type {Record<string, string>} */
const segmentOfStay = {
  "2026-10-27": "Amir Temur · 27–30 Oct",
  "2026-10-30": "Tashkent City · 30 Oct–2 Nov",
  "2026-11-02": "Mirabad / Oybek · 2–6 Nov",
  "2026-11-06": "Samarkand · 6–8 Nov",
  "2026-11-08": "Trước giờ bay · 8–9 Nov",
};

/** @type {Record<string, string>} */
const optionLabel = {
  "hampton-3": "Hampton by Hilton",
  "wyndham-3": "Wyndham Tashkent",
  "hi-3": "Holiday Inn Tashkent City",
  "hi-room": "Holiday Inn Tashkent City",
  "hilton-3": "Hilton Tashkent City",
  "swiss-4": "Swissôtel Tashkent",
  "swiss-room": "Swissôtel Tashkent",
  "mov-sam": "Mövenpick Samarkand",
  "mov-room": "Mövenpick Samarkand",
  "hampton-1": "Hampton by Hilton",
  "ic-1": "InterContinental Tashkent",
};

function loadPicks() {
  try {
    const raw = JSON.parse(localStorage.getItem(PICK_KEY) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

/** @type {Record<string, string>} */
let picks = loadPicks();

const SHIFT_KEY = "uz-trip-2026-shifts";
const PRICE_KEY = "uz-trip-2026-price-notes";
const TASHKENT_ORIGINS = ["2026-10-27", "2026-10-30", "2026-11-02"];
const LOCKED_WEDNESDAYS = new Set(["2026-10-28", "2026-11-04"]);

/** @type {Record<string, string>} */
const areaByOrigin = {
  "2026-10-27": "Amir Temur / Istiqbol",
  "2026-10-30": "Tashkent City / Ukchi",
  "2026-11-02": "Mirabad / Oybek",
  "2026-11-06": "Trung tâm Samarkand",
  "2026-11-08": "Amir Temur / Istiqbol",
};

function isoOf(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(iso, count) {
  const date = parseDate(iso);
  date.setDate(date.getDate() + count);
  return isoOf(date);
}

function nightsBetween(start, end) {
  return Math.round((parseDate(end).getTime() - parseDate(start).getTime()) / 86400000);
}

function baseStay(origin) {
  return hotelStays.find((stay) => stay.checkIn === origin);
}

function tashkentSpan() {
  const first = baseStay(TASHKENT_ORIGINS[0]);
  const last = baseStay(TASHKENT_ORIGINS[TASHKENT_ORIGINS.length - 1]);
  return nightsBetween(first.checkIn, last.checkOut);
}

function loadShifts() {
  try {
    const raw = JSON.parse(localStorage.getItem(SHIFT_KEY) || "{}");
    if (!raw || typeof raw !== "object") return {};
    const nums = TASHKENT_ORIGINS.map((origin) => raw[origin]);
    if (nums.some((nights) => !Number.isInteger(nights) || nights < 1)) return {};
    if (nums.reduce((sum, nights) => sum + nights, 0) !== tashkentSpan()) return {};
    return Object.fromEntries(TASHKENT_ORIGINS.map((origin, index) => [origin, nums[index]]));
  } catch {
    return {};
  }
}

/** @type {Record<string, number>} */
let shifts = loadShifts();
let shiftMsg = "";

function loadPriceNotes() {
  try {
    const raw = JSON.parse(localStorage.getItem(PRICE_KEY) || "{}");
    if (!raw || typeof raw !== "object") return {};
    return Object.fromEntries(Object.entries(raw).filter((entry) => typeof entry[1] === "string"));
  } catch {
    return {};
  }
}

/** @type {Record<string, string>} */
let priceNotes = loadPriceNotes();

function escapeAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function nightsFor(origin) {
  const stored = shifts[origin];
  if (Number.isInteger(stored) && stored >= 1) return stored;
  return baseStay(origin).nights;
}

function isShifted() {
  return TASHKENT_ORIGINS.some((origin) => nightsFor(origin) !== baseStay(origin).nights);
}

function activeStays() {
  /** @type {Array<HotelStay & { origin: string }>} */
  const stays = [];
  let cursor = baseStay(TASHKENT_ORIGINS[0]).checkIn;
  for (const origin of TASHKENT_ORIGINS) {
    const nights = nightsFor(origin);
    stays.push({ ...baseStay(origin), origin, checkIn: cursor, checkOut: addDays(cursor, nights), nights });
    cursor = addDays(cursor, nights);
  }
  for (const stay of hotelStays) {
    if (TASHKENT_ORIGINS.includes(stay.checkIn)) continue;
    stays.push({ ...stay, origin: stay.checkIn });
  }
  return stays;
}

function nightsOf(stay) {
  /** @type {string[]} */
  const dates = [];
  let cursor = stay.checkIn;
  while (cursor < stay.checkOut) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return dates;
}

function viewDay(entry) {
  if (/flight/i.test(entry.hotel)) return entry;
  const stay = activeStays().find((item) => entry.date >= item.checkIn && entry.date < item.checkOut);
  if (!stay) return entry;
  const option = optionForStay(stay);
  return {
    ...entry,
    area: sameHotel(stay, option) ? areaByOrigin[stay.origin] || entry.area : option.area,
    hotel: optionLabel[option.id] || stay.name,
  };
}

/**
 * @param {string} iso
 * @param {string} fromOrigin
 * @param {string} toOrigin
 * @returns {{ error: string; next?: Record<string, number> }}
 */
function shiftPlan(iso, fromOrigin, toOrigin) {
  if (!TASHKENT_ORIGINS.includes(fromOrigin) || !TASHKENT_ORIGINS.includes(toOrigin)) {
    return { error: "Chỉ kéo giữa ba khu Tashkent." };
  }
  const fromIndex = TASHKENT_ORIGINS.indexOf(fromOrigin);
  const toIndex = TASHKENT_ORIGINS.indexOf(toOrigin);
  if (Math.abs(fromIndex - toIndex) !== 1) return { error: "Chỉ kéo sang khu bên cạnh." };
  const from = activeStays().find((stay) => stay.origin === fromOrigin);
  const nights = nightsOf(from);
  const cut = nights.indexOf(iso);
  if (cut < 0) return { error: "Ngày này không thuộc khu đang kéo." };
  /** @type {Record<string, number>} */
  const next = {};
  for (const origin of TASHKENT_ORIGINS) next[origin] = nightsFor(origin);
  if (toIndex === fromIndex + 1) {
    const moved = nights.length - cut;
    if (cut < 1) return { error: "Mỗi khu giữ ít nhất một đêm." };
    if (LOCKED_WEDNESDAYS.has(iso)) return { error: "Thứ Tư không đổi khách sạn." };
    next[fromOrigin] -= moved;
    next[toOrigin] += moved;
  } else {
    const moved = cut + 1;
    if (moved >= nights.length) return { error: "Mỗi khu giữ ít nhất một đêm." };
    const boundary = addDays(iso, 1);
    if (LOCKED_WEDNESDAYS.has(boundary)) return { error: "Thứ Tư không đổi khách sạn." };
    next[fromOrigin] -= moved;
    next[toOrigin] += moved;
  }
  return { error: "", next };
}

function tryShift(iso, fromOrigin, toOrigin) {
  const plan = shiftPlan(iso, fromOrigin, toOrigin);
  if (plan.error) return plan.error;
  shifts = plan.next;
  localStorage.setItem(SHIFT_KEY, JSON.stringify(shifts));
  return "";
}

function optionForStay(stay) {
  const origin = stay.origin || stay.checkIn;
  const opts = hotelOptions.filter((o) => o.segment === segmentOfStay[origin]);
  return opts.find((o) => o.id === picks[origin]) || opts.find((o) => o.tier === "recommended") || opts[0];
}

function quoteTotal(stay) {
  const opt = optionForStay(stay);
  if (!opt || opt.total == null) return null;
  if (stay.nights === opt.nights) return opt.total;
  return Math.round((opt.total / opt.nights) * stay.nights);
}

function chosenTotal() {
  return activeStays().reduce((sum, stay) => sum + (quoteTotal(stay) ?? 0), 0);
}

function breakfastIncluded(option) {
  return option.breakfast.startsWith("Đã gồm");
}

function sameHotel(stay, option) {
  const label = optionLabel[option.id] || "";
  return stay.name.startsWith(label);
}

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
  const quoted = chosenTotal();
  const diff = meta.budgetUsd - quoted;
  const pct = Math.min(100, Math.round((quoted / meta.budgetUsd) * 100));
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
          <p class="big-number">${fmtMoney.format(quoted)} <span>/ ${fmtMoney.format(meta.budgetUsd)}</span></p>
          <div class="meter ${over ? "over" : ""}" role="img" aria-label="Quote bằng ${pct}% ngân sách">
            <span style="width:${pct}%"></span>
          </div>
          <p class="status ${over ? "is-over" : "is-ok"}">
            ${icon(over ? "alert" : "check", 16)}
            ${over ? "Vượt" : "Còn"} ${fmtMoney.format(Math.abs(diff))} ·
            ${perNight(quoted, totalNights)}/đêm so với trần ${perNight(meta.budgetUsd, totalNights)}/đêm
          </p>
          ${quoted === meta.quotedTotalUsd ? "" : `<p class="muted">Quote gốc ${fmtMoney.format(meta.quotedTotalUsd)}. Đang chọn phương án khác.</p>`}
          ${isShifted() ? `<p class="muted">Số đêm đã kéo khác quote. Tổng là giá mỗi đêm nhân số đêm mới, chưa tra lại khách sạn.</p>` : ""}
          ${activeStays().some((stay) => quoteTotal(stay) == null) ? `<p class="muted">Có chặng chưa có quote, chưa cộng vào tổng.</p>` : ""}
        </article>
        <article class="card">
          <h2 class="card-label">${icon("bed")} Lưu trú</h2>
          <p class="big-number">${totalNights} <span>đêm</span></p>
          <p class="muted">${hotelStays.length} lần nhận phòng · 3 khu Tashkent + Samarkand</p>
          <p class="muted">Ăn trưa và tối khoảng ${fmtMoney.format(tripFoodUsd)} cho 2 người, ngoài tiền phòng. Sáng đã gồm. Xe núi chưa tính.</p>
        </article>
        <article class="card">
          <h2 class="card-label">${icon("alert")} Việc gấp</h2>
          <ul class="mini-list">${urgent.map((c) => `<li>${c.label}</li>`).join("")}</ul>
          <a class="text-link" href="#prep">Xem checklist</a>
        </article>
      </div>
    </section>`;
}

function liveSegmentTitle(segment) {
  const stay = activeStays().find((item) => segmentOfStay[item.origin] === segment);
  if (!stay) return segment;
  return `${areaByOrigin[stay.origin]} · ${shortDate(stay.checkIn)}–${shortDate(stay.checkOut)}`;
}

function nightChips(stay) {
  const movable = TASHKENT_ORIGINS.includes(stay.origin);
  return nightsOf(stay)
    .map((iso) => {
      const date = parseDate(iso);
      const label = `${fmtWeekday.format(date)} ${shortDate(iso)}`;
      if (!movable) return `<li><span class="night is-locked">${label}</span></li>`;
      return `<li><div class="night" role="button" tabindex="0" draggable="true" data-night="${iso}" data-from="${stay.origin}" aria-label="${label}. Kéo sang khu bên cạnh, hoặc bấm mũi tên trái phải."><span class="dow">${fmtWeekday.format(date)}</span><span class="d">${shortDate(iso)}</span></div></li>`;
    })
    .join("");
}

function renderStays() {
  const stays = activeStays();
  const start = parseDate(days[0].date).getTime();
  const span = parseDate(days[days.length - 1].date).getTime() + 86400000 - start;
  const strip = stays
    .map((s, i) => {
      const left = ((parseDate(s.checkIn).getTime() - start) / span) * 100;
      const width = ((parseDate(s.checkOut).getTime() - parseDate(s.checkIn).getTime()) / span) * 100;
      return `<span class="seg seg-${i}" style="left:${left}%;width:${width}%" title="${s.name}, ${s.nights} đêm"></span>`;
    })
    .join("");

  const cards = stays
    .map((s, i) => {
      const opt = optionForStay(s);
      const label = optionLabel[opt.id] || s.name;
      const links = stayLinks(s, label);
      const meal = breakfastIncluded(opt) ? "ăn sáng cho 2 người" : opt.breakfast;
      const total = quoteTotal(s);
      const base = baseStay(s.origin);
      const scaled = s.nights !== base.nights;
      return `
        <li class="card stay-card" data-origin="${s.origin}">
          <div class="stay-head">
            <span class="stay-index seg-${i}" aria-hidden="true">${i + 1}</span>
            <div>
              <h3>${opt.name}</h3>
              <p class="muted">${icon("pin", 14)} ${sameHotel(s, opt) ? areaFor(s) : opt.area}</p>
            </div>
          </div>
          <p class="stay-dates">${shortDate(s.checkIn)} → ${shortDate(s.checkOut)} · ${s.nights} đêm</p>
          <ul class="nights">${nightChips(s)}</ul>
          <p class="stay-price">${total == null ? "Chưa có quote đêm này." : `<strong>${perNight(total, s.nights)}</strong>/đêm <span>· ${meal} · ${fmtMoney.format(total)} tổng</span>`}</p>
          <label class="price-note">
            <span>Giá thực tế</span>
            <input type="text" data-price-note="${s.origin}" value="${escapeAttr(priceNotes[s.origin] || "")}" placeholder="Ghi giá vừa xem" autocomplete="off" />
          </label>
          ${scaled && opt.total != null ? `<p class="muted">Quote gốc ${base.nights} đêm, ${fmtMoney.format(opt.total)}. Số mới tính theo cùng giá mỗi đêm.</p>` : ""}
          <ul class="facts">
            <li>Hủy: ${opt.cancel}</li>
          </ul>
          <p>${sameHotel(s, opt) ? s.note : opt.why}</p>
          ${sameHotel(s, opt) ? renderReview(s) : ""}
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
        <h4>${liveSegmentTitle(segment)}</h4>
        <ul>
          ${opts
            .map((o) => {
              const picked = hotelStays.some((s) => segmentOfStay[s.checkIn] === segment && optionForStay(s).id === o.id);
              return `
            <li>
              <button type="button" class="option ${picked ? "is-picked" : ""}" data-pick="${o.id}" aria-pressed="${picked}">
                <span class="option-top">
                  <strong>${o.name}</strong>
                  <span class="num">${o.total != null ? fmtMoney.format(o.total) : "—"}</span>
                </span>
                <span class="tag ${picked ? "tag-ok" : "tag-plain"}">${icon(picked ? "check" : "swap", 12)} ${picked ? "Đang chọn" : "Chọn"}</span>
                <span class="muted">${o.area} · ${o.score} · ${o.breakfast.startsWith("Đã gồm") ? "ăn sáng cho 2 người" : o.breakfast} · ${o.cancel}</span>
                <span>${o.why}</span>
              </button>
            </li>`;
            })
            .join("")}
        </ul>
      </div>`,
    )
    .join("");

  return `
    <section class="section" id="stays" aria-labelledby="stays-title">
      <div class="section-head">
        <h2 id="stays-title">Khách sạn theo chặng</h2>
        <p class="muted">Kéo ngày sang khu bên cạnh trong Tashkent. Ba khu giữ liền nhau. Thứ Tư 28/10 và 4/11 không phải ngày đổi khách sạn. Samarkand và đêm 8/11 đứng yên.</p>
        <p id="shift-msg" class="shift-msg" role="status">${shiftMsg}</p>
        ${isShifted() ? `<button type="button" class="btn" data-shift-reset>Trả lại số đêm gốc</button>` : ""}
      </div>
      <div class="strip" aria-hidden="true">${strip}</div>
      <ol class="stay-grid">${cards}</ol>
      <details class="card alternatives" open>
        <summary>${icon("swap")} Chọn khách sạn theo chặng <span class="muted">(${hotelOptions.length})</span>${icon("chevron")}</summary>
        <div class="option-grid">${options}</div>
      </details>
    </section>`;
}

function renderDetail(entry, stay) {
  const detail = dayDetails[entry.date];
  if (!detail) return "";
  const opt = stay ? optionForStay(stay) : null;
  const label = opt ? optionLabel[opt.id] || stay.name : "";
  const links = stay && opt ? stayLinks(stay, label) : null;
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
                <p><strong>${opt.name}</strong> · ${quoteTotal(stay) == null ? "chưa có quote" : `${perNight(quoteTotal(stay), stay.nights)}/đêm`}</p>
                <p>${breakfastIncluded(opt) ? `${icon("check", 14)} Ăn sáng cho 2 người, đã gồm trong giá.` : `${icon("alert", 14)} ${opt.breakfast}.`}</p>
                <p class="muted">${opt.cancel}. ${sameHotel(stay, opt) ? stay.note : opt.why}</p>
                ${sameHotel(stay, opt) ? renderReview(stay) : ""}
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

function renderSlots(date) {
  const slots = daySlots[date] || [];
  const rows = slots
    .map((slot) => {
      const title = slot.eat ? (slot.query ? extLink(mapLink(slot.query), slot.eat, "slot-link") : `<strong>${slot.eat}</strong>`) : "";
      return `
        <li class="slot">
          <time datetime="${slot.time}">${slot.time}</time>
          <span class="part">${slot.part}</span>
          <span class="slot-body">${title ? `<span class="slot-eat">${title}. </span>` : ""}${slot.text}</span>
          <span class="usd">${slot.usd > 0 ? `~${fmtMoney.format(slot.usd)}` : ""}</span>
        </li>`;
    })
    .join("");
  return `
    <ol class="slots">${rows}</ol>
    <p class="slot-sum">Ước lượng ${fmtMoney.format(slotCost(slots))} cho 2 người. Bữa sáng khách sạn không tính vào số này.</p>`;
}

function renderDay(entry, index) {
  const view = viewDay(entry);
  const kind = dayKind(view);
  const info = kindInfo(kind);
  const stay = stayOnDate(entry.date);
  const opt = stay ? optionForStay(stay) : null;
  const food = slotCost(daySlots[entry.date] || []);
  const prev = index > 0 ? viewDay(days[index - 1]) : null;
  const moved = prev && (prev.hotel !== view.hotel || prev.city !== view.city);
  const areaMoved = view.area !== entry.area;
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
            <span class="day-title">${view.city} <span class="muted">· ${view.area}</span></span>
            <span class="tags">
              <span class="tag tag-${kind}">${icon(info.icon, 13)} ${info.label}</span>
              ${moved ? `<span class="tag tag-move">${icon("swap", 13)} Đổi chỗ ở</span>` : ""}
              ${opt && view.hotel !== "Checkout / flight" ? `<span class="tag tag-plain">${icon("bed", 13)} ${optionLabel[opt.id] || view.hotel}</span>` : ""}
              ${opt && view.hotel !== "Checkout / flight" && breakfastIncluded(opt) ? `<span class="tag tag-ok">${icon("check", 13)} Ăn sáng đã gồm</span>` : ""}
              ${food > 0 ? `<span class="tag tag-plain">${icon("wallet", 13)} Ăn ~${fmtMoney.format(food)}</span>` : ""}
            </span>
          </span>
          <span class="chev">${icon("chevron", 20)}</span>
        </button>
      </h3>
      ${areaMoved ? `<p class="shift-note">Đêm này ngủ ở ${view.area}. Phần đi chơi trong ngày vẫn theo lịch gốc.</p>` : ""}
      ${renderSlots(entry.date)}
      <div class="day-panel" id="p-${entry.date}" role="region" aria-label="Chi tiết ${fmtLong.format(d)}" hidden>
        ${renderDetail(entry, stay)}
      </div>
    </li>`;
}

function renderTimeline() {
  const filters = [
    ["all", "Tất cả", days.length],
    ["weekend", "Cuối tuần", days.filter((d, i) => matchesFilter("weekend", d, i)).length],
    ["travel", "Tàu & bay", days.filter((d, i) => matchesFilter("travel", d, i)).length],
    ["move", "Đổi chỗ ở", days.filter((d, i) => matchesFilter("move", d, i)).length],
  ];
  return `
    <section class="section" id="timeline" aria-labelledby="timeline-title" tabindex="-1">
      <div class="section-head">
        <h2 id="timeline-title">Lịch từng ngày</h2>
        <p class="muted">Mỗi ngày chia theo giờ. Giá ăn là ước lượng cho 2 người. Bấm ngày để xem bản đồ, tàu và khách sạn.</p>
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
          <h3>${icon("train")} Vé tàu đã mua</h3>
          <ol class="steps">
            <li>6/11, Sharq 710: Toshkent-Yo'lovchi 08:37, Samarkand 11:46. Cùng toa 16, ghế 007 và 034. Đơn UO78185JOUVPRC, 601.120 som.</li>
            <li>8/11, Sharq 711: Samarkand 08:10, Toshkent-Yo'lovchi 12:19. Toa 06 ghế 016 và toa 07 ghế 026. Hai đơn, mỗi vé 200.060 som.</li>
            <li>Ga ТОШКЕНТ-ЙЎЛОВЧИ là ga trung tâm. Yandex tới đó, không phải ga Nam.</li>
            <li>Bấm Download trên ${extLink("https://eticket.uzrailpass.uz/en/", "eticket.uzrailpass.uz")} và giữ PDF offline. Có mặt trước giờ tàu khoảng 40 phút.</li>
            <li>HY531 cất cánh TAS 21:15 ngày 9/11, Bangkok 05:25 ngày 10/11. Rời Hampton khoảng 17:15.</li>
          </ol>
        </article>
        <article class="card">
          <h3>${icon("book")} Nguồn đã đọc</h3>
          <ul class="source-list">${sources.map((s) => `<li>${extLink(s.url, s.label)}</li>`).join("")}</ul>
        </article>
        <article class="card prep-notes">
          <h3>${icon("users")} Tiền, áo quần, người</h3>
          <div class="note-list">
            ${localLife
              .map(
                (note) => `
              <section>
                <h4>${icon(note.icon, 16)} ${note.title}</h4>
                ${note.paragraphs.map((p) => `<p>${p}</p>`).join("")}
                ${note.links.length ? `<p class="actions">${note.links.map((l) => extLink(l.url, l.label, "text-link")).join("")}</p>` : ""}
              </section>`,
              )
              .join("")}
          </div>
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

let navObserver = null;

function pageHtml() {
  return `
    ${renderTopbar()}
    <main class="page">
      ${renderOverview()}
      ${renderStays()}
      ${renderTimeline()}
      ${renderPrep()}
      <footer class="footer">Giá là quote, chưa đặt. Kiểm tra lại tổng và điều kiện hủy trước khi trả tiền.</footer>
    </main>`;
}

function captureUi() {
  const root = document.getElementById("app");
  return {
    scroll: window.scrollY,
    openDays: [...root.querySelectorAll(".day.open")].map((li) => li.id),
    detailsOpen: root.querySelector(".alternatives")?.open ?? true,
    filter: root.querySelector("[data-filter][aria-pressed='true']")?.getAttribute("data-filter") || "all",
    expanded: root.querySelector("[data-expand-all]")?.getAttribute("aria-pressed") === "true",
  };
}

function restoreUi(ui) {
  const root = document.getElementById("app");
  const details = root.querySelector(".alternatives");
  if (details) details.open = ui.detailsOpen;
  if (ui.filter !== "all") {
    root.querySelectorAll("[data-filter]").forEach((c) => {
      c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === ui.filter));
    });
    root.querySelectorAll(".day").forEach((li) => {
      const index = Number(li.getAttribute("data-index"));
      li.hidden = !matchesFilter(/** @type {Filter} */ (ui.filter), days[index], index);
    });
  }
  if (ui.expanded) {
    const expand = root.querySelector("[data-expand-all]");
    expand.setAttribute("aria-pressed", "true");
    expand.textContent = "Thu gọn tất cả";
  }
  for (const id of ui.openDays) {
    const li = document.getElementById(id);
    if (li && !li.hidden) setDayOpen(li, true);
  }
  window.scrollTo(0, ui.scroll);
}

function watchNav() {
  navObserver?.disconnect();
  const root = document.getElementById("app");
  const navLinks = root.querySelectorAll("[data-nav]");
  navObserver = new IntersectionObserver(
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
  ["overview", "stays", "timeline", "prep"].forEach((id) => navObserver.observe(document.getElementById(id)));
}

function paint(focusId) {
  const root = document.getElementById("app");
  const ui = root.querySelector(".page") ? captureUi() : null;
  root.innerHTML = pageHtml();
  if (ui) restoreUi(ui);
  if (focusId) root.querySelector(`[data-pick="${CSS.escape(focusId)}"]`)?.focus({ preventScroll: true });
  watchNav();
}

function mount() {
  const root = document.getElementById("app");
  paint();

  let dragNight = null;

  root.addEventListener("click", (event) => {
    const reset = event.target.closest("[data-shift-reset]");
    if (reset) {
      shifts = {};
      shiftMsg = "";
      localStorage.removeItem(SHIFT_KEY);
      paint();
      return;
    }

    const pick = event.target.closest("[data-pick]");
    if (pick) {
      const id = pick.getAttribute("data-pick");
      const opt = hotelOptions.find((o) => o.id === id);
      const checkIn = Object.entries(segmentOfStay).find(([, segment]) => segment === opt?.segment)?.[0];
      const stay = hotelStays.find((s) => s.checkIn === checkIn);
      if (!opt || !stay || optionForStay(stay).id === id) return;
      picks = { ...picks, [checkIn]: id };
      localStorage.setItem(PICK_KEY, JSON.stringify(picks));
      paint(id);
      return;
    }

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

  root.addEventListener("dragstart", (event) => {
    const chip = event.target.closest("[data-night]");
    if (!chip) return;
    dragNight = { iso: chip.getAttribute("data-night"), from: chip.getAttribute("data-from") };
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", dragNight.iso);
    chip.classList.add("is-dragging");
  });

  root.addEventListener("dragend", () => {
    dragNight = null;
    root.querySelectorAll(".is-drop, .is-dragging").forEach((el) => el.classList.remove("is-drop", "is-dragging"));
  });

  root.addEventListener("dragover", (event) => {
    const card = event.target.closest("[data-origin]");
    if (!dragNight || !card) return;
    const to = card.getAttribute("data-origin");
    if (shiftPlan(dragNight.iso, dragNight.from, to).error) return;
    event.preventDefault();
    root.querySelectorAll(".is-drop").forEach((el) => el.classList.remove("is-drop"));
    card.classList.add("is-drop");
  });

  root.addEventListener("drop", (event) => {
    const card = event.target.closest("[data-origin]");
    if (!dragNight || !card) return;
    event.preventDefault();
    const iso = dragNight.iso;
    shiftMsg = tryShift(iso, dragNight.from, card.getAttribute("data-origin"));
    dragNight = null;
    paint();
    document.querySelector(`[data-night="${iso}"]`)?.focus({ preventScroll: true });
  });

  root.addEventListener("keydown", (event) => {
    const chip = event.target.closest("[data-night]");
    if (!chip || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    const from = chip.getAttribute("data-from");
    const index = TASHKENT_ORIGINS.indexOf(from);
    const to = event.key === "ArrowRight" ? TASHKENT_ORIGINS[index + 1] : TASHKENT_ORIGINS[index - 1];
    if (!to) return;
    event.preventDefault();
    const iso = chip.getAttribute("data-night");
    shiftMsg = tryShift(iso, from, to);
    paint();
    document.querySelector(`[data-night="${iso}"]`)?.focus({ preventScroll: true });
  });

  root.addEventListener("input", (event) => {
    const field = event.target.closest("[data-price-note]");
    if (!field) return;
    const origin = field.getAttribute("data-price-note");
    const value = field.value.trim();
    if (value) priceNotes[origin] = value;
    else delete priceNotes[origin];
    localStorage.setItem(PRICE_KEY, JSON.stringify(priceNotes));
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
