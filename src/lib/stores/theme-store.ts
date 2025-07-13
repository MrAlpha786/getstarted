import { writable, get } from 'svelte/store';
import { config, updateConfig } from './config-store';
import type { Theme, ThemeSetting } from '../types';

function resolveTheme(value: ThemeSetting): Theme {
	if (value === 'system') {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return value;
}

const theme = writable<Theme>();

// Initialize theme from config
function initTheme() {
	const initial = resolveTheme(get(config).theme);
	theme.set(initial);
	document.documentElement.dataset.theme = initial;
}

// Toggle between light and dark only
function toggleTheme() {
	theme.update((current) => {
		const next = current === 'dark' ? 'light' : 'dark';

		updateConfig((prev) => ({
			...prev,
			theme: next
		}));

		document.documentElement.dataset.theme = next;
		return next;
	});
}

// React to config.theme changes
config.subscribe(($config) => {
	const resolved = resolveTheme($config.theme);
	theme.set(resolved);
	document.documentElement.dataset.theme = resolved;
});

export { theme, initTheme, toggleTheme };
