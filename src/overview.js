/** @typedef {{ vi: string, en: string }} Copy */
/**
 * @typedef {Object} Stop
 * @property {string} id
 * @property {number} lat
 * @property {number} lng
 * @property {number} zoom
 * @property {string} dayId
 * @property {string} [image]
 * @property {string} [file]
 * @property {Copy} when
 * @property {Copy} title
 * @property {Copy} text
 */

/** Chặng theo đúng thứ tự đi. Toạ độ lấy từ OpenStreetMap. */
/** @type {Stop[]} */
export const stops = [
  {
    id: "bkk",
    lat: 13.7563,
    lng: 100.5018,
    zoom: 11,
    dayId: "d-2026-10-26",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chao_Phraya_River_Skyline_-_panoramio.jpg/960px-Chao_Phraya_River_Skyline_-_panoramio.jpg",
    file: "https://commons.wikimedia.org/wiki/File:Chao_Phraya_River_Skyline_-_panoramio.jpg",
    when: { vi: "26/10 và 10/11", en: "26 Oct and 10 Nov" },
    title: { vi: "Bangkok", en: "Bangkok" },
    text: { vi: "Chuẩn bị ở đây. Bay đi sáng 27/10, về sáng 10/11.", en: "Prep here. The flight out is the morning of 27 Oct. You land back on the morning of 10 Nov." },
  },
  {
    id: "hampton",
    lat: 41.30766,
    lng: 69.28413,
    zoom: 14,
    dayId: "d-2026-10-27",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Chorsu_Bazaar_in_Tashkent.jpg/960px-Chorsu_Bazaar_in_Tashkent.jpg",
    file: "https://commons.wikimedia.org/wiki/File:Chorsu_Bazaar_in_Tashkent.jpg",
    when: { vi: "27–30/10", en: "27–30 Oct" },
    title: { vi: "Tashkent · Amir Temur", en: "Tashkent · Amir Temur" },
    text: { vi: "Ngủ Hampton. Chợ Chorsu, Hazrati Imam và quảng trường.", en: "Sleep at the Hampton. Chorsu bazaar, Hazrati Imam, and the square." },
  },
  {
    id: "hilton",
    lat: 41.31402,
    lng: 69.2491,
    zoom: 14,
    dayId: "d-2026-10-30",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BF%D0%B0%D1%80%D0%BA_%282%29.jpg/960px-%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BF%D0%B0%D1%80%D0%BA_%282%29.jpg",
    file: "https://commons.wikimedia.org/wiki/File:%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82,_%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D1%81%D0%BA%D0%BE%D0%B9_%D0%BF%D0%B0%D1%80%D0%BA_(2).jpg",
    when: { vi: "30/10–2/11", en: "30 Oct–2 Nov" },
    title: { vi: "Tashkent City", en: "Tashkent City" },
    text: { vi: "Ngủ Hilton. Công viên, đài phun nước và mall.", en: "Sleep at the Hilton. The park, fountains, and the mall." },
  },
  {
    id: "amirsoy",
    lat: 41.48749,
    lng: 69.94215,
    zoom: 12,
    dayId: "d-2026-10-31",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Greater_Chimgan_Mountain.JPG/960px-Greater_Chimgan_Mountain.JPG",
    file: "https://commons.wikimedia.org/wiki/File:Greater_Chimgan_Mountain.JPG",
    when: { vi: "31/10", en: "31 Oct" },
    title: { vi: "Amirsoy", en: "Amirsoy" },
    text: { vi: "Đi ngày, tối về Hilton. Chimgan và Charvak.", en: "A day trip, back to the Hilton at night. Chimgan and Charvak." },
  },
  {
    id: "swiss",
    lat: 41.30403,
    lng: 69.28405,
    zoom: 14,
    dayId: "d-2026-11-02",
    when: { vi: "2–6/11", en: "2–6 Nov" },
    title: { vi: "Tashkent · Mirabad", en: "Tashkent · Mirabad" },
    text: { vi: "Ngủ Swissôtel. Bảo tàng, plov, rồi tàu đi Samarkand.", en: "Sleep at the Swissôtel. Museums, plov, then the train to Samarkand." },
  },
  {
    id: "samarkand",
    lat: 39.65478,
    lng: 66.97576,
    zoom: 15,
    dayId: "d-2026-11-06",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Registan_01.jpg/960px-Registan_01.jpg",
    file: "https://commons.wikimedia.org/wiki/File:Registan_01.jpg",
    when: { vi: "6–8/11", en: "6–8 Nov" },
    title: { vi: "Samarkand", en: "Samarkand" },
    text: { vi: "Tàu Sharq. Registan, Shah-i-Zinda, chợ Siab. Ngủ Zarafshon.", en: "The Sharq train. Registan, Shah-i-Zinda, Siab bazaar. Sleep at Zarafshon." },
  },
  {
    id: "hyatt",
    lat: 41.31653,
    lng: 69.27766,
    zoom: 14,
    dayId: "d-2026-11-08",
    when: { vi: "8–9/11", en: "8–9 Nov" },
    title: { vi: "Tashkent · Navoi", en: "Tashkent · Navoi" },
    text: { vi: "Ngủ Hyatt một đêm. Sáng 9/11 trả phòng, tối bay về.", en: "One night at the Hyatt. Check out on the morning of 9 Nov, fly home that evening." },
  },
];
