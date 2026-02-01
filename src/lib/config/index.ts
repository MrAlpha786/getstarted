import defaultConfig from './defaults';

export type { UserConfig, Card, Bookmark } from './schemas';
export { getSchemaVersion as getConfigVersion } from './schemas';

export { defaultConfig };

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
