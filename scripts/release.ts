import fs from 'fs';
import { execSync } from 'child_process';
import pkg from '../package.json' assert { type: 'json' };
import semver from 'semver';

const version = process.argv[2];
if (!version) {
	console.error('❌ Please provide a version as an argument.');
	process.exit(1);
}
if (!semver.valid(version)) {
	console.error('❌ Invalid SemVer. Example: 1.2.3, 1.2.3-alpha.1, 1.2.3+build.9');
	process.exit(1);
}

const currentVersion = pkg.version;
if (semver.lte(version, currentVersion)) {
	console.error(`❌ Version must be higher than current (${currentVersion}).`);
	process.exit(1);
}

const packageJsonPath = './package.json';

function updatePackageVersion(version: string) {
	const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
	pkg.version = version;
	fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
	console.log(`\n✓ Updated version to ${version}\n`);
}

function runBuildCommands() {
	console.log('\n Building...');
	execSync('vite build --mode production', { stdio: 'inherit' });
	execSync(`tsx scripts/bundle.ts safari`, { stdio: 'inherit' });
	execSync(`tsx scripts/bundle.ts firefox`, { stdio: 'inherit' });
	execSync(`tsx scripts/bundle.ts chrome`, { stdio: 'inherit' });
    execSync(`git add package.json && git commit -S -m "Bump v${currentVersion} -> v${version}"`)
	execSync(`git tag -a v${version} -m "Release version ${version}"`);
}

updatePackageVersion(version);
runBuildCommands();
