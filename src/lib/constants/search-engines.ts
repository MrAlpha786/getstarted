import type { SearchEngine } from '$lib/types/user-config';

export const supportedEngines = [
	{
		id: 'google',
		name: 'Google',
		url: 'https://www.google.com/search?q='
	},
	{
		id: 'duckduckgo',
		name: 'DuckDuckGo',
		url: 'https://duckduckgo.com/?q='
	},
	{
		id: 'bing',
		name: 'Bing',
		url: 'https://www.bing.com/search?q='
	},
	{
		id: 'yahoo',
		name: 'Yahoo',
		url: 'https://search.yahoo.com/search?p='
	},
	{
		id: 'brave',
		name: 'Brave',
		url: 'https://search.brave.com/search?q='
	},
	{
		id: 'startpage',
		name: 'Startpage',
		url: 'https://www.startpage.com/sp/search?query='
	}
] as SearchEngine[];

export function getSearchEngineById(id: string): SearchEngine {
	const searchEngine = supportedEngines.find((engine) => engine.id === id);
	return (
		searchEngine ?? {
			id: 'google',
			name: 'Google',
			url: 'https://www.google.com/search?q='
		}
	);
}
