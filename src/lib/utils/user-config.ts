import type { UserConfig } from '$lib/types/user-config';
import defaultConfig from '$lib/config/default-config';
import { createStorage } from '$lib/utils/storage-api';
import { checkPendingMigrations, migrateUserConfig } from './migrateUserConfig';

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
	const storedConfig = stored as UserConfig;

	if (checkPendingMigrations(storedConfig)) {
		const migrated = migrateUserConfig(storedConfig);
		Object.assign(config, migrated);
		await storage.set(migrated);
	} else {
		Object.assign(config, storedConfig);
	}

	notifySubscribers();
}

/* ---------------- Save config ---------------- */

export function saveConfig(newConfig: UserConfig) {
	Object.assign(config, newConfig);
	storage.set(newConfig);
	notifySubscribers();
}

/* ---------------- External changes ---------------- */

const unsubscribeStorage = storage.onChanged((newVal) => {
	if (!newVal || typeof newVal !== 'object') return;

	Object.assign(config, newVal as UserConfig);
	notifySubscribers();
});

/* ---------------- Cleanup ---------------- */

export function destroy() {
	unsubscribeStorage();
	subscribers.clear();
}
