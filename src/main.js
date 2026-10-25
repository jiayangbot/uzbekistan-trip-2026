import { days, meta } from "./trip-data.js";
import { dayDetails, mapLink, sources, localLife } from "./trip-guide.js";
import { dayEats, daySlots } from "./day-slots.js";
import { dayAddons } from "./addons.js";
import { icon } from "./icons.js";
import { bookingFor, bookings, checkoutOn, legs, legsOn, tripCosts } from "./bookings.js";
import { applyLang, getLang, pick, setLang, t } from "./i18n.js";
import { tr } from "./tr.js";
import { agendaDays, packItems } from "./prep.js";
import { stops } from "./overview.js";
import { destroyTripMap, fitTrip, focusStop, mountTripMap } from "./trip-map.js";

const STORE_KEY = "uz-trip-2026-checks";
const STAY_NOTE_KEY = "uz-trip-2026-stay-notes";

const fmtMoney = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const fmtCents = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

function locale() {
  return getLang() === "en" ? "en-GB" : "vi-VN";
}

function fmtWeekday(date) {
  return new Intl.DateTimeFormat(locale(), { weekday: "short" }).format(date);
}

function fmtLong(date) {
  return new Intl.DateTimeFormat(locale(), { weekday: "long", day: "numeric", month: "long" }).format(date);
}

function fmtMonth(date) {
  return getLang() === "en" ? new Intl.DateTimeFormat("en-GB", { month: "short" }).format(date) : `thg ${date.getMonth() + 1}`;
}

/** @typedef {"stay" | "travel" | "flight" | "sight" | "weekend" | "city" | "prep" | "return"} DayKind */
/** @typedef {"all" | "weekend" | "travel" | "move"} Filter */
/** @typedef {"before" | "during" | "after"} TripPhase */

function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

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

