import type { UserConfig } from '$lib/config';
import { defaultConfig } from '$lib/config';
import { createStorage } from '$lib/utils/storage-api';
import { hasPendingMigrations, migrateUserConfig } from '$lib/config/migrations';

const STORAGE_KEY = 'userConfig';
const storage = createStorage(STORAGE_KEY);

// Internal config object is a global variable, defaultConfig is only a fallback
export const config: UserConfig = structuredClone(defaultConfig);

// Subscriber pattern
type Subscriber = (config: UserConfig) => void;
const subscribers = new Set<Subscriber>();

function notifySubscribers() {
	for (const callback of subscribers) {
		callback(config);
	}
}

export function subscribe(callback: Subscriber) {
	subscribers.add(callback);
	callback(config); // Immediately call with current config
	return () => subscribers.delete(callback);
}

/* ---------------- Initial load ---------------- */

const stored = await storage.get();

if (stored && typeof stored === 'object') {
	let storedConfig = stored as UserConfig;

	if (hasPendingMigrations(storedConfig)) {
		storedConfig = migrateUserConfig(storedConfig);
		saveConfig(storedConfig); // Save migrated config
	} else {
		Object.assign(config, storedConfig);
		notifySubscribers();
	}
}

/* ---------------- Save config ---------------- */

export function saveConfig(newConfig: UserConfig) {
	Object.assign(config, newConfig);
	storage.set(newConfig);
}

/* ---------------- External changes ---------------- */

const unsubscribeStorage = storage.onChanged((newVal) => {
	if (!newVal || typeof newVal !== 'object') return;

	Object.assign(config, newVal as UserConfig);
	notifySubscribers(); // Notify subscribers of external changes
});

/* ---------------- Cleanup ---------------- */

export function destroy() {
	unsubscribeStorage();
	subscribers.clear();
}
