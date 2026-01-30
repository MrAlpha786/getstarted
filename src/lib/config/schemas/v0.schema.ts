// src/lib/validation/user-config.schema.ts
import { z } from 'zod/v4';
import { supportedEngines } from '$lib/constants/search-engines';
import { Themes } from '$lib/states';

z.config({ jitless: true });

/* ---------------- Bookmarks ---------------- */

const BookmarkSchema = z.object({
	id: z.number(),
	label: z.string().min(1, 'Label is required'),
	url: z.url('Must be a valid URL')
});

/* ---------------- Cards ---------------- */

const CardSchema = z.object({
	id: z.number(),
	name: z.string().min(1, 'Card name is required'),
	bookmarks: z.array(BookmarkSchema)
});

/* ---------------- User Config ---------------- */

const supportedEngineIds = supportedEngines.map((e) => e.id);

export const UserConfigSchemaV0 = z.object({
	userName: z.string().min(1, 'Username is required'),
	version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Must be a valid semantic version'),
	migrationId: z.number(),
	customEngines: z
		.array(
			z.object({
				id: z.string().min(1, 'ID is required'),
				name: z.string().min(1, 'Name is required'),
				url: z.url('Must be a valid URL')
			})
		)
		.optional(),

	searchEngine: z.union(
		supportedEngineIds.map((id) => z.literal(id)) as [
			z.ZodLiteral<string>,
			...z.ZodLiteral<string>[]
		]
	),

	theme: z.enum(Themes),

	cards: z.array(CardSchema)
});

export type UserConfigTypeV0 = z.infer<typeof UserConfigSchemaV0>;
