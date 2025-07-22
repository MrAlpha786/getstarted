<script lang="ts">
	import type { UserConfig, UserConfigErrors } from '$lib/types/user-config';

	import SearchEngineConfig from './components/SearchEngineConfig.svelte';
	import UsernameConfig from './components/UsernameConfig.svelte';
	import TabConfig from './components/TabConfig.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import ConfirmnDialog from '$lib/components/ConfirmnDialog.svelte';
	import { isFirefox } from '$lib/utils/browser';

	let {
		save = $bindable(),
		config = $bindable(),
		errors = $bindable(),
		onSubmitCallback
	}: {
		save: boolean;
		config: UserConfig;
		errors: UserConfigErrors;
		onSubmitCallback: (e: Event) => boolean;
	} = $props();

	let activeTab = $state('tab-1');
	let confirmDialogOpen = $state(false);

	function addBookmarkToCard(index: number) {
		config.cards[index].bookmarks.push({ id: Date.now(), label: '', url: '' });
		config.cards = [...config.cards];
	}

	$effect(() => {
		if (errors) {
			const cardsWithErrors = Object.keys(errors.cards ?? {});
			if (cardsWithErrors.length > 0) {
				activeTab = `tab-${Number(cardsWithErrors[0]) + 1}`;
			}
			return;
		}
	});

	function handleSubmit(e: Event) {
		if (!onSubmitCallback(e)) {
			return;
		}

		confirmDialogOpen = true;
	}
</script>

<form class="grid w-full gap-4 p-4" onsubmit={handleSubmit}>
	<div class="flex w-full items-start gap-4 max-sm:flex-col">
		<UsernameConfig bind:userName={config.userName} error={errors.userName} />
		{#if isFirefox()}
			<SearchEngineConfig bind:searchEngine={config.searchEngine} error={errors.searchEngine} />
		{/if}
	</div>

	<TabConfig
		bind:cards={config.cards}
		errors={errors.cards}
		bind:activeTab
		onAddBookmark={addBookmarkToCard}
	/>

	<Button type="submit" class="mt-4">Save Changes</Button>
</form>

<ConfirmnDialog
	bind:open={confirmDialogOpen}
	title="Save your changes?"
	description="You’ve made changes. Would you like to save them before continuing?"
	confirmText="Save"
	cancelText="Cancel"
	onConfirm={() => {
		save = true;
		confirmDialogOpen = false;
	}}
	onCancel={() => {
		confirmDialogOpen = false;
	}}
/>
