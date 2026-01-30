// src/lib/validation/user-config.schema.ts
import { z } from 'zod/v4';
import { UserConfigSchemaV0 } from './v0.schema';

z.config({ jitless: true });

// This change is small enough to use schema composition methods but
// always create a new schema to prevent accidental mutations
export const UserConfigSchemaV1 = z
	.object({
		...UserConfigSchemaV0.shape,
		schemaVersion: z.literal(1)
	})
	.omit({
		migrationId: true,
		customEngines: true
	});

export type UserConfigTypeV1 = z.infer<typeof UserConfigSchemaV1>;
