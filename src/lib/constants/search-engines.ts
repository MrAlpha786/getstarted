import type { BuiltInEngine } from '../types';

export const supportedEngines = {
	Google: 'https://www.google.com/search?q=',
	DuckDuckGo: 'https://duckduckgo.com/?q=',
	Bing: 'https://www.bing.com/search?q=',
	Yahoo: 'https://search.yahoo.com/search?p=',
	Brave: 'https://search.brave.com/search?q=',
	Startpage: 'https://www.startpage.com/sp/search?query='
} as Record<BuiltInEngine, string>;
