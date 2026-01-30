import type { UserConfigTypeV0 } from './v0.schema';
import type { UserConfigTypeV1 } from './v1.schema';
import { UserConfigSchemaV1 } from './v1.schema';

// Re-export the latest schema and type

// After major version, we will remove all the extra types and schemas
// and only keep the latest one here

export type AnyUserConfigType = UserConfigTypeV1 | UserConfigTypeV0;
export type UserConfig = UserConfigTypeV1;
export const UserConfigSchema = UserConfigSchemaV1;
