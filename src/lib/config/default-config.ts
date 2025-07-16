import type { UserConfig } from '$lib/types/user-config';

const defaultConfig: UserConfig = {
	userName: 'Faizan',
	searchEngine: 'google',
	customEngines: undefined,
	theme: 'system',
	cards: [
		{
			id: 0,
			name: 'General',
			bookmarks: [
				{ id: 0, label: 'google', url: 'https://www.google.com' },
				{ id: 1, label: 'drive', url: 'https://drive.google.com' },
				{ id: 2, label: 'maps', url: 'https://maps.google.com' },
				{ id: 3, label: 'photos', url: 'https://photos.google.com' },
				{ id: 4, label: 'mega', url: 'https://mega.nz' }
			]
		},
		{
			id: 1,
			name: 'Tech',
			bookmarks: [
				{ id: 0, label: 'github', url: 'https://github.com' },
				{ id: 1, label: 'stackoverflow', url: 'https://stackoverflow.com' },
				{ id: 2, label: 'codepen', url: 'https://codepen.io' },
				{ id: 3, label: 'jsfiddle', url: 'https://jsfiddle.net' },
				{ id: 4, label: 'mdn', url: 'https://developer.mozilla.org' },
				{ id: 5, label: 'npm', url: 'https://www.npmjs.com' }
			]
		},
		{
			id: 2,
			name: 'Work',
			bookmarks: [
				{ id: 0, label: 'notion', url: 'https://www.notion.so' },
				{ id: 1, label: 'slack', url: 'https://slack.com' },
				{ id: 2, label: 'trello', url: 'https://trello.com' },
				{ id: 3, label: 'mail', url: 'https://mail.google.com' },
				{ id: 4, label: 'calendar', url: 'https://calendar.google.com' },
				{ id: 5, label: 'figma', url: 'https://www.figma.com' },
				{ id: 6, label: 'canva', url: 'https://www.canva.com' },
				{ id: 7, label: 'linkedin', url: 'https://www.linkedin.com' },
				{ id: 8, label: 'zoom', url: 'https://zoom.us' },
				{ id: 9, label: 'docs', url: 'https://docs.google.com' },
				{ id: 10, label: 'sheets', url: 'https://sheets.google.com' },
				{ id: 11, label: 'wetransfer', url: 'https://wetransfer.com' }
			]
		},
		{
			id: 3,
			name: 'Social',
			bookmarks: [
				{ id: 0, label: 'youtube', url: 'https://www.youtube.com' },
				{ id: 1, label: 'twitter', url: 'https://twitter.com' },
				{ id: 2, label: 'instagram', url: 'https://www.instagram.com' },
				{ id: 3, label: 'facebook', url: 'https://www.facebook.com' },
				{ id: 4, label: 'reddit', url: 'https://www.reddit.com' },
				{ id: 5, label: 'whatsapp', url: 'https://web.whatsapp.com' },
				{ id: 6, label: 'pinterest', url: 'https://www.pinterest.com' },
				{ id: 7, label: 'tiktok', url: 'https://www.tiktok.com' },
				{ id: 8, label: 'telegram', url: 'https://web.telegram.org' }
			]
		}
	]
};

export default defaultConfig;
