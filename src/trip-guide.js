const trip = (cityId, word, checkIn, checkOut) =>
  `https://us.trip.com/hotels/list?cityId=${cityId}&searchWord=${encodeURIComponent(word)}&checkin=${checkIn}&checkout=${checkOut}&crn=1&adult=2&children=0&curr=USD&locale=en-US&old=1`;

const booking = (word, checkIn, checkOut) =>
  `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(word)}&checkin=${checkIn}&checkout=${checkOut}&group_adults=2&no_rooms=1&group_children=0&selected_currency=USD`;

export function mapLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const hotelLinks = {
  "Hampton by Hilton": {
    tripWord: "Hampton by Hilton Tashkent",
    bookingWord: "Hampton by Hilton Tashkent",
    cityId: 639,
    map: "Hampton by Hilton Tashkent, Istiqbol 17",
  },
  "Holiday Inn Tashkent City": {
    tripWord: "Holiday Inn Tashkent City",
    bookingWord: "Holiday Inn Tashkent City",
    cityId: 639,
    map: "Holiday Inn Tashkent City, 3 Ukchi Street",
  },
  "Swissôtel Tashkent": {
    tripWord: "Swissotel Tashkent",
    bookingWord: "Swissotel Tashkent",
    cityId: 639,
    map: "Swissotel Tashkent, Shakhrisabz Passage 4",
  },
  "Mövenpick Samarkand": {
    tripWord: "Mövenpick Samarkand",
    bookingWord: "Mövenpick Samarkand",
    cityId: 640,
    map: "Mövenpick Samarkand",
  },
  "Hilton Tashkent City": {
    tripWord: "Hilton Tashkent City",
    bookingWord: "Hilton Tashkent City",
    cityId: 639,
    map: "Hilton Tashkent City, 1 Ukchi Street",
  },
  "Wyndham Tashkent": {
    tripWord: "Wyndham Tashkent",
    bookingWord: "Wyndham Tashkent",
    cityId: 639,
    map: "Wyndham Tashkent, Amir Temur Avenue",
  },
};

export function stayLinks(stay, hotelName = stay.name) {
  const key = Object.keys(hotelLinks).find((name) => hotelName.startsWith(name));
  const info = key ? hotelLinks[key] : null;
  if (!info) return null;
  return {
    map: mapLink(info.map),
    trip: trip(info.cityId, info.tripWord, stay.checkIn, stay.checkOut),
    booking: booking(info.bookingWord, stay.checkIn, stay.checkOut),
  };
}

const tashkentLateOct = {
  label: "Khoảng 19–20°C ngày, 6–7°C đêm",
  note: "Trung bình nhiều năm cho đúng ngày trong tháng 10. Không phải dự báo năm 2026.",
  source: "Extreme Weather Watch, Tashkent daily October averages",
  url: "https://www.extremeweatherwatch.com/cities/tashkent/month-october",
};

const tashkentEarlyNov = {
  label: "Khoảng 16°C ngày, 4°C đêm",
  note: "Trung bình 10 ngày đầu tháng 11. Tối lạnh hơn ban ngày khá nhiều.",
  source: "Climate-Data.org, Tashkent đầu tháng 11",
  url: "https://en.climate-data.org/asia/uzbekistan/tashkent-738/r/november-11/",
};

const samarkandNov = {
  label: "Khoảng 14°C ngày, 3°C đêm",
  note: "Chuẩn khí hậu tháng 11 của Samarkand. Gió ở quảng trường lộ thiên lạnh hơn nhiệt độ này.",
  source: "Aroundca, chuẩn khí hậu 1991–2020",
  url: "https://aroundca.com/blog/uzbekistan-in-autumn/",
};

const yandexTip = {
  text: "Cài Yandex Go trước khi bay. Taxi vẫy ngoài sân bay và ga thường đắt và khó chịu. Reddit: cùng quãng đường, taxi sân bay khoảng $20 trong khi Yandex khoảng $2. Xe Yandex không vào sát cửa arrivals; đi bộ ra làn ngoài bãi đỗ.",
  source: "r/Uzbekistan, First-Time Tourist Tips",
  url: "https://www.reddit.com/r/Uzbekistan/comments/1nmsn31/firsttime_tourist_tips/",
};

