/* eslint-disable @typescript-eslint/no-explicit-any */
/***
 * This script is use to generate the manifest file of the extension
 * usage: npm run manifest [chrome|firefox|safari]
 */
import { writeFileSync } from 'fs';
import path from 'path';
import pkg from '../package.json' assert { type: 'json' };

export const targets = ['chrome', 'firefox', 'safari'] as const;
export type Target = (typeof targets)[number];

export function getManifest(target: Target) {
	const base = {
		name: 'GetStarted - Minimal & Fast Startpage',
		short_name: 'GetStarted',
		description: 'Minimal & fast startpage for your browser.',
		author: 'Muhammad Faizan',
		version: pkg.version,
		manifest_version: 3,
		icons: {
			'16': 'icon/favicon-16x16.png',
			'32': 'icon/favicon-32x32.png',
			'192': 'icon/android-chrome-192x192.png',
			'512': 'icon/android-chrome-512x512.png'
		},
		permissions: ['storage'],
		action: { default_title: 'GetStarted' }
	} as any;

	const newtab = { newtab: 'index.html' };
	base.chrome_url_overrides = newtab;

	if (target === 'chrome') {
		base.permissions.push('search');
	} else if (target === 'firefox') {
		base.browser_specific_settings = {
			gecko: { id: 'getstarted@mfaizan.com' }
		};
		base.developer = { name: 'Muhammad Faizan', url: 'https://mfaizan.com' };
	} else if (target === 'safari') {
		base.browser_url_overrides = newtab;
	}

	return base;
}

export function build(target: Target) {
	const manifest = getManifest(target);
	const dest = path.resolve('./dist/manifest.json');
	writeFileSync(dest, JSON.stringify(manifest, null, 2));
	console.log(`\n✓ Manifest for ${target} written to ${dest}\n`);
}

const arg = process.argv[2] as Target;
if (!arg || !targets.includes(arg)) {
	console.error(`\n❌ Please specify target: ${targets.join(' | ')}\n`);
	process.exit(1);
}
build(arg);
