import type { UserConfig } from '$lib/types/user-config';
import defaultConfig from '$lib/config/default-config';
import { getStorageAPI } from '$lib/utils/storage';
import { checkPendingMigrations, migrateUserConfig } from './migrateUserConfig';

const STORAGE_KEY = 'userConfig';
const storage = getStorageAPI<UserConfig>(STORAGE_KEY);

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

await storage.get(STORAGE_KEY).then((stored) => {
	if (stored) {
		// If stored version is different, then migrate
		if (checkPendingMigrations(stored)) {
			const migrated = migrateUserConfig(stored);
			Object.assign(config, migrated);
			storage.set(STORAGE_KEY, migrated);
			notifySubscribers();
		} else {
			Object.assign(config, stored);
			notifySubscribers();
		}
	}
});

// Save config on demand
export function saveConfig(newConfig: UserConfig) {
	Object.assign(config, newConfig);
	storage.set(STORAGE_KEY, newConfig);
	notifySubscribers();
}

// Listen to external changes
storage.onChanged?.((newVal) => {
	if (!newVal) return;
	Object.assign(config, newVal);
	notifySubscribers();
});

export function destroy() {
	subscribers.clear();
}
