import type { Theme, ThemeSetting } from '$lib/types/user-config';
import { getStorageAPI } from '$lib/utils/storage';

const STORAGE_KEY = 'userTheme';
const storage = getStorageAPI<ThemeSetting>(STORAGE_KEY);

let currentSetting: ThemeSetting = 'system';
let mediaQuery: MediaQueryList | null = null;

function resolveTheme(): Theme {
	return currentSetting === 'system'
		? window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: currentSetting;
}

function applyTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme;
}

function updateSystemListener(enable: boolean) {
	if (enable && !mediaQuery) {
		mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', onSystemThemeChange);
	} else if (!enable && mediaQuery) {
		mediaQuery.removeEventListener('change', onSystemThemeChange);
		mediaQuery = null;
	}
}

function onSystemThemeChange() {
	if (currentSetting === 'system') {
		applyTheme(resolveTheme());
	}
}

export function setTheme(setting: ThemeSetting) {
	if (setting === currentSetting) return;

	currentSetting = setting;
	storage.set(STORAGE_KEY, setting);
	applyTheme(resolveTheme());
	updateSystemListener(setting === 'system');
}

export function toggleTheme() {
	const currentTheme = resolveTheme();
	const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
	setTheme(newTheme);
}

export function getThemeSetting(): ThemeSetting {
	return currentSetting;
}

// Initial load
storage.get(STORAGE_KEY).then((stored) => {
	if (stored) currentSetting = stored;
	applyTheme(resolveTheme());
	updateSystemListener(currentSetting === 'system');
});

// Sync from external changes (e.g. another tab or extension)
storage.onChanged((newValue: ThemeSetting | null) => {
	if (!newValue || newValue === currentSetting) return;
	setTheme(newValue);
});
