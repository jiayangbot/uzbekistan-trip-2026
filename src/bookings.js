/** @typedef {{ score: string; count: string; url: string; good: string; watch: string }} HotelReview */

/**
 * @typedef {Object} HotelBooking
 * @property {string} checkIn
 * @property {string} checkOut
 * @property {number} nights
 * @property {string} name
 * @property {string} short
 * @property {string} city
 * @property {string} area
 * @property {string} room
 * @property {string} address
 * @property {string} phone
 * @property {string} checkInTime
 * @property {string} checkOutTime
 * @property {boolean} breakfast
 * @property {string} breakfastNote
 * @property {number} paidUsd
 * @property {number} atHotelUsd
 * @property {string} cancel
 * @property {string | null} freeCancelUntil
 * @property {string} mapQuery
 * @property {string} note
 * @property {HotelReview | null} review
 */

/**
 * @typedef {Object} Leg
 * @property {"flight" | "train"} kind
 * @property {string} date
 * @property {string} code
 * @property {string} from
 * @property {string} depart
 * @property {string} to
 * @property {string} arrive
 * @property {string} seats
 * @property {string} note
 */

/** @type {HotelBooking[]} */
export const bookings = [
  {
    checkIn: "2026-10-27",
    checkOut: "2026-10-30",
    nights: 3,
    name: "Hampton by Hilton Tashkent",
    short: "Hampton",
    city: "Tashkent",
    area: "Amir Temur / Istiqbol",
    room: "Twin, 2 giường đơn. Đã xin tầng cao, khách sạn hứa xếp khi nhận phòng.",
    address: "Istiqbol 17, Tashkent",
    phone: "+998712052200",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    breakfast: true,
    breakfastNote: "Buffet 28, 29, 30/10. Thứ Hai–Sáu 06:30–10:30, Bảy–CN 07:00–11:00.",
    paidUsd: 513.73,
    atHotelUsd: 33.39,
    cancel: "Không hoàn, không sửa.",
    freeCancelUntil: null,
    mapQuery: "Hampton by Hilton Tashkent, Istiqbol 17",
    note: "Có ưu đãi Trip giảm 10% đồ ăn uống trong khách sạn.",
    review: {
      score: "9.3/10",
      count: "khoảng 1.100 review, Trip.com",
      url: "https://us.trip.com/hotels/tashkent-hotel-detail-78123404/hampton-by-hilton-tashkent/review.html",
      good: "Phòng mới, sạch, sát Amir Temur. Bữa sáng ngon nhưng ít món, có đồ Uzbek.",
      watch: "Tầng trên cùng có khách bị rung máy lạnh trên mái. Wifi có lúc chậm. Đo wifi lúc nhận phòng.",
    },
  },
  {
    checkIn: "2026-10-30",
    checkOut: "2026-11-02",
    nights: 3,
    name: "Hilton Tashkent City",
    short: "Hilton",
    city: "Tashkent",
    area: "Tashkent City / Ukchi",
    room: "Twin, 2 giường đôi nhỏ. Đã xin tầng cao.",
    address: "Ukchi 1, Tashkent",
    phone: "+998712108888",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    breakfast: false,
    breakfastNote: "Không gồm ăn sáng. Buffet khách sạn $30 mỗi người. Rẻ hơn thì samsa, non ở quầy hoặc trong Tashkent City Mall.",
    paidUsd: 896.96,
    atHotelUsd: 33.39,
    cancel: "Hủy miễn phí trước 23:59 ngày 28/10, sau đó phí $298.99.",
    freeCancelUntil: "2026-10-28",
    mapQuery: "Hilton Tashkent City, 1 Ukchi Street",
    note: "Cùng phố Ukchi với City Park, mall và đài phun nước. Đi bộ được hết.",
    review: null,
  },
  {
    checkIn: "2026-11-02",
    checkOut: "2026-11-06",
    nights: 4,
    name: "Swissôtel Tashkent",
    short: "Swissôtel",
    city: "Tashkent",
    area: "Mirabad / Oybek",
    room: "Swiss Advantage King. Đã xin tầng cao.",
    address: "Shakhrisabz 4, Mirabad, Tashkent",
    phone: "+998555152332",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    breakfast: true,
    breakfastNote: "Buffet 3, 4, 5, 6/11. Thứ Hai–Sáu 06:30–10:30, Bảy–CN 06:30–11:00. Sáng 6/11 tàu 08:37, ăn lúc 06:30.",
    paidUsd: 762.52,
    atHotelUsd: 44.52,
    cancel: "Hủy miễn phí trước 23:59 ngày 1/11, sau đó phí $188.38.",
    freeCancelUntil: "2026-11-01",
    mapQuery: "Swissotel Tashkent, Shakhrisabz 4",
    note: "Quận Mirabad, gần metro Oybek. Không phải quảng trường Amir Temur.",
    review: {
      score: "9.3/10",
      count: "166 review, Trip.com",
      url: "https://us.trip.com/hotels/tashkent-hotel-detail-128118398/swisstel-tashkent/review.html",
      good: "Sạch 9.6. Phòng yên, bữa sáng nhiều món. Phòng King rộng.",
      watch: "Có phòng King thoát nước vòi sen kém. Có khách phải nhắc mới được dọn phòng.",
    },
  },
  {
    checkIn: "2026-11-06",
    checkOut: "2026-11-08",
    nights: 2,
    name: "Zarafshon Parkside",
    short: "Zarafshon",
    city: "Samarkand",
    area: "Trung tâm Samarkand",
    room: "Twin, 2 giường đơn.",
    address: "Abdurakhmon Jomiy 65, Samarkand",
    phone: "+998995030004",
    checkInTime: "14:00",
    checkOutTime: "11:30",
    breakfast: true,
    breakfastNote: "Buffet 7 và 8/11, 07:00–10:00. Sáng 8/11 tàu 08:10, buffet mở 07:00, ăn nhanh rồi đi lúc 07:20.",
    paidUsd: 288.89,
    atHotelUsd: 22.4,
    cancel: "Không hoàn, không sửa.",
    freeCancelUntil: null,
    mapQuery: "Zarafshon Parkside, Abdurakhmon Jomiy 65, Samarkand",
    note: "Không sát Registan, gọi Yandex. Đến sau 00:00 thì báo khách sạn trước một ngày.",
    review: {
      score: "9.6/10",
      count: "203 review, Trip.com",
      url: "https://us.trip.com/hotels/detail/?cityId=5881&hotelId=102650975&checkIn=2026-11-06&checkOut=2026-11-08&adult=2&children=0&crn=1&curr=USD&locale=en-US",
      good: "Khách khen sạch và bữa sáng. Có hồ bơi ngoài trời.",
      watch: "Quanh khách sạn là phố thường, không phải khu Registan.",
    },
  },
  {
    checkIn: "2026-11-08",
    checkOut: "2026-11-09",
    nights: 1,
    name: "Hyatt Regency Tashkent",
    short: "Hyatt",
    city: "Tashkent",
    area: "Navoi 1A",
    room: "Standard Twin, 2 giường đơn.",
    address: "Navoi 1A, Tashkent",
    phone: "+998712071234",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    breakfast: false,
    breakfastNote: "Không gồm ăn sáng. Buffet $22 mỗi người, 06:30–10:30, CN đến 11:00.",
    paidUsd: 241.41,
    atHotelUsd: 0,
    cancel: "Không hoàn, không sửa.",
    freeCancelUntil: null,
    mapQuery: "Hyatt Regency Tashkent, 1A Navoi Avenue",
    note: "Nhận phòng từ 15:00, tàu tới 12:19 nên gửi vali trước. Trả phòng 12:00 ngày 9/11, gửi vali ở lễ tân tới 17:00.",
    review: null,
  },
];

