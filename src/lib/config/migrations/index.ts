import type { UserConfig } from '$lib/config';
export { hasPendingMigrations, migrateUserConfig } from './runner';

export interface Migration {
	from: number;
	to: number;
	migrate(config: UserConfig): UserConfig;
}
