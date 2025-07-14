import type { UserConfig } from '../types';
import defaultConfig from '../config/default-config';
import { getStorageAPI } from './storage';

const STORAGE_KEY = 'userConfig';
const storage = getStorageAPI<UserConfig>(STORAGE_KEY);

// Non-reactive config object
export const config: UserConfig = structuredClone(defaultConfig);

// Init config from storage
await storage.get(STORAGE_KEY).then((stored) => {
	if (stored) Object.assign(config, stored);
});

// Save config on demand
export function saveConfig() {
	storage.set(STORAGE_KEY, config);
}

// External change sync (optional if needed)
storage.onChanged?.((newVal) => {
	if (!newVal) return;
	Object.assign(config, newVal);
});