const simTip = {
  text: "Mua SIM/eSIM Ucell hoặc Beeline ngay sau hải quan, khoảng 70.000 som (~$6) cho gói tháng có data và số nội địa. Cần số Uzbekistan để nhận mã Yandex và mua vé tàu trên điện thoại. eSIM nước ngoài không cho số local.",
  source: "r/Tashkent, Landing in Tashkent",
  url: "https://www.reddit.com/r/Tashkent/comments/1w76eiz/landing_in_tashkent_everything_i_did_at_the/",
};

const moneyTip = {
  text: "Som không nên mua ở Bangkok. Mua USD tờ 100 tại SuperRich trước khi ra sân bay, rồi đổi sang som ở Tashkent. Sân bay chỉ đổi khoảng $100–200 cho mấy ngày đầu. Visa và Mastercard dùng được ở khách sạn, mall và Yandex. Chợ và quán nhỏ cần tiền mặt.",
  source: "Oxus Road, tiền mặt và thẻ, tháng 9/2026",
  url: "https://oxusroad.com/en/travel-guide/money/",
};

export const dayDetails = {
  "2026-10-27": {
    weather: tashkentLateOct,
    places: [
      { name: "TAS Terminal 2", query: "Tashkent International Airport Terminal 2", tip: "Giờ 11:45 trên lịch là giờ hạ cánh tại Tashkent (UTC+5), không phải giờ cất cánh ở Bangkok. Bangkok hơn Tashkent 2 tiếng, nên 11:45 bên đó là 13:45 ở Bangkok. Bay quốc tế vào Terminal 2. Sau hải quan: đổi tiền, mua SIM, rồi mới ra cửa." },
      { name: "Hampton by Hilton", query: "Hampton by Hilton Tashkent Istiqbol 17", tip: "Istiqbol 17, quận gần Amir Temur. Check-in, test wifi trước khi ra ngoài." },
      { name: "Quảng trường Amir Temur", query: "Amir Temur Square Tashkent", tip: "Đi bộ từ khách sạn hoặc Yandex vài phút. Tối nay chỉ cần làm quen khu trung tâm." },
      { name: "Mustaqillik maydoni", query: "Independence Square Tashkent", tip: "Quảng trường Độc lập, cạnh Hampton. Đi bộ được nếu không mệt sau bay." },
    ],
    research: [yandexTip, simTip, moneyTip],
    checklist: [
      "Passport và vé máy bay offline",
      "Mua SIM có số Uzbekistan",
      "Yandex Go chạy được bằng số mới",
      "Đổi một ít som, tờ nhỏ",
      "Nhờ lễ tân đăng ký E-mehmon",
    ],
  },
  "2026-10-28": {
    weather: tashkentLateOct,
    places: [
      { name: "Hampton by Hilton", query: "Hampton by Hilton Tashkent Istiqbol 17", tip: "Thứ Tư. Ngủ nguyên Hampton, không checkout." },
      { name: "Chợ Chorsu", query: "Chorsu Bazaar Tashkent", tip: "Chợ mái vòm. Đi buổi sáng, mặc cả trái cây và bánh." },
      { name: "Hazrati Imam", query: "Hazrati Imam Complex Tashkent", tip: "Quần thể cạnh chợ. Mặc kín vai và đầu gối." },
      { name: "Sayilgoh, Broadway", query: "Sayilgoh Street Tashkent Broadway", tip: "Phố đi bộ. Ăn tối ở đây rồi đi bộ về khách sạn." },
    ],
    research: [
      {
        text: "Tối tháng 10 xuống khoảng 7°C dù trưa vẫn gần 20°C. Mang áo khoác khi ra chợ và khi ăn tối.",
        source: "Extreme Weather Watch, 28/10 trung bình 19.6°C / 6.7°C",
        url: "https://www.extremeweatherwatch.com/cities/tashkent/month-october",
      },
    ],
    checklist: ["Ăn sáng tại khách sạn, đã gồm trong giá", "Tiền mặt cho chợ", "Không chuyển khách sạn"],
  },
  "2026-10-29": {
    weather: tashkentLateOct,
    places: [
      { name: "Bảo tàng Amir Temur", query: "Amir Temur Museum Tashkent", tip: "Ngay quảng trường. Mua vé tại cửa, đóng cửa thứ Hai." },
      { name: "Quảng trường Độc lập", query: "Independence Square Tashkent", tip: "Đi bộ từ khách sạn. Đài phun nước và vườn." },
      { name: "Ga Kosmonavtlar", query: "Kosmonavtlar metro station Tashkent", tip: "Một trong các ga metro được trang trí. Mua thẻ rồi đi vài ga." },
    ],
    research: [
      {
        text: "Metro Tashkent rẻ và các ga trung tâm đáng xem. Hai người đi taxi khi mệt; metro hợp cho quãng ngắn trong ngày này.",
        source: "Yandex Maps, Tashkent",
        url: "https://yandex.com/maps/10335/tashkent/",
      },
    ],
    checklist: ["Ăn sáng tại khách sạn", "Vé bảo tàng", "Ngày mai mới chuyển sang Tashkent City"],
  },
  "2026-10-30": {
    weather: tashkentLateOct,
    places: [
      { name: "Holiday Inn, 3 Ukchi", query: "Holiday Inn Tashkent City 3 Ukchi Street", tip: "Check-in khu Tashkent City. Đối diện City Park." },
      { name: "Tashkent City Park", query: "Tashkent City Park", tip: "Đi bộ từ khách sạn. Ở lại đến tối xem đài phun nước." },
      { name: "Xalqlar Do'stligi", query: "Xalqlar Dostligi metro station Tashkent", tip: "Ga gần khách sạn, khoảng 500 m theo mô tả Hilton/Holiday Inn." },
    ],
    research: [
      {
        text: "Holiday Inn và Hilton Tashkent City cùng phố Ukchi. Ở Holiday Inn vẫn đi bộ được sang công viên, mall và đài phun nước, với giá 3 đêm $665 đã gồm ăn sáng.",
        source: "Giá Trip.com 24/10/2026, địa chỉ Ukchi",
        url: "https://www.hilton.com/en/hotels/tastchi-hilton-tashkent-city/",
      },
    ],
    checklist: ["Checkout Hampton trước giờ nhận phòng mới", "Giữ giấy E-mehmon", "Đi bộ công viên sau khi nhận phòng"],
  },
  "2026-10-31": {
    weather: {
      label: "Thành phố ~19°C / 6°C. Núi lạnh hơn, có thể gần 0°C",
      note: "Chưa có dự báo ngày đi. Cáp treo và đường núi đóng khi có gió mạnh hoặc tuyết.",
      source: "Nhiệt độ thành phố từ Extreme Weather Watch; phần núi là lưu ý chuẩn bị",
      url: "https://www.extremeweatherwatch.com/cities/tashkent/month-october",
    },
    places: [
      { name: "Amirsoy", query: "Amirsoy Mountain Resort", tip: "Khu trượt tuyết phía đông bắc. Hỏi cáp treo còn chạy không trước khi xuất phát." },
      { name: "Chimgan", query: "Chimgan Tashkent mountains", tip: "Làng núi trên đường Charvak. Dừng nếu thời tiết đẹp." },
      { name: "Hồ Charvak", query: "Charvak Reservoir", tip: "Hồ trên đường về. Tháng 10 không phải mùa tắm." },
    ],
    transport: {
      title: "Xe riêng trong ngày",
      steps: [
        "Không dùng Yandex cho cả ngày núi. Đặt xe riêng, giá trong bảng chi phí là $150 dự phòng, chưa phải báo giá.",
        "Xuất phát sau bữa sáng, về Holiday Inn trước tối.",
        "Chốt với tài xế: Amirsoy, Chimgan, Charvak, giờ về, và tiền xăng đã gồm chưa.",
      ],
      links: [{ label: "Bản đồ Amirsoy", url: mapLink("Amirsoy Mountain Resort Uzbekistan") }],
    },
    research: [
      {
        text: "Cuối tháng 10 đường núi đã lạnh. Mang áo gió, lớp ấm, giày kín. Nếu dự báo có mưa hoặc gió, bỏ cáp treo và chỉ chạy vòng hồ.",
        source: "Kế hoạch trong tracker, phụ thuộc thời tiết",
        url: "https://www.google.com/maps/search/?api=1&query=Amirsoy",
      },
    ],
    checklist: ["Áo ấm và kính râm", "Nước và đồ ăn nhẹ", "Xác nhận tài xế tối 30/10", "Tiền mặt trả xe"],
  },
  "2026-11-01": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Magic City", query: "Magic City Tashkent", tip: "Đài phun nước và phố đi bộ, cách Holiday Inn một đoạn taxi ngắn." },
      { name: "Tashkent City Mall", query: "Tashkent City Mall", tip: "Mall cạnh công viên. Ăn trưa và nghỉ chân." },
      { name: "Tashkent City Park", query: "Tashkent City Park", tip: "Đi bộ buổi chiều. Chủ nhật đông người." },
    ],
    research: [
      {
        text: "Chủ nhật công viên và Magic City đông. Đi buổi sáng nếu muốn ít người, tối nếu muốn xem đèn.",
        source: "Lịch tham quan Tashkent City",
        url: mapLink("Magic City Tashkent"),
      },
    ],
    checklist: ["Ăn sáng tại khách sạn", "Ngày nghỉ trong khu, không chuyển đồ", "Ngày mai chuyển sang Mirabad"],
  },
  "2026-11-02": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Swissôtel Tashkent", query: "Swissotel Tashkent Shakhrisabz 4", tip: "Shakhrisabz 4, quận Mirabad. Phòng King khoảng 35 m², có ban công." },
      { name: "Ga Oybek", query: "Oybek metro station Tashkent", tip: "Cách khách sạn dưới 2 km. Đi bộ hoặc Yandex ngắn." },
      { name: "Mirabad", query: "Mirabad district Tashkent restaurants", tip: "Ăn tối trong quận. Nhiều quán quanh Oybek." },
    ],
    research: [
      {
        text: "Swissôtel nằm ở quận Mirabad, không phải quảng trường Amir Temur. Bốn đêm này ở nguyên khách sạn, kể cả thứ Tư 4/11.",
        source: "Địa chỉ Swissôtel, 2GIS / Accor",
        url: "https://2gis.uz/tashkent/firm/70000001100646010",
      },
    ],
    checklist: ["Checkout Holiday Inn", "Check-in Swissôtel, hỏi lại E-mehmon", "Ăn tối trong Mirabad"],
  },
  "2026-11-03": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Bảo tàng Mỹ thuật Ứng dụng", query: "State Museum of Applied Arts Tashkent", tip: "Nhà gỗ chạm khắc, đồ gốm và thêu. Gần Yakkasaray." },
      { name: "Cung điện Romanov", query: "Palace of Grand Duke Romanov Tashkent", tip: "Nhà của Nikolai Konstantinovich. Kiểm tra giờ mở cửa." },
      { name: "Công viên Navoi", query: "Alisher Navoi Park Tashkent", tip: "Công viên lớn. Đi bộ buổi chiều rồi về Swissôtel." },
    ],
    research: [
      {
        text: "Bảo tàng Mỹ thuật Ứng dụng là điểm đáng vào nhất quanh Yakkasaray: nhà và bộ sưu tập cùng một vé. Đi buổi sáng, chiều dành cho công viên.",
        source: "Bảo tàng Mỹ thuật Ứng dụng, Tashkent",
        url: mapLink("State Museum of Applied Arts Tashkent"),
      },
    ],
    checklist: ["Ăn sáng tại khách sạn", "Vé bảo tàng", "Ngày mai vẫn ngủ Swissôtel"],
  },
  "2026-11-04": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Swissôtel", query: "Swissotel Tashkent", tip: "Thứ Tư. Không checkout, không đổi khách sạn." },
      { name: "Đài tưởng niệm động đất", query: "Earthquake Memorial Tashkent", tip: "Tượng và bảo tàng nhỏ về trận động đất 1966. Taxi từ Swissôtel." },
      { name: "Vườn Nhật", query: "Japanese Garden Tashkent", tip: "Vườn cạnh đài tưởng niệm. Vé cửa." },
      { name: "Trung tâm plov", query: "Central Asian Plov Center Tashkent", tip: "Ăn trưa plov. Cuối tuần đông hơn, thứ Tư dễ có bàn." },
    ],
    research: [
      {
        text: "Đài tưởng niệm, vườn Nhật và trung tâm plov nằm cùng phía tây bắc, một vòng taxi là đủ. Tối về Oybek ăn nhẹ.",
        source: "Yandex Maps, Tashkent",
        url: "https://yandex.com/maps/10335/tashkent/",
      },
    ],
    checklist: ["Ăn sáng tại khách sạn, đã gồm trong giá", "Không chuyển đồ", "Không đặt tàu hôm nay"],
  },
  "2026-11-05": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Oybek", query: "Oybek metro Tashkent", tip: "Đi bộ quanh ga nếu còn chỗ muốn xem." },
      { name: "Mirabad", query: "Mirabad Avenue Tashkent", tip: "Đi nhẹ. Tối về Swissôtel, mai tàu sớm." },
      { name: "Ga trung tâm", query: "Tashkent Central Railway Station", tip: "Chạy thử Yandex từ Swissôtel tới ga để biết phải dậy lúc mấy giờ." },
    ],
    research: [
      {
        text: "Afrosiyob đi từ Toshkent Markaziy, ga trung tâm phía bắc, không phải ga Nam. Vé in sai ga là lỗi dễ gặp khi gọi xe.",
        source: "Oxus Road, hướng dẫn ga",
        url: "https://oxusroad.com/en/travel-guide/",
      },
    ],
    checklist: ["Vali gần xong", "Vé tàu offline và passport đúng số đã đặt", "Yandex sáng mai tới Toshkent Markaziy"],
  },
  "2026-11-06": {
    weather: samarkandNov,
    places: [
      { name: "Toshkent Markaziy", query: "Tashkent Central Railway Station", tip: "Có mặt trước giờ tàu khoảng 40 phút. Cổng soát passport và vé." },
      { name: "Ga Samarkand", query: "Samarkand Railway Station", tip: "Yandex vào thành phố. Đừng nhận taxi vẫy ngay cửa ga." },
      { name: "Mövenpick Samarkand", query: "Mövenpick Samarkand", tip: "Gửi vali nếu phòng chưa sẵn, rồi đi Registan." },
      { name: "Registan", query: "Registan Square Samarkand", tip: "Cách khách sạn khoảng 0.5–1 km tuỳ lối vào. Chiều là đủ cho quảng trường." },
    ],
    transport: {
      title: "Afrosiyob, Tashkent → Samarkand",
      steps: [
        "Giờ lấy trên eticket.uzrailpass.uz ngày 24/10/2026, là giờ địa phương. Nên mua 768.",
        "768, thứ Sáu 6/11: Toshkent Markaziy 07:55, Samarkand 10:25, 2 giờ 30. Tàu dừng ở Samarkand.",
        "Sớm hơn nếu cần: 778 lúc 06:10 đến 08:23, hoặc 766 lúc 07:30 đến 09:43. Cả hai đi tiếp Bukhara.",
        "Đừng lấy 772 lúc 19:48. Tới Samarkand 22:13 thì mất buổi chiều Registan.",
        "Site trả danh sách tàu nhưng chưa trả số ghế Afrosiyob. Mở đúng chuyến, chọn 2 ghế economy, điền đúng passport, giữ PDF offline.",
      ],
      links: [
        { label: "Đặt vé chính thức", url: "https://eticket.uzrailpass.uz/en/" },
        { label: "Cách mua và giá 2026", url: "https://oxusroad.com/en/trains/afrosiyob/" },
      ],
    },
    research: [
      {
        text: "Afrosiyob bán hết sớm vào mùa thu. Reddit cũng nói vé khó có nếu chần. Đừng để đến Samarkand bằng taxi đường dài cho ngày này.",
        source: "r/Uzbekistan",
        url: "https://www.reddit.com/r/Uzbekistan/comments/1m6aaam/can_u_yandex_from_tashkent_to_samarkand/",
      },
    ],
    checklist: ["Hai vé, đúng passport", "Checkout Swissôtel", "Tiền som cho Yandex ở Samarkand", "Registan chỉ sau khi gửi đồ"],
  },
  "2026-11-07": {
    weather: samarkandNov,
    places: [
      { name: "Shah-i-Zinda", query: "Shah-i-Zinda Samarkand", tip: "Phức hợp lăng mộ. Che vai, bỏ giày khi vào nơi thờ. Đi buổi sáng." },
      { name: "Bibi-Khanym", query: "Bibi-Khanym Mosque Samarkand", tip: "Nhà thờ Hồi giáo lớn, gần chợ." },
      { name: "Chợ Siab", query: "Siyob Bazaar Samarkand", tip: "Ăn trưa ở chợ: bánh và trái cây. Trả tiền mặt." },
      { name: "Gur-e-Amir", query: "Gur-e-Amir Samarkand", tip: "Lăng Timur. Nằm trên đường đi bộ về phía Registan." },
      { name: "Registan", query: "Registan Samarkand", tip: "Quay lại nếu hôm qua chỉ kịp nhìn ngoài." },
    ],
    research: [
      {
        text: "Bốn điểm này nằm trong trung tâm lịch sử, đi bộ và Yandex ngắn được từ Mövenpick. Không cần thuê xe cả ngày. Đi theo sức, gió quảng trường lạnh hơn nhiệt độ khí tượng.",
        source: "Bố cục trung tâm Samarkand",
        url: mapLink("Registan Shah-i-Zinda Siab Bazaar walking"),
      },
    ],
    checklist: ["Giày dễ cởi", "Áo khoác", "Nước", "Vé tàu chiều mai đã nằm trong điện thoại"],
  },
  "2026-11-08": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Ga Samarkand", query: "Samarkand Railway Station", tip: "Checkout Mövenpick, ăn nhẹ, ra ga cho tàu chiều." },
      { name: "Toshkent Markaziy", query: "Tashkent Central Railway Station", tip: "Xuống ga trung tâm. Yandex về Hampton, Istiqbol 17." },
      { name: "Hampton by Hilton", query: "Hampton by Hilton Tashkent Istiqbol 17", tip: "Một đêm, giường king, ăn sáng. Mai ra sân bay." },
    ],
    transport: {
      title: "Afrosiyob, Samarkand → Tashkent",
      steps: [
        "Chủ nhật 8/11, giờ trên eticket.uzrailpass.uz ngày 24/10/2026. Nên mua 769: Samarkand 16:56, Toshkent Markaziy 19:17, 2 giờ 21. Còn buổi chiều ở Samarkand, về Hampton trước 20:30.",
        "Muộn hơn: 767 lúc 17:40 đến 20:12, 765 lúc 18:15 đến 20:30. Đừng lấy 777 lúc 20:01, tới 22:16.",
        "Bỏ đêm Hampton chỉ khi bay 9/11 từ khoảng 12:00 giờ Tashkent. Khi đó ở thêm Samarkand và sáng thứ Hai đi 771: 05:21 đến Toshkent Markaziy 07:42, taxi ra TAS khoảng 40–60 phút, có mặt sân bay trước 09:00.",
        "Một đêm Mövenpick đang khoảng $290–330, Hampton đêm cuối là $99. Ở thêm Samarkand đắt hơn nhiều so với một đêm Hampton.",
        "Cùng ngày 8/11 ra thẳng sân bay thì không kịp, trừ khi bay sau khoảng 23:00. Tàu sớm nhất trong nhóm chiều tới ga lúc 19:17.",
      ],
      links: [{ label: "Đặt vé chiều về", url: "https://eticket.uzrailpass.uz/en/" }],
    },
    research: [
      {
        text: "Giờ bay 9/11 vẫn chưa có. Bay sáng thì giữ Hampton và tàu 769 chiều 8/11. Bay từ khoảng 12:00 giờ Tashkent thì có thể bỏ Hampton, ở thêm Samarkand và đi tàu 771 lúc 05:21 sáng 9/11 ra thẳng sân bay.",
        source: "Mục cần xác nhận của lịch",
        url: "https://eticket.uzrailpass.uz/en/",
      },
    ],
    checklist: ["Đối chiếu giờ tàu với giờ bay", "Check-in Hampton", "Khai TDAC Thái Lan trước khi về"],
  },
  "2026-11-09": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Hampton by Hilton", query: "Hampton by Hilton Tashkent Istiqbol 17", tip: "Checkout, gửi hành lý nếu cần làm việc buổi sáng." },
      { name: "TAS Terminal 2", query: "Tashkent International Airport Terminal 2", tip: "Có mặt trước giờ bay 3 tiếng. Yandex từ Istiqbol, khoảng 20 phút khi đường thông." },
    ],
    transport: {
      title: "Ra sân bay và về Bangkok",
      steps: [
        "Gọi Yandex, không bắt taxi vẫy trước cửa khách sạn với giá chốt miệng.",
        "Terminal 2 cho bay quốc tế.",
        "Nộp TDAC trên tdac.immigration.go.th trước khi bay về Thái Lan.",
      ],
      links: [
        { label: "TDAC", url: "https://tdac.immigration.go.th/" },
        { label: "Bản đồ sân bay", url: mapLink("Tashkent International Airport Terminal 2") },
      ],
    },
    research: [yandexTip],
    checklist: ["Passport, vé, TDAC", "SIM còn data cho tới sân bay", "Kiểm tra hành lý ký gửi"],
  },
};

