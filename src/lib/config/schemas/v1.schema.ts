// src/lib/validation/user-config.schema.ts
import { z } from 'zod/v4';
import { supportedEngines } from '$lib/constants/search-engines';
import { Themes } from '$lib/constants/themes';

z.config({ jitless: true });

const BookmarkSchema = z.object({
	id: z.number(),
	label: z.string(),
	url: z.url()
});

/* ------------------------------------------------------------------ */
/* Cards (salvage rules)                                              */
/* ------------------------------------------------------------------ */

const CardSchema = z.object({
	id: z.number(),
	name: z.string(),
	bookmarks: z.array(BookmarkSchema)
});

/* ------------------------------------------------------------------ */
/* User Config v1                                                     */
/* ------------------------------------------------------------------ */

const supportedEngineIds = supportedEngines.map((e) => e.id);

const ThemeSchema = z.enum(Themes);

export const UserConfigSchemaV1 = z.object({
	userName: z.string().min(1, 'Username is required'),
	schemaVersion: z.literal(1),

	searchEngine: z.union(
		supportedEngineIds.map((id) => z.literal(id)) as [
			z.ZodLiteral<string>,
			...z.ZodLiteral<string>[]
		]
	),

	theme: ThemeSchema,

	cards: z.array(CardSchema)
});

export type UserConfigTypeV1 = z.infer<typeof UserConfigSchemaV1>;
