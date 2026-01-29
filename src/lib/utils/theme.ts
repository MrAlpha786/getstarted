import { ThemeState, type Theme } from '$lib/states/theme';
import { config, saveConfig, subscribe } from '$lib/utils/user-config';

export const themeState = new ThemeState();

subscribe((cfg) => {
	if (cfg.theme && cfg.theme !== themeState.theme) {
		themeState.theme = cfg.theme;
		themeState.apply();
	}
});

export function toggleTheme() {
	themeState.rotate();
	themeState.apply();
	config.theme = themeState.theme;
	saveConfig(config);
}

export function setTheme(theme: Theme) {
	if (theme === themeState.theme) return;

	themeState.theme = theme;
	themeState.apply();
	config.theme = theme;
	saveConfig(config);
}
