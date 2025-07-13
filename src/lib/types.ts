export type Bookmark = Record<string, string>;

export type Theme = 'light' | 'dark';
export type ThemeSetting = Theme | 'system';

export type BuiltInEngine = 'Google' | 'Yahoo' | 'Bing' | 'Brave' | 'DuckDuckGo' | 'Startpage';
export type SearchEngine = BuiltInEngine | string; // allow user-added

export interface Card {
	name: string;
	bookmarks: Bookmark;
}

export interface UserConfig {
	userName: string;
	searchEngine: SearchEngine;
	customEngines?: Record<SearchEngine, string>; // ✅ Only user-added engines here
	theme: ThemeSetting;
	cards: Card[];
}
