/** @typedef {{ time: string, part: string, eat: string, text: string, usd: number, query?: string }} DaySlot */

/** Giá là ước lượng cho 2 người, giữa năm 2026. Bữa sáng khách sạn không tính. */
/** @type {Record<string, DaySlot[]>} */
export const daySlots = {
  "2026-10-27": [
    { time: "06:55", part: "Bay", eat: "Bangkok, HY532", text: "Cất cánh giờ Bangkok. Tới TAS lúc 11:45 giờ Tashkent.", usd: 0, query: "Suvarnabhumi Airport" },
    { time: "11:45", part: "Đến", eat: "Sân bay TAS", text: "Taxi chính thức, mua SIM, đổi $100–200 sang som.", usd: 0, query: "Tashkent International Airport Terminal 2" },
    { time: "14:00", part: "Trưa", eat: "Lagman gần Hampton", text: "Ăn muộn sau khi nhận phòng. Một tô mì và trà.", usd: 14, query: "lagman restaurant Amir Temur Square Tashkent" },
    { time: "17:00", part: "Chiều", eat: "", text: "Nghỉ ở Hampton. Đi bộ nếu còn sức.", usd: 0 },
    { time: "19:30", part: "Tối", eat: "Quảng trường Amir Temur", text: "Đi bộ sang quảng trường Độc lập. Chỉ trà và samsa nếu còn đói.", usd: 8, query: "Amir Temur Square Tashkent" },
  ],
  "2026-10-28": [
    { time: "08:30", part: "Sáng", eat: "Hampton", text: "Ăn sáng tại khách sạn. Thứ Tư, không đổi khách sạn.", usd: 0, query: "Hampton by Hilton Tashkent" },
    { time: "09:30", part: "Sáng", eat: "Chợ Chorsu", text: "Rồi sang Hazrati Imam. Kín vai, kín gối, tiền mặt.", usd: 0, query: "Chorsu Bazaar Tashkent" },
    { time: "13:00", part: "Trưa", eat: "Plov hoặc samsa trong chợ", text: "Ăn ở khu food hall của chợ. Một đĩa plov hoặc samsa và trà.", usd: 10, query: "Chorsu Bazaar Tashkent" },
    { time: "15:30", part: "Chiều", eat: "Kukeldash", text: "Xem trường rồi metro hoặc đi bộ về khách sạn.", usd: 0, query: "Kukeldash Madrasah Tashkent" },
    { time: "19:00", part: "Tối", eat: "Broadway", text: "Lagman hoặc shashlik ở quán quốc dân trên phố đi bộ.", usd: 16, query: "Sayilgoh Street Tashkent Broadway" },
  ],
  "2026-10-29": [
    { time: "08:30", part: "Sáng", eat: "Hampton", text: "Ăn sáng tại khách sạn.", usd: 0 },
    { time: "10:00", part: "Sáng", eat: "Bảo tàng Amir Temur", text: "Rồi đi bộ quảng trường Độc lập. Vé mua tại cửa.", usd: 0, query: "Amir Temur Museum Tashkent" },
    { time: "13:00", part: "Trưa", eat: "Lagman gần quảng trường", text: "Một tô mì ở quán thường quanh quảng trường.", usd: 14, query: "Independence Square Tashkent restaurants" },
    { time: "15:30", part: "Chiều", eat: "Ga Kosmonavtlar", text: "Đi vài ga metro cho đẹp, rồi về.", usd: 0, query: "Kosmonavtlar metro station Tashkent" },
    { time: "19:00", part: "Tối", eat: "Shashlik gần Hampton", text: "Một xiên gà hoặc bò, salad, bánh. Đi bộ về.", usd: 16, query: "shashlik near Istiqbol Street Tashkent" },
  ],
  "2026-10-30": [
    { time: "08:30", part: "Sáng", eat: "Hampton", text: "Ăn sáng, checkout, Yandex sang Holiday Inn.", usd: 0 },
    { time: "13:00", part: "Trưa", eat: "Food court Tashkent City Mall", text: "Ăn sau khi gửi đồ. Chọn món địa phương trong mall, rẻ hơn nhà hàng khách sạn.", usd: 14, query: "Tashkent City Mall" },
    { time: "15:30", part: "Chiều", eat: "City Park", text: "Đi bộ công viên và xem đài phun nước.", usd: 0, query: "Tashkent City Park" },
    { time: "19:30", part: "Tối", eat: "Shashlik gần công viên", text: "Một xiên, salad và bánh ở quán cạnh công viên.", usd: 18, query: "restaurants near Tashkent City Park" },
  ],
  "2026-10-31": [
    { time: "07:30", part: "Sáng", eat: "Holiday Inn, rồi cửa hàng", text: "Ăn sáng. Mua samsa, bánh, trái cây và nước mang lên xe.", usd: 8 },
    { time: "08:30", part: "Sáng", eat: "Amirsoy, Chimgan, Charvak", text: "Xe riêng cả ngày. Khoảng $150 là báo giá chưa chốt, không nằm trong tiền ăn.", usd: 0, query: "Amirsoy Mountain Resort" },
    { time: "13:00", part: "Trưa", eat: "Đồ đã mang theo", text: "Ăn picnic. Trên núi chỉ uống trà nếu quán resort đắt.", usd: 6 },
    { time: "17:30", part: "Chiều", eat: "", text: "Về Holiday Inn, nghỉ.", usd: 0 },
    { time: "20:00", part: "Tối", eat: "Lagman gần Ukchi", text: "Bữa nóng sau một ngày gió. Gần khách sạn.", usd: 14, query: "lagman near Ukchi Street Tashkent" },
  ],
  "2026-11-01": [
    { time: "09:00", part: "Sáng", eat: "Holiday Inn", text: "Ăn sáng. Chủ nhật, ngủ lại đây.", usd: 0 },
    { time: "10:30", part: "Sáng", eat: "City Park", text: "Đi bộ khi chưa đông.", usd: 0, query: "Tashkent City Park" },
    { time: "13:00", part: "Trưa", eat: "Food court trong mall", text: "Nghỉ chân, ăn món địa phương.", usd: 14, query: "Tashkent City Mall" },
    { time: "16:00", part: "Chiều", eat: "Magic City", text: "Đài phun nước. Taxi ngắn từ khách sạn.", usd: 0, query: "Magic City Tashkent" },
    { time: "19:30", part: "Tối", eat: "Quán quốc dân gần Ukchi", text: "Lagman hoặc shashlik. Ngày mai chuyển sang Mirabad.", usd: 16, query: "restaurants Ukchi Street Tashkent" },
  ],
  "2026-11-02": [
    { time: "08:30", part: "Sáng", eat: "Holiday Inn", text: "Ăn sáng, checkout, nhận phòng Swissôtel.", usd: 0 },
    { time: "13:00", part: "Trưa", eat: "Lagman ở Mirabad", text: "Ăn gần Oybek sau khi gửi đồ.", usd: 14, query: "Mirabad district Tashkent restaurants" },
    { time: "16:00", part: "Chiều", eat: "Ga Oybek", text: "Đi bộ quanh khu, xem phố tối có sống không.", usd: 0, query: "Oybek metro station Tashkent" },
    { time: "19:30", part: "Tối", eat: "Afsona, Shevchenko 30", text: "Shashlik gà, salad, bánh và trà. Đĩa tổng hợp trên menu khoảng 325.000 som.", usd: 22, query: "Afsona restaurant Taras Shevchenko 30 Tashkent" },
  ],
  "2026-11-03": [
    { time: "09:00", part: "Sáng", eat: "Swissôtel", text: "Ăn sáng tại khách sạn.", usd: 0 },
    { time: "10:00", part: "Sáng", eat: "Bảo tàng Mỹ thuật Ứng dụng", text: "Rồi cung điện Romanov nếu còn mở cửa.", usd: 0, query: "State Museum of Applied Arts Tashkent" },
    { time: "13:00", part: "Trưa", eat: "Manti hoặc lagman gần Navoi", text: "Quán thường cạnh công viên.", usd: 14, query: "Alisher Navoi Park Tashkent" },
    { time: "15:30", part: "Chiều", eat: "Công viên Navoi", text: "Đi bộ rồi về Swissôtel.", usd: 0, query: "Alisher Navoi Park Tashkent" },
    { time: "19:30", part: "Tối", eat: "Quán trà Mirabad", text: "Súp và bánh. Giữ bữa vừa, mai vẫn ở đây.", usd: 16, query: "chaikhana Mirabad Tashkent" },
  ],
  "2026-11-04": [
    { time: "09:00", part: "Sáng", eat: "Swissôtel", text: "Ăn sáng. Thứ Tư, không đổi khách sạn.", usd: 0 },
    { time: "10:30", part: "Sáng", eat: "Đài động đất và vườn Nhật", text: "Một vòng taxi. Vé vườn mua tại cửa.", usd: 0, query: "Earthquake Memorial Tashkent" },
    { time: "12:30", part: "Trưa", eat: "Besh Qozon", text: "Plov, salad, bánh, trà. Đi đúng trưa vì nồi hết giữa chiều. Một đĩa khoảng $3.", usd: 12, query: "Central Asian Plov Center Besh Qozon Tashkent" },
    { time: "15:30", part: "Chiều", eat: "", text: "Về Swissôtel nghỉ. Trưa đã no.", usd: 0 },
    { time: "19:30", part: "Tối", eat: "Samsa gần Oybek", text: "Ăn nhẹ. Trà và một hai cái samsa.", usd: 8, query: "Oybek Street Tashkent" },
  ],
  "2026-11-05": [
    { time: "09:00", part: "Sáng", eat: "Swissôtel", text: "Ăn sáng. Mai tàu 08:37.", usd: 0 },
    { time: "10:30", part: "Sáng", eat: "Mirabad", text: "Đi bộ nhẹ. Mua samsa và nước cho sáng mai nếu buffet mở muộn.", usd: 6, query: "Mirabad Avenue Tashkent" },
    { time: "13:00", part: "Trưa", eat: "Lagman gần Swissôtel", text: "Bữa chính trong ngày.", usd: 14, query: "Swissotel Tashkent" },
    { time: "16:00", part: "Chiều", eat: "", text: "Gói đồ và nghỉ. Chạy thử Yandex tới ga trung tâm.", usd: 0 },
    { time: "19:00", part: "Tối", eat: "Súp gần khách sạn", text: "Ăn sớm, ngủ sớm.", usd: 12, query: "restaurant near Shakhrisabz Street Tashkent" },
  ],
  "2026-11-06": [
    { time: "07:15", part: "Sáng", eat: "Swissôtel", text: "Ăn sáng nếu buffet đã mở, rồi trả phòng. Chưa mở thì ăn samsa đã mua tối qua.", usd: 0 },
    { time: "08:37", part: "Sáng", eat: "Sharq 710", text: "Toshkent Markaziy đến Samarkand 11:46. Cùng toa 16, ghế 007 và 034, không ngồi cạnh nhau.", usd: 0 },
    { time: "12:15", part: "Trưa", eat: "Mövenpick", text: "Gửi đồ, nhận phòng.", usd: 0, query: "Mövenpick Samarkand" },
    { time: "13:30", part: "Trưa", eat: "Lagman gần khách sạn", text: "Một tô ở phố gần Mövenpick. Quán sát Registan thường tính đắt hơn.", usd: 12, query: "lagman near Registan Samarkand" },
    { time: "15:00", part: "Chiều", eat: "Registan", text: "Xem quảng trường khi trời còn sáng.", usd: 0, query: "Registan Samarkand" },
    { time: "19:00", part: "Tối", eat: "Shashlik gần Gur-Emir", text: "Đi bộ từ khách sạn vài phút. Một xiên, bánh, trà.", usd: 16, query: "Gur-e-Amir Samarkand" },
  ],
  "2026-11-07": [
    { time: "08:30", part: "Sáng", eat: "Mövenpick", text: "Ăn sáng tại khách sạn.", usd: 0 },
    { time: "09:30", part: "Sáng", eat: "Shah-i-Zinda", text: "Kín vai, khăn. Cởi giày ở một số lối.", usd: 0, query: "Shah-i-Zinda Samarkand" },
    { time: "12:30", part: "Trưa", eat: "Chợ Siab", text: "Non nóng, samsa, trái cây. Có plov thì một đĩa chia đôi.", usd: 12, query: "Siyob Bazaar Samarkand" },
    { time: "15:00", part: "Chiều", eat: "Bibi-Khanym", text: "Rồi Gur-e-Amir nếu còn sức. Đi theo nhịp, không cần xem hết.", usd: 0, query: "Bibi-Khanym Mosque Samarkand" },
    { time: "19:00", part: "Tối", eat: "Gần Mövenpick", text: "Lagman hoặc shashlik. Mai tàu 08:10, ăn xong ngủ sớm.", usd: 16, query: "Mövenpick Samarkand restaurants" },
  ],
  "2026-11-08": [
    { time: "06:45", part: "Sáng", eat: "Mövenpick", text: "Ăn sáng nếu buffet đã mở, trả phòng. Chưa mở thì mua samsa ở ga.", usd: 0 },
    { time: "07:20", part: "Sáng", eat: "Yandex ra ga", text: "Có mặt trước giờ tàu khoảng 40 phút.", usd: 0, query: "Samarkand Railway Station" },
    { time: "08:10", part: "Sáng", eat: "Sharq 711", text: "Samarkand tới Tashkent Central 12:19. Toa 06 ghế 016 và toa 07 ghế 026. Gặp nhau lúc xuống ga.", usd: 0 },
    { time: "12:30", part: "Trưa", eat: "InterContinental", text: "Yandex từ ga trung tâm. Gửi đồ, nhận phòng. Xin phòng nhìn quảng trường, tầng cao.", usd: 0, query: "InterContinental Tashkent" },
    { time: "13:30", part: "Trưa", eat: "Lagman gần khách sạn", text: "Bữa chính. Buổi sáng Samarkand mất vì tàu chiều hết ghế.", usd: 14, query: "lagman restaurant Shakhrisabz Street Tashkent" },
    { time: "16:00", part: "Chiều", eat: "Amir Temur", text: "Đi bộ khoảng 10 phút tới quảng trường. Mai còn cả ngày trước giờ bay.", usd: 0, query: "Amir Temur Square Tashkent" },
    { time: "19:00", part: "Tối", eat: "Súp gần khách sạn", text: "Ăn nhẹ rồi nghỉ. Bay HY531 là 21:15 ngày mai.", usd: 14, query: "InterContinental Tashkent" },
  ],
  "2026-11-09": [
    { time: "08:30", part: "Sáng", eat: "Gần khách sạn", text: "Phòng Classic view không ghi ăn sáng. Ăn gần đó nếu chưa mua gói. Hỏi lễ tân gửi hành lý đến khoảng 17:00.", usd: 8, query: "InterContinental Tashkent" },
    { time: "10:00", part: "Sáng", eat: "Amir Temur", text: "Đi bộ quảng trường. Giữ vali ở lễ tân.", usd: 0, query: "Amir Temur Square Tashkent" },
    { time: "13:00", part: "Trưa", eat: "Lagman gần khách sạn", text: "Bữa chính trong ngày, gần khách sạn.", usd: 14, query: "lagman restaurant Shakhrisabz Street Tashkent" },
    { time: "15:30", part: "Chiều", eat: "", text: "Về phòng, tắm, lấy đồ. Kiểm tra passport và vé HY531.", usd: 0 },
    { time: "17:15", part: "Chiều", eat: "Yandex ra TAS", text: "Bay 21:15, có mặt sân bay khoảng 18:15. Terminal 2.", usd: 0, query: "Tashkent International Airport Terminal 2" },
    { time: "21:15", part: "Bay", eat: "HY531", text: "Cất cánh giờ Tashkent. Hạ cánh Bangkok 05:25 ngày 10/11. Ăn nhẹ ở sân bay nếu đói.", usd: 8, query: "Tashkent International Airport Terminal 2" },
  ],
};