export const packing = [
  { item: "Áo khoác vừa và một lớp ấm", why: "Trưa gần 20°C, đêm 4–7°C. Núi lạnh hơn." },
  { item: "Giày đi bộ đã đi quen", why: "Registan, chợ, và phố đi bộ." },
  { item: "Khăn cổ, mũ nhẹ", why: "Gió ở quảng trường và trên Amirsoy. Khăn cũng trùm đầu ở Hazrati Imam và Shah-i-Zinda." },
  { item: "Ổ cắm loại C hoặc F", why: "Uzbekistan 220V, ổ châu Âu." },
  { item: "USD tờ 100, khoảng $600 cho hai người", why: "Mua ở SuperRich Bangkok. Tờ sạch, không rách, không viết. Som đổi ở Tashkent." },
  { item: "Thuốc cá nhân và đơn nếu cần", why: "Khai hải quan nếu thuốc thuộc nhóm kiểm soát." },
  { item: "Áo che vai và quần dài", why: "Phố thì mặc bình thường. Đền và nhà thờ cần kín vai, kín gối." },
  { item: "Đồ lót và áo thun dư vài ngày", why: "Giặt khách sạn trả hôm sau. Đêm 8/11 không kịp lấy đồ." },
];

export const masterChecklist = [
  { label: "Vé Afrosiyob 768, 6/11, 07:55, 2 ghế", priority: "High" },
  { label: "Vé Afrosiyob 769, 8/11, 16:56, trừ khi bay 9/11 sau 12:00", priority: "High" },
  { label: "Giờ bay 27/10 và 9/11", priority: "High" },
  { label: "TDAC trước khi về Thái Lan", priority: "High" },
  { label: "E-mehmon tại mỗi khách sạn", priority: "High" },
  { label: "Cài Yandex Go và giữ số Uzbekistan", priority: "High" },
  { label: "Báo giá xe Amirsoy, chưa chốt $150 trong bảng", priority: "Medium" },
  { label: "Đổi USD tờ 100 ở SuperRich, Bangkok, trước giờ ra sân bay", priority: "Medium" },
];

