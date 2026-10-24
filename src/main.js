import { days, hotelStays, hotelOptions, meta, verifyItems } from "./trip-data.js";

const fmtDate = new Intl.DateTimeFormat("vi-VN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const fmtMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function dayKind(entry) {
  if (/MEETING/i.test(entry.work)) return "meeting";
  if (/Train|tau|tàu/i.test(entry.transfer + entry.plan)) return "travel";
  if (/Checkout|flight|Bay|san bay/i.test(entry.plan + entry.hotel)) return "flight";
  if (/Amirsoy|Chimgan|Charvak|Registan|Shah-i-Zinda/i.test(entry.plan)) return "sight";
  if (entry.day === "Sat" || entry.day === "Sun") return "weekend";
  return "work";
}

function kindLabel(kind) {
  switch (kind) {
    case "meeting":
      return "Họp sáng";
    case "travel":
      return "Di chuyển";
    case "flight":
      return "Bay / checkout";
    case "sight":
      return "Tham quan";
    case "weekend":
      return "Cuối tuần";
    default:
      return "Làm việc / remote";
  }
}

function hotelForDate(iso) {
  const t = parseDate(iso).getTime();
  for (const stay of hotelStays) {
    const start = parseDate(stay.checkIn).getTime();
    const end = parseDate(stay.checkOut).getTime();
    if (t >= start && t < end) return stay;
  }
  return null;
}

function renderTimeline(filter) {
  const filtered = days.filter((d) => {
    if (filter === "all") return true;
    if (filter === "meeting") return dayKind(d) === "meeting";
    if (filter === "travel") return dayKind(d) === "travel" || dayKind(d) === "flight";
    if (filter === "hotel-change") {
      const idx = days.indexOf(d);
      if (idx === 0) return false;
      return days[idx - 1].hotel !== d.hotel || days[idx - 1].city !== d.city;
    }
    return true;
  });

  return filtered
    .map((entry, i, arr) => {
      const kind = dayKind(entry);
      const stay = hotelForDate(entry.date);
      const prev = i > 0 ? arr[i - 1] : null;
      const hotelChanged =
        prev && (prev.hotel !== entry.hotel || prev.city !== entry.city);
      const cityChanged = prev && prev.city !== entry.city;

      return `
        <article class="timeline-card ${kind}" data-date="${entry.date}">
          <div class="timeline-rail">
            <span class="dot" aria-hidden="true"></span>
            ${i < arr.length - 1 ? '<span class="line" aria-hidden="true"></span>' : ""}
          </div>
          <div class="timeline-body">
            <header class="card-head">
              <div>
                <p class="date-label">${fmtDate.format(parseDate(entry.date))}</p>
                <h3>${entry.city}</h3>
              </div>
              <div class="badges">
                <span class="badge kind-${kind}">${kindLabel(kind)}</span>
                ${cityChanged ? '<span class="badge city-change">Đổi thành phố</span>' : ""}
                ${hotelChanged ? '<span class="badge hotel-change">Đổi KS</span>' : ""}
              </div>
            </header>
            <div class="hotel-strip">
              <span class="hotel-name">${entry.hotel}</span>
              <span class="area-pill">${entry.area}</span>
              ${
                stay
                  ? `<span class="hotel-meta">${fmtMoney.format(stay.actualTotal / stay.nights)}/đêm · ${stay.breakfast} · ${stay.cancel}</span>`
                  : ""
              }
            </div>
            <p class="work-line"><strong>Công việc:</strong> ${entry.work}</p>
            <p class="plan-line">${entry.plan}</p>
            ${
              entry.transfer
                ? `<p class="transfer-line"><strong>Lưu ý:</strong> ${entry.transfer}</p>`
                : ""
            }
          </div>
        </article>
      `;
    })
    .join("");
}

function renderHotelBars() {
  const tripStart = parseDate(days[0].date).getTime();
  const tripEnd = parseDate(days[days.length - 1].date).getTime() + 86400000;
  const span = tripEnd - tripStart;

  return hotelStays
    .map((stay, i) => {
      const left =
        ((parseDate(stay.checkIn).getTime() - tripStart) / span) * 100;
      const width =
        ((parseDate(stay.checkOut).getTime() - parseDate(stay.checkIn).getTime()) /
          span) *
        100;
      const short = stay.name.replace(" Tashkent", "").replace(" Samarkand", "");
      return `
        <div class="stay-bar stay-${i}" style="left:${left}%;width:${width}%">
          <span class="stay-label">${short}</span>
          <span class="stay-price">${fmtMoney.format(stay.actualTotal)} · ${stay.nights}đ</span>
        </div>
      `;
    })
    .join("");
}

