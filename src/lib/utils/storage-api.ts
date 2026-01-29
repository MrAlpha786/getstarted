import { isChrome, isFirefox } from '$lib/utils/browser';

type OnChangeCallback = (
	newValue: unknown | null,
	oldValue: unknown | null
) => void;

export interface StorageAPI {
	get(): Promise<unknown | null>;
	set(value: unknown): Promise<void>;
	onChanged(callback: OnChangeCallback): () => void;
}


export function createStorage(key: string): StorageAPI {
	const isExtension = isChrome() || isFirefox();

	/* ---------------- Extension Storage ---------------- */

	const getExtension = async (): Promise<unknown | null> => {
		if (isFirefox()) {
			const result = await browser.storage.sync.get(key);
			return result[key] ?? null;
		}

		return new Promise((resolve) => {
			chrome.storage.sync.get([key], (result) => {
				resolve(result[key] ?? null);
			});
		});
	};

	const setExtension = async (value: unknown): Promise<void> => {
		if (isFirefox()) {
			await browser.storage.sync.set({ [key]: value });
			return;
		}

		return new Promise((resolve) => {
			chrome.storage.sync.set({ [key]: value }, () => resolve());
		});
	};

	const onExtensionChanged = (callback: OnChangeCallback): () => void => {
		const listener = (
			changes: Record<string, { oldValue?: unknown; newValue?: unknown }>,
			areaName: string
		) => {
			if (areaName !== 'sync' || !changes[key]) return;

			callback(
				changes[key].newValue ?? null,
				changes[key].oldValue ?? null
			);
		};

		const storage = isFirefox() ? browser.storage : chrome.storage;
		storage.onChanged.addListener(listener);

		return () => storage.onChanged.removeListener(listener);
	};

	/* ---------------- LocalStorage Fallback ---------------- */

	const getLocal = async (): Promise<unknown | null> => {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	};

	const setLocal = async (value: unknown): Promise<void> => {
		localStorage.setItem(key, JSON.stringify(value));
	};

	const onLocalChanged = (callback: OnChangeCallback): () => void => {
		const handler = (e: StorageEvent) => {
			if (e.key !== key) return;

			const oldVal = e.oldValue ? JSON.parse(e.oldValue) : null;
			const newVal = e.newValue ? JSON.parse(e.newValue) : null;

			callback(newVal, oldVal);
		};

		window.addEventListener('storage', handler);
		return () => window.removeEventListener('storage', handler);
	};

	/* ---------------- Public API ---------------- */

	if (isExtension) {
		return {
			get: getExtension,
			set: setExtension,
			onChanged: onExtensionChanged
		};
	}

	return {
		get: getLocal,
		set: setLocal,
		onChanged: onLocalChanged
	};
}
