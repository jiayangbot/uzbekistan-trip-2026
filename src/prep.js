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
 * @typedef {Object} BorderLine
 * @property {string} en
 * @property {string} vi
 */
/**
 * @typedef {Object} BorderCard
 * @property {string} id
 * @property {Copy} title
 * @property {Copy} hint
 * @property {BorderLine[]} lines
 */

/** @type {{ id: "go" | "back", title: Copy, steps: PrepStep[] }[]} */
export const prepPhases = [
  {
    id: "go",
    title: { vi: "Chuẩn bị đi", en: "Before leaving" },
    steps: [
      {
        id: "usd",
        when: { vi: "Trước ngày bay, ở Bangkok", en: "Before the flight, in Bangkok" },
        text: { vi: "Đổi USD tờ 100, khoảng $600 cho hai người", en: "Buy about $600 in clean $100 bills for two people" },
        detail: {
          vi: "SuperRich trong thành phố, không đợi tới sân bay. Tờ phẳng, không rách, không viết. Khách sạn và tàu trả bằng thẻ.",
          en: "Exchange in the city, not at the airport. Bills must be flat, unwritten, and untorn. Hotels and trains are paid by card.",
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
      {
        id: "bkk",
        when: { vi: "27/10, sáng", en: "27 Oct, morning" },
        text: { vi: "Có mặt BKK trước 3 tiếng. HY532 cất cánh 06:55", en: "Be at BKK 3 hours early. HY532 departs 06:55" },
        detail: { vi: "Tới Tashkent TAS Terminal 2 lúc 11:45.", en: "Arrive Tashkent TAS Terminal 2 at 11:45." },
        priority: "high",
      },
      {
        id: "uz",
        when: { vi: "27/10, nhập cảnh TAS", en: "27 Oct, TAS immigration" },
        text: { vi: "Đưa điện thoại cho cán bộ, phần tiếng Anh ở trên", en: "Show the phone. The officer reads the English lines above" },
        detail: { vi: "Mở thẻ Nhập cảnh Uzbekistan.", en: "Open the Uzbekistan arrival card." },
        priority: "high",
      },
      {
        id: "emehmon",
        when: { vi: "Mỗi lần nhận phòng", en: "At every check-in" },
        text: { vi: "Nhờ lễ tân đăng ký tạm trú e-mehmon và giữ tờ xác nhận", en: "Ask reception to file e-mehmon and keep the slip" },
        detail: { vi: "Làm ở cả năm khách sạn.", en: "Do this at all five hotels." },
        priority: "high",
      },
      {
        id: "amirsoy",
        when: { vi: "Trước ngày lên núi", en: "Before the mountain day" },
        text: { vi: "Hỏi giá xe Amirsoy. Chưa chốt $150", en: "Ask the Amirsoy car price. $150 is not agreed yet" },
        priority: "medium",
      },
    ],
  },
  {
    id: "back",
    title: { vi: "Chuẩn bị lúc về", en: "Before flying back" },
    steps: [
      {
        id: "laundry",
        when: { vi: "Trước 6/11", en: "Before 6 Nov" },
        text: { vi: "Giặt xong trước sáng lên tàu Samarkand", en: "Finish laundry before the Samarkand train morning" },
        detail: {
          vi: "Gửi ở Hilton khoảng 31/10 hoặc Swissôtel khoảng 3/11. Đêm 8/11 không gửi: 17:15 ngày 9/11 đã ra sân bay.",
          en: "Send it at Hilton around 31 Oct or Swissôtel around 3 Nov. Do not send laundry on the night of 8 Nov. The airport car leaves at 17:15 on 9 Nov.",
        },
        priority: "medium",
      },
      {
        id: "tdac",
        when: { vi: "Trước khi bay 9/11", en: "Before the 9 Nov flight" },
        text: { vi: "Nộp TDAC trên tdac.immigration.go.th", en: "Submit TDAC at tdac.immigration.go.th" },
        detail: { vi: "Làm trước, đừng đợi tới quầy Thái Lan.", en: "File it before you fly. Do not wait for the Thai desk." },
        priority: "high",
      },
      {
        id: "checkout",
        when: { vi: "9/11, trước 12:00", en: "9 Nov, before 12:00" },
        text: { vi: "Trả phòng Hyatt và gửi vali ở lễ tân", en: "Check out of the Hyatt and leave the bags at reception" },
        detail: { vi: "Lấy vali lúc 16:45. Khách sạn không gồm ăn sáng.", en: "Pick the bags up at 16:45. Breakfast is not included." },
        priority: "high",
      },
      {
        id: "leave",
        when: { vi: "9/11, chiều", en: "9 Nov, afternoon" },
        text: { vi: "17:15 rời Hyatt. Sân bay Terminal 2 khoảng 18:15", en: "Leave the Hyatt at 17:15. Be at Terminal 2 around 18:15" },
        detail: { vi: "HY531 cất cánh 21:15. Gọi Yandex, không đi metro.", en: "HY531 departs 21:15. Take Yandex, not the metro." },
        priority: "high",
      },
      {
        id: "thai",
        when: { vi: "10/11, 05:25 tại BKK", en: "10 Nov, 05:25 at BKK" },
        text: { vi: "Nhập cảnh Thái Lan. Đưa phần tiếng Anh cho cán bộ", en: "Thailand immigration. Show the English lines" },
        detail: { vi: "Mở thẻ Nhập cảnh Thái Lan.", en: "Open the Thailand arrival card." },
        priority: "high",
      },
    ],
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
    why: { vi: "Giặt khách sạn trả hôm sau. Đêm 8/11 không gửi đồ.", en: "Hotel laundry comes back the next day. Do not send laundry on 8 Nov." },
  },
];

/** @type {BorderCard[]} */
export const borderCards = [
  {
    id: "uz",
    title: { vi: "Nhập cảnh Uzbekistan", en: "Uzbekistan arrival" },
    hint: {
      vi: "27/10, sân bay Tashkent. Đưa máy cho cán bộ. Họ đọc dòng English.",
      en: "27 Oct, Tashkent airport. Hand over the phone. The officer reads the English line.",
    },
    lines: [
      { en: "We are tourists. Two people.", vi: "Chúng tôi đi du lịch. Hai người." },
      {
        en: "We arrive on 27 October 2026 on flight HY532 from Bangkok, and we leave on 9 November 2026 on flight HY531 to Bangkok.",
        vi: "Chúng tôi tới ngày 27/10/2026, chuyến HY532 từ Bangkok, và về ngày 9/11/2026, chuyến HY531 đi Bangkok.",
      },
      {
        en: "Our first hotel is Hampton by Hilton Tashkent, 17 Istiqbol Street. After that we stay at other hotels in Tashkent, and two nights in Samarkand.",
        vi: "Khách sạn đầu tiên là Hampton by Hilton Tashkent, số 17 đường Istiqbol. Sau đó chúng tôi ở các khách sạn khác tại Tashkent, và hai đêm ở Samarkand.",
      },
      {
        en: "We have nothing to declare. We are not carrying commercial goods.",
        vi: "Chúng tôi không có gì phải khai. Không mang hàng thương mại.",
      },
      {
        en: "Any medicine is personal, for our own use. We can show a prescription if you need it.",
        vi: "Thuốc chỉ để dùng cá nhân. Chúng tôi đưa đơn thuốc nếu cán bộ cần.",
      },
      {
        en: "We are carrying about 600 US dollars in cash for meals and taxis. The hotels are already paid by card.",
        vi: "Chúng tôi mang khoảng 600 đô la tiền mặt cho ăn uống và taxi. Khách sạn đã trả bằng thẻ.",
      },
    ],
  },
  {
    id: "th",
    title: { vi: "Nhập cảnh Thái Lan", en: "Thailand arrival" },
    hint: {
      vi: "10/11, khoảng 05:25 tại Bangkok. TDAC phải nộp trước khi bay.",
      en: "10 Nov, about 05:25 in Bangkok. TDAC must be filed before the flight.",
    },
    lines: [
      {
        en: "We are returning to Bangkok. Flight HY531 from Tashkent, arriving 10 November 2026 at 05:25.",
        vi: "Chúng tôi về Bangkok. Chuyến HY531 từ Tashkent, tới ngày 10/11/2026 lúc 05:25.",
      },
      { en: "Our TDAC is already submitted.", vi: "Chúng tôi đã nộp TDAC." },
      {
        en: "We have nothing to declare. No commercial goods.",
        vi: "Chúng tôi không có gì phải khai. Không có hàng thương mại.",
      },
      {
        en: "Any medicine is personal, for our own use.",
        vi: "Thuốc chỉ để dùng cá nhân.",
      },
    ],
  },
];
