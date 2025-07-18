<script lang="ts">
	import Tabs from '$lib/components/Tabs.svelte';
	import Search from '$lib/components/Search.svelte';
	import { getSearchEngineById } from '$lib/constants/search-engines';
	import { config as currentConfig, subscribe } from '$lib/utils/user-config';
	import { toggleTheme } from '$lib/utils/theme';
	import Settings from '$lib/components/Settings.svelte';
	import { onDestroy } from 'svelte';

	let config = $state(currentConfig);

	const unsubscribe = subscribe((cfg) => {
		config = cfg;
	});

	onDestroy(() => unsubscribe());
</script>

<svelte:head>
	<title>GetStarted - Minimal & Fast Startpage</title>
	<meta
		name="description"
		content="GetStarted is a fast, minimal, and customizable offline startpage and PWA by MrAlpha786. Organize bookmarks, search with your favorite engine, and boost your productivity."
	/>
</svelte:head>

<section>
	<div id="container" class="mx-auto flex h-full w-[90%] max-w-[50rem] flex-col pt-[20vh]">
		<h1 class="mb-4 text-center text-4xl font-bold">
			Hi,
			<button
				class="text-base-100 bg-base-content cursor-pointer rounded-full px-4"
				onclick={toggleTheme}
				aria-label="Theme Toggle">{config.userName}</button
			>
		</h1>

		<Search searchEngine={getSearchEngineById(config.searchEngine)} />

		<Tabs cards={config.cards} />
		<!-- <button id="openSettingsBtn" class="btn btn-outline">⚙️ Settings</button> -->
		<Settings bind:config />
	</div>
</section>
