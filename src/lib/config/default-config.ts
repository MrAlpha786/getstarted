import type { UserConfig } from '../types';

const defaultConfig: UserConfig = {
	userName: 'Faizan',
	searchEngine: 'Google',
	customEngines: undefined,
	theme: 'system',
	cards: [
		{
			name: 'General',
			bookmarks: {
				google: 'https://www.google.com',
				drive: 'https://drive.google.com',
				maps: 'https://maps.google.com',
				photos: 'https://photos.google.com',
				mega: 'https://mega.nz'
			}
		},
		{
			name: 'Tech',
			bookmarks: {
				github: 'https://github.com',
				stackoverflow: 'https://stackoverflow.com',
				codepen: 'https://codepen.io',
				jsfiddle: 'https://jsfiddle.net',
				mdn: 'https://developer.mozilla.org',
				npm: 'https://www.npmjs.com'
			}
		},
		{
			name: 'Work',
			bookmarks: {
				notion: 'https://www.notion.so',
				slack: 'https://slack.com',
				trello: 'https://trello.com',
				mail: 'https://mail.google.com',
				calendar: 'https://calendar.google.com',
				figma: 'https://www.figma.com',
				canva: 'https://www.canva.com',
				linkedin: 'https://www.linkedin.com',
				zoom: 'https://zoom.us',
				docs: 'https://docs.google.com',
				sheets: 'https://sheets.google.com',
				wetransfer: 'https://wetransfer.com'
			}
		},
		{
			name: 'Social',
			bookmarks: {
				youtube: 'https://www.youtube.com',
				twitter: 'https://twitter.com',
				instagram: 'https://www.instagram.com',
				facebook: 'https://www.facebook.com',
				reddit: 'https://www.reddit.com',
				whatsapp: 'https://web.whatsapp.com',
				pinterest: 'https://www.pinterest.com',
				tiktok: 'https://www.tiktok.com',
				telegram: 'https://web.telegram.org'
			}
		}
	]
};

export default defaultConfig;
