import type { UserConfig } from '$lib/types/user-config';
import { v0_to_v1 } from './v0-to-v1';
import type { Migration } from '.';

const migrations: Migration[] = [v0_to_v1];

function getSchemaVersion(config: UserConfig): number {
	if (typeof config.schemaVersion === 'number') {
		return config.schemaVersion;
	}
	return 0; // legacy users
}

export function migrateUserConfig(storedConfig: UserConfig): UserConfig {
	let currentVersion = getSchemaVersion(storedConfig);
	let migrated = structuredClone(storedConfig);

	for (const migration of migrations) {
		if (migration.from === currentVersion) {
			migrated = migration.migrate(migrated);
			currentVersion = migration.to;
		}
	}

	return migrated;
}

export function hasPendingMigrations(config: UserConfig): boolean {
	const current = getSchemaVersion(config);
	const latest = migrations[migrations.length - 1]?.to ?? current;
	return current < latest;
}
