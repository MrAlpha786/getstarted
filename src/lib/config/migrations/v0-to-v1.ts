import type { UserConfig } from '$lib/types/user-config';
import type { Migration } from '.';

export const v0_to_v1: Migration = {
	from: 0,
	to: 1,
	migrate(config: UserConfig): UserConfig {
		return {
			...config,
			schemaVersion: 1
		};
	}
};
