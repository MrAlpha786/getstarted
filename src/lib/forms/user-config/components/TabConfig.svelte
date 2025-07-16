<!-- components/ConfigTabs.svelte -->
<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import DragBookmarkList from '$lib/components/DragBookmarkList.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import Plus from '@lucide/svelte/icons/plus';
	import type { Card, CardErrors } from '$lib/types/user-config';

	let {
		cards = $bindable(),
		errors,
		activeTab = $bindable(),
		onAddBookmark
	}: {
		cards: Card[];
		errors?: {
			[index: number]: CardErrors;
		};
		activeTab: string;
		onAddBookmark: (index: number) => void;
	} = $props();

	const tabBg = ['bg-tab1', 'bg-tab2', 'bg-tab3', 'bg-tab4'];
</script>

<Tabs.Root bind:value={activeTab} class="mt-2 rounded-lg border p-2 shadow-xs">
	<Tabs.List class="w-full">
		{#each cards as card, i (card.id)}
			<Tabs.Trigger value={'tab-' + (i + 1)}>{card.name || `Card ${i + 1}`}</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{#each cards as card, i (card.id)}
		<Tabs.Content value={'tab-' + (i + 1)}>
			<div class="mb-2 flex gap-4">
				<div class={'h-9 w-9 rounded-md border shadow-xs ' + tabBg[i]}></div>
				<div class="grid w-full gap-2">
					<Input name="cardname" bind:value={card.name} aria-invalid={!!errors?.[i]?.name} />
					{#if errors?.[i]?.name}
						<p class="text-sm text-red-500">{errors?.[i]?.name}</p>
					{/if}
				</div>
			</div>

			<DragBookmarkList
				bind:items={card.bookmarks}
				errors={errors?.[i]?.bookmarks}
				class="bg-input/70 mt-2 space-y-1 rounded-lg p-2"
			/>

			<Button
				variant="secondary"
				type="button"
				onclick={() => onAddBookmark(i)}
				class="mt-2 w-full"
			>
				<Plus class="size-4" /> Add Bookmark
			</Button>
		</Tabs.Content>
	{/each}
</Tabs.Root>
