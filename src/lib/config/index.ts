import defaultConfig from './defaults';
import type { Theme } from '$lib/states/theme';

export {defaultConfig};

export interface Bookmark {
	id: number;
	label: string;
	url: string;
}

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
	version?: string;
	migrationId?: number;
	schemaVersion?: number;
	userName: string;
	searchEngine: string;
	customEngines?: SearchEngine[];
	theme?: Theme;
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
