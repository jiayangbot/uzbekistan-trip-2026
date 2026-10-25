import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { pick } from "./i18n.js";
import { stops } from "./overview.js";

/** @type {L.Map | null} */
let map = null;
/** @type {L.Polyline | null} */
let route = null;
/** @type {Record<string, L.Marker>} */
let markers = {};

function tileUrl() {
  return "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function lineColor() {
  return getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#c2410c";
}

/** @param {"uz" | "all"} mode */
function pointsFor(mode) {
  const places = mode === "all" ? stops : stops.filter((stop) => stop.id !== "bkk");
  const points = places.map((stop) => /** @type {[number, number]} */ ([stop.lat, stop.lng]));
  if (mode === "all") points.push([stops[0].lat, stops[0].lng]);
  return points;
}

function pinIcon(index, id) {
  return L.divIcon({
    className: "map-pin-wrap",
    html: `<span class="map-pin" data-pin="${id}">${index + 1}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

export function destroyTripMap() {
  map?.remove();
  map = null;
  route = null;
  markers = {};
}

/** @param {"uz" | "all"} mode */
export function fitTrip(mode) {
  if (!map || !route) return;
  const points = pointsFor(mode);
  route.setLatLngs(points);
  map.fitBounds(L.latLngBounds(points), { padding: [36, 36] });
  document.querySelectorAll("[data-map-fit]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.getAttribute("data-map-fit") === mode));
  });
}

/** @param {string} id */
export function focusStop(id) {
  const stop = stops.find((item) => item.id === id);
  if (!map || !stop) return;
  map.flyTo([stop.lat, stop.lng], stop.zoom, { duration: 0.6 });
  markers[id]?.openPopup();
  document.querySelectorAll(".map-pin").forEach((pin) => pin.classList.toggle("is-on", pin.getAttribute("data-pin") === id));
  document.querySelectorAll(".place-card").forEach((card) => card.classList.toggle("is-on", card.getAttribute("data-stop") === id));
}

export function mountTripMap() {
  const el = document.getElementById("trip-map");
  if (!el) return;
  destroyTripMap();
  map = L.map(el, { scrollWheelZoom: false, attributionControl: false });
  L.tileLayer(tileUrl(), { maxZoom: 18 }).addTo(map);
  L.control
    .attribution({ prefix: false })
    .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>')
    .addTo(map);
  route = L.polyline(pointsFor("uz"), { color: lineColor(), weight: 3, opacity: 0.9 }).addTo(map);
  stops.forEach((stop, index) => {
    const marker = L.marker([stop.lat, stop.lng], { icon: pinIcon(index, stop.id) }).addTo(map);
    marker.bindPopup(`<strong>${escapeHtml(pick(stop.title))}</strong><p>${escapeHtml(pick(stop.when))}</p><p>${escapeHtml(pick(stop.text))}</p>`);
    marker.on("click", () => focusStop(stop.id));
    markers[stop.id] = marker;
  });
  fitTrip("uz");
  requestAnimationFrame(() => map?.invalidateSize());
}
