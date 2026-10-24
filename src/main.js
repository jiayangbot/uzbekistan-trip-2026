import { days, hotelStays, hotelOptions, meta, verifyItems } from "./trip-data.js";
import { dayDetails, stayLinks, mapLink, packing, masterChecklist, sources } from "./trip-guide.js";

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

function perNight(total, nights) {
  return fmtMoney.format(Math.round(total / nights));
}

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

function stayOnDate(iso) {
  return hotelForDate(iso) || hotelStays.find((stay) => stay.checkOut === iso) || null;
}

function renderDetail(entry, stay) {
  const detail = dayDetails[entry.date];
  if (!detail) return "";
  const links = stay ? stayLinks(stay) : null;
  const places = detail.places
    .map(
      (place) => `
      <li>
        <a href="${mapLink(place.query)}" target="_blank" rel="noopener">${place.name}</a>
        <p>${place.tip}</p>
      </li>`,
    )
    .join("");
  const research = detail.research
    .map(
      (note) => `
      <li>
        <p>${note.text}</p>
        <a href="${note.url}" target="_blank" rel="noopener">${note.source}</a>
      </li>`,
    )
    .join("");
  const checks = detail.checklist.map((item) => `<li>${item}</li>`).join("");
  const transport = detail.transport
    ? `
      <section>
        <h4>${detail.transport.title}</h4>
        <ol>${detail.transport.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
        <p class="link-row">${detail.transport.links.map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`).join("")}</p>
      </section>`
    : "";
  return `
    <div class="day-detail">
      <section>
        <h4>Thời tiết</h4>
        <p><strong>${detail.weather.label}</strong></p>
        <p>${detail.weather.note}</p>
        <a href="${detail.weather.url}" target="_blank" rel="noopener">${detail.weather.source}</a>
      </section>
      ${
        stay && links
          ? `<section>
              <h4>Khách sạn</h4>
              <p>${stay.name}. ${perNight(stay.actualTotal, stay.nights)}/đêm · ${fmtMoney.format(stay.actualTotal)} / ${stay.nights} đêm. ${stay.breakfast}. ${stay.cancel}.</p>
              <p class="link-row">
                <a href="${links.trip}" target="_blank" rel="noopener">Mở Trip.com</a>
                <a href="${links.booking}" target="_blank" rel="noopener">Mở Booking.com</a>
                <a href="${links.map}" target="_blank" rel="noopener">Google Maps</a>
              </p>
            </section>`
          : ""
      }
      <section>
        <h4>Đi đâu</h4>
        <ul class="place-list">${places}</ul>
      </section>
      ${transport}
      <section>
        <h4>Đã đọc</h4>
        <ul class="research-list">${research}</ul>
      </section>
      <section>
        <h4>Việc trong ngày</h4>
        <ul class="check-list">${checks}</ul>
      </section>
    </div>`;
}

function renderTimeline(filter, selectedDate) {
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
      const stay = stayOnDate(entry.date);
      const open = selectedDate === entry.date;
      const prev = i > 0 ? arr[i - 1] : null;
      const hotelChanged =
        prev && (prev.hotel !== entry.hotel || prev.city !== entry.city);
      const cityChanged = prev && prev.city !== entry.city;

      return `
        <article class="timeline-card ${kind}${open ? " open" : ""}" data-date="${entry.date}">
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
            <p class="open-hint">${open ? "Thu gọn" : "Bấm để xem bản đồ, khách sạn, tàu và việc cần làm"}</p>
            ${open ? renderDetail(entry, stay) : ""}
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
          <span class="stay-price">${perNight(stay.actualTotal, stay.nights)}/đêm</span>
          <span class="stay-total">${fmtMoney.format(stay.actualTotal)} · ${stay.nights}đ</span>
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

function renderGuide() {
  return `
    <section class="panel guide" id="guide">
      <h2>Cả chuyến</h2>
      <div class="guide-grid">
        <section>
          <h3>Đồ mang theo</h3>
          <ul class="place-list">
            ${packing.map((row) => `<li><strong>${row.item}</strong><p>${row.why}</p></li>`).join("")}
          </ul>
        </section>
        <section>
          <h3>Trước khi bay</h3>
          <ul class="check-list">
            ${masterChecklist.map((row) => `<li><span class="prio">${row.priority}</span> ${row.label}</li>`).join("")}
          </ul>
        </section>
      </div>
      <section>
        <h3>Đặt tàu</h3>
        <ol>
          <li>Vào <a href="https://eticket.uzrailpass.uz/en/" target="_blank" rel="noopener">eticket.uzrailpass.uz</a>. Site cũ eticket.railway.uz chuyển tiếp sang đây.</li>
          <li>Chọn Toshkent → Samarqand ngày 6/11, chuyến sáng. Chiều về Samarqand → Toshkent ngày 8/11.</li>
          <li>Điền đúng số passport. Ga đi là Toshkent Markaziy, không phải ga Nam.</li>
          <li>Economy khoảng 311.000 som một người vào giữa năm 2026. Giữ PDF offline. Có mặt trước giờ tàu khoảng 40 phút.</li>
        </ol>
        <p><a href="https://oxusroad.com/en/trains/afrosiyob/" target="_blank" rel="noopener">Chi tiết giá và giờ mở bán</a></p>
      </section>
      <section>
        <h3>Nguồn</h3>
        <p class="link-row">${sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener">${source.label}</a>`).join("")}</p>
      </section>
    </section>`;
}

function mount() {
  const root = document.getElementById("app");
  let filter = "all";
  let selectedDate = "";

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
              <span class="stat-sub">${perNight(meta.budgetUsd, hotelStays.reduce((sum, stay) => sum + stay.nights, 0))}/đêm</span>
            </div>
            <div class="stat highlight">
              <span class="stat-label">Quote đề xuất</span>
              <strong>${fmtMoney.format(meta.quotedTotalUsd)}</strong>
              <span class="stat-sub ${meta.budgetUsd - meta.quotedTotalUsd < 0 ? "over" : ""}">${perNight(meta.quotedTotalUsd, hotelStays.reduce((sum, stay) => sum + stay.nights, 0))}/đêm · ${meta.budgetUsd - meta.quotedTotalUsd < 0 ? "Vượt" : "Còn"} ${fmtMoney.format(Math.abs(meta.budgetUsd - meta.quotedTotalUsd))}</span>
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
                  `<span><strong>${s.name}</strong> ${perNight(s.actualTotal, s.nights)}/đêm · ${s.checkIn} → ${s.checkOut}</span>`,
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
          ${renderTimeline(filter, selectedDate)}
        </section>
        ${renderGuide()}

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

    const keepScroll = (change) => {
      const y = window.scrollY;
      change();
      paint();
      window.scrollTo(0, y);
    };
    root.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        keepScroll(() => {
          filter = btn.getAttribute("data-filter") || "all";
        });
      });
    });
    root.querySelectorAll(".timeline-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        if (event.target.closest("a")) return;
        const date = card.getAttribute("data-date") || "";
        keepScroll(() => {
          selectedDate = selectedDate === date ? "" : date;
        });
      });
    });
  };

  paint();
}

mount();
