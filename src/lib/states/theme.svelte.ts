export const Themes = ['system', 'light', 'dark'] as const;
export type Theme = (typeof Themes)[number];

export class ThemeState {
	#activeTheme: Theme;

	constructor(initialTheme: Theme = 'system') {
		this.#activeTheme = $state(initialTheme);
	}

	get theme(): Theme {
		return this.#activeTheme;
	}

	set theme(value: Theme) {
		this.#activeTheme = value;
	}

	apply() {
		if (typeof window === 'undefined') return;

		if (this.#activeTheme === 'system') {
			document.documentElement.removeAttribute('data-theme');
			return;
		}
		document.documentElement.dataset.theme = this.#activeTheme;
	}
}
