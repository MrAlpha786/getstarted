import type { UserConfig } from '$lib/config';
import type { AnyUserConfigType } from '../schemas';
import { v0_to_v1 } from './v0-to-v1';

interface Migration {
	from: number;
	to: number;
	migrate(config: AnyUserConfigType): AnyUserConfigType;
}

const migrations: Migration[] = [v0_to_v1];

function getSchemaVersion(config: AnyUserConfigType): number {
	if ('schemaVersion' in config) {
		return config.schemaVersion;
	}
	return 0; // legacy users
}

export function migrateUserConfig(storedConfig: AnyUserConfigType): UserConfig {
	let currentVersion = getSchemaVersion(storedConfig);
	let migrated: AnyUserConfigType = structuredClone(storedConfig);

	for (const migration of migrations) {
		if (migration.from === currentVersion) {
			migrated = migration.migrate(migrated);
			currentVersion = migration.to;
		}
	}

	return migrated as UserConfig;
}

export function hasPendingMigrations(config: AnyUserConfigType): boolean {
	const current = getSchemaVersion(config);
	const latest = migrations[migrations.length - 1]?.to ?? current;
	return current < latest;
}
