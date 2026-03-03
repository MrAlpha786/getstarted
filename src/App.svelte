<script lang="ts">
	import Tabs from '$lib/components/Tabs.svelte';
	import Search from '$lib/components/Search.svelte';
	import { getSearchEngineById } from '$lib/constants/search-engines';
	import Settings from '$lib/components/Settings.svelte';
	import ConfirmnDialog from '$lib/components/ConfirmnDialog.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { configStore, themeStore, initStores } from '$lib/config/stores/index.svelte';

	let corruptDialogOpen = $derived(configStore.status.value === 'invalid');
	let recoveryFailed = $state(false);

	onMount(() => initStores());
	onDestroy(() => configStore.destroy());
</script>

<svelte:head>
	<title>GetStarted - Minimal & Fast Startpage</title>
	<meta
		name="description"
		content="GetStarted is a fast, minimal, and customizable offline startpage and PWA by MrAlpha786. Organize bookmarks, search with your favorite engine, and boost your productivity."
	/>
</svelte:head>

<ConfirmnDialog
	bind:open={corruptDialogOpen}
	title="Corrupt Config Detected"
	description={recoveryFailed
		? 'Recovery failed. Continuing with your last known good config.'
		: 'Your config appears to be corrupted. You can try to recover it or continue with your last known good config.'}
	confirmText={recoveryFailed ? 'OK' : 'Try to Recover'}
	cancelText="Cancel"
	onConfirm={() => {
		if (recoveryFailed || !configStore.attemptRecovery()) {
			recoveryFailed = false;
			configStore.markValid();
		} else {
			recoveryFailed = true;
		}
	}}
	onCancel={() => configStore.markValid()}
/>

{#if configStore.status.value !== 'pending'}
	<section>
		<div id="container" class="mx-auto flex h-full w-[90%] max-w-200 flex-col pt-[20vh]">
			<h1 class="mb-4 text-center text-4xl font-bold">
				Hi,
				<button
					class="text-base-100 bg-base-content cursor-pointer rounded-full px-4"
					onclick={() => themeStore.rotate()}
					aria-label="Theme Toggle">{configStore.config.userName}</button
				>
			</h1>

			<Search searchEngine={getSearchEngineById(configStore.config.searchEngine)} />
			<Tabs cards={configStore.config.cards} />
			<Settings />
		</div>
	</section>
{/if}
