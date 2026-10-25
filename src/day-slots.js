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
    { time: "08:30", part: "Sáng", eat: "Hampton", text: "Ăn sáng, trả phòng trước 12:00, Yandex sang Hilton. Nhận phòng từ 14:00, tới sớm thì gửi vali.", usd: 0 },
    { time: "13:00", part: "Trưa", eat: "Food court Tashkent City Mall", text: "Ăn sau khi gửi đồ. Chọn món địa phương trong mall, rẻ hơn nhà hàng khách sạn.", usd: 14, query: "Tashkent City Mall" },
    { time: "15:30", part: "Chiều", eat: "City Park", text: "Đi bộ công viên và xem đài phun nước.", usd: 0, query: "Tashkent City Park" },
    { time: "19:30", part: "Tối", eat: "Shashlik gần công viên", text: "Một xiên, salad và bánh ở quán cạnh công viên.", usd: 18, query: "restaurants near Tashkent City Park" },
  ],
  "2026-10-31": [
    { time: "07:30", part: "Sáng", eat: "Quầy samsa, rồi cửa hàng", text: "Hilton không gồm ăn sáng. Mua samsa, non, trái cây và nước, ăn trên xe.", usd: 10 },
    { time: "08:30", part: "Sáng", eat: "Amirsoy, Chimgan, Charvak", text: "Xe riêng cả ngày. Khoảng $150 là báo giá chưa chốt, không nằm trong tiền ăn.", usd: 0, query: "Amirsoy Mountain Resort" },
    { time: "13:00", part: "Trưa", eat: "Đồ đã mang theo", text: "Ăn picnic. Trên núi chỉ uống trà nếu quán resort đắt.", usd: 6 },
    { time: "17:30", part: "Chiều", eat: "", text: "Về Hilton, nghỉ.", usd: 0 },
    { time: "20:00", part: "Tối", eat: "Lagman gần Ukchi", text: "Bữa nóng sau một ngày gió. Gần khách sạn.", usd: 14, query: "lagman near Ukchi Street Tashkent" },
  ],
  "2026-11-01": [
    { time: "09:00", part: "Sáng", eat: "Samsa, non, trà", text: "Hilton không gồm ăn sáng. Ăn quầy quanh Ukchi, hoặc buffet khách sạn $30 mỗi người.", usd: 8, query: "samsa near Ukchi Street Tashkent" },
    { time: "10:30", part: "Sáng", eat: "City Park", text: "Đi bộ khi chưa đông.", usd: 0, query: "Tashkent City Park" },
    { time: "13:00", part: "Trưa", eat: "Food court trong mall", text: "Nghỉ chân, ăn món địa phương.", usd: 14, query: "Tashkent City Mall" },
    { time: "16:00", part: "Chiều", eat: "Magic City", text: "Đài phun nước. Taxi ngắn từ khách sạn.", usd: 0, query: "Magic City Tashkent" },
    { time: "19:30", part: "Tối", eat: "Quán quốc dân gần Ukchi", text: "Lagman hoặc shashlik. Ngày mai chuyển sang Mirabad.", usd: 16, query: "restaurants Ukchi Street Tashkent" },
  ],
  "2026-11-02": [
    { time: "08:30", part: "Sáng", eat: "Ăn nhẹ gần Ukchi", text: "Trả phòng Hilton trước 12:00, Yandex sang Swissôtel. Nhận phòng từ 14:00, tới sớm thì gửi vali.", usd: 8 },
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
    { time: "12:15", part: "Trưa", eat: "Zarafshon", text: "Gửi đồ, nhận phòng. Jomiy 65, không sát Registan.", usd: 0, query: "Zarafshon Parkside Samarkand" },
    { time: "13:30", part: "Trưa", eat: "Lagman gần khách sạn", text: "Một tô gần khách sạn. Quán sát Registan thường tính đắt hơn, và phải gọi xe.", usd: 12, query: "lagman near Registan Samarkand" },
    { time: "15:00", part: "Chiều", eat: "Registan", text: "Xem quảng trường khi trời còn sáng.", usd: 0, query: "Registan Samarkand" },
    { time: "19:00", part: "Tối", eat: "Shashlik gần Gur-Emir", text: "Đi bộ từ khách sạn vài phút. Một xiên, bánh, trà.", usd: 16, query: "Gur-e-Amir Samarkand" },
  ],
  "2026-11-07": [
    { time: "08:30", part: "Sáng", eat: "Zarafshon", text: "Ăn sáng tại khách sạn, đã gồm cho 2 người.", usd: 0, query: "Zarafshon Parkside Samarkand" },
    { time: "09:30", part: "Sáng", eat: "Shah-i-Zinda", text: "Kín vai, khăn. Cởi giày ở một số lối.", usd: 0, query: "Shah-i-Zinda Samarkand" },
    { time: "12:30", part: "Trưa", eat: "Chợ Siab", text: "Non nóng, samsa, trái cây. Có plov thì một đĩa chia đôi.", usd: 12, query: "Siyob Bazaar Samarkand" },
    { time: "15:00", part: "Chiều", eat: "Bibi-Khanym", text: "Rồi Gur-e-Amir nếu còn sức. Đi theo nhịp, không cần xem hết.", usd: 0, query: "Bibi-Khanym Mosque Samarkand" },
    { time: "19:00", part: "Tối", eat: "Gần Zarafshon", text: "Lagman hoặc shashlik. Mai tàu 08:10, ăn xong ngủ sớm.", usd: 16, query: "restaurants near Abdurakhmon Jomiy Street Samarkand" },
  ],
  "2026-11-08": [
    { time: "06:45", part: "Sáng", eat: "Zarafshon", text: "Ăn sáng nếu buffet đã mở, trả phòng. Chưa mở thì mua samsa ở ga.", usd: 0, query: "Zarafshon Parkside Samarkand" },
    { time: "07:20", part: "Sáng", eat: "Yandex ra ga", text: "Có mặt trước giờ tàu khoảng 40 phút.", usd: 0, query: "Samarkand Railway Station" },
    { time: "08:10", part: "Sáng", eat: "Sharq 711", text: "Samarkand tới Tashkent Central 12:19. Toa 06 ghế 016 và toa 07 ghế 026. Gặp nhau lúc xuống ga.", usd: 0 },
    { time: "12:45", part: "Trưa", eat: "Hyatt Regency", text: "Yandex từ ga trung tâm tới Navoi 1A. Nhận phòng từ 15:00, giờ này gửi vali ở lễ tân.", usd: 0, query: "Hyatt Regency Tashkent" },
    { time: "13:30", part: "Trưa", eat: "Lagman gần khách sạn", text: "Bữa chính sau tàu. Ăn gần Hyatt, đừng đi xa khi chưa nhận phòng.", usd: 14, query: "lagman restaurant near Navoi Avenue Tashkent" },
    { time: "15:00", part: "Chiều", eat: "Hyatt Regency", text: "Nhận phòng, tắm, nghỉ.", usd: 0, query: "Hyatt Regency Tashkent" },
    { time: "16:30", part: "Chiều", eat: "Amir Temur", text: "Ra quảng trường lúc chiều. Xem bản đồ, gần thì đi bộ, xa thì Yandex.", usd: 0, query: "Amir Temur Square Tashkent" },
    { time: "19:00", part: "Tối", eat: "Súp gần khách sạn", text: "Ăn nhẹ rồi nghỉ. Bay HY531 là 21:15 ngày mai.", usd: 14, query: "restaurants near Hyatt Regency Tashkent" },
  ],
  "2026-11-09": [
    { time: "08:30", part: "Sáng", eat: "Gần khách sạn", text: "Hyatt không gồm ăn sáng. Ăn quán gần đó, hoặc buffet $22 mỗi người.", usd: 8, query: "breakfast near Hyatt Regency Tashkent" },
    { time: "09:30", part: "Sáng", eat: "Quanh khách sạn", text: "Đi bộ nhẹ, vali vẫn trong phòng.", usd: 0, query: "Hyatt Regency Tashkent" },
    { time: "11:30", part: "Sáng", eat: "Trả phòng", text: "Trả phòng trước 12:00. Gửi vali ở lễ tân tới khoảng 17:00.", usd: 0, query: "Hyatt Regency Tashkent" },
    { time: "13:00", part: "Trưa", eat: "Lagman gần khách sạn", text: "Bữa chính trong ngày. Ăn xong trước 15:00.", usd: 14, query: "lagman restaurant near Navoi Avenue Tashkent" },
    { time: "15:00", part: "Chiều", eat: "Amir Temur", text: "Đi dạo lần cuối, mua quà. Đừng đi xa khách sạn.", usd: 0, query: "Amir Temur Square Tashkent" },
    { time: "16:45", part: "Chiều", eat: "", text: "Về Hyatt lấy vali. Kiểm tra passport, vé HY531, TDAC.", usd: 0 },
    { time: "17:15", part: "Chiều", eat: "Yandex ra TAS", text: "Bay 21:15, có mặt sân bay khoảng 18:15. Terminal 2.", usd: 0, query: "Tashkent International Airport Terminal 2" },
    { time: "21:15", part: "Bay", eat: "HY531", text: "Cất cánh giờ Tashkent. Hạ cánh Bangkok 05:25 ngày 10/11. Ăn nhẹ ở sân bay nếu đói.", usd: 8, query: "Tashkent International Airport Terminal 2" },
  ],
};

