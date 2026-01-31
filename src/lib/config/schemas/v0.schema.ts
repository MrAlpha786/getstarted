// src/lib/validation/user-config.schema.ts
import { z } from 'zod/v4';
import { supportedEngines } from '$lib/constants/search-engines';
import { Themes } from '$lib/states';

z.config({ jitless: true });

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateRecoveredId(): number {
	const random = Math.floor(Math.random() * 1_000_000); // 6 digits
	return 1_000_000 + random;
}

/* ------------------------------------------------------------------ */
/* Bookmarks (salvage rules)                                          */
/* ------------------------------------------------------------------ */

const RawBookmarkSchema = z.object({
	id: z.number().default(generateRecoveredId()),
	label: z.string().default('New Bookmarks'),
	url: z.url()
});

const BookmarksSchema = z.array(z.unknown()).transform((items) =>
	items
		.map((item) => {
			const parsed = RawBookmarkSchema.safeParse(item);
			if (!parsed.success) return null;
			return parsed.data;
		})
		.filter((b) => b !== null)
);

/* ------------------------------------------------------------------ */
/* Cards (salvage rules)                                              */
/* ------------------------------------------------------------------ */

const CardSchema = z.object({
	id: z.number().default(generateRecoveredId()),
	name: z.string().default('New Card'),
	bookmarks: BookmarksSchema.default([])
});

/* ------------------------------------------------------------------ */
/* User Config v0                                                      */
/* ------------------------------------------------------------------ */

const supportedEngineIds = supportedEngines.map((e) => e.id);

export const UserConfigSchemaV0 = z.object({
	userName: z.string().min(1, 'Username is required').default('User'),

	searchEngine: z
		.union(
			supportedEngineIds.map((id) => z.literal(id)) as [
				z.ZodLiteral<string>,
				...z.ZodLiteral<string>[]
			]
		)
		.default(supportedEngineIds[0]),

	theme: z.enum(Themes).default(Themes[0]),

	cards: z.array(CardSchema).default([])
});

export type UserConfigTypeV0 = z.infer<typeof UserConfigSchemaV0>;
