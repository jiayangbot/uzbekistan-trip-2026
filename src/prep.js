/** @typedef {"high" | "medium"} PrepPriority */
/** @typedef {{ vi: string, en: string }} Copy */
/**
 * @typedef {Object} PrepStep
 * @property {string} id
 * @property {Copy} when
 * @property {Copy} text
 * @property {Copy} [detail]
 * @property {PrepPriority} priority
 */
/**
 * @typedef {Object} PackItem
 * @property {string} id
 * @property {Copy} item
 * @property {Copy} why
 */
/**
 * @typedef {Object} AgendaDay
 * @property {string} date
 * @property {Copy} [city]
 * @property {Copy} [area]
 * @property {Copy} [plan]
 * @property {PrepStep[]} tasks
 * @property {boolean} [pack]
 */

/** Một dòng thời gian theo ngày. Ngày 27/10–9/11 lấy tên chỗ và kế hoạch từ lịch chuyến đi. */
/** @type {AgendaDay[]} */
export const agendaDays = [
  {
    date: "2026-10-26",
    city: { vi: "Bangkok", en: "Bangkok" },
    area: { vi: "Ngày chuẩn bị", en: "Prep day" },
    plan: {
      vi: "Ở Bangkok. Xong tiền, thẻ, app và vali trước khi ngủ.",
      en: "Stay in Bangkok. Finish cash, cards, the app, and the bag before bed.",
    },
    pack: true,
    tasks: [
      {
        id: "usd",
        when: { vi: "Trong ngày", en: "During the day" },
        text: { vi: "Đổi USD tờ 100, khoảng $600 cho hai người", en: "Buy about $600 in clean $100 bills for two people" },
        detail: {
          vi: "SuperRich trong thành phố, không đợi tới sân bay. Tờ phẳng, không rách, không viết. Khách sạn và tàu trả bằng thẻ. Sang Tashkent đổi tại Kapitalbank, số 7 phố Sayilgoh.",
          en: "Exchange in the city, not at the airport. Bills must be flat, unwritten, and untorn. Hotels and trains are paid by card. In Tashkent, change them at Kapitalbank, 7 Sayilgoh Street.",
        },
        priority: "high",
      },
      {
        id: "bank",
        when: { vi: "Trước ngày bay", en: "Before the flight" },
        text: { vi: "Báo hai ngân hàng là thẻ sẽ dùng ở Uzbekistan", en: "Tell both banks the cards will be used in Uzbekistan" },
        detail: { vi: "Mang hai thẻ của hai ngân hàng.", en: "Carry two cards from two banks." },
        priority: "medium",
      },
      {
        id: "yandex",
        when: { vi: "Trước ngày bay", en: "Before the flight" },
        text: { vi: "Cài Yandex Go và giữ một số gọi được", en: "Install Yandex Go and keep a working phone number" },
        detail: {
          vi: "Đối biển số với app trước khi lên xe. Không vẫy taxi ngoài đường.",
          en: "Match the plate with the app before getting in. Do not hail a street taxi.",
        },
        priority: "high",
      },
    ],
  },
  {
    date: "2026-10-27",
    tasks: [
      {
        id: "bkk",
        when: { vi: "Sáng", en: "Morning" },
        text: { vi: "Có mặt BKK trước 3 tiếng. HY532 cất cánh 06:55", en: "Be at BKK 3 hours early. HY532 departs 06:55" },
        detail: { vi: "Trên máy bay khoảng 6 giờ 50 phút. Tới TAS Terminal 2 lúc 11:45, rồi Yandex về Hampton khoảng 11 km, 20–40 phút.", en: "About 6 hours 50 minutes in the air. Arrive TAS Terminal 2 at 11:45, then Yandex to the Hampton, about 11 km, 20–40 minutes." },
        priority: "high",
      },
      {
        id: "emehmon",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "Nhận phòng Hampton. Nhờ lễ tân đăng ký e-mehmon và giữ tờ xác nhận", en: "Check in at the Hampton. Ask reception to file e-mehmon and keep the slip" },
        priority: "high",
      },
    ],
  },
  { date: "2026-10-28", tasks: [] },
  { date: "2026-10-29", tasks: [] },
  {
    date: "2026-10-30",
    tasks: [
      {
        id: "emehmon",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "Nhận phòng Hilton. Nhờ lễ tân đăng ký e-mehmon và giữ tờ xác nhận", en: "Check in at the Hilton. Ask reception to file e-mehmon and keep the slip" },
        detail: { vi: "Yandex từ Hampton khoảng 4 km, 15–25 phút. Tới sớm thì gửi vali, nhận phòng từ 14:00.", en: "Yandex from the Hampton, about 4 km, 15–25 minutes. If you arrive early, leave the bags. Check-in is from 14:00." },
        priority: "high",
      },
      {
        id: "amirsoy",
        when: { vi: "Tối", en: "Evening" },
        text: { vi: "Xem lại giờ tàu 7201 cho sáng mai", en: "Check train 7201 for tomorrow morning" },
        detail: { vi: "Lịch từ 8/9/2026: ga trung tâm có tàu 08:55, rời 09:10, Chinorkent 10:33. Tàu hay hủy sát ngày. Xe riêng chỉ khi tàu không chạy.", en: "Schedule from 8 Sep 2026: the train is at the central station at 08:55, leaves at 09:10, Chinorkent at 10:33. Trains are often cancelled close to the day. Use a private car only if the train is not running." },
        priority: "medium",
      },
    ],
  },
  {
    date: "2026-10-31",
    tasks: [
      {
        id: "laundry",
        when: { vi: "Tối", en: "Evening" },
        text: { vi: "Giặt ở LOTOS sau khi về núi", en: "Wash clothes at LOTOS after the mountain" },
        detail: {
          vi: "Đi Amirsoy cả ngày. Tối về rồi gửi, tầng hầm Tashkent City Mall, cách Hilton khoảng 400 m, mở tới 23:00. Không gửi lễ tân.",
          en: "Amirsoy takes the whole day. Drop the clothes after you get back, in the basement of Tashkent City Mall, about 400 m from the Hilton, open until 23:00. Do not leave them with reception.",
        },
        priority: "medium",
      },
    ],
  },
  { date: "2026-11-01", tasks: [] },
  {
    date: "2026-11-02",
    tasks: [
      {
        id: "emehmon",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "Nhận phòng Swissôtel. Nhờ lễ tân đăng ký e-mehmon và giữ tờ xác nhận", en: "Check in at the Swissôtel. Ask reception to file e-mehmon and keep the slip" },
        detail: { vi: "Yandex từ Hilton khoảng 4 km, 15–25 phút. Tới sớm thì gửi vali, nhận phòng từ 14:00.", en: "Yandex from the Hilton, about 4 km, 15–25 minutes. If you arrive early, leave the bags. Check-in is from 14:00." },
        priority: "high",
      },
    ],
  },
  { date: "2026-11-03", tasks: [] },
  { date: "2026-11-04", tasks: [] },
  {
    date: "2026-11-05",
    tasks: [
      {
        id: "bags",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "Gói đồ và chạy thử Yandex tới ga trung tâm", en: "Pack the bags and test a Yandex ride to the central station" },
        detail: { vi: "Mai tàu 08:37. Ga trung tâm cách Swissôtel khoảng 3 km, 10–20 phút.", en: "The train is at 08:37 tomorrow. The central station is about 3 km from Swissôtel, 10–20 minutes." },
        priority: "high",
      },
    ],
  },
  {
    date: "2026-11-06",
    tasks: [
      {
        id: "train",
        when: { vi: "Sáng", en: "Morning" },
        text: { vi: "Sharq 710, 08:37. Cùng toa 16, ghế 007 và 034", en: "Sharq 710 at 08:37. Same carriage 16, seats 007 and 034" },
        detail: { vi: "343 km, khoảng 3 giờ 9 phút, tới Samarkand 11:46. Hai ghế không ngồi cạnh nhau. Ga tới Zarafshon khoảng 5 km, 15–20 phút.", en: "343 km, about 3 hours 9 minutes, arriving in Samarkand at 11:46. The two seats are not next to each other. The station to Zarafshon is about 5 km, 15–20 minutes." },
        priority: "high",
      },
      {
        id: "laundry",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "Nếu đồ chưa giặt, gửi Taskin trên phố Namozgoh", en: "If the clothes are still dirty, take them to Taskin on Namozgoh Street" },
        detail: {
          vi: "Cách Zarafshon khoảng 2 km, đi Yandex. Khách năm 2026 trả khoảng 40.000 som mỗi kg, lấy hôm sau. Lấy trước tàu sáng 8/11.",
          en: "About 2 km from Zarafshon, by Yandex. Travelers in 2026 paid about 40,000 som per kg and collected it the next day. Pick it up before the train on the morning of 8 Nov.",
        },
        priority: "medium",
      },
      {
        id: "emehmon",
        when: { vi: "Trưa", en: "Midday" },
        text: { vi: "Gửi đồ ở Zarafshon. Nhờ lễ tân đăng ký e-mehmon và giữ tờ xác nhận", en: "Leave the bags at Zarafshon. Ask reception to file e-mehmon and keep the slip" },
        priority: "high",
      },
    ],
  },
  { date: "2026-11-07", tasks: [] },
  {
    date: "2026-11-08",
    tasks: [
      {
        id: "train",
        when: { vi: "Sáng", en: "Morning" },
        text: { vi: "Sharq 711, 08:10. Toa 06 ghế 016, toa 07 ghế 026", en: "Sharq 711 at 08:10. Carriage 06 seat 016, carriage 07 seat 026" },
        detail: { vi: "Cùng 343 km, khoảng 4 giờ 9 phút, tới Tashkent 12:19. Gặp nhau lúc xuống ga. Ga tới Hyatt khoảng 4 km. Không gửi giặt tối nay.", en: "Same 343 km, about 4 hours 9 minutes, arriving in Tashkent at 12:19. Meet when you get off. The station to the Hyatt is about 4 km. Do not send laundry tonight." },
        priority: "high",
      },
      {
        id: "emehmon",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "Gửi vali ở Hyatt, nhận phòng từ 15:00. Nhờ lễ tân đăng ký e-mehmon", en: "Leave the bags at the Hyatt and check in from 15:00. Ask reception to file e-mehmon" },
        priority: "high",
      },
      {
        id: "tdac",
        when: { vi: "Tối", en: "Evening" },
        text: { vi: "Nộp TDAC trên tdac.immigration.go.th", en: "Submit TDAC at tdac.immigration.go.th" },
        detail: { vi: "Làm trước, đừng đợi tới quầy Thái Lan.", en: "File it before you fly. Do not wait for the Thai desk." },
        priority: "high",
      },
    ],
  },
  {
    date: "2026-11-09",
    tasks: [
      {
        id: "checkout",
        when: { vi: "Trước 12:00", en: "Before 12:00" },
        text: { vi: "Trả phòng Hyatt và gửi vali ở lễ tân", en: "Check out of the Hyatt and leave the bags at reception" },
        detail: { vi: "Sáng đi bộ quanh khách sạn. Lấy vali lúc 16:45. Khách sạn không gồm ăn sáng.", en: "Walk near the hotel in the morning. Pick the bags up at 16:45. Breakfast is not included." },
        priority: "high",
      },
      {
        id: "leave",
        when: { vi: "Chiều", en: "Afternoon" },
        text: { vi: "17:15 rời Hyatt. Sân bay Terminal 2 khoảng 18:15", en: "Leave the Hyatt at 17:15. Be at Terminal 2 around 18:15" },
        detail: { vi: "Yandex khoảng 11 km, 40–60 phút chiều thứ Hai. HY531 cất cánh 21:15, trên máy bay khoảng 6 giờ 10 phút. Không đi metro.", en: "Yandex is about 11 km, 40–60 minutes on a Monday afternoon. HY531 departs at 21:15, about 6 hours 10 minutes in the air. Do not take the metro." },
        priority: "high",
      },
    ],
  },
  {
    date: "2026-11-10",
    city: { vi: "Bangkok", en: "Bangkok" },
    area: { vi: "Về tới", en: "Arrival" },
    plan: {
      vi: "HY531 hạ cánh khoảng 05:25.",
      en: "HY531 lands about 05:25.",
    },
    tasks: [],
  },
];