/** @typedef {{ name: string, query: string, where: string, dishes: string, doing: string, tip: string }} EatPlace */
/** @typedef {{ note: string, places: EatPlace[] }} DayEats */

const amirTemur = [
  {
    name: "Navvat",
    query: "Navvat Sayilgoh 7 Poytaxt Mall Tashkent",
    where: "Sayilgoh 7, tầng 1 Poytaxt Mall, khoảng 460 m từ quảng trường Amir Temur.",
    dishes: "Norin, shashlik, manti bí, cánh gà nướng. Gọi một món chính và một đĩa chia đôi.",
    doing: "Ngồi ăn tối sau khi đi bộ quanh quảng trường. Không gọi cả menu.",
    tip: "Mở khuya. Đi bộ khoảng 10 phút từ Hampton. Cuối tuần đông, tới trước 20:00.",
  },
  {
    name: "Quầy trên Broadway",
    query: "Sayilgoh Street Tashkent Broadway",
    where: "Phố đi bộ Sayilgoh. Đi bộ từ Hampton.",
    dishes: "Samsa thịt, non vừa ra lò, shashlik gà, trà.",
    doing: "Đi dọc phố, đứng hoặc ngồi ghế thấp ở quầy đông người.",
    tip: "Chọn quán có khách địa phương. Non nguội thì bỏ. Trả tiền mặt, tờ nhỏ.",
  },
];