/** @typedef {{ name: string, query: string, where: string, dishes: string }} EatPlace */
/** @typedef {{ note: string, places: EatPlace[] }} DayEats */

const amirTemur = [
  {
    name: "Navvat",
    query: "Navvat Sayilgoh 7 Poytaxt Mall Tashkent",
    where: "Sayilgoh 7, tầng 1 Poytaxt Mall, khoảng 460 m từ quảng trường Amir Temur. Mở khuya.",
    dishes: "Norin, shashlik, manti bí, cánh gà nướng.",
  },
  {
    name: "Quầy trên Broadway",
    query: "Sayilgoh Street Tashkent Broadway",
    where: "Phố đi bộ Sayilgoh. Đi bộ từ Hampton hoặc InterContinental.",
    dishes: "Samsa thịt, non nóng, shashlik gà, trà. Chọn quán đông.",
  },
];

const chorsu = [
  {
    name: "Khu ăn Chorsu",
    query: "Chorsu Bazaar Tashkent",
    where: "Trong chợ, sau Hazrati Imam. Trả tiền mặt.",
    dishes: "Plov, samsa, non, trái cây khô.",
  },
  ...amirTemur,
];

const tashkentCity = [
  {
    name: "Afsona Tashkent City",
    query: "Afsona Ukchi 4 Tashkent",
    where: "Ukchi 4, sát Holiday Inn.",
    dishes: "Plov, manti, shurpa, samsa. Có manti cá hồi và plov trái cây nếu muốn đổi món.",
  },
  {
    name: "Proshashlyk",
    query: "Proshashlyk Ukchi 6 Tashkent",
    where: "Ukchi 6, gần công viên.",
    dishes: "Shashlik cừu, gà hoặc cá hồi, kèm bánh và salad.",
  },
  {
    name: "Boboy",
    query: "BOBOY Tashkent City Mall Batir Zakirov 7",
    where: "Trong Tashkent City Mall. Máy lạnh, đắt hơn quán ngoài một chút.",
    dishes: "Plov, manti, shashlik, salad cà tím.",
  },
];

