/** @typedef {{ mode: { vi: string, en: string }, text: { vi: string, en: string } }} Addon */

/** Việc thêm, không thay giờ bay, giờ tàu hay ngày đổi khách sạn. */
/** @type {Record<string, Addon[]>} */
export const dayAddons = {
  "2026-10-28": [
    {
      mode: { vi: "Metro", en: "Metro" },
      text: {
        vi: "Đi bộ tới ga Amir Temur Xiyoboni, tuyến Chilonzor. Đi tới Paxtakor, đổi sang tuyến Oʻzbekiston ở Alisher Navoiy, rồi 2 ga tới Chorsu. Trên tàu khoảng 10 phút, từ ga ra chợ khoảng 2 phút. Chạm thẻ 2.500 som mỗi người. Mệt thì gọi Yandex.",
        en: "Walk to Amir Temur Xiyoboni station on the Chilonzor line. Ride to Paxtakor, change to the Oʻzbekiston line at Alisher Navoiy, then 2 stops to Chorsu. About 10 minutes on the train, and about 2 minutes from the station to the bazaar. Tap a card for 2,500 som each. If you are tired, call Yandex.",
      },
    },
    {
      mode: { vi: "Chợ", en: "Market" },
      text: {
        vi: "Đứng xem lò non trong chợ và lấy một cái bánh vừa ra lò. Mặc cả trái cây, không mặc cả đĩa đã có giá. Trà uống ít một. Đưa tiền bằng tay phải.",
        en: "Watch the tandir oven and take one bread that just came out. Bargain for fruit, not for a plate that already has a price. Drink the tea slowly. Hand money over with your right hand.",
      },
    },
  ],
  "2026-10-29": [
    {
      mode: { vi: "Metro", en: "Metro" },
      text: {
        vi: "Từ Hampton đi tuyến Chilonzor tới Paxtakor, đổi sang Oʻzbekiston hướng Doʻstlik. Kosmonavtlar là ga ngay sau Oʻzbekiston. Xem trần. Chụp sảnh được, chụp người thì hỏi.",
        en: "From the Hampton, take the Chilonzor line to Paxtakor and change to the Oʻzbekiston line toward Doʻstlik. Kosmonavtlar is the stop right after Oʻzbekiston. Look at the ceiling. Photos of the hall are fine. Ask before you photograph people.",
      },
    },
    {
      mode: { vi: "Xe buýt", en: "Bus" },
      text: {
        vi: "Ra cửa ga, lên một xe buýt thành phố có máy chạm thẻ. Cùng giá metro, 2.500 som. Đi 2 hoặc 3 điểm rồi xuống. Lạc thì Yandex về Hampton.",
        en: "Leave the station and board a city bus with a card reader. Same fare as the metro, 2,500 som. Ride 2 or 3 stops, then get off. If you get lost, take Yandex back to the Hampton.",
      },
    },
  ],
  "2026-11-03": [
    {
      mode: { vi: "Quán trà", en: "Teahouse" },
      text: {
        vi: "Tối vào quán trà Mirabad. Cởi giày nếu thấy người khác cởi. Trà rót chén nhỏ, uống từ từ. Bánh để giữa bàn, không úp, không bỏ thừa trước mặt người khác. Cảm ơn nói rahmat.",
        en: "In the evening, go to a teahouse in Mirabad. Take your shoes off if other people have. Tea comes in a small bowl. Drink it slowly. Leave the bread in the middle of the table, right side up, and do not throw leftovers in front of someone. Thank them with rahmat.",
      },
    },
  ],
  "2026-11-04": [
    {
      mode: { vi: "Plov", en: "Plov" },
      text: {
        vi: "Besh Qozon hết nồi giữa chiều, nên ăn đúng trưa. Một đĩa plov, salad, bánh và trà. Ăn bằng thìa. Nồi hết thì sang quán khác, không xin thêm.",
        en: "Besh Qozon runs out by mid-afternoon, so eat at lunch. One plate of plov, salad, bread, and tea. Use a spoon. If the pot is empty, go to another place. Do not ask them to make more.",
      },
    },
  ],
  "2026-11-05": [
    {
      mode: { vi: "Xe buýt nhỏ", en: "Minibus" },
      text: {
        vi: "Sáng rảnh, lên một xe buýt nhỏ trên đường Mirabad. Hỏi giá trước khi ngồi, trả tiền mặt tờ nhỏ. Đi vài điểm, nói dừng, rồi đi bộ hoặc Yandex về Swissôtel. Mai tàu 08:37, đừng đi xa.",
        en: "The morning is free. Board a fixed-route minibus on Mirabad. Ask the fare before you sit, and pay cash in small bills. Ride a few stops, say when you want to get off, then walk or take Yandex back to the Swissôtel. The train is 08:37 tomorrow, so do not go far.",
      },
    },
  ],
  "2026-11-07": [
    {
      mode: { vi: "Đi bộ", en: "Walk" },
      text: {
        vi: "Shah-i-Zinda, chợ Siab và Bibi-Khanym gần nhau, đi bộ giữa ba chỗ. Gur-e-Amir nếu còn sức thì đi bộ tiếp, mỏi thì Yandex. Sáng và tối vẫn gọi Yandex vì Zarafshon không sát cụm này. Trong lăng nói nhỏ, không cắt ngang người đang cầu.",
        en: "Shah-i-Zinda, Siab Bazaar, and Bibi-Khanym are close. Walk between the three. Continue on foot to Gur-e-Amir if you still have energy, or take Yandex if your feet hurt. Morning and evening still need Yandex, because Zarafshon is not next to this cluster. Speak quietly inside the shrines, and do not step across someone who is praying.",
      },
    },
  ],
};
