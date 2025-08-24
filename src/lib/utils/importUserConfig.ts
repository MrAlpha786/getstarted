// src/lib/utils/importUserConfig.ts
import type { UserConfig } from '$lib/types/user-config';
import { checkPendingMigrations, migrateUserConfig } from './migrateUserConfig';

/**
 * Attempts to migrate or validate an imported config. Returns an object with:
 * - success: boolean
 * - config: UserConfig | null
 * - error: string | null
 * - helpUrl: string | null
 */
export function tryImportUserConfig(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	imported: any,
	currentVersion: string
): {
	success: boolean;
	config: UserConfig | null;
	error: string | null;
	helpUrl: string | null;
} {
	const helpUrl = 'https://getstarted-docs.example.com/import-help'; // TODO: update with real link
	// Accept both old and new format
	const importedConfig = imported.config ?? imported;
	const importedVersion = imported.version ?? null;
	if (!importedConfig || typeof importedConfig !== 'object') {
		return {
			success: false,
			config: null,
			error: 'Invalid settings file.',
			helpUrl
		};
	}
	if (importedVersion) {
		const [importedMajor] = importedVersion.split('.');
		const [currentMajor] = currentVersion.split('.');
		if (importedMajor !== currentMajor) {
			// Try to migrate or partially import here if possible
			// For now, just fail and show help
			return {
				success: false,
				config: null,
				error: `Settings file is from an incompatible version. Imported version: v${importedMajor}, your app version: v${currentMajor}`,
				helpUrl
			};
		}
	}
	// If we reach here, config is compatible
	let finalConfig: UserConfig = { ...importedConfig } as UserConfig;
	if (checkPendingMigrations(importedConfig as UserConfig)) {
		const migrated = migrateUserConfig(importedConfig as UserConfig);
		if (!migrated) {
			return {
				success: false,
				config: null,
				error: 'Failed to migrate settings to the current version.',
				helpUrl
			};
		}
		finalConfig = migrated;
	}
	return {
		success: true,
		config: finalConfig,
		error: null,
		helpUrl: null
	};
}
