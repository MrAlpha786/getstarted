type OnChangeCallback<T> = (newValue: T | null, oldValue: T | null) => void;

export interface StorageAPI<T> {
	get(key: string): Promise<T | null>;
	set(key: string, value: T): Promise<void>;
	onChanged(callback: OnChangeCallback<T>): void;
}

export function getStorageAPI<T>(storageKey: string): StorageAPI<T> {
	// Firefox
	if (window.browser && browser.runtime) {
		return {
			get: async (key: string) => {
				const result = await browser.storage.sync.get(key);
				return result[key] ?? null;
			},
			set: async (key: string, value: T) => {
				await browser.storage.sync.set({ [key]: value });
			},
			onChanged: (callback: OnChangeCallback<T>) => {
				browser.storage.onChanged.addListener((changes, areaName) => {
					if (areaName === 'sync' && changes[storageKey]) {
						const change = changes[storageKey];
						callback(change.newValue ?? null, change.oldValue ?? null);
					}
				});
			}
		};
	}

	// Chrome
	if (window.chrome && chrome.runtime && chrome.runtime.id) {
		return {
			get: (key: string) =>
				new Promise<T | null>((resolve) => {
					chrome.storage.sync.get([key], (result: Record<string, T>) => {
						resolve(result[key] ?? null);
					});
				}),
			set: (key: string, value: T) =>
				new Promise<void>((resolve) => {
					chrome.storage.sync.set({ [key]: value }, () => resolve());
				}),
			onChanged: (callback: OnChangeCallback<T>) => {
				chrome.storage.onChanged.addListener((changes, areaName) => {
					if (areaName === 'sync' && changes[storageKey]) {
						const change = changes[storageKey];
						callback(change.newValue ?? null, change.oldValue ?? null);
					}
				});
			}
		};
	}
    
	const listeners: OnChangeCallback<T>[] = [];

	window.addEventListener('storage', (e: StorageEvent) => {
		if (e.key === storageKey) {
			const oldVal: T | null = e.oldValue ? JSON.parse(e.oldValue) : null;
			const newVal: T | null = e.newValue ? JSON.parse(e.newValue) : null;
			listeners.forEach((cb) => cb(newVal, oldVal));
		}
	});

	return {
		get: async (key: string): Promise<T | null> => {
			const value = localStorage.getItem(key);
			return value ? (JSON.parse(value) as T) : null;
		},
		set: async (key: string, value: T): Promise<void> => {
			const newVal = JSON.stringify(value);
			localStorage.setItem(key, newVal);
		},
		onChanged: (callback: OnChangeCallback<T>): void => {
			listeners.push(callback);
		}
	};
}