function shortDate(iso) {
  const d = parseDate(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function daysBetween(start, end) {
  return Math.round((parseDate(end).getTime() - parseDate(start).getTime()) / 86400000);
}

function todayIso() {
  return isoOf(new Date());
}

/** @returns {TripPhase} */
function tripPhase() {
  const today = todayIso();
  if (today < days[0].date) return "before";
  if (today > days[days.length - 1].date) return "after";
  return "during";
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function extLink(url, label, cls = "") {
  return `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${label}${icon("external", 14)}<span class="sr-only"> ${t("(mở tab mới)", "(opens in a new tab)")}</span></a>`;
}

function telLink(phone, cls = "") {
  return `<a class="${cls}" href="tel:${phone}">${icon("phone", 16)} ${t("Gọi", "Call")}</a>`;
}

/** @returns {DayKind} */
function dayKind(entry) {
  if (entry.date < days[0].date) return "prep";
  if (entry.date > days[days.length - 1].date) return "return";
  if (/flight/i.test(entry.hotel) || entry.date === days[0].date) return "flight";
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
      return { label: t("Không đổi khách sạn", "Same hotel"), icon: "bed" };
    case "travel":
      return { label: t("Đi tàu", "Train"), icon: "train" };
    case "flight":
      return { label: t("Bay", "Flight"), icon: "plane" };
    case "sight":
      return { label: t("Tham quan", "Sightseeing"), icon: "mountain" };
    case "weekend":
      return { label: t("Cuối tuần", "Weekend"), icon: "sun" };
    case "city":
      return { label: t("Tham quan", "Sightseeing"), icon: "pin" };
    case "prep":
      return { label: t("Chuẩn bị", "Prepare"), icon: "list" };
    case "return":
      return { label: t("Về", "Return"), icon: "plane" };
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
      return legsOn(entry.date).length > 0;
    case "move":
      return index > 0 && bookings.some((b) => b.checkIn === entry.date);
    default: {
      const unreachable = /** @type {never} */ (filter);
      throw new Error(`Unknown filter: ${unreachable}`);
    }
  }
}

function loadJson(key) {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}

/** @type {Record<string, boolean>} */
const checks = loadJson(STORE_KEY);

/** @type {Record<string, string>} */
const stayNotes = Object.fromEntries(
  Object.entries(loadJson(STAY_NOTE_KEY))
    .map(([origin, value]) => [origin, String(value)])
    .filter((entry) => entry[1].trim() !== ""),
);

function checkLabel(key, text, extra = "") {
  return `<label class="check">
    <input type="checkbox" data-check="${key}" ${checks[key] ? "checked" : ""} />
    <span class="check-text">${extra}${text}</span>
  </label>`;
}

function checkItem(key, text, extra = "") {
  return `<li>${checkLabel(key, text, extra)}</li>`;
}

function progressText(prefix, total) {
  const done = Object.keys(checks).filter((k) => k.startsWith(prefix) && checks[k]).length;
  return `${done}/${total}`;
}

const totalNights = bookings.reduce((sum, b) => sum + b.nights, 0);

function navItems() {
  return [
    ["overview", t("Tổng quan", "Overview"), "pin"],
    ["now", t("Hôm nay", "Today"), "sun"],
    ["timeline", t("Lịch", "Days"), "calendar"],
    ["stays", t("Khách sạn", "Hotels"), "bed"],
  ];
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#overview">Uzbekistan <span>2026</span></a>
        <nav aria-label="${t("Các phần", "Sections")}">
          ${navItems()
            .map(([id, label, ic]) => `<a href="#${id}" data-nav="${id}">${icon(ic, 20)}<span>${label}</span></a>`)
            .join("")}
        </nav>
        ${renderLangSwitch()}
      </div>
    </header>`;
}

function renderLeg(leg) {
  return `<li class="ess-row">
    <span class="ess-icon">${icon(leg.kind === "flight" ? "plane" : "train", 18)}</span>
    <span class="ess-text">
      <strong>${leg.code} · <span class="num">${leg.depart}</span> → <span class="num">${leg.arrive}</span></strong>
      <span>${leg.from} → ${leg.to}${leg.seats ? `. ${tr(leg.seats)}` : ""}.</span>
      <span class="muted">${tr(leg.note)}</span>
    </span>
  </li>`;
}

/** Những thứ phải nhớ trong ngày: bay, tàu, trả phòng, nhận phòng. */
function renderEssentials(iso) {
  const rows = [];
  const out = checkoutOn(iso);
  const stay = bookingFor(iso);
  const morning = bookingFor(addDays(iso, -1));
  if (morning) {
    rows.push(`<li class="ess-row">
      <span class="ess-icon">${icon("coffee", 18)}</span>
      <span class="ess-text"><strong>${morning.breakfast ? t(`Ăn sáng ở ${morning.short}, đã gồm`, `Breakfast at ${morning.short}, included`) : t(`Tự ăn sáng, ${morning.short} không gồm`, `Buy breakfast. ${morning.short} does not include it`)}</strong><span class="muted">${tr(morning.breakfastNote)}</span></span>
    </li>`);
  }
  if (out) {
    rows.push(`<li class="ess-row">
      <span class="ess-icon">${icon("clock", 18)}</span>
      <span class="ess-text"><strong>${t(`Trả phòng ${out.short} trước`, `Check out of ${out.short} before`)} <span class="num">${out.checkOutTime}</span></strong></span>
    </li>`);
  }
  for (const leg of legsOn(iso)) rows.push(renderLeg(leg));
  if (stay) {
    const arriving = stay.checkIn === iso;
    rows.push(`<li class="ess-row">
      <span class="ess-icon">${icon("bed", 18)}</span>
      <span class="ess-text">
        <strong>${arriving ? `${t(`Nhận phòng ${stay.short} từ`, `Check in at ${stay.short} from`)} <span class="num">${stay.checkInTime}</span>` : t(`Ngủ ở ${stay.short}`, `Sleep at ${stay.short}`)}</strong>
        <span>${stay.address}</span>
        <span class="ess-links">${extLink(mapLink(stay.mapQuery), t("Bản đồ", "Map"), "mini-link")}${telLink(stay.phone, "mini-link")}</span>
      </span>
    </li>`);
  }
  return `<div class="essentials"><ul class="ess-list">${rows.join("")}</ul></div>`;
}

function renderOverview() {
  const cards = stops
    .map((stop, index) => {
      const photo = stop.image
        ? `<img src="${stop.image}" alt="" width="960" height="640" loading="lazy" />`
        : `<span class="place-fallback">${icon("pin", 28)}</span>`;
      const credit = stop.file ? extLink(stop.file, "Wikimedia", "photo-credit") : "";
      return `
        <article class="place-card" data-stop="${stop.id}">
          <button type="button" class="place-open">
            <span class="place-photo">${photo}<span class="place-n">${index + 1}</span></span>
            <span class="place-copy">
              <span class="place-when">${pick(stop.when)}</span>
              <strong>${pick(stop.title)}</strong>
              <span class="muted">${pick(stop.text)}</span>
            </span>
          </button>
          <p class="place-links">${credit}<a class="text-link" href="#${stop.dayId}">${t("Xem ngày", "Open the day")}</a></p>
        </article>`;
    })
    .join("");
  return `
    <section class="section" id="overview" aria-labelledby="overview-title">
      <div class="section-head">
        <h2 id="overview-title">${t("Tổng quan", "Overview")}</h2>
        <p class="muted">${t("Bangkok sang Tashkent, một ngày lên núi, hai đêm Samarkand, rồi bay về.", "Bangkok to Tashkent, one day in the mountains, two nights in Samarkand, then fly home.")}</p>
      </div>
      <div class="map-tools">
        <div class="filters" role="group" aria-label="${t("Phạm vi bản đồ", "Map extent")}">
          <button type="button" class="chip" data-map-fit="uz" aria-pressed="true">${t("Trong Uzbekistan", "In Uzbekistan")}</button>
          <button type="button" class="chip" data-map-fit="all" aria-pressed="false">${t("Cả đường bay", "Whole route")}</button>
        </div>
      </div>
      <div id="trip-map" class="trip-map" role="region" aria-label="${t("Bản đồ chuyến đi", "Trip map")}"></div>
      <div class="place-grid">${cards}</div>
      <p class="photo-note">${t("Ảnh trên Wikimedia Commons. Bấm một chỗ để bản đồ bay tới đó.", "Photos are on Wikimedia Commons. Tap a place and the map flies there.")}</p>
    </section>`;
}

function renderNow() {
  const phase = tripPhase();
  const today = todayIso();
  const total = tripCosts.paidUsd + tripCosts.atHotelUsd;
  const left = tripCosts.capUsd - total;
  const pct = Math.min(100, Math.round((total / tripCosts.capUsd) * 100));
  const urgent = [];
  for (const day of agendaDays) {
    if (day.date < today) continue;
    for (const step of day.tasks) {
      if (step.priority !== "high" || checks[`agenda:${day.date}:${step.id}`]) continue;
      urgent.push(step);
      if (urgent.length === 4) break;
    }
    if (urgent.length === 4) break;
  }
  /** @type {{ title: string; focus: string | null; label: string }} */
  const head = (() => {
    switch (phase) {
      case "before": {
        const n = daysBetween(today, days[0].date);
        return {
          title: n === 1 ? t("Mai bay Tashkent", "Flight to Tashkent tomorrow") : t(`Còn ${n} ngày tới Tashkent`, `${n} days until Tashkent`),
          focus: days[0].date,
          label: t("Ngày đầu tiên", "First day"),
        };
      }
      case "during": {
        const index = days.findIndex((d) => d.date === today);
        return { title: t(`Ngày ${index + 1}/${days.length} · ${days[index].city}`, `Day ${index + 1}/${days.length} · ${days[index].city}`), focus: today, label: t("Hôm nay", "Today") };
      }
      case "after":
        return { title: t("Chuyến đi đã xong", "The trip is over"), focus: null, label: "" };
      default: {
        const unreachable = /** @type {never} */ (phase);
        throw new Error(`Unknown phase: ${unreachable}`);
      }
    }
  })();
  const focusEntry = head.focus ? days.find((d) => d.date === head.focus) : null;
  return `
    <section class="overview" id="now" aria-labelledby="now-title">
      <div class="hero">
        <p class="eyebrow">${meta.dates} · ${meta.guests} ${t("người", "people")} · ${totalNights} ${t("đêm", "nights")} · ${t("5/5 khách sạn đã đặt", "5/5 hotels booked")}</p>
        <h1 id="now-title">${head.title}</h1>
        <p class="lead">${tr(meta.purpose)}</p>
      </div>
      ${
        focusEntry
          ? `<article class="card today-card">
              <div class="today-head">
                <div>
                  <p class="card-label">${icon("calendar")} ${head.label}</p>
                  <h2>${fmtLong(parseDate(focusEntry.date))}</h2>
                  <p class="muted">${tr(focusEntry.plan)}</p>
                </div>
                <a class="btn" href="#d-${focusEntry.date}">${t("Lịch ngày này", "This day")}</a>
              </div>
              ${renderEssentials(focusEntry.date)}
            </article>`
          : ""
      }
      <div class="stats">
        <article class="card budget-card">
          <h2 class="card-label">${icon("wallet")} ${t("Tiền khách sạn", "Hotel money")}</h2>
          <p class="big-number">${fmtCents.format(total)} <span>/ ${fmtMoney.format(tripCosts.capUsd)}</span></p>
          <div class="meter" role="img" aria-label="${t(`Bằng ${pct}% trần`, `${pct}% of the cap`)}"><span style="width:${pct}%"></span></div>
          <p class="status is-ok">${icon("check", 16)} ${t(`Còn ${fmtCents.format(left)} dưới trần`, `${fmtCents.format(left)} under the cap`)}</p>
          <p class="muted">${t(`Đã trả trên Trip ${fmtCents.format(tripCosts.paidUsd)}. Thuế trả tại khách sạn ${fmtCents.format(tripCosts.atHotelUsd)}.`, `Paid on Trip ${fmtCents.format(tripCosts.paidUsd)}. Tax due at the hotel ${fmtCents.format(tripCosts.atHotelUsd)}.`)}</p>
        </article>
        <article class="card">
          <h2 class="card-label">${icon("plane")} ${t("Đi và về", "Flights")}</h2>
          <ul class="mini-legs">${legs
            .filter((leg) => leg.kind === "flight")
            .map((leg) => `<li><strong>${leg.code}</strong> <span class="num">${shortDate(leg.date)} ${leg.depart}</span><span class="muted">${leg.from} → ${leg.to}</span></li>`)
            .join("")}</ul>
        </article>
        <article class="card">
          <h2 class="card-label">${icon("alert")} ${t("Việc gấp", "Do next")}</h2>
          <ul class="mini-list">${urgent.length ? urgent.map((step) => `<li>${pick(step.text)}</li>`).join("") : `<li>${t("Không còn việc gấp.", "Nothing urgent left.")}</li>`}</ul>
          <a class="text-link" href="#timeline">${t("Mở lịch từng ngày", "Open the days")}</a>
        </article>
      </div>
    </section>`;
}

function renderReview(review) {
  if (!review) return "";
  return `
    <div class="review">
      <p>${extLink(review.url, `${review.score} · ${tr(review.count)}`, "review-link")}</p>
      <p>${tr(review.good)}</p>
      <p class="review-watch">${icon("alert", 14)} ${tr(review.watch)}</p>
    </div>`;
}

function renderStays() {
  const start = parseDate(days[0].date).getTime();
  const span = parseDate(days[days.length - 1].date).getTime() + 86400000 - start;
  const strip = bookings
    .map((b, i) => {
      const left = ((parseDate(b.checkIn).getTime() - start) / span) * 100;
      const width = ((parseDate(b.checkOut).getTime() - parseDate(b.checkIn).getTime()) / span) * 100;
      return `<span class="seg seg-${i}" style="left:${left}%;width:${width}%"></span>`;
    })
    .join("");
  const today = todayIso();
  const cards = bookings
    .map((b, i) => {
      const done = b.checkOut < today;
      const cancelOpen = b.freeCancelUntil && today <= b.freeCancelUntil;
      return `
        <li class="card stay-card ${done ? "is-past" : ""}">
          <div class="stay-head">
            <span class="stay-index seg-${i}" aria-hidden="true">${i + 1}</span>
            <div>
              <h3>${b.name}</h3>
              <p class="muted">${tr(b.city)} · ${tr(b.area)}</p>
            </div>
            <span class="tag tag-ok">${icon("check", 13)} ${t("Đã đặt", "Booked")}</span>
          </div>
          <div class="stay-when">
            <p><span class="k">${t("Nhận", "In")}</span> <span class="num">${fmtWeekday(parseDate(b.checkIn))} ${shortDate(b.checkIn)}</span> ${t("từ", "from")} <span class="num">${b.checkInTime}</span></p>
            <p><span class="k">${t("Trả", "Out")}</span> <span class="num">${fmtWeekday(parseDate(b.checkOut))} ${shortDate(b.checkOut)}</span> ${t("trước", "before")} <span class="num">${b.checkOutTime}</span></p>
            <p class="muted">${b.nights} ${t("đêm", "nights")} · ${tr(b.room)}</p>
          </div>
          <div class="stay-bill">
            <p class="stay-total">${fmtCents.format(b.paidUsd + b.atHotelUsd)}<span>${t("Đã trả", "Paid")} ${fmtCents.format(b.paidUsd)}${b.atHotelUsd ? t(` · thuế tại khách sạn ${fmtCents.format(b.atHotelUsd)}`, ` · hotel tax ${fmtCents.format(b.atHotelUsd)}`) : ""}</span></p>
            ${b.breakfast ? `<span class="tag tag-meal">${icon("coffee", 13)} ${t("Có ăn sáng", "Breakfast included")}</span>` : `<span class="tag tag-nomeal">${icon("alert", 13)} ${t("Không ăn sáng", "No breakfast")}</span>`}
          </div>
          <p class="muted">${tr(b.breakfastNote)}</p>
          <p class="${cancelOpen ? "cancel-open" : "muted"}">${icon(cancelOpen ? "clock" : "alert", 14)} ${tr(b.cancel)}</p>
          <p>${b.address}. ${tr(b.note)}</p>
          <div class="actions">
            ${extLink(mapLink(b.mapQuery), t("Bản đồ", "Map"), "btn")}
            ${telLink(b.phone, "btn")}
          </div>
          <label class="field">
            <span>${t("Ghi chú", "Note")}</span>
            <textarea data-stay-note="${b.checkIn}" rows="2" placeholder="${t("Số phòng, mã wifi, việc cần nhớ", "Room, wifi, things to remember")}" autocomplete="off">${escapeHtml(stayNotes[b.checkIn] || "")}</textarea>
          </label>
          ${renderReview(b.review)}
        </li>`;
    })
    .join("");
  return `
    <section class="section" id="stays" aria-labelledby="stays-title">
      <div class="section-head">
        <h2 id="stays-title">${t("Khách sạn đã đặt", "Booked hotels")}</h2>
        <p class="muted">${t("Giờ nhận phòng, trả phòng và ăn sáng theo booking đã chốt.", "Check-in, check-out, and breakfast follow the confirmed bookings.")}</p>
      </div>
      <div class="strip" aria-hidden="true">${strip}</div>
      <ol class="stay-grid">${cards}</ol>
    </section>`;
}

function renderDetail(entry) {
  const detail = dayDetails[entry.date];
  if (!detail) return "";
  const stay = bookingFor(entry.date);
  const research = detail.research.map((n) => `<li><p>${tr(n.text)}</p>${extLink(n.url, tr(n.source), "source-link")}</li>`).join("");
  const todo = detail.checklist.map((item, i) => checkItem(`day:${entry.date}:${i}`, tr(item))).join("");
  return `
    <div class="detail-grid">
      <div class="detail-col">
        ${
          stay
            ? `<section class="block">
                <h4>${icon("bed", 16)} ${stay.name}</h4>
                <p>${tr(stay.room)}</p>
                <p class="muted">${tr(stay.cancel)}</p>
                <div class="actions">
                  ${extLink(mapLink(stay.mapQuery), t("Bản đồ", "Map"), "btn")}
                  ${telLink(stay.phone, "btn")}
                </div>
              </section>`
            : ""
        }
        <section class="block">
          <h4>${icon("thermo", 16)} ${t("Thời tiết", "Weather")}</h4>
          <p><strong>${tr(detail.weather.label)}</strong></p>
          <p class="muted">${tr(detail.weather.note)}</p>
          ${extLink(detail.weather.url, tr(detail.weather.source), "source-link")}
        </section>
        ${
          detail.transport
            ? `<section class="block block-accent">
                <h4>${icon("train", 16)} ${tr(detail.transport.title)}</h4>
                <ol class="steps">${detail.transport.steps.map((s) => `<li>${tr(s)}</li>`).join("")}</ol>
                <div class="actions">${detail.transport.links.map((l, i) => extLink(l.url, tr(l.label), i === 0 ? "btn btn-primary" : "btn")).join("")}</div>
              </section>`
            : ""
        }
        <section class="block">
          <h4>${icon("list", 16)} ${t("Việc trong ngày", "Today's list")} <span class="count" data-progress="day:${entry.date}:">${progressText(`day:${entry.date}:`, detail.checklist.length)}</span></h4>
          <ul class="checks">${todo}</ul>
        </section>
      </div>
      ${
        research
          ? `<div class="detail-col">
        <section class="block">
          <h4>${icon("book", 16)} ${t("Đã đọc", "Read")}</h4>
          <ul class="notes">${research}</ul>
        </section>
      </div>`
          : ""
      }
    </div>`;
}

function placeNotes(place) {
  return [
    place.where ? `<p>${tr(place.where)}</p>` : "",
    place.eat || place.dishes ? `<p><span class="k">${t("Ăn", "Eat")}</span> ${tr(place.eat || place.dishes)}</p>` : "",
    place.doing ? `<p><span class="k">${t("Làm", "Do")}</span> ${tr(place.doing)}</p>` : "",
    place.tip ? `<p><span class="k">${t("Mẹo", "Tip")}</span> ${tr(place.tip)}</p>` : "",
  ].join("");
}

function renderPlaces(list) {
  return list
    .map(
      (place) => `
      <li class="place">
        <span class="place-icon">${icon("pin", 16)}</span>
        <div>
          ${extLink(mapLink(place.query), tr(place.name), "place-name")}
          ${placeNotes(place)}
        </div>
      </li>`,
    )
    .join("");
}

function renderEats(date) {
  const eats = dayEats[date];
  if (!eats) return "";
  return `
    <details class="day-block">
      <summary>${icon("coffee", 16)} ${t("Món ngon", "Food")} <span class="muted">(${eats.places.length})</span>${icon("chevron", 16)}</summary>
      <p class="muted">${tr(eats.note)} ${t("Chọn một chỗ, không cần ăn hết.", "Pick one place. You do not need to eat at all of them.")} ${t("Không vào quán Ấn và không ngồi gần quầy cari. Mùi đó không ăn được.", "Do not go into an Indian restaurant or sit near a curry counter. That smell does not work.")}</p>
      <ul class="places">${renderPlaces(eats.places)}</ul>
    </details>`;
}

function renderStops(date) {
  const detail = dayDetails[date];
  if (!detail) return "";
  return `
    <details class="day-block">
      <summary>${icon("pin", 16)} ${t("Chỗ phải đi", "Places")} <span class="muted">(${detail.places.length})</span>${icon("chevron", 16)}</summary>
      <ul class="places">${renderPlaces(detail.places)}</ul>
    </details>`;
}

function renderSlots(date) {
  const rows = (daySlots[date] || [])
    .map((slot) => {
      const title = slot.eat ? (slot.query ? extLink(mapLink(slot.query), tr(slot.eat), "slot-link") : `<strong>${tr(slot.eat)}</strong>`) : "";
      return `
        <li class="slot">
          <time datetime="${slot.time}">${slot.time}</time>
          <span class="part">${tr(slot.part)}</span>
          <span class="slot-body">${title ? `<span class="slot-eat">${title}. </span>` : ""}${tr(slot.text)}</span>
        </li>`;
    })
    .join("");
  return `<ol class="slots">${rows}</ol>`;
}

function renderAddons(date) {
  const items = dayAddons[date];
  if (!items?.length) return "";
  return `
    <section class="addons" aria-label="${t("Thử thêm", "Add-ons")}">
      <h4>${icon("list", 16)} ${t("Thử thêm", "Add-ons")}</h4>
      <ul>
        ${items
          .map(
            (item) =>
              `<li><span class="tag tag-plain">${escapeHtml(pick(item.mode))}</span><span>${escapeHtml(pick(item.text))}</span></li>`,
          )
          .join("")}
      </ul>
    </section>`;
}

function allEntries() {
  const extra = agendaDays
    .filter((day) => day.city && day.plan && !days.some((entry) => entry.date === day.date))
    .map((day) => ({
      date: day.date,
      day: day.date === "2026-10-26" ? "Mon" : "Tue",
      city: day.city.vi,
      area: day.area?.vi ?? "",
      hotel: "",
      plan: day.plan.vi,
      transfer: "",
    }));
  return [...extra.filter((entry) => entry.date < days[0].date), ...days, ...extra.filter((entry) => entry.date > days[days.length - 1].date)];
}

function shownEntries() {
  const today = todayIso();
  return allEntries()
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.date >= today);
}

function renderDayTasks(date) {
  const day = agendaDays.find((item) => item.date === date);
  if (!day || (day.tasks.length === 0 && !day.pack)) return "";
  const prefix = `agenda:${date}:`;
  const steps = day.tasks
    .map((step) => {
      return `<li>
        <p class="prep-when">${escapeHtml(pick(step.when))}</p>
        ${checkLabel(
          `${prefix}${step.id}`,
          `<span class="check-line"><span class="prio prio-${step.priority}">${step.priority === "high" ? t("Gấp", "Now") : t("Vừa", "Soon")}</span><strong>${escapeHtml(pick(step.text))}</strong></span>${step.detail ? `<span class="muted">${escapeHtml(pick(step.detail))}</span>` : ""}`,
        )}
      </li>`;
    })
    .join("");
  const pack = day.pack
    ? `<li>
        <p class="prep-when">${t("Tối", "Evening")}</p>
        <h4 class="prep-pack-title">${icon("shirt", 16)} ${t("Soạn vali", "Pack the bag")}</h4>
        <ul class="checks">${packItems
          .map((item) => checkItem(`${prefix}pack:${item.id}`, `<strong>${escapeHtml(pick(item.item))}</strong><span class="muted">${escapeHtml(pick(item.why))}</span>`))
          .join("")}</ul>
      </li>`
    : "";
  return `<ul class="agenda-tasks">${steps}${pack}</ul>`;
}

function renderDay(entry, index) {
  const kind = dayKind(entry);
  const info = kindInfo(kind);
  const stay = bookingFor(entry.date);
  const moving = index > 0 && stay?.checkIn === entry.date;
  const d = parseDate(entry.date);
  const isToday = entry.date === todayIso();
  const extra = agendaDays.find((day) => day.date === entry.date);
  const city = extra?.city ? pick(extra.city) : tr(entry.city);
  const area = extra?.area ? pick(extra.area) : tr(entry.area);
  const plan = extra?.plan ? pick(extra.plan) : tr(entry.plan);
  const detail = renderDetail(entry);
  const prefix = `agenda:${entry.date}:`;
  const taskCount = (extra?.tasks.length ?? 0) + (extra?.pack ? packItems.length : 0);
  const head = `
    <span class="date-chip" aria-hidden="true">
      <span class="dow">${fmtWeekday(d)}</span>
      <span class="dnum">${d.getDate()}</span>
      <span class="mon">${fmtMonth(d)}</span>
    </span>
    <span class="day-main">
      <span class="sr-only">${fmtLong(d)}. </span>
      <span class="day-title">${isToday ? `<span class="today-dot">${t("Hôm nay", "Today")}</span> ` : ""}${city} <span class="muted">· ${area}</span></span>
      <span class="tags">
        <span class="tag tag-${kind}">${icon(info.icon, 13)} ${info.label}</span>
        ${moving ? `<span class="tag tag-move">${icon("swap", 13)} ${t("Đổi khách sạn", "Hotel change")}</span>` : ""}
        ${stay ? `<span class="tag tag-plain">${icon("bed", 13)} ${stay.short}</span>` : ""}
        ${taskCount ? `<span class="tag tag-plain" data-progress="${prefix}">${progressText(prefix, taskCount)}</span>` : ""}
      </span>
    </span>`;
  return `
    <li class="day kind-${kind} ${isToday ? "is-today" : ""}" id="d-${entry.date}" data-index="${index}">
      <h3 class="day-heading">
        ${
          detail
            ? `<button type="button" class="day-toggle" aria-expanded="false" aria-controls="p-${entry.date}">
                ${head}
                <span class="chev">${icon("chevron", 20)}</span>
              </button>`
            : `<div class="day-head">${head}</div>`
        }
      </h3>
      ${(daySlots[entry.date] || []).length ? "" : `<p class="day-plan">${plan}</p>`}
      ${renderDayTasks(entry.date)}
      ${renderEssentials(entry.date)}
      ${renderSlots(entry.date)}
      ${renderAddons(entry.date)}
      ${renderStops(entry.date)}
      ${renderEats(entry.date)}
      ${detail ? `<div class="day-panel" id="p-${entry.date}" role="region" aria-label="${t("Chi tiết", "Details")} ${fmtLong(d)}" hidden>${detail}</div>` : ""}
    </li>`;
}

function renderNotes() {
  return `
    <div class="prep-grid">
      <article class="card">
        <h3>${icon("train")} ${t("Bay và tàu", "Flights and trains")}</h3>
        <ul class="ess-list">${legs.map(renderLeg).join("")}</ul>
        <p class="muted">${t("Ga ТОШКЕНТ-ЙЎЛОВЧИ là ga trung tâm, không phải ga Nam.", "ТОШКЕНТ-ЙЎЛОВЧИ is the central station, not the south station.")}</p>
      </article>
      <article class="card">
        <h3>${icon("book")} ${t("Nguồn đã đọc", "Sources")}</h3>
        <ul class="source-list">${sources.map((s) => `<li>${extLink(s.url, tr(s.label))}</li>`).join("")}</ul>
      </article>
      <article class="card prep-notes">
        <h3>${icon("users")} ${t("Tiền, áo quần, người", "Money, clothes, people")}</h3>
        <div class="note-list">
          ${localLife
            .map(
              (note) => `
            <section>
              <h4>${icon(note.icon, 16)} ${tr(note.title)}</h4>
              ${note.paragraphs.map((p) => `<p>${tr(p)}</p>`).join("")}
              ${note.links.length ? `<p class="actions">${note.links.map((l) => extLink(l.url, tr(l.label), "text-link")).join("")}</p>` : ""}
            </section>`,
            )
            .join("")}
        </div>
      </article>
    </div>`;
}

function renderTimeline() {
  const shown = shownEntries();
  const filters = [
    ["all", t("Tất cả", "All"), shown.length],
    ["travel", t("Bay & tàu", "Flights & trains"), shown.filter(({ entry, index }) => matchesFilter("travel", entry, index)).length],
    ["move", t("Đổi khách sạn", "Hotel changes"), shown.filter(({ entry, index }) => matchesFilter("move", entry, index)).length],
    ["weekend", t("Cuối tuần", "Weekends"), shown.filter(({ entry, index }) => matchesFilter("weekend", entry, index)).length],
  ];
  return `
    <section class="section" id="timeline" aria-labelledby="timeline-title" tabindex="-1">
      <div class="section-head">
        <h2 id="timeline-title">${t("Lịch từng ngày", "Day by day")}</h2>
        <p class="muted">${t("Từ 26/10 chuẩn bị đến 10/11 về. Việc của ngày nào nằm trong ngày đó. Tick lưu trên máy này.", "From prep on 26 Oct through the return on 10 Nov. Each day's jobs sit on that day. Ticks stay on this phone.")}</p>
      </div>
      <div class="toolbar">
        <div class="filters" role="group" aria-label="${t("Lọc ngày", "Filter days")}">
          ${filters
            .map(([id, label, count], i) => `<button type="button" class="chip" data-filter="${id}" aria-pressed="${i === 0}">${label} <span class="num">${count}</span></button>`)
            .join("")}
        </div>
      </div>
      <ol class="days">${shown.length ? shown.map(({ entry, index }) => renderDay(entry, index)).join("") : `<li class="muted">${t("Các ngày trong lịch đã qua.", "Every day in the plan has passed.")}</li>`}</ol>
      ${renderNotes()}
    </section>`;
}

function renderLangSwitch() {
  const current = getLang();
  return `
    <div class="lang-switch" role="group" aria-label="${t("Ngôn ngữ", "Language")}">
      <button type="button" data-lang="vi" aria-pressed="${current === "vi"}">VI</button>
      <button type="button" data-lang="en" aria-pressed="${current === "en"}">EN</button>
    </div>`;
}

function setDayOpen(li, open) {
  const toggle = li.querySelector(".day-toggle");
  const panel = li.querySelector(".day-panel");
  if (!toggle || !panel) return;
  toggle.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
  li.classList.toggle("open", open);
}

function pageHtml() {
  return `
    ${renderTopbar()}
    <main class="page">
      ${renderOverview()}
      ${renderNow()}
      ${renderTimeline()}
      ${renderStays()}
      <footer class="footer">${t("Lịch đi chơi và khách sạn đã chốt. Vé và voucher giữ riêng, không để trên trang này.", "The plan and hotels are confirmed. Tickets and vouchers stay off this page.")}</footer>
    </main>`;
}

function captureUi() {
  const root = document.getElementById("app");
  return {
    scroll: window.scrollY,
    openDays: [...root.querySelectorAll(".day.open")].map((li) => li.id),
    openBlocks: [...root.querySelectorAll(".day details[open]")].map((el) => `${el.closest(".day").id}:${[...el.parentElement.querySelectorAll(":scope > details")].indexOf(el)}`),
    filter: root.querySelector("[data-filter][aria-pressed='true']")?.getAttribute("data-filter") || "all",
  };
}

function applyFilter(filter) {
  const root = document.getElementById("app");
  root.querySelectorAll("[data-filter]").forEach((c) => c.setAttribute("aria-pressed", String(c.getAttribute("data-filter") === filter)));
  root.querySelectorAll(".day").forEach((li) => {
    const index = Number(li.getAttribute("data-index"));
    li.hidden = !matchesFilter(/** @type {Filter} */ (filter), allEntries()[index], index);
  });
}

function restoreUi(ui) {
  if (ui.filter !== "all") applyFilter(ui.filter);
  for (const id of ui.openDays) {
    const li = document.getElementById(id);
    if (li && !li.hidden) setDayOpen(li, true);
  }
  for (const key of ui.openBlocks) {
    const [id, pos] = key.split(":");
    const blocks = document.getElementById(id)?.querySelectorAll(":scope > details");
    if (blocks?.[Number(pos)]) blocks[Number(pos)].open = true;
  }
  window.scrollTo(0, ui.scroll);
}

let navObserver = null;

function watchNav() {
  navObserver?.disconnect();
  const navLinks = document.querySelectorAll("[data-nav]");
  navObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        navLinks.forEach((a) => {
          if (a.getAttribute("data-nav") === entry.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  navItems().forEach(([id]) => navObserver.observe(document.getElementById(id)));
}

function paint() {
  const root = document.getElementById("app");
  const ui = root.querySelector(".page") ? captureUi() : null;
  destroyTripMap();
  root.innerHTML = pageHtml();
  if (ui) restoreUi(ui);
  watchNav();
  mountTripMap();
}

function mount() {
  applyLang();
  const root = document.getElementById("app");
  paint();

  root.addEventListener("click", (event) => {
    const langBtn = event.target.closest("[data-lang]");
    if (langBtn) {
      const value = langBtn.getAttribute("data-lang");
      if (value === "vi" || value === "en") {
        setLang(value);
        paint();
      }
      return;
    }

    const fit = event.target.closest("[data-map-fit]");
    if (fit instanceof HTMLElement) {
      const mode = fit.getAttribute("data-map-fit");
      if (mode === "uz" || mode === "all") fitTrip(mode);
      return;
    }

    const stop = event.target.closest("[data-stop]");
    if (stop instanceof HTMLElement && !event.target.closest("a")) {
      focusStop(stop.getAttribute("data-stop") || "");
      return;
    }

    const toggle = event.target.closest(".day-toggle");
    if (toggle) {
      const li = toggle.closest(".day");
      if (!li.querySelector(".day-panel")) return;
      const open = toggle.getAttribute("aria-expanded") !== "true";
      setDayOpen(li, open);
      history.replaceState(null, "", open ? `#${li.id}` : "#timeline");
      return;
    }

    const chip = event.target.closest("[data-filter]");
    if (chip) applyFilter(chip.getAttribute("data-filter"));
  });

  root.addEventListener("input", (event) => {
    const note = event.target.closest("[data-stay-note]");
    if (!(note instanceof HTMLTextAreaElement)) return;
    const origin = note.getAttribute("data-stay-note");
    if (note.value.trim()) stayNotes[origin] = note.value;
    else delete stayNotes[origin];
    localStorage.setItem(STAY_NOTE_KEY, JSON.stringify(stayNotes));
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
