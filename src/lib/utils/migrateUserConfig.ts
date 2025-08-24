import type { UserConfig } from '$lib/types/user-config';
import defaultConfig from '$lib/config/default-config';

// Migration functions indexed by migrationId (number)
const migrations: Record<number, (currenConfig: UserConfig) => UserConfig> = {
	30250820: (currentConfig) => {
		const migrated = { ...currentConfig };
		migrated.version = defaultConfig.version;
		migrated.migrationId = defaultConfig.migrationId;
		return migrated;
	}
	// Add more migrations for future migrationIds here
};

function getMigrationId(config: UserConfig): number {
	return config.migrationId || 0;
}

export function migrateUserConfig(storedConfig: UserConfig): UserConfig {
	const currentMigrationId = getMigrationId(storedConfig);
	const migrationIds = Object.keys(migrations).map(Number).sort();

	let migrated = { ...storedConfig };
	for (const id of migrationIds) {
		if (currentMigrationId < id) {
			migrated = migrations[id](migrated);
		}
	}
	return migrated;
}

export function checkPendingMigrations(storedConfig: UserConfig): boolean {
	const defaultVersion = getMigrationId(defaultConfig);
	const storedVersion = getMigrationId(storedConfig);
	return defaultVersion !== storedVersion;
}
