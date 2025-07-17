/***
 * This script generate the manifest then zip the /dist to /artifacts/*.zip
 * usage: npm run bundle [chrome|firefox|safari]
 */
import path from 'path';
import { build as buildManifest, Target, targets } from './manifest';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { execSync } from 'child_process';

function build(target: Target) {
	// Move manifest to dist
	buildManifest(target);

	// Prepare ./artifacts directory
	const artifactsDir = path.resolve('./artifacts');
	if (!existsSync(artifactsDir)) mkdirSync(artifactsDir);

	const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));
	const version = pkg.version || '0.0.0';

	const zipName = `GetStarted-v${version}-${target}.zip`;
	const zipPath = path.join(artifactsDir, zipName);

	if (existsSync(zipPath)) rmSync(zipPath);

	execSync(`cd ./dist && zip -r0 ${zipPath} .`, { stdio: 'inherit' });

	console.log(`\n✓ ${zipName} created in /artifacts\n`);
}

const arg = process.argv[2] as Target;
if (!arg || !targets.includes(arg)) {
	console.error(`\n❌ Please specify target: ${targets.join(' | ')}\n`);
	process.exit(1);
}
build(arg);
