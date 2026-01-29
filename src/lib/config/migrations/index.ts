import type { UserConfig } from '$lib/types/user-config';
export { hasPendingMigrations, migrateUserConfig } from './runner';

export interface Migration {
	from: number;
	to: number;
	migrate(config: UserConfig): UserConfig;
}