export const localLife = [
  {
    title: "Đổi tiền ở Bangkok",
    icon: "wallet",
    paragraphs: [
      "Mua đô la, không mua som. SuperRich ở Bangkok hầu như không bán som, và tỷ giá som ở Thái kém hơn quầy ngân hàng ở Tashkent.",
      "Có hai hãng khác nhau. SuperRich Thailand là bảng xanh, trụ sở Rajdamri Soi 1, gần BTS Chit Lom. SuperRich 1965 là bảng cam, nhiều chi nhánh, trụ sở ở Silom. Sáng hôm đổi, mở hai trang tỷ giá và chọn chỗ bán tờ USD 100 rẻ hơn. Sáng 24/10/2026, bảng xanh bán tờ 100 với giá 33.70 baht một đô. Tờ 50 gần bằng tờ 100. Tờ 20 và tờ nhỏ bị trừ.",
      "Đổi trong thành phố trước khi ra sân bay. Quầy trong sân bay Bangkok thường kém hơn. Mang hộ chiếu. Tờ phải phẳng, không rách, không viết, không ghim. Với hai người, khách sạn và tàu trả bằng thẻ, khoảng $600 tiền mặt là đủ. Đổi $100–200 ngay ở TAS cho vài ngày đầu, phần còn lại đổi ở ngân hàng trong thành phố.",
    ],
    links: [
      { label: "Tỷ giá SuperRich xanh", url: "https://www.superrichthailand.com/exchange-rate" },
      { label: "Tỷ giá SuperRich cam", url: "https://www.superrich1965.com/" },
    ],
  },
  {
    title: "Quẹt thẻ ở Uzbekistan",
    icon: "wallet",
    paragraphs: [
      "Visa và Mastercard dùng được ở khách sạn, nhà hàng có máy, siêu thị, mall, Yandex Go và trang mua vé tàu. Visa được nhận rộng hơn Mastercard một chút. American Express đừng tính vào. Mang hai thẻ của hai ngân hàng, và báo ngân hàng trước khi bay.",
      "ATM chỉ nhả som, không nhả đô. Phí máy khoảng 1–1,5% ở Kapitalbank, Hamkorbank và NBU, cộng phí ngân hàng phát hành thẻ. Màn hình hỏi quy đổi về tiền nước mình thì chọn som. Rút một lần cho vài ngày, vì cuối tuần máy đôi khi hết tiền.",
      "Chợ Chorsu, chợ Siab, quán lề đường, trà đạo nhỏ và taxi vẫy tay cần tiền mặt. Từ tháng 4/2026, rượu, thuốc lá ở cửa hàng và xăng phải trả bằng thẻ. Nhà hàng và khách sạn vẫn nhận tiền mặt cho rượu.",
    ],
    links: [{ label: "Tiền mặt và ATM", url: "https://oxusroad.com/en/travel-guide/money/" }],
  },
  {
    title: "Ăn mặc và giặt",
    icon: "shirt",
    paragraphs: [
      "Phố Tashkent và Samarkand mặc như đi chơi mùa thu: áo thun hoặc sơ mi, quần dài, giày đã đi quen. Không cần vest. Tối khoảng 4–7°C nên có áo khoác hoặc fleece. Ngày núi mặc thêm một lớp, kính râm, giày kín. Trưa vẫn có nắng.",
      "Vào Hazrati Imam, nhà thờ và Shah-i-Zinda thì kín vai, kín gối. Khăn cổ dùng trùm đầu. Cởi giày ở nhà thờ, nhà người ta và một số quán trà. Ngoài đường phụ nữ không cần trùm khăn.",
      "Bốn khách sạn đều giặt qua lễ tân, thường trả tối hôm sau. Gửi ở Holiday Inn khoảng 31/10 hoặc ở Swissôtel khoảng 3/11, lấy trước sáng 6/11 lên tàu. Đêm 8/11 không gửi, vì sáng 9/11 bay. Quần áo lót giặt trong phòng thì khó khô vì trời mát, nên mang dư vài bộ.",
    ],
    links: [],
  },
  {
    title: "Người và tiếng",
    icon: "users",
    paragraphs: [
      "Người dễ mến, hay mời trà và bánh. Từ chối thì mỉm cười, tay để ngang ngực, không cần giải thích dài. Chợ thì mặc cả vui. Quán có menu thì trả đúng giá. Boa không bắt buộc. Yandex đã chốt giá thì không boa. Nhà hàng ngồi xuống có thể làm tròn hoặc để khoảng 10% nếu thích.",
      "Tiếng đi đường là tiếng Uzbek và tiếng Nga. Tashkent dùng tiếng Nga rất nhiều ở khách sạn, taxi và người lớn tuổi. Samarkand thêm tiếng Tajik. Tiếng Anh có ở lễ tân và một phần người trẻ, đừng trông vào quán nhỏ. Tải offline tiếng Uzbek và tiếng Nga.",
      "Chào: salom, hoặc assalomu alaykum. Cảm ơn: rahmat, hoặc spasibo. Có / không: ha / yo'q. Bao nhiêu: qancha, hoặc skolko. Tính tiền: hisob, hoặc schet pozhaluysta. Bánh mì được coi trọng: đừng úp bánh, đừng vứt trước mặt người khác. Đưa đồ bằng tay phải. Ảnh người lạ thì hỏi trước. Không chụp cảnh sát và cổng kiểm soát.",
    ],
    links: [{ label: "Ghi chú khách mới", url: "https://www.reddit.com/r/Uzbekistan/comments/1nmsn31/firsttime_tourist_tips/" }],
  },
];

export const sources = [
  { label: "Nhiệt độ ngày tháng 10 tại Tashkent", url: "https://www.extremeweatherwatch.com/cities/tashkent/month-october" },
  { label: "Khí hậu đầu tháng 11", url: "https://en.climate-data.org/asia/uzbekistan/tashkent-738/r/november-11/" },
  { label: "Chuẩn khí hậu Samarkand tháng 11", url: "https://aroundca.com/blog/uzbekistan-in-autumn/" },
  { label: "Cách mua vé Afrosiyob", url: "https://oxusroad.com/en/trains/afrosiyob/" },
  { label: "Site vé tàu", url: "https://eticket.uzrailpass.uz/en/" },
  { label: "Reddit: SIM, Yandex, tiền", url: "https://www.reddit.com/r/Uzbekistan/comments/1nmsn31/firsttime_tourist_tips/" },
  { label: "Đô la và ATM ở Uzbekistan", url: "https://oxusroad.com/en/travel-guide/money/" },
  { label: "Tỷ giá SuperRich Thailand", url: "https://www.superrichthailand.com/exchange-rate" },
  { label: "Sân bay và ga", url: "https://oxusroad.com/en/travel-guide/" },
];
