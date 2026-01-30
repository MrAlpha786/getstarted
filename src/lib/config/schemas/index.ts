// src/lib/config/schemas/index.ts
import type { ZodObject } from 'zod';

import { UserConfigSchemaV0 } from './v0.schema';
import type { UserConfigTypeV0 } from './v0.schema';

import { UserConfigSchemaV1 } from './v1.schema';
import type { UserConfigTypeV1 } from './v1.schema';

/* Public types */

// App code must ONLY use this type
export type UserConfig = UserConfigTypeV1;
export type AnyUserConfigType = UserConfigTypeV0 | UserConfigTypeV1;
export const UserConfigSchema = UserConfigSchemaV1;

/* ------------------------------------------------------------------ */
/* Internal helpers (file-local only)                                  */
/* ------------------------------------------------------------------ */

function getSchemaVersion(input: unknown): number {
	if (
		typeof input === 'object' &&
		input !== null &&
		'schemaVersion' in input &&
		typeof (input as { schemaVersion: unknown }).schemaVersion === 'number'
	) {
		return (input as { schemaVersion: number }).schemaVersion;
	}

	return 0; // legacy / unknown
}

function getSchema(version: number): ZodObject<any> {
	switch (version) {
		case 1:
			return UserConfigSchemaV1;
		case 0:
		default:
			return UserConfigSchemaV0;
	}
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export function validateUserConfig(input: unknown) {
	const version = getSchemaVersion(input);
	const schema = getSchema(version);

	const parsed = schema.safeParse(input);

	if (!parsed.success) {
		return {
			success: false,
			error: parsed.error
		};
	}

	return {
		success: true,
		data: parsed.data as UserConfig
	};
}