function renderOptions() {
  const bySegment = new Map();
  for (const opt of hotelOptions) {
    if (!bySegment.has(opt.segment)) bySegment.set(opt.segment, []);
    bySegment.get(opt.segment).push(opt);
  }
  return [...bySegment.entries()]
    .map(
      ([segment, opts]) => `
      <section class="option-group">
        <h3>${segment}</h3>
        <ul class="option-list">
          ${opts
            .map(
              (o) => `
            <li class="option-card tier-${o.tier}">
              <div class="option-top">
                <strong>${o.name}</strong>
                <span>${o.total != null ? fmtMoney.format(o.total) : "—"}</span>
              </div>
              <p class="option-meta">${o.area} · ${o.score} · ${o.breakfast} · ${o.cancel}</p>
              <p class="option-why">${o.why}</p>
            </li>`,
            )
            .join("")}
        </ul>
      </section>`,
    )
    .join("");
}

function renderVerify() {
  return verifyItems
    .map(
      (v) => `
    <li class="verify-item ${v.done ? "done" : ""}">
      <input type="checkbox" id="v-${v.label.slice(0, 8)}" ${v.done ? "checked" : ""} />
      <label for="v-${v.label.slice(0, 8)}">${v.label}</label>
      <span class="prio">${v.priority}</span>
    </li>`,
    )
    .join("");
}

function mount() {
  const root = document.getElementById("app");
  let filter = "all";

  const paint = () => {
    root.innerHTML = `
      <div class="page">
        <header class="hero">
          <div class="hero-text">
            <p class="eyebrow">${meta.quoteDate} · ${meta.sources}</p>
            <h1>${meta.title}</h1>
            <p class="sub">${meta.dates} · ${meta.guests} khách · 1 phòng</p>
            <p class="purpose">${meta.purpose}</p>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-label">Budget KS</span>
              <strong>${fmtMoney.format(meta.budgetUsd)}</strong>
            </div>
            <div class="stat highlight">
              <span class="stat-label">Quote đề xuất</span>
              <strong>${fmtMoney.format(meta.quotedTotalUsd)}</strong>
              <span class="stat-sub ${meta.budgetUsd - meta.quotedTotalUsd < 0 ? "over" : ""}">${meta.budgetUsd - meta.quotedTotalUsd < 0 ? "Vượt" : "Còn"} ${fmtMoney.format(Math.abs(meta.budgetUsd - meta.quotedTotalUsd))}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Đêm KS</span>
              <strong>13</strong>
            </div>
          </div>
        </header>

        <section class="panel stays-panel">
          <h2>Lịch khách sạn (theo thời gian)</h2>
          <div class="stay-track">${renderHotelBars()}</div>
          <div class="stay-legend">
            ${hotelStays
              .map(
                (s) =>
                  `<span><strong>${s.name.split(" ")[0]} ${s.name.split(" ")[1] || ""}</strong> ${s.checkIn} → ${s.checkOut}</span>`,
              )
              .join("")}
          </div>
        </section>

        <nav class="filters" aria-label="Lọc timeline">
          ${[
            ["all", "Tất cả"],
            ["meeting", "Ngày họp"],
            ["travel", "Tàu / bay"],
            ["hotel-change", "Đổi KS / thành phố"],
          ]
            .map(
              ([id, label]) =>
                `<button type="button" class="filter-btn ${filter === id ? "active" : ""}" data-filter="${id}">${label}</button>`,
            )
            .join("")}
        </nav>

        <section class="timeline" aria-label="Timeline từng ngày">
          ${renderTimeline(filter)}
        </section>

        <div class="grid-2">
          <section class="panel">
            <h2>Gợi ý KS khác</h2>
            ${renderOptions()}
          </section>
          <section class="panel verify-panel">
            <h2>Cần xác nhận</h2>
            <ul class="verify-list">${renderVerify()}</ul>
            <p class="footnote">Tick trên trình duyệt chỉ để bạn tự nhớ — không lưu file.</p>
          </section>
        </div>
      </div>
    `;

    root.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filter = btn.getAttribute("data-filter") || "all";
        paint();
      });
    });
  };

  paint();
}

mount();
