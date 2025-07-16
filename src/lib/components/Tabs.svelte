<script lang="ts">
	import type { Card } from '$lib/types/user-config';
	const { cards }: { cards: Card[] } = $props();

	let activeTab = $state(0);

	const tabText = ['sm:text-tab1', 'sm:text-tab2', 'sm:text-tab3', 'sm:text-tab4'];

	const tabBg = ['max-sm:bg-tab1', 'max-sm:bg-tab2', 'max-sm:bg-tab3', 'max-sm:bg-tab4'];

	const contentBg = ['hover:bg-tab1', 'hover:bg-tab2', 'hover:bg-tab3', 'hover:bg-tab4'];
</script>

<div class="w-full" id="tab-container">
	<!-- Tabs -->
	<div class="bg-base-200 flex gap-4 overflow-hidden rounded-t-xl max-sm:p-2 sm:bg-transparent">
		{#each cards as card, i (card.id)}
			<button
				class={`tab ${tabText[i]} ${i === activeTab ? `max-sm:text-white ${tabBg[i]}` : ''}`}
				onmouseenter={() => (activeTab = i)}
			>
				{card.name}
			</button>
		{/each}
	</div>

	<!-- Content -->
	<div class="flex items-start gap-4 overflow-hidden rounded-b-xl">
		{#each cards as card, i (card.id)}
			<div class={`content ${i === activeTab ? 'flex' : 'hidden'}`}>
				{#each card.bookmarks as bookmark (bookmark.id)}
					<a class={`bookmark ${contentBg[i]}`} href={bookmark.url}>
						{bookmark.label}
					</a>
				{/each}
			</div>
		{/each}
	</div>
</div>
