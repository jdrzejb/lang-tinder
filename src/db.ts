import { CardData, SavedData } from "./App";

const DB_NAME = "FlashcardsDB";
const STORE_NAME = "flashcards";
const STORAGE_KEY = "flashcardProgress";

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function saveToIndexedDB(data: SavedData) {
  const db = await openDB();

  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const record = { id: STORAGE_KEY, ...data };

    const request = store.put(record);
    request.onerror = () => reject(request.error);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(new Error("Transaction aborted"));
  });
}

export async function loadFromIndexedDB(): Promise<SavedData | null> {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  const record = await new Promise<any>((resolve, reject) => {
    const request = store.get(STORAGE_KEY);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
  });

  if (record) {
    return {
      stillToLearn: record.stillToLearn as CardData[],
      learned: record.learned as CardData[],
    };
  } else {
    return null;
  }
}
