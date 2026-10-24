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
};

export function stayLinks(stay) {
  const key = Object.keys(hotelLinks).find((name) => stay.name.startsWith(name));
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
  text: "Đổi USD tờ sạch, không rách, không viết, không gấp nát. Quầy ngân hàng sân bay mở 24 giờ. Mang khoảng $250/người tiền mặt nếu khách sạn và tàu đã trả trước. ATM Visa/Mastercard chọn rút bằng som, không chọn quy đổi về tiền nước mình.",
  source: "Oxus Road, cập nhật tháng 9/2026",
  url: "https://oxusroad.com/en/travel-guide/",
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
      { name: "Hampton by Hilton", query: "Hampton by Hilton Tashkent Istiqbol 17", tip: "Họp sáng. Không checkout, không đổi khách sạn." },
      { name: "Sayilgoh, Broadway", query: "Sayilgoh Street Tashkent Broadway", tip: "Phố đi bộ trung tâm, hợp để ăn tối sau họp." },
      { name: "Amir Temur Square", query: "Amir Temur Square Tashkent", tip: "Điểm hẹn dễ tìm nếu ra ngoài buổi tối." },
    ],
    research: [
      {
        text: "Tối tháng 10 xuống khoảng 7°C dù trưa vẫn gần 20°C. Mang áo khoác khi ra ăn, đừng chỉ mặc đồ trong phòng họp.",
        source: "Extreme Weather Watch, 28/10 trung bình 19.6°C / 6.7°C",
        url: "https://www.extremeweatherwatch.com/cities/tashkent/month-october",
      },
    ],
    checklist: ["Pin laptop đầy trước họp", "Xác nhận giờ và địa điểm họp", "Ăn sáng tại khách sạn, đã gồm trong giá"],
  },
  "2026-10-29": {
    weather: tashkentLateOct,
    places: [
      { name: "Mirabad Avenue", query: "Mirabad Avenue Tashkent", tip: "Trục cần xem nhà và tiện ích. Đi taxi từ Hampton, ghi lại đường về." },
      { name: "Ga tàu điện Oybek", query: "Oybek metro station Tashkent", tip: "Mốc chính của khu Mirabad. Đo thời gian từ Hampton đến đây." },
      { name: "Taras Shevchenko", query: "Taras Shevchenko Street Tashkent", tip: "Đoạn phố đi cùng Oybek khi khảo sát căn hộ và coworking." },
    ],
    research: [
      {
        text: "Tàu điện Tashkent rẻ và sạch, nhưng với hai người và lịch remote thì Yandex vẫn là cách đo thời gian di chuyển thực tế giữa các khu. Ghi số phút Hampton → Oybek → Tashkent City để so sánh trước khi chốt khu ở.",
        source: "Ghi chú khảo sát của chuyến này",
        url: "https://yandex.com/maps/10335/tashkent/",
      },
    ],
    checklist: ["Danh sách căn hộ muốn xem", "Hỏi sưởi, điện dự phòng, cáp quang", "Chụp mặt đường buổi tối, không chỉ ban ngày"],
  },
  "2026-10-30": {
    weather: tashkentLateOct,
    places: [
      { name: "Holiday Inn, 3 Ukchi", query: "Holiday Inn Tashkent City 3 Ukchi Street", tip: "Check-in khu Tashkent City. Đối diện City Park." },
      { name: "Tashkent City Park", query: "Tashkent City Park", tip: "Đi bộ từ khách sạn. Xem mật độ người buổi tối." },
      { name: "Xalqlar Do'stligi", query: "Xalqlar Dostligi metro station Tashkent", tip: "Ga gần khách sạn, khoảng 500 m theo mô tả Hilton/Holiday Inn." },
    ],
    research: [
      {
        text: "Holiday Inn và Hilton Tashkent City cùng phố Ukchi. Ở Holiday Inn vẫn đi bộ được sang Hilton, mall và Nest One, với giá 3 đêm $560 thay vì $915.",
        source: "Giá Trip.com 24/10/2026, địa chỉ Ukchi",
        url: "https://www.hilton.com/en/hotels/tastchi-hilton-tashkent-city/",
      },
    ],
    checklist: ["Checkout Hampton trước giờ nhận phòng mới", "Giữ giấy E-mehmon", "Đổi SIM sang mạng ổn ở khu mới nếu wifi yếu"],
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
      { name: "Nest One", query: "Nest One Tashkent", tip: "Khu căn hộ mới cần khảo sát. Đi bộ hoặc Yandex rất ngắn từ Ukchi." },
      { name: "Tashkent City Mall", query: "Tashkent City Mall", tip: "Mall cạnh công viên. Xem siêu thị và chỗ ăn quanh nhà." },
      { name: "Tashkent City Park", query: "Tashkent City Park", tip: "Đi bộ buổi chiều. Ghi tiếng ồn cuối tuần." },
    ],
    research: [
      {
        text: "Chủ nhật là ngày đúng để xem Nest One khi cư dân ở nhà: thang máy, bãi xe, quán mở cửa, đường tối.",
        source: "Lịch khảo sát của chuyến",
        url: mapLink("Nest One Tashkent"),
      },
    ],
    checklist: ["Danh sách toà trong Nest One", "Hỏi phí quản lý và sưởi", "So sánh với Mirabad đã xem ngày 29/10"],
  },
  "2026-11-02": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Swissôtel Tashkent", query: "Swissotel Tashkent Shakhrisabz 4", tip: "Shakhrisabz 4, quận Mirabad. Phòng twin 35 m². Hủy miễn phí trước ngày nhận phòng." },
      { name: "Ga Oybek", query: "Oybek metro station Tashkent", tip: "Cách khách sạn dưới 2 km. Đây là mốc của bốn đêm khảo sát." },
      { name: "Mirabad", query: "Mirabad district Tashkent restaurants", tip: "Ăn tối trong quận để xem phố có sống không." },
    ],
    research: [
      {
        text: "Swissôtel nằm đúng quận Mirabad, không phải quảng trường Amir Temur. Bốn đêm này là để ở trong khu Oybek–Yakkasaray, và họp sáng 4/11 không phải checkout.",
        source: "Địa chỉ Swissôtel, 2GIS / Accor",
        url: "https://2gis.uz/tashkent/firm/70000001100646010",
      },
    ],
    checklist: ["Checkout Holiday Inn", "Check-in Swissôtel, hỏi lại E-mehmon", "Wifi và bàn làm việc trong phòng"],
  },
  "2026-11-03": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Oybek", query: "Oybek Street Tashkent", tip: "Đo thời gian đi bộ và Yandex từ Swissôtel tới cụm căn hộ." },
      { name: "Yakkasaray", query: "Yakkasaray district Tashkent", tip: "Quận phía nam Mirabad. Xem đường tối và siêu thị." },
    ],
    research: [
      {
        text: "Với căn hộ expat, ba câu quyết định: sưởi trung tâm hay điều hòa hai chiều, máy phát khi mất điện, và cáp quang vào tận nhà chứ không chỉ wifi hành lang.",
        source: "Mục tiêu khảo sát trong lịch",
        url: mapLink("Yakkasaray Tashkent"),
      },
    ],
    checklist: ["Hỏi giá thuê đã gồm sưởi chưa", "Chụp đồng hồ điện và tủ mạng", "Hỏi chủ nhà về đăng ký tạm trú"],
  },
  "2026-11-04": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Swissôtel", query: "Swissotel Tashkent", tip: "Họp sáng. Không checkout." },
      { name: "Coworking quanh Oybek", query: "coworking Oybek Tashkent", tip: "Tối thử một quán hoặc coworking. Ghi giá ngày và tốc độ mạng." },
    ],
    research: [yandexTip],
    checklist: ["Pin và hộ chiếu nếu họp cần", "Ăn sáng, gói phòng chưa gồm bữa", "Không đặt tàu hoặc chuyển đồ vào sáng nay"],
  },
  "2026-11-05": {
    weather: tashkentEarlyNov,
    places: [
      { name: "Oybek", query: "Oybek metro Tashkent", tip: "Chốt những tuyến đã đi hai ngày trước." },
      { name: "Yakkasaray", query: "Yakkasaray Tashkent", tip: "Đi nốt đoạn còn thiếu. Tối về Swissôtel, mai đi tàu sớm." },
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
        "Mua trên eticket.uzrailpass.uz. Địa chỉ cũ eticket.railway.uz chuyển tiếp sang site này.",
        "Vé mở bán khoảng 45–60 ngày trước, có nguồn ghi 10:00 giờ Tashkent. Ngày 6/11 nằm trong khoảng đó tính từ hôm nay 24/10, nên vào site và giữ ghế sớm.",
        "Điền đúng số passport sẽ mang theo. Cổng ga đối chiếu hộ chiếu.",
        "Economy khoảng 311.000 som một người, khoảng $26, giá giữa năm 2026. Hai người một lượt khoảng $52, chưa gồm phí nếu cổng thẻ nước ngoài từ chối.",
        "Tàu nhanh nhất từng được ghi khoảng 2 giờ 13 phút, ví dụ 07:30–09:43. Giờ này đổi. Chọn chuyến sáng để còn buổi chiều ở Registan.",
        "Nếu thẻ quốc tế bị từ chối, thử lại hoặc mua qua 12Go. Giữ PDF offline.",
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
        "Chọn chuyến chiều, không phải tàu tối muộn, vì sáng 9/11 phải có mặt sân bay trước giờ bay 3 tiếng.",
        "Cùng cách đặt như lượt đi: eticket.uzrailpass.uz, passport, vé offline.",
        "Nếu chuyến chiều hết ghế, lấy chuyến sớm hơn và nghỉ ở Hampton lâu hơn. Đừng lấy tàu khiến mình tới Tashkent sau 20:00 nếu bay sáng.",
      ],
      links: [{ label: "Đặt vé chiều về", url: "https://eticket.uzrailpass.uz/en/" }],
    },
    research: [
      {
        text: "Giờ bay 9/11 chưa có trong tracker. Tàu chiều Chủ nhật chỉ ổn khi bay chiều hoặc tối thứ Hai. Nếu bay sáng, phải đổi tàu sang Chủ nhật sớm hoặc thứ Bảy đêm.",
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
  { item: "Giày đi bộ đã đi quen", why: "Registan, chợ, và phố khảo sát." },
  { item: "Khăn cổ, mũ nhẹ", why: "Gió ở quảng trường và trên Amirsoy." },
  { item: "Ổ cắm loại C hoặc F", why: "Uzbekistan 220V, ổ châu Âu." },
  { item: "USD tờ đẹp", why: "Quầy đổi từ chối tờ rách, viết, gấp nát." },
  { item: "Thuốc cá nhân và đơn nếu cần", why: "Khai hải quan nếu thuốc thuộc nhóm kiểm soát." },
  { item: "Áo che vai", why: "Shah-i-Zinda và nhà thờ yêu cầu ăn mặc kín." },
];

export const masterChecklist = [
  { label: "Vé Afrosiyob 6/11, chuyến sáng, 2 ghế", priority: "High" },
  { label: "Vé Afrosiyob 8/11, chuyến chiều khớp giờ bay", priority: "High" },
  { label: "Giờ bay 27/10 và 9/11", priority: "High" },
  { label: "TDAC trước khi về Thái Lan", priority: "High" },
  { label: "E-mehmon tại mỗi khách sạn", priority: "High" },
  { label: "Hỏi lãnh sự về làm remote với visa du lịch", priority: "High" },
  { label: "Cài Yandex Go và giữ số Uzbekistan", priority: "High" },
  { label: "Báo giá xe Amirsoy, chưa chốt $150 trong bảng", priority: "Medium" },
];

export const sources = [
  { label: "Nhiệt độ ngày tháng 10 tại Tashkent", url: "https://www.extremeweatherwatch.com/cities/tashkent/month-october" },
  { label: "Khí hậu đầu tháng 11", url: "https://en.climate-data.org/asia/uzbekistan/tashkent-738/r/november-11/" },
  { label: "Chuẩn khí hậu Samarkand tháng 11", url: "https://aroundca.com/blog/uzbekistan-in-autumn/" },
  { label: "Cách mua vé Afrosiyob", url: "https://oxusroad.com/en/trains/afrosiyob/" },
  { label: "Site vé tàu", url: "https://eticket.uzrailpass.uz/en/" },
  { label: "Reddit: SIM, Yandex, tiền", url: "https://www.reddit.com/r/Uzbekistan/comments/1nmsn31/firsttime_tourist_tips/" },
  { label: "Sân bay và ga", url: "https://oxusroad.com/en/travel-guide/" },
];