const mirabad = [
  {
    name: "Afsona Shevchenko",
    query: "Afsona Taras Shevchenko 30 Tashkent",
    where: "Shevchenko 30, gần ga Oybek. Có menu tiếng Anh.",
    dishes: "Plov lễ, plov trà đạo, kazan kabob, mastava, mashhurda, manti bò, shashlik gà. Đĩa tổng hợp khoảng 325.000 som.",
  },
  {
    name: "Caravan",
    query: "Caravan restaurant Abdulla Kahhar 22 Tashkent",
    where: "Abdulla Kahhar 22, Yakkasaray. Không đi bộ từ Swissôtel, gọi Yandex.",
    dishes: "Plov, kazan kabob, lagman, manti, beshbarmak, shashlik.",
  },
  {
    name: "Quầy gần Oybek",
    query: "Oybek metro Tashkent samsa",
    where: "Quanh ga, ăn nhẹ.",
    dishes: "Samsa thịt hoặc khoai, non, trà.",
  },
];

const plovDay = [
  {
    name: "Besh Qozon",
    query: "Central Asian Plov Center Besh Qozon Tashkent",
    where: "Trung tâm plov, gần đài động đất. Đi đúng trưa vì nồi hết giữa chiều.",
    dishes: "Plov nấu nồi lớn, salad, non, trà. Một đĩa khoảng $3.",
  },
  ...mirabad.slice(0, 2),
];

