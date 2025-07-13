import { writable } from 'svelte/store';
import type { UserConfig } from '../types';
import defaultConfig from '../config/default-config';

const STORAGE_KEY = 'userConfig';

// Try to load from localStorage
function loadConfig(): UserConfig {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) return JSON.parse(stored);
	} catch {
		// Fall back if JSON is invalid
	}
	return defaultConfig;
}

// Create store
const configStore = writable<UserConfig>(loadConfig());

// Persist changes
configStore.subscribe((value) => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
});

// Export helpers
export const config = configStore;

export function resetConfig() {
	localStorage.removeItem(STORAGE_KEY);
	location.reload();
}

export function updateConfig(updater: (oldConfig: typeof defaultConfig) => typeof defaultConfig) {
	config.update((current) => {
		const updated = updater(current);
		localStorage.setItem('userConfig', JSON.stringify(updated));
		return updated;
	});
}

export function exportConfig() {
	const configData = JSON.stringify(loadConfig(), null, 2);
	const blob = new Blob([configData], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = 'startpage-config.json';
	a.click();
	URL.revokeObjectURL(url);
}

export function importConfig(
	file: File,
	onSuccess?: (parsed: UserConfig) => void,
	onError?: (err: Error) => void
) {
	const reader = new FileReader();
	reader.onload = (e) => {
		try {
			const parsed = JSON.parse(e.target?.result as string);
			configStore.set(parsed);
			onSuccess?.(parsed);
		} catch (err) {
			onError?.(err as Error);
		}
	};
	reader.readAsText(file);
}