const chorsu = [
  {
    name: "Khu ăn Chorsu",
    query: "Chorsu Bazaar Tashkent",
    where: "Trong chợ, sau khi xem Hazrati Imam.",
    dishes: "Plov, samsa, non, trái cây khô. Một đĩa plov chia đôi là đủ, hoặc mỗi người một samsa.",
    doing: "Ăn ở khu food của chợ, rồi mua trái cây mang về nếu muốn.",
    tip: "Tiền mặt. Mặc cả trái cây, không mặc cả đĩa đã ghi giá. Giữ túi trước người. Kín vai khi sang Hazrati Imam.",
  },
  ...amirTemur,
];

const tashkentCity = [
  {
    name: "Afsona Tashkent City",
    query: "Afsona Ukchi 4 Tashkent",
    where: "Ukchi 4, cùng phố với Hilton.",
    dishes: "Plov, manti, shurpa, samsa. Muốn đổi món thì manti cá hồi hoặc plov trái cây.",
    doing: "Ngồi ăn trưa hoặc tối sau khi nhận phòng. Gọi plov thường trước, món lạ để lần sau.",
    tip: "Đi bộ từ khách sạn, không cần taxi. Quán này là lựa chọn chắc nhất trên Ukchi.",
  },
  {
    name: "Proshashlyk",
    query: "Proshashlyk Ukchi 6 Tashkent",
    where: "Ukchi 6, gần công viên.",
    dishes: "Shashlik cừu, gà hoặc cá hồi, non và salad.",
    doing: "Gọi xiên ở bếp mở, ăn kèm bánh. Không gọi thêm súp nếu đã no plov chỗ khác.",
    tip: "Đi bộ từ Hilton. Phục vụ lúc được lúc không. Chờ quá 20 phút thì sang Afsona.",
  },
  {
    name: "Boboy",
    query: "BOBOY Tashkent City Mall Batir Zakirov 7",
    where: "Trong Tashkent City Mall, Batir Zakirov 7.",
    dishes: "Plov, manti, shashlik, salad cà tím.",
    doing: "Ngồi máy lạnh khi vừa đi công viên về, hoặc khi mưa.",
    tip: "Đắt hơn quán ngoài phố một chút. Hợp để nghỉ chân, không phải quán phải ghé mỗi ngày.",
  },
];