/** @type {PackItem[]} */
export const packItems = [
  {
    id: "coat",
    item: { vi: "Áo khoác và một lớp ấm", en: "A jacket and one warm layer" },
    why: { vi: "Trưa gần 20°C, đêm 4–7°C. Núi lạnh hơn.", en: "Afternoons near 20°C, nights 4–7°C. The mountain is colder." },
  },
  {
    id: "shoes",
    item: { vi: "Giày đi bộ đã đi quen", en: "Shoes you have already walked in" },
    why: { vi: "Registan, chợ, và phố đi bộ.", en: "Registan, bazaars, and walking streets." },
  },
  {
    id: "scarf",
    item: { vi: "Khăn cổ hoặc mũ nhẹ", en: "A scarf or a light hat" },
    why: { vi: "Gió ở quảng trường. Khăn cũng trùm đầu ở đền.", en: "Wind in the squares. The scarf also covers your head at shrines." },
  },
  {
    id: "plug",
    item: { vi: "Đầu chuyển ổ điện chân tròn", en: "A round-pin plug adapter" },
    why: { vi: "Ổ Uzbekistan là 2 chân tròn, 220V. Sạc chân tròn thì cắm thẳng.", en: "Outlets are two round pins, 220V. A round-pin charger plugs in directly." },
  },
  {
    id: "clothes",
    item: { vi: "Áo che vai và quần dài", en: "Shoulders and knees covered" },
    why: { vi: "Phố mặc bình thường. Đền và nhà thờ cần kín vai, kín gối.", en: "Streets are casual. Shrines and mosques need covered shoulders and knees." },
  },
  {
    id: "meds",
    item: { vi: "Thuốc cá nhân, kèm đơn nếu có", en: "Personal medicine, with a prescription if you have one" },
    why: { vi: "Khai với hải quan nếu thuốc thuộc nhóm kiểm soát.", en: "Tell customs if a medicine is controlled." },
  },
  {
    id: "spare",
    item: { vi: "Đồ lót và áo thun dư vài ngày", en: "Spare underwear and t-shirts for a few days" },
    why: { vi: "Giặt ngoài khách sạn. Đêm 8/11 không kịp: 17:15 ngày 9/11 ra sân bay.", en: "Wash clothes outside the hotel. The night of 8 Nov is too late: the airport car leaves at 17:15 on 9 Nov." },
  },
];
