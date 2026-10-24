const DB_NAME = "uz-trip-2026";
const STORE = "files";

/** @typedef {"flight" | "train" | "hotel" | "other"} DocKind */

/**
 * @typedef {Object} TripFile
 * @property {string} id
 * @property {string} name
 * @property {DocKind} kind
 * @property {string} type
 * @property {number} added
 * @property {Blob} blob
 */

/** @param {DocKind} kind */
export function docKindLabel(kind) {
  switch (kind) {
    case "flight":
      return "Vé máy bay";
    case "train":
      return "Vé tàu";
    case "hotel":
      return "Booking khách sạn";
    case "other":
      return "Khác";
    default: {
      const unreachable = /** @type {never} */ (kind);
      return String(unreachable);
    }
  }
}

/** @returns {DocKind[]} */
export function docKinds() {
  return ["flight", "train", "hotel", "other"];
}

/** @param {string | null | undefined} value */
export function parseDocKind(value) {
  switch (value) {
    case "flight":
    case "train":
    case "hotel":
    case "other":
      return value;
    default:
      return "other";
  }
}

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const base = request.result;
      if (!base.objectStoreNames.contains(STORE)) base.createObjectStore(STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** @returns {Promise<TripFile[]>} */
export async function listFiles() {
  const base = await openDb();
  return new Promise((resolve, reject) => {
    const request = base.transaction(STORE, "readonly").objectStore(STORE).getAll();
    request.onsuccess = () => {
      const rows = /** @type {TripFile[]} */ (request.result || []);
      resolve(rows.sort((a, b) => b.added - a.added));
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * @param {File} file
 * @param {DocKind} kind
 */
export async function putFile(file, kind) {
  const base = await openDb();
  /** @type {TripFile} */
  const row = {
    id: crypto.randomUUID(),
    name: file.name || "tài liệu",
    kind,
    type: file.type || "application/octet-stream",
    added: Date.now(),
    blob: file,
  };
  return new Promise((resolve, reject) => {
    const tx = base.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(row);
    tx.oncomplete = () => resolve(row);
    tx.onerror = () => reject(tx.error);
  });
}

/** @param {string} id */
export async function removeFile(id) {
  const base = await openDb();
  return new Promise((resolve, reject) => {
    const tx = base.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
