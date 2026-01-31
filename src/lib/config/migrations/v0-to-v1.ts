import type { UserConfigTypeV0 } from '$lib/config/schemas/v0.schema';
import type { UserConfigTypeV1 } from '../schemas/v1.schema';

export const v0_to_v1 = {
	from: 0,
	to: 1,
	migrate(config: UserConfigTypeV0): UserConfigTypeV1 {
		return {
			...config,
			schemaVersion: 1
		};
	}
};
