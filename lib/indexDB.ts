// lib/indexedDB.ts

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatHistory {
  id: string;
  messages: ChatMessage[];
}

const DB_NAME = "ChatHistoryDB";
const STORE_NAME = "chatHistory";

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    };
  });
}

/**
 * Create: Menambahkan ChatHistory baru.
 * Menggunakan metode `add` yang akan gagal jika id sudah ada.
 */
export async function createChatHistory(
  chatHistory: ChatHistory
): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.add(chatHistory);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Read All: Mendapatkan semua ChatHistory.
 */
export async function getChatHistory(): Promise<ChatHistory[]> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Read by Id: Mendapatkan ChatHistory berdasarkan id.
 */
export async function getChatHistoryById(
  id: string
): Promise<ChatHistory | undefined> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

/**
 * Update: Memperbarui ChatHistory.
 * Operasi ini menggunakan metode `put` yang akan menambah data baru jika belum ada,
 * atau memperbarui data yang sudah ada berdasarkan key (id).
 */
export async function updateChatHistory(
  chatHistory: ChatHistory
): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.put(chatHistory);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/**
 * Delete: Menghapus ChatHistory berdasarkan id.
 */
export async function deleteChatHistory(id: string): Promise<void> {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
