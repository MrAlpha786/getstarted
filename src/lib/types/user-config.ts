export interface Bookmark {
	id: number;
	label: string;
	url: string;
}

export type Theme = 'light' | 'dark';
export type ThemeSetting = Theme | 'system';

export interface SearchEngine {
	id: string;
	name: string;
	url: string;
}

export interface Card {
	id: number;
	name: string;
	bookmarks: Bookmark[];
}

export interface UserConfig {
	userName: string;
	searchEngine: string;
	customEngines?: SearchEngine[];
	theme: ThemeSetting;
	cards: Card[];
}

export type BookmarkErrors = {
	label?: string;
	url?: string;
};

export type CardErrors = {
	name?: string;
	bookmarks?: {
		[index: number]: BookmarkErrors;
	};
};

export type UserConfigErrors = {
	userName?: string;
	searchEngine?: string;
	cards?: {
		[index: number]: CardErrors;
	};
};
