import { isChrome, isFirefox } from '$lib/utils/browser';

type OnChangeCallback = (newValue: string | null, oldValue: string | null) => void;

export interface StorageAPI {
	get(): Promise<string | null>;
	set(value: string): Promise<void>;
	onChanged(callback: OnChangeCallback): () => void;
}

export function createStorage(key: string): StorageAPI {
	if (isFirefox()) return createFirefoxStorage(key);
	if (isChrome()) return createChromeStorage(key);
	return createLocalStorage(key);
}

/* ---------------- Firefox ---------------- */

function createFirefoxStorage(key: string): StorageAPI {
	return {
		async get() {
			const result = await browser.storage.sync.get(key);
			return (result[key] as string) ?? null;
		},
		async set(value) {
			await browser.storage.sync.set({ [key]: value });
		},
		onChanged(callback) {
			const listener = (changes: Record<string, browser.storage.StorageChange>, area: string) => {
				if (area !== 'sync' || !changes[key]) return;
				callback(
					(changes[key].newValue as string) ?? null,
					(changes[key].oldValue as string) ?? null
				);
			};
			browser.storage.onChanged.addListener(listener);
			return () => browser.storage.onChanged.removeListener(listener);
		}
	};
}

/* ---------------- Chrome ---------------- */

function createChromeStorage(key: string): StorageAPI {
	return {
		get() {
			return new Promise((resolve) => {
				chrome.storage.sync.get([key], (result) => resolve((result[key] as string) ?? null));
			});
		},
		set(value) {
			return new Promise((resolve) => {
				chrome.storage.sync.set({ [key]: value }, resolve);
			});
		},
		onChanged(callback) {
			const listener = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
				if (area !== 'sync' || !changes[key]) return;
				callback(
					(changes[key].newValue as string) ?? null,
					(changes[key].oldValue as string) ?? null
				);
			};
			chrome.storage.onChanged.addListener(listener);
			return () => chrome.storage.onChanged.removeListener(listener);
		}
	};
}

/* ---------------- LocalStorage ---------------- */

function createLocalStorage(key: string): StorageAPI {
	return {
		async get() {
			return localStorage.getItem(key);
		},
		async set(value) {
			localStorage.setItem(key, value);
		},
		onChanged(callback) {
			const handler = (e: StorageEvent) => {
				if (e.key !== key) return;
				callback(e.newValue, e.oldValue);
			};
			window.addEventListener('storage', handler);
			return () => window.removeEventListener('storage', handler);
		}
	};
}
