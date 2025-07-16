import { z } from 'zod/v4';
import { supportedEngines } from '$lib/constants/search-engines';

z.config({ jitless: true });

export const BookmarkSchema = z.object({
	id: z.number(),
	label: z.string().min(1, 'Label is required'),
	url: z.string().url('Must be a valid URL')
});

export const CardSchema = z.object({
	id: z.number(),
	name: z.string().min(1, 'Card name is required'),
	bookmarks: z.array(BookmarkSchema)
});

const supportedEngineIds = supportedEngines.map((e) => e.id);

export const UserConfigSchema = z.object({
	userName: z.string().min(1, 'Username is required'),
	searchEngine: z.union(
		supportedEngineIds.map((id) => z.literal(id)) as [
			z.ZodLiteral<string>,
			...z.ZodLiteral<string>[]
		]
	),
	cards: z.array(CardSchema)
});

export type UserConfigInput = z.infer<typeof UserConfigSchema>;