const samarkand = [
  {
    name: "Old Havuz",
    query: "Shashlik.uz Old Havuz Samarkand",
    where: "Khoảng 300 m từ Registan. Mở 10:00–23:00.",
    dishes: "Shashlik sườn cừu, manti, lagman.",
  },
  {
    name: "Emirhan",
    query: "Emirhan restaurant Mahmudjonov 1/18 Samarkand",
    where: "Mahmudjonov 1/18, sân thượng nhìn Registan. Bàn hoàng hôn hết sớm.",
    dishes: "Plov kiểu Samarkand, lagman, shashlik, non lò tandir.",
  },
  {
    name: "Chợ Siab",
    query: "Siyob Bazaar Samarkand",
    where: "Trong chợ. Tiền mặt.",
    dishes: "Non nóng, samsa, plov, trái cây. Một đĩa plov chia đôi là đủ.",
  },
];

const lastNight = [
  ...amirTemur,
  {
    name: "Afsona Shevchenko",
    query: "Afsona Taras Shevchenko 30 Tashkent",
    where: "Shevchenko 30. Từ InterContinental gọi Yandex ngắn, không kịp nếu chỉ còn một tiếng.",
    dishes: "Plov, kazan kabob, shashlik gà, mastava.",
  },
];

/** @type {Record<string, DayEats>} */
export const dayEats = {
  "2026-10-27": {
    note: "Mới đến. Ăn gần Hampton, đừng sang Chorsu tối nay.",
    places: amirTemur,
  },
  "2026-10-28": {
    note: "Trưa trong chợ. Tối về Broadway.",
    places: chorsu,
  },
  "2026-10-29": {
    note: "Cả ngày quanh quảng trường, tối đi bộ về Hampton.",
    places: amirTemur,
  },
  "2026-10-30": {
    note: "Sau khi nhận phòng Holiday Inn. Ba quán này đều gần Ukchi hoặc trong mall.",
    places: tashkentCity,
  },
  "2026-10-31": {
    note: "Trưa ăn đồ mang lên núi. Tối về Ukchi.",
    places: tashkentCity,
  },
  "2026-11-01": {
    note: "Chủ nhật quanh công viên và mall.",
    places: tashkentCity,
  },
  "2026-11-02": {
    note: "Đêm đầu ở Swissôtel. Afsona gần Oybek nhất.",
    places: mirabad,
  },
  "2026-11-03": {
    note: "Sau công viên Navoi, về Mirabad ăn.",
    places: mirabad,
  },
  "2026-11-04": {
    note: "Trưa dành cho plov. Tối ăn nhẹ gần Oybek nếu còn đói.",
    places: plovDay,
  },
  "2026-11-05": {
    note: "Mai tàu 08:37. Ăn sớm, gần khách sạn.",
    places: mirabad,
  },
  "2026-11-06": {
    note: "Chiều Registan xong thì ăn gần quảng trường. Siab để mai.",
    places: samarkand.slice(0, 2),
  },
  "2026-11-07": {
    note: "Trưa Siab. Tối một trong hai quán gần Registan, rồi ngủ sớm vì tàu 08:10.",
    places: samarkand,
  },
  "2026-11-08": {
    note: "Tàu về trưa. Ăn gần InterContinental, đừng đi xa.",
    places: lastNight,
  },
  "2026-11-09": {
    note: "Bữa chính là trưa. 17:15 đã ra sân bay, không ngồi nhà hàng tối.",
    places: amirTemur,
  },
};

/** @param {DaySlot[]} slots */
export function slotCost(slots) {
  return slots.reduce((sum, slot) => sum + slot.usd, 0);
}

export const tripFoodUsd = Object.values(daySlots).reduce((sum, slots) => sum + slotCost(slots), 0);
