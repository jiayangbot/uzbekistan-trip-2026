export function mapLink(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
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
  text: "Som không mua ở Bangkok. Mua USD tờ 100 tại SuperRich. Trong nhà ga Tashkent, quầy NBU mở cả ngày, chỉ đổi $100–200 cho SIM và vài bữa đầu. Phần còn lại đổi tại Kapitalbank, số 7 phố Sayilgoh, sát quảng trường Amir Temur, đi bộ từ Hampton, thứ Hai–thứ Sáu 09:00–17:00. Hạ cánh 11:45 nên kịp chiều 27/10. Trễ quá 17:00 thì sáng 28/10. Mang hộ chiếu, xin tờ 5.000 đến 50.000. Chủ nhật ngân hàng đóng. Ở Samarkand nếu thiếu som thì NBU chi nhánh Registon, phố Firdavsi số 7, ngày thường đến 17:00. Visa và Mastercard dùng được ở khách sạn, mall và Yandex. Chợ và quán nhỏ cần tiền mặt.",
  source: "Oxus Road, tiền mặt và thẻ, tháng 9/2026",
  url: "https://oxusroad.com/en/travel-guide/money/",
};

export const dayDetails = {
  "2026-10-27": {
    weather: tashkentLateOct,
    places: [
      {
        name: "TAS Terminal 2",
        query: "Tashkent International Airport Terminal 2",
        eat: "Ăn trên máy bay. Trong sân bay chỉ uống nước, bữa đầu để gần Hampton.",
        doing: "Hải quan, mua SIM Ucell hoặc Beeline có số nội địa, ra làn 1 gọi Yandex.",
        tip: "HY532: Bangkok 06:55, TAS 11:45, Terminal 2. Không có metro ra sân bay. Đừng nhận người chào xe trong sảnh.",
      },
      {
        name: "Hampton by Hilton",
        query: "Hampton by Hilton Tashkent Istiqbol 17",
        eat: "Tối nay Navvat hoặc quầy Broadway nếu còn sức. Mệt thì chỉ trà và samsa.",
        doing: "Check-in, gửi đồ, test wifi, nhờ lễ tân đăng ký E-mehmon.",
        tip: "Istiqbol 17, gần Amir Temur. Giữ tờ xác nhận tạm trú. Metro Amir Temur Xiyoboni đi bộ được, khoảng 10 phút.",
      },
      {
        name: "Quảng trường Amir Temur",
        query: "Amir Temur Square Tashkent",
        eat: "Không ngồi nhà hàng ở quảng trường. Đói thì sang Broadway lấy samsa.",
        doing: "Đi bộ một vòng cho quen đường về khách sạn, xem tượng và đèn.",
        tip: "Đi bộ từ Hampton. Tối gió lạnh hơn nhiệt độ ban ngày. Xong thì về, mai mới đi Chorsu.",
      },
      {
        name: "Mustaqillik maydoni",
        query: "Independence Square Tashkent",
        eat: "Không ăn ở quảng trường này.",
        doing: "Đi bộ thêm nếu không mệt sau bay. Xem đài phun nước rồi quay về Hampton.",
        tip: "Nằm cạnh khách sạn. Bỏ qua nếu chân đã mỏi, mai vẫn ở khu này.",
      },
    ],
    transport: {
      title: "Bay rồi Yandex về Hampton",
      steps: [
        "HY532 cất cánh 06:55 giờ Bangkok, hạ cánh TAS Terminal 2 lúc 11:45. Trên máy bay khoảng 6 giờ 50 phút vì Tashkent chậm Bangkok 2 tiếng.",
        "Mua SIM trong nhà ga, ra làn 1 gọi Yandex. Đừng nhận người chào xe trong sảnh.",
        "Hampton cách sân bay khoảng 11 km, 20–40 phút.",
      ],
      links: [{ label: "Bản đồ sân bay", url: mapLink("Tashkent International Airport Terminal 2") }],
    },
    research: [yandexTip, simTip, moneyTip],
    checklist: [
      "Passport và vé máy bay offline",
      "Mua SIM có số Uzbekistan",
      "Yandex Go chạy được bằng số mới",
      "Đổi som tại Kapitalbank, số 7 phố Sayilgoh, tờ nhỏ",
      "Nhờ lễ tân đăng ký E-mehmon, giữ tờ xác nhận",
    ],
  },
  "2026-10-28": {
    weather: tashkentLateOct,
    places: [
      {
        name: "Hampton by Hilton",
        query: "Hampton by Hilton Tashkent Istiqbol 17",
        eat: "Buffet sáng tại khách sạn, đã gồm trong giá.",
        doing: "Ăn sáng rồi đi. Không checkout. Thứ Tư, ngủ nguyên đây.",
        tip: "Về lại đúng Hampton tối nay. Đừng nhận phòng chỗ khác giữa ngày.",
      },
      {
        name: "Chợ Chorsu",
        query: "Chorsu Bazaar Tashkent",
        eat: "Plov hoặc samsa trong khu ăn của chợ, non, trái cây khô.",
        doing: "Đi buổi sáng, xem mái vòm, mua trái cây nếu muốn, rồi sang Hazrati Imam.",
        tip: "Yandex từ Hampton. Tiền mặt, tờ nhỏ. Mặc cả trái cây, không mặc cả đĩa đã niêm giá. Giữ túi phía trước.",
      },
      {
        name: "Hazrati Imam",
        query: "Hazrati Imam Complex Tashkent",
        eat: "Ăn ở Chorsu cạnh đó, không ăn trong quần thể.",
        doing: "Vào xem nhà thờ và quần thể. Đứng im khi có người cầu nguyện, không cắt ngang lối.",
        tip: "Kín vai, kín gối. Khăn cổ dùng trùm đầu nếu được nhắc. Cởi giày ở nơi thờ. Chụp người thì hỏi trước.",
      },
      {
        name: "Sayilgoh, Broadway",
        query: "Sayilgoh Street Tashkent Broadway",
        eat: "Tối: samsa thịt, non nóng, shashlik gà, trà. Chọn quầy đông.",
        doing: "Đi bộ hết phố đi bộ, ăn xong đi bộ hoặc Yandex ngắn về Hampton.",
        tip: "Non vừa ra lò mới lấy. Trả tiền mặt. Đây là bữa tối, không cần nhà hàng ngồi lâu.",
      },
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
      {
        name: "Bảo tàng Amir Temur",
        query: "Amir Temur Museum Tashkent",
        eat: "Không ăn trong bảo tàng. Trưa ra quán quanh quảng trường, gọi lagman.",
        doing: "Xem hiện vật và mô hình, khoảng một tiếng, rồi ra quảng trường.",
        tip: "Ngay quảng trường, đi bộ từ Hampton. Vé mua tại cửa. Đóng cửa thứ Hai. Hôm nay là thứ Năm.",
      },
      {
        name: "Quảng trường Độc lập",
        query: "Independence Square Tashkent",
        eat: "Lagman ở quán thường quanh quảng trường, không vào nhà hàng khách sạn.",
        doing: "Đi bộ đài phun nước và vườn sau bảo tàng.",
        tip: "Cạnh Hampton. Gió quảng trường lạnh hơn trong phố, mang áo khoác từ khách sạn.",
      },
      {
        name: "Ga Kosmonavtlar",
        query: "Kosmonavtlar metro station Tashkent",
        eat: "Không ăn dưới ga. Tối về gần Hampton gọi shashlik, salad và non.",
        doing: "Mua lượt metro, đi vài ga cho xem trần và tường, rồi về Amir Temur Xiyoboni.",
        tip: "Chạm thẻ hoặc điện thoại 2.500 som một lượt, vé giấy 3.000. Mỗi người một lần chạm. Không có xu nhựa.",
      },
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
      {
        name: "Hilton Tashkent City, 1 Ukchi",
        query: "Hilton Tashkent City 1 Ukchi Street",
        eat: "Sau khi gửi đồ, ăn trong mall hoặc Afsona ở Ukchi 4. Gọi plov hoặc manti.",
        doing: "Checkout Hampton, Yandex sang đây. Nhận phòng từ 14:00, tới sớm thì gửi vali. Hỏi lại E-mehmon.",
        tip: "Ukchi 1, cạnh City Park. Ba sáng ở đây không gồm ăn sáng, buffet $30 mỗi người. Afsona Ukchi 4 cùng phố.",
      },
      {
        name: "Tashkent City Park",
        query: "Tashkent City Park",
        eat: "Không mang đồ ăn vào giữa công viên. Ăn trước hoặc sau, ở Afsona hoặc Proshashlyk.",
        doing: "Đi bộ vòng công viên, xem đài phun nước lúc trời tối.",
        tip: "Băng qua đường từ khách sạn. Tối mát, mang áo. Không cần taxi cho quãng này.",
      },
      {
        name: "Xalqlar Do'stligi",
        query: "Xalqlar Dostligi metro station Tashkent",
        eat: "Không ăn ở ga.",
        doing: "Chỉ cần biết cửa ga để hôm sau đi metro nếu muốn. Hôm nay đi bộ là đủ.",
        tip: "Đi bộ được từ Hilton. Một giá cho mọi ga. Đổi tuyến trong cùng lượt thì không tính thêm.",
      },
    ],
    transport: {
      title: "Yandex sang Hilton",
      steps: [
        "Hampton tới Hilton khoảng 4 km, 15–25 phút. Có vali thì gọi Yandex, không đi metro.",
        "Trả phòng Hampton trước 12:00. Hilton nhận phòng từ 14:00, tới sớm thì gửi vali.",
      ],
      links: [{ label: "Bản đồ Hilton", url: mapLink("Hilton Tashkent City 1 Ukchi Street") }],
    },
    research: [
      {
        text: "Hilton đặt phòng Twin, không gồm ăn sáng. Ba sáng 31/10, 1/11, 2/11 ăn quầy samsa hoặc trong mall. Buffet khách sạn $30 mỗi người nếu muốn ăn tại chỗ.",
        source: "Email xác nhận Trip.com",
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
      {
        name: "Toshkent Markaziy",
        query: "Tashkent Central Railway Station",
        eat: "Ăn samsa đã mua. Trên tàu không có bữa.",
        doing: "Yandex từ Hilton, khoảng 5 km. Tìm tàu 7201. Tàu đứng ở ga 08:55 và rời 09:10.",
        tip: "Đây là ga trung tâm, ga của tàu Samarkand, không phải ga Nam. Không đặt vé trước. Không có số ghế, ngồi chỗ trống. Vé 30.000 som (~$2.50) mỗi người, trả người soát vé.",
      },
      {
        name: "Amirsoy",
        query: "Amirsoy Mountain Resort",
        eat: "Đồ đã mua sáng: samsa, trái cây, nước. Trên núi chỉ uống trà nếu quán resort đắt.",
        doing: "Xe 324 từ Chinorkent, khoảng 40 phút. Đi một vòng, hỏi cáp treo còn chạy không rồi mới mua vé.",
        tip: "Thứ Bảy 31/10 cáp treo khứ hồi 135.000 som mỗi người nếu đang chạy. Gió hoặc tuyết thì đóng. Áo gió, lớp ấm, giày kín.",
      },
      {
        name: "Khodjikent",
        query: "Khodjikent railway station",
        eat: "Không ăn ở ga. Tối về Ukchi gọi lagman.",
        doing: "Xe 325 từ Amirsoy về ga này. Tàu thường 6436 lúc 16:12.",
        tip: "Một ga trước Chinorkent. Tàu tới ga Nam 18:25. Xuống Toshkent Markaziy rồi Yandex về Hilton. Tối không còn tàu lên núi.",
      },
    ],
    transport: {
      title: "Tàu 7201 rồi xe 324",
      steps: [
        "08:15 rời Hilton, Yandex ra ga trung tâm. Không đặt vé trước. Tàu đứng 08:55–09:10, lên lúc đó để ngồi, không có số ghế. 09:10 rời ga, tới Chinorkent 10:33. Vé 30.000 som (~$2.50) mỗi người, trả người soát vé.",
        "10:40 xe 324 tới Amirsoy, 10.000 som, khoảng 40 phút. Về bằng xe 325, vì xe 324 từ đây đi tiếp lên núi.",
        "16:12 tàu 6436 ở Khodjikent, tới ga Nam 18:25. Xuống ga trung tâm. Muốn về sớm thì tàu 7204, Chinorkent 14:19, và phải rời Amirsoy khoảng 13:20.",
        "Hai người khứ hồi khoảng 160.000 som, cộng hai cuốc Yandex. Tối 30/10 mở elektropoyezd.uz xem tàu còn chạy không.",
      ],
      links: [
        { label: "Giờ tàu 7201", url: "https://elektropoyezd.uz/en/news/news/X94" },
        { label: "Bản đồ Amirsoy", url: mapLink("Amirsoy Mountain Resort Uzbekistan") },
      ],
    },
    research: [
      {
        text: "Từ 8/9/2026, tàu 7201 và 7203 còn chạy cả ngày lễ. Cặp tàu tối 7205/7206 bị hủy, nên sau 16:12 không còn tàu về Tashkent. Xe buýt nhỏ 324 và 325 chạy mỗi ngày, thứ Bảy khoảng 10 phút một chuyến.",
        source: "O'ztemiryo'lovchi, 7/9/2026, và Ủy ban du lịch, 22/8/2026",
        url: "https://elektropoyezd.uz/en/news/news/X94",
      },
    ],
    checklist: ["Áo ấm và kính râm", "Nước và đồ ăn nhẹ", "Khoảng 80.000 som mỗi người cho tàu và xe buýt", "Tối 30/10 xem tàu còn chạy không"],
  },
  "2026-11-01": {
    weather: tashkentEarlyNov,
    places: [
      {
        name: "Magic City",
        query: "Magic City Tashkent",
        eat: "Ăn ở mall hoặc Afsona trước khi sang. Ở đây xem đèn, không chọn bữa chính.",
        doing: "Xem đài phun nước và phố đi bộ, rồi Yandex về Ukchi.",
        tip: "Taxi ngắn từ Hilton. Chủ nhật đông. Đi sáng nếu muốn vắng, tối nếu muốn xem đèn.",
      },
      {
        name: "Tashkent City Mall",
        query: "Tashkent City Mall",
        eat: "Boboy trong mall: plov, manti, shashlik, salad cà tím. Hoặc food court.",
        doing: "Nghỉ chân, vào nhà vệ sinh, sưởi nếu ngoài trời lạnh.",
        tip: "Cạnh công viên, đi bộ từ khách sạn. Đắt hơn quán Ukchi một chút. Máy lạnh mạnh, mang áo khoác khi ra.",
      },
      {
        name: "Tashkent City Park",
        query: "Tashkent City Park",
        eat: "Không ăn giữa công viên. Tối về Ukchi, lagman hoặc shashlik ở Afsona.",
        doing: "Đi bộ buổi chiều khi chưa đông, vòng về khách sạn.",
        tip: "Chủ nhật đông người. Sát Hilton. Mai chuyển sang Mirabad, tối nay gói đồ nhẹ.",
      },
    ],
    research: [
      {
        text: "Chủ nhật công viên và Magic City đông. Đi buổi sáng nếu muốn ít người, tối nếu muốn xem đèn.",
        source: "Lịch tham quan Tashkent City",
        url: mapLink("Magic City Tashkent"),
      },
    ],
    checklist: ["Ăn sáng ngoài, Hilton không gồm", "Ngày nghỉ trong khu, không chuyển đồ", "Ngày mai chuyển sang Mirabad"],
  },
  "2026-11-02": {
    weather: tashkentEarlyNov,
    places: [
      {
        name: "Swissôtel Tashkent",
        query: "Swissotel Tashkent Shakhrisabz 4",
        eat: "Ăn sáng tại khách sạn từ ngày mai. Hôm nay ăn tối ở Afsona Shevchenko.",
        doing: "Checkout Hilton trước 12:00. Nhận phòng từ 14:00, hỏi E-mehmon, xem ban công và cửa sổ.",
        tip: "Shakhrisabz 4, Mirabad, không phải quảng trường Amir Temur. Phòng King khoảng 35 m². Bốn đêm liền, kể cả thứ Tư 4/11.",
      },
      {
        name: "Ga Oybek",
        query: "Oybek metro station Tashkent",
        eat: "Quầy quanh ga: samsa, non, trà nếu chỉ ăn nhẹ. Bữa tối ngồi thì sang Afsona Shevchenko 30.",
        doing: "Đi bộ một vòng để biết đường tối và cửa ga.",
        tip: "Gần Swissôtel, đi bộ được, khoảng 15–20 phút. Yandex nếu có vali. Đây không phải ga tàu liên tỉnh.",
      },
      {
        name: "Mirabad",
        query: "Mirabad district Tashkent restaurants",
        eat: "Afsona Shevchenko: plov lễ hoặc kazan kabob, shashlik gà, mastava. Đĩa tổng hợp khoảng 325.000 som cho cả bàn.",
        doing: "Ăn tối trong quận, đi bộ về nếu gần Oybek.",
        tip: "Caravan ở Yakkasaray thì phải gọi Yandex, đừng đi bộ tối. Menu Afsona có tiếng Anh.",
      },
    ],
    transport: {
      title: "Yandex sang Swissôtel",
      steps: [
        "Hilton tới Swissôtel khoảng 4 km, 15–25 phút. Có vali thì gọi Yandex.",
        "Trả phòng Hilton trước 12:00. Swissôtel nhận phòng từ 14:00, tới sớm thì gửi vali.",
      ],
      links: [{ label: "Bản đồ Swissôtel", url: mapLink("Swissotel Tashkent Shakhrisabz 4") }],
    },
    research: [
      {
        text: "Swissôtel nằm ở quận Mirabad, không phải quảng trường Amir Temur. Bốn đêm này ở nguyên khách sạn, kể cả thứ Tư 4/11.",
        source: "Địa chỉ Swissôtel, 2GIS / Accor",
        url: "https://2gis.uz/tashkent/firm/70000001100646010",
      },
    ],
    checklist: ["Checkout Hilton trước 12:00", "Check-in Swissôtel, hỏi lại E-mehmon", "Ăn tối trong Mirabad"],
  },
  "2026-11-03": {
    weather: tashkentEarlyNov,
    places: [
      {
        name: "Bảo tàng Mỹ thuật Ứng dụng",
        query: "State Museum of Applied Arts Tashkent",
        eat: "Không ăn trong bảo tàng. Trưa gần công viên Navoi, gọi manti hoặc lagman.",
        doing: "Xem nhà gỗ, gốm và thêu. Đi hết các phòng gỗ trước khi ra vườn.",
        tip: "Yandex từ Swissôtel. Đây là điểm đáng vào nhất trong ngày. Vé tại cửa. Đi buổi sáng.",
      },
      {
        name: "Cung điện Romanov",
        query: "Palace of Grand Duke Romanov Tashkent",
        eat: "Không ăn ở cung điện.",
        doing: "Vào nếu còn mở sau bảo tàng. Bỏ qua nếu đã đóng, đừng chờ.",
        tip: "Nhà của Nikolai Konstantinovich. Hỏi lễ tân Swissôtel giờ đóng cửa trước khi gọi xe.",
      },
      {
        name: "Công viên Navoi",
        query: "Alisher Navoi Park Tashkent",
        eat: "Manti hoặc lagman ở quán thường cạnh công viên. Tối về Mirabad, súp và non.",
        doing: "Đi bộ buổi chiều, rồi Yandex về Swissôtel.",
        tip: "Công viên lớn, không cần xem hết. Gió chiều lạnh. Mai vẫn ngủ Swissôtel.",
      },
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
      {
        name: "Swissôtel",
        query: "Swissotel Tashkent",
        eat: "Buffet sáng tại khách sạn, đã gồm. Tối chỉ samsa và trà gần Oybek.",
        doing: "Ở nguyên. Không checkout. Thứ Tư, không đổi khách sạn.",
        tip: "Một vòng taxi buổi trưa là đủ. Tối về phòng, không đi thêm quận khác.",
      },
      {
        name: "Đài tưởng niệm động đất",
        query: "Earthquake Memorial Tashkent",
        eat: "Chưa ăn ở đây. Giữ bụng cho plov lúc 12:30.",
        doing: "Xem tượng và phòng nhỏ về trận động đất 1966, rồi sang vườn Nhật.",
        tip: "Yandex từ Swissôtel. Gộp đài, vườn và Besh Qozon trong một vòng, bảo tài xế chờ hoặc gọi xe mới sau bữa trưa.",
      },
      {
        name: "Vườn Nhật",
        query: "Japanese Garden Tashkent",
        eat: "Không ăn trong vườn.",
        doing: "Đi một vòng lối đá sau đài tưởng niệm. Vé mua tại cửa.",
        tip: "Nằm cạnh đài. Trưa lạnh thì đừng ngồi lâu. Xong là đi thẳng tới nồi plov.",
      },
      {
        name: "Trung tâm plov",
        query: "Central Asian Plov Center Tashkent",
        eat: "Plov nồi lớn, salad, non, trà. Một đĩa khoảng $3. Không gọi thêm món chiên.",
        doing: "Ăn trưa ngồi tại chỗ. Ăn xong về Swissôtel nghỉ.",
        tip: "Besh Qozon. Tới lúc 12:30 vì nồi hết giữa chiều. Thứ Tư dễ có bàn hơn cuối tuần.",
      },
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
      {
        name: "Oybek",
        query: "Oybek metro Tashkent",
        eat: "Samsa và non ở quầy ga, mua thêm phần cho sáng mai nếu buffet mở muộn.",
        doing: "Đi bộ nhẹ quanh ga. Không đi tuyến metro xa.",
        tip: "Mang nước. Mai tàu 08:37, tối nay không ăn khuya.",
      },
      {
        name: "Mirabad",
        query: "Mirabad Avenue Tashkent",
        eat: "Trưa lagman gần Swissôtel. Tối súp, ăn sớm.",
        doing: "Đi bộ trong quận, về phòng gói đồ.",
        tip: "Vali gần xong hôm nay. Đừng để sáng mai mới xếp.",
      },
      {
        name: "Ga trung tâm",
        query: "Tashkent Central Railway Station",
        eat: "Không ăn ở ga hôm nay. Sáng mai ăn khách sạn hoặc samsa đã mua.",
        doing: "Chạy thử một cuốc Yandex từ Swissôtel tới ga, xem mất bao lâu, rồi về.",
        tip: "Ga ТОШКЕНТ-ЙЎЛОВЧИ, phía bắc, không phải ga Nam. Nhớ giờ app báo để sáng mai trừ 40 phút có mặt trước 08:37.",
      },
    ],
    research: [
      {
        text: "Afrosiyob đi từ Toshkent Markaziy, ga trung tâm phía bắc, không phải ga Nam. Vé in sai ga là lỗi dễ gặp khi gọi xe.",
        source: "Oxus Road, hướng dẫn ga",
        url: "https://oxusroad.com/en/travel-guide/",
      },
    ],
    checklist: ["Vali gần xong", "Yandex sáng mai tới Toshkent Markaziy"],
  },
  "2026-11-06": {
    weather: samarkandNov,
    places: [
      {
        name: "Toshkent Markaziy",
        query: "Tashkent Central Railway Station",
        eat: "Ăn sáng ở Swissôtel nếu buffet đã mở. Chưa mở thì samsa mua từ tối qua.",
        doing: "Rời khách sạn khoảng 07:15. Vào toa 16.",
        tip: "Sharq 710, 08:37, ghế 007 và 034, không ngồi cạnh. Có mặt trước giờ tàu khoảng 40 phút.",
      },
      {
        name: "Ga Samarkand",
        query: "Samarkand Railway Station",
        eat: "Chưa ăn ở ga. Ăn sau khi gửi đồ, gần khách sạn.",
        doing: "Ra cửa, mở Yandex, đối biển số rồi mới lên xe.",
        tip: "Đừng nhận taxi vẫy tay. Samarkand không có metro.",
      },
      {
        name: "Zarafshon Parkside",
        query: "Zarafshon Parkside Abdurakhmon Jomiy 65 Samarkand",
        eat: "Lagman gần khách sạn nếu đói ngay. Bữa nhìn Registan thì gọi xe ra Old Havuz hoặc Emirhan.",
        doing: "Gửi vali nếu phòng chưa sẵn, rồi Yandex ra Registan. Nhận phòng khi quay lại.",
        tip: "Jomiy 65, không sát Registan. Trip ghi Mövenpick cách đây khoảng 450 m. Đừng đi bộ ra quảng trường với vali.",
      },
      {
        name: "Registan",
        query: "Registan Square Samarkand",
        eat: "Xem xong thì Old Havuz, khoảng 300 m: shashlik sườn cừu, manti. Hoặc Emirhan nếu muốn sân thượng.",
        doing: "Đi bộ ba mặt quảng trường lúc trời còn sáng. Vào một trường nếu còn vé và còn sức.",
        tip: "Siab và Shah-i-Zinda để ngày mai. Gió quảng trường lạnh. Bàn hoàng hôn ở Emirhan hết sớm.",
      },
    ],
    transport: {
      title: "Sharq 710, đã mua",
      steps: [
        "Sharq 710, thứ Sáu 6/11, Toshkent-Yo'lovchi 08:37, Samarkand 11:46. Đường ray 343 km, khoảng 3 giờ 9 phút.",
        "Cùng toa ngồi 16, ghế 007 và 034. Không ngồi cạnh nhau. Gặp nhau ở cửa toa.",
        "Ga đi là ТОШКЕНТ-ЙЎЛОВЧИ, tức ga trung tâm. Từ Swissôtel khoảng 3 km, 10–20 phút bằng Yandex, không phải ga Nam.",
        "Rời khách sạn khoảng 07:15. Có mặt ga trước 08:37 khoảng 40 phút. Từ ga Samarkand tới Zarafshon khoảng 5 km, 15–20 phút.",
      ],
      links: [],
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
      {
        name: "Shah-i-Zinda",
        query: "Shah-i-Zinda Samarkand",
        eat: "Chưa ăn. Giữ bụng cho Siab lúc trưa.",
        doing: "Đi lối lăng từ dưới lên. Dừng ở các cổng gạch, không chen vào nơi có người cầu.",
        tip: "Đi buổi sáng. Kín vai, khăn. Cởi giày ở một số lối. Yandex từ Zarafshon, đừng đi bộ cả quãng này.",
      },
      {
        name: "Bibi-Khanym",
        query: "Bibi-Khanym Mosque Samarkand",
        eat: "Ăn ở Siab cạnh đó, không ăn trong sân nhà thờ.",
        doing: "Xem mặt trước và sân. Bỏ qua nếu nắng gắt và chân đã mỏi sau Shah-i-Zinda.",
        tip: "Nhà thờ lớn sát chợ. Kín vai, kín gối. Giày dễ cởi.",
      },
      {
        name: "Chợ Siab",
        query: "Siyob Bazaar Samarkand",
        eat: "Non nóng, samsa, trái cây. Có plov thì một đĩa chia đôi.",
        doing: "Ăn trưa ở quầy đông, mua trái cây, rồi đi tiếp.",
        tip: "Tiền mặt. Không theo người kéo vào quán hẻm. Ăn xong sang Bibi-Khanym hoặc Gur-e-Amir.",
      },
      {
        name: "Gur-e-Amir",
        query: "Gur-e-Amir Samarkand",
        eat: "Tối gần đây hoặc về phía Registan: Old Havuz hoặc Emirhan.",
        doing: "Vào lăng Timur, xem xong đi bộ về hướng Registan nếu còn sáng.",
        tip: "Nằm giữa chợ và Registan. Không cần thuê xe cả ngày. Mai tàu 08:10, ăn tối xong là về.",
      },
      {
        name: "Registan",
        query: "Registan Samarkand",
        eat: "Nếu chưa ăn tối, Old Havuz cách khoảng 300 m.",
        doing: "Chỉ quay lại nếu hôm qua nhìn ngoài. Không xem lại hết ba trường.",
        tip: "Về Zarafshon trước 21:00. Vé tàu và passport để sẵn cho sáng mai.",
      },
    ],
    research: [
      {
        text: "Bốn điểm này nằm trong trung tâm lịch sử. Từ Zarafshon gọi Yandex, không đi bộ cả quãng. Không cần thuê xe cả ngày. Gió quảng trường lạnh hơn nhiệt độ khí tượng.",
        source: "Bố cục trung tâm Samarkand",
        url: mapLink("Registan Shah-i-Zinda Siab Bazaar walking"),
      },
    ],
    checklist: ["Giày dễ cởi", "Áo khoác", "Nước", "Sáng mai tàu 08:10"],
  },
  "2026-11-08": {
    weather: tashkentEarlyNov,
    places: [
      {
        name: "Ga Samarkand",
        query: "Samarkand Railway Station",
        eat: "Ăn sáng ở Zarafshon nếu buffet đã mở. Chưa mở thì samsa ở ga, đừng ngồi quán lâu.",
        doing: "Rời khách sạn khoảng 07:20. Tìm đúng toa.",
        tip: "Sharq 711, 08:10. Toa 06 ghế 016 và toa 07 ghế 026. Gặp nhau lúc xuống ga Tashkent.",
      },
      {
        name: "Toshkent Markaziy",
        query: "Tashkent Central Railway Station",
        eat: "Chưa ăn ở ga. Bữa chính là lagman sau khi nhận phòng.",
        doing: "Xuống 12:19, gặp nhau ở cửa ga, gọi Yandex.",
        tip: "Ga trung tâm, không phải ga Nam. Nói tài xế Hyatt Regency, Navoi 1A.",
      },
      {
        name: "Hyatt Regency Tashkent",
        query: "Hyatt Regency Tashkent 1A Navoi Avenue",
        eat: "Lagman gần khách sạn cho bữa chính. Tối súp hoặc Navvat nếu còn sức. Không gồm ăn sáng.",
        doing: "Gửi vali khoảng 12:45, đi ăn trưa, nhận phòng từ 15:00. Hỏi lễ tân giữ vali ngày mai tới 17:00.",
        tip: "Một đêm, không hoàn. Trả phòng 12:00 ngày 9/11 mà bay 21:15, nên phải gửi vali buổi chiều.",
      },
    ],
    transport: {
      title: "Sharq 711, đã mua",
      steps: [
        "Chủ Nhật 8/11, Sharq 711, Samarkand 08:10, Toshkent-Yo'lovchi 12:19. Cùng 343 km, chuyến này khoảng 4 giờ 9 phút vì dừng nhiều hơn. Mỗi vé 200.060 som.",
        "Toa 06 ghế 016 và toa 07 ghế 026. Cùng tàu, khác toa. Gặp nhau lúc xuống ga.",
        "Ga đến là ga trung tâm, không phải ga Nam. Tới Hyatt khoảng 4 km, 15–25 phút.",
        "Zarafshon tới ga Samarkand khoảng 6 km, 15–20 phút. Rời khách sạn khoảng 07:20.",
      ],
      links: [],
    },
    research: [],
    checklist: ["Gửi vali Hyatt, nhận phòng 15:00", "Khai TDAC Thái Lan trước khi về"],
  },
  "2026-11-09": {
    weather: tashkentEarlyNov,
    places: [
      {
        name: "Hyatt Regency Tashkent",
        query: "Hyatt Regency Tashkent 1A Navoi Avenue",
        eat: "Không gồm ăn sáng, buffet $22 mỗi người. Trưa lagman hoặc Navvat, xong trước 15:00. Không ngồi nhà hàng tối.",
        doing: "Trả phòng trước 12:00, gửi vali ở lễ tân. Lấy vali lúc 16:45.",
        tip: "Rời khách sạn 17:15. Kiểm tra passport, vé HY531 và TDAC trước khi gọi xe.",
      },
      {
        name: "TAS Terminal 2",
        query: "Tashkent International Airport Terminal 2",
        eat: "Ăn nhẹ trong sân bay nếu đói. Bữa chính phải xong trước 15:30.",
        doing: "Yandex ra Terminal 2, làm thủ tục, nộp TDAC nếu chưa nộp.",
        tip: "HY531 cất cánh 21:15, trên máy bay khoảng 6 giờ 10 phút, Bangkok 05:25 ngày 10/11. Hyatt tới Terminal 2 khoảng 11 km. Đường trống khoảng 25 phút, chiều thứ Hai để 40–60 phút. Không đi metro.",
      },
    ],
    transport: {
      title: "Ra sân bay và về Bangkok",
      steps: [
        "HY531, Uzbekistan Airways. TAS 21:15 ngày 9/11, Bangkok 05:25 ngày 10/11. Giờ địa phương từng sân bay.",
        "Rời Hyatt khoảng 17:15. Yandex ra Terminal 2 khoảng 11 km. Đường trống khoảng 25 phút, chiều thứ Hai để 40–60 phút. Có mặt sân bay khoảng 18:15.",
        "HY531 trên máy bay khoảng 6 giờ 10 phút. Hạ cánh Bangkok 05:25 ngày 10/11.",
        "Nộp TDAC trên tdac.immigration.go.th trước khi bay. Tới Thái Lan lúc 05:25.",
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
  { item: "Đầu chuyển ổ điện chân tròn", why: "Uzbekistan 220V như Thái. Ổ là 2 chân tròn, loại có nối đất vẫn không có chấu thứ ba. Sạc 2 chân dẹt hoặc 3 chấu của Thái cần đầu chuyển nhận đúng phích đó. Sạc đã là 2 chân tròn thì cắm thẳng." },
  { item: "USD tờ 100, khoảng $600 cho hai người", why: "Mua ở SuperRich Bangkok. Tờ sạch, không rách, không viết. Som đổi ở Tashkent." },
  { item: "Thuốc cá nhân và đơn nếu cần", why: "Khai hải quan nếu thuốc thuộc nhóm kiểm soát." },
  { item: "Áo che vai và quần dài", why: "Phố thì mặc bình thường. Đền và nhà thờ cần kín vai, kín gối." },
  { item: "Đồ lót và áo thun dư vài ngày", why: "Giặt ngoài khách sạn. Đêm 8/11 không kịp, vì 17:15 ngày 9/11 đã ra sân bay." },
];

export const masterChecklist = [
  { label: "TDAC trước khi về Thái Lan", priority: "High" },
  { label: "E-mehmon: lễ tân đăng ký tạm trú mỗi khách sạn, giữ tờ xác nhận", priority: "High" },
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
      "Đổi trong thành phố trước khi ra sân bay. Quầy trong sân bay Bangkok thường kém hơn. Mang hộ chiếu. Tờ phải phẳng, không rách, không viết, không ghim. Với hai người, khách sạn và tàu trả bằng thẻ, khoảng $600 tiền mặt là đủ. Ở nhà ga Tashkent, quầy NBU mở cả ngày, chỉ đổi $100–200. Phần còn lại đổi tại Kapitalbank, số 7 phố Sayilgoh, sát quảng trường Amir Temur, đi bộ từ Hampton, thứ Hai–thứ Sáu 09:00–17:00. Hạ cánh 11:45 nên kịp chiều 27/10. Trễ quá 17:00 thì sáng 28/10. Xin tờ 5.000 đến 50.000. Chủ nhật ngân hàng đóng. Nếu đến Samarkand mà thiếu som thì NBU chi nhánh Registon, phố Firdavsi số 7, ngày thường đến 17:00.",
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
    title: "Đi trong thành phố",
    icon: "train",
    paragraphs: [
      "Tashkent có metro, chạy khoảng 5:00 đến nửa đêm. Một lượt đi đâu cũng một giá. Từ 1/10/2026, chạm thẻ ngân hàng, điện thoại hoặc thẻ ATTO là 2.500 som. Vé giấy mua ở ki-ốt là 3.000 som. Không còn xu nhựa. Đổi tuyến trong cùng một lần qua cửa thì không tính thêm. Mỗi người một lần chạm. Ga đẹp để xem: Kosmonavtlar, Alisher Navoi.",
      "Hampton sát ga Amir Temur Xiyoboni. Hilton gần ga Xalqlar Do'stligi. Swissôtel gần ga Oybek. Quảng trường thì đi bộ. Mỏi, tối, hoặc có vali thì gọi Yandex Go. App hiện giá trước khi nhận xe. Xe thường là Chevrolet trắng, đối biển số với app. Không vẫy taxi ngoài đường. Samarkand không có metro, trong phố cũng dùng Yandex.",
      "Sân bay hiện tại không có ga metro. Ga từng được đặt tên dự án Aeroport trên tuyến vòng là Tolariq, nằm vòng ngoài thành phố, không phải nhà ga bay. Ngày 27/10, HY532 vào Terminal 2 lúc 11:45. Hai người có vali: mua SIM trong nhà ga, ra làn 1 gọi Yandex về Hampton. Bảng giá tối đa tháng 9/2026 tính tới quảng trường Amir Temur khoảng 20.000 som cho 7,6 km, trước phụ phí giờ đông. App hiện số cuối. Chưa có mạng thì quầy taxi trong sảnh, giá trong thành phố từ 50.000 som, chốt tại quầy. Đừng nhận người chào trong sảnh.",
      "Ngày 9/11 rời khách sạn khoảng 17:15, Yandex về Terminal 2. Không đi metro ra sân bay.",
    ],
    links: [
      { label: "Từ sân bay vào phố", url: "https://oxusroad.com/en/travel-guide/tashkent-airport-arrival/" },
      { label: "Giá vé ATTO", url: "https://atto.uz/en/news/atto-for-passengers" },
    ],
  },
  {
    title: "Ăn mặc và giặt",
    icon: "shirt",
    paragraphs: [
      "Phố Tashkent và Samarkand mặc như đi chơi mùa thu: áo thun hoặc sơ mi, quần dài, giày đã đi quen. Không cần vest. Tối khoảng 4–7°C nên có áo khoác hoặc fleece. Ngày núi mặc thêm một lớp, kính râm, giày kín. Trưa vẫn có nắng.",
      "Vào Hazrati Imam, nhà thờ và Shah-i-Zinda thì kín vai, kín gối. Khăn cổ dùng trùm đầu. Cởi giày ở nhà thờ, nhà người ta và một số quán trà. Ngoài đường phụ nữ không cần trùm khăn.",
      "Không giặt ở lễ tân, giá khách sạn mắc. Ngày 31/10 đang ở Hilton thì đi bộ khoảng 400 m tới LOTOS, tầng hầm Tashkent City Mall, mở tới 23:00. Muốn tự giặt và lấy trong khoảng 2 giờ thì Yandex tới Londry, Iftixor 1A, khoảng 4 km từ Hilton. Ở Swissôtel thì Contrast, phố Mirabad số 6, khoảng 1,5 km, mở 09:00–19:00. Ở Samarkand, Taskin trên phố Namozgoh cách Zarafshon khoảng 2 km. Khách năm 2026 trả khoảng 40.000 som mỗi kg và lấy hôm sau, nên gửi ngày 6/11 và lấy trước tàu sáng 8/11. Đêm 8/11 không giặt: 17:15 ngày 9/11 đã ra sân bay. Quần áo lót giặt trong phòng khó khô, mang dư vài bộ.",
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
  { label: "Reddit: SIM, Yandex, tiền", url: "https://www.reddit.com/r/Uzbekistan/comments/1nmsn31/firsttime_tourist_tips/" },
  { label: "Đô la và ATM ở Uzbekistan", url: "https://oxusroad.com/en/travel-guide/money/" },
  { label: "Từ sân bay Tashkent vào phố", url: "https://oxusroad.com/en/travel-guide/tashkent-airport-arrival/" },
  { label: "Tỷ giá SuperRich Thailand", url: "https://www.superrichthailand.com/exchange-rate" },
  { label: "Sân bay và ga", url: "https://oxusroad.com/en/travel-guide/" },
];
