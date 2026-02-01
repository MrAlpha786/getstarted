import { Themes, type Theme } from "$lib/constants/themes";

export class ThemeState {
	private activeTheme: Theme;

	constructor(initialTheme: Theme = 'system') {
		this.activeTheme = initialTheme;
	}

	get theme(): Theme {
		return this.activeTheme;
	}

	set theme(value: Theme) {
		this.activeTheme = value;
	}

	apply() {
		if (typeof window === 'undefined') return;

		if (this.activeTheme === 'system') {
			document.documentElement.removeAttribute('data-theme');
			return;
		}
		document.documentElement.dataset.theme = this.activeTheme;
	}

	rotate() {
		const current = this.activeTheme === 'system' ? this.resolvePreferredTheme() : this.activeTheme;
		const options: Theme[] = Themes.filter((t) => t !== 'system');
		const currentIndex = options.indexOf(current);
		const nextIndex = (currentIndex + 1) % options.length;
		this.activeTheme = options[nextIndex];
	}

	isPreferredDark(): boolean {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	resolvePreferredTheme(): Theme {
		return this.isPreferredDark() ? 'dark' : 'light';
	}
}
