<script lang="ts">
	import Tabs from '$lib/components/Tabs.svelte';
	import Search from '$lib/components/Search.svelte';
	import { getSearchEngineById } from '$lib/constants/search-engines';
	import Settings from '$lib/components/Settings.svelte';
	import { onDestroy } from 'svelte';
	import { configStore, themeStore } from '$lib/config/stores/index.svelte';

	onDestroy(() => configStore.destroy());
</script>

<svelte:head>
	<title>GetStarted - Minimal & Fast Startpage</title>
	<meta
		name="description"
		content="GetStarted is a fast, minimal, and customizable offline startpage and PWA by MrAlpha786. Organize bookmarks, search with your favorite engine, and boost your productivity."
	/>
</svelte:head>

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
		<!-- <button id="openSettingsBtn" class="btn btn-outline">⚙️ Settings</button> -->
		<Settings />
	</div>
</section>