const mirabad = [
  {
    name: "Afsona Shevchenko",
    query: "Afsona Taras Shevchenko 30 Tashkent",
    where: "Shevchenko 30, gần ga Oybek.",
    dishes: "Plov lễ, plov trà đạo, kazan kabob, mastava, mashhurda, manti bò, shashlik gà.",
    doing: "Bữa tối ngồi xuống. Một món chính cho hai người, thêm súp nếu còn đói.",
    tip: "Có menu tiếng Anh. Đĩa tổng hợp trên menu khoảng 325.000 som, là đĩa của bàn. Từ Swissôtel đi bộ hoặc Yandex ngắn.",
  },
  {
    name: "Caravan",
    query: "Caravan restaurant Abdulla Kahhar 22 Tashkent",
    where: "Abdulla Kahhar 22, Yakkasaray.",
    dishes: "Plov, kazan kabob, lagman, manti, beshbarmak, shashlik.",
    doing: "Bữa tối khi muốn ra khỏi Mirabad. Gọi plov hoặc lagman, không gọi hết các món tên lạ.",
    tip: "Không đi bộ từ Swissôtel. Gọi Yandex và đối biển số với app trước khi lên xe.",
  },
  {
    name: "Quầy gần Oybek",
    query: "Oybek metro Tashkent samsa",
    where: "Quanh ga Oybek.",
    dishes: "Samsa thịt hoặc khoai, non, trà.",
    doing: "Ăn nhẹ, hoặc mua sáng hôm sau nếu buffet khách sạn mở muộn.",
    tip: "Lấy samsa đang nóng. Tiền mặt. Ngày 5/11 mua sẵn cho sáng lên tàu.",
  },
];

const plovDay = [
  {
    name: "Besh Qozon",
    query: "Central Asian Plov Center Besh Qozon Tashkent",
    where: "Trung tâm plov, gần đài động đất.",
    dishes: "Plov nồi lớn, salad, non, trà. Một đĩa khoảng $3.",
    doing: "Ăn trưa đúng lúc nồi còn. Ngồi ăn xong rồi mới đi vườn Nhật nếu còn sức.",
    tip: "Nồi hết giữa chiều, tới sau 14:00 dễ hết. Thứ Tư dễ có chỗ hơn cuối tuần. Taxi từ Swissôtel, gộp một vòng với đài động đất.",
  },
  ...mirabad.slice(0, 2),
];

const samarkand = [
  {
    name: "Old Havuz",
    query: "Shashlik.uz Old Havuz Samarkand",
    where: "Khoảng 300 m từ Registan. Mở 10:00–23:00.",
    dishes: "Shashlik sườn cừu, manti, lagman.",
    doing: "Ăn tối sau khi xem Registan. Một xiên sườn và bánh, lagman chỉ gọi nếu còn đói.",
    tip: "Đi bộ từ quảng trường. Quán sát Registan thường tính đắt hơn. Giữ túi khi ngồi ngoài trời.",
  },
  {
    name: "Emirhan",
    query: "Emirhan restaurant Mahmudjonov 1/18 Samarkand",
    where: "Mahmudjonov 1/18, sân thượng nhìn về Registan.",
    dishes: "Plov kiểu Samarkand, lagman, shashlik, non lò tandir.",
    doing: "Ngồi sân thượng lúc trời còn sáng. Gọi plov Samarkand và non, xem quảng trường từ bàn.",
    tip: "Bàn hoàng hôn hết sớm. Tới trước 17:30 nếu muốn ngồi hướng Registan. Gió trên sân thượng lạnh hơn dưới phố.",
  },
  {
    name: "Chợ Siab",
    query: "Siyob Bazaar Samarkand",
    where: "Trong chợ, gần Bibi-Khanym.",
    dishes: "Non nóng, samsa, plov, trái cây. Plov thì một đĩa chia đôi.",
    doing: "Ăn trưa ở quầy trong chợ sau Shah-i-Zinda, rồi sang Bibi-Khanym.",
    tip: "Tiền mặt. Ăn quầy đông khách. Không theo người kéo vào quán trong hẻm.",
  },
];

const lastNight = [
  ...amirTemur,
  {
    name: "Afsona Shevchenko",
    query: "Afsona Taras Shevchenko 30 Tashkent",
    where: "Shevchenko 30. Từ Hyatt gọi Yandex.",
    dishes: "Plov, kazan kabob, shashlik gà, mastava.",
    doing: "Chỉ ghé nếu còn hơn một tiếng trước khi về phòng. Không kịp thì ăn Navvat.",
    tip: "Đêm 8/11 tàu về trưa, đừng đi xa. Đêm 9/11 bỏ quán này vì 17:15 đã ra sân bay.",
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
    note: "Sau khi nhận phòng Hilton. Ba quán này đều gần Ukchi hoặc trong mall.",
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
    note: "Tàu về trưa. Ăn gần Hyatt, đừng đi xa.",
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
