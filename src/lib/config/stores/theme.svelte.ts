import { Themes, type Theme } from '$lib/constants/themes';
import type { ConfigStore } from './config.svelte';

export class ThemeStore {
	private themeState: { value: Theme };
	constructor(private config: ConfigStore) {
		this.themeState = this.config.createState('theme');
		$effect.root(() => {
			$effect(() => {
				this.apply();
			});
		});
	}

	get theme(): Theme {
		return this.themeState.value;
	}

	set theme(value: Theme) {
		this.themeState.value = value;
		this.config.persist();
	}

	apply() {
		if (typeof window === 'undefined') return;

		if (this.theme === 'system') {
			document.documentElement.removeAttribute('data-theme');
			return;
		}
		document.documentElement.dataset.theme = this.theme;
	}

	rotate() {
		const current = this.theme === 'system' ? this.resolvePreferredTheme() : this.theme;
		const options = Themes.filter((t) => t !== 'system');
		const currentIndex = options.indexOf(current);
		const nextIndex = (currentIndex + 1) % options.length;
		this.theme = options[nextIndex];
	}

	isPreferredDark(): boolean {
		if (typeof window === 'undefined') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	resolvePreferredTheme(): Theme {
		return this.isPreferredDark() ? 'dark' : 'light';
	}
}