/** @type {Leg[]} */
export const legs = [
  {
    kind: "flight",
    date: "2026-10-27",
    code: "HY532",
    from: "Bangkok BKK",
    depart: "06:55",
    to: "Tashkent TAS T2",
    arrive: "11:45",
    seats: "Thương gia",
    note: "Ký gửi 1 kiện 32 kg, xách tay 10 kg, túi nhỏ 5 kg. Có mặt BKK trước 3 tiếng.",
  },
  {
    kind: "train",
    date: "2026-11-06",
    code: "Sharq 710",
    from: "Toshkent-Yo'lovchi",
    depart: "08:37",
    to: "Samarkand",
    arrive: "11:46",
    seats: "Toa 16, ghế 007 và 034",
    note: "Ga trung tâm, không phải ga Nam. Có mặt trước 40 phút.",
  },
  {
    kind: "train",
    date: "2026-11-08",
    code: "Sharq 711",
    from: "Samarkand",
    depart: "08:10",
    to: "Toshkent-Yo'lovchi",
    arrive: "12:19",
    seats: "Toa 06 ghế 016, toa 07 ghế 026",
    note: "Hai người khác toa. Gặp nhau lúc xuống ga.",
  },
  {
    kind: "flight",
    date: "2026-11-09",
    code: "HY531",
    from: "Tashkent TAS T2",
    depart: "21:15",
    to: "Bangkok BKK",
    arrive: "05:25 ngày 10/11",
    seats: "Thương gia",
    note: "Rời Hyatt 17:15, có mặt sân bay khoảng 18:15. Khai TDAC trước khi bay.",
  },
];

export const tripCosts = {
  capUsd: 2860,
  paidUsd: bookings.reduce((sum, b) => sum + b.paidUsd, 0),
  atHotelUsd: bookings.reduce((sum, b) => sum + b.atHotelUsd, 0),
};

/** @param {string} iso */
export function bookingFor(iso) {
  return bookings.find((b) => iso >= b.checkIn && iso < b.checkOut) || null;
}

/** @param {string} iso */
export function checkoutOn(iso) {
  return bookings.find((b) => b.checkOut === iso) || null;
}

/** @param {string} iso */
export function legsOn(iso) {
  return legs.filter((leg) => leg.date === iso);
}
