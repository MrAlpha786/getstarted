import { ThemeState, type Theme } from '$lib/states/theme.svelte';
import { getStorageAPI } from '$lib/utils/storage';

const STORAGE_KEY = 'userTheme';
const storage = getStorageAPI<Theme>(STORAGE_KEY);

export const themeState = new ThemeState();

export function toggleTheme() {
	let isDark: boolean;
	if (themeState.theme === 'system') {
		isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	else {
		isDark = themeState.theme === 'dark';
	}
	const theme = isDark ? 'light' : 'dark';
	setTheme(theme);
}

export function setTheme(theme: Theme) {
	if (theme === themeState.theme) return;
	
	themeState.theme = theme;
	themeState.apply();
	storage.set(STORAGE_KEY, theme);
}

// Initial load
storage.get(STORAGE_KEY).then((stored) => {
	if (stored) {
		themeState.theme = stored;
		themeState.apply();
	}
});

// Sync from external changes (e.g. another tab or extension)
storage.onChanged((newValue: Theme | null) => {
	if (!newValue || newValue === themeState.theme) return;
	themeState.theme = newValue;
	themeState.apply();
});
