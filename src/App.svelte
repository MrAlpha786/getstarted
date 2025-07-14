<script lang="ts">
	import Tabs from './lib/components/Tabs.svelte';
	import Search from './lib/components/Search.svelte';
	import { supportedEngines } from './lib/constants/search-engines';
	import { config } from './lib/utils/config';
	import { toggleTheme } from './lib/utils/theme';
	import type { SearchEngine } from './lib/types';

	const allSearchEngines: Record<SearchEngine, string> = $derived({
		...supportedEngines,
		...(config.customEngines || {})
	});
</script>

<svelte:head>
	<title>GetStarted</title>
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

		<Search searchEngine={config.searchEngine} {allSearchEngines} />

		<Tabs cards={config.cards} />
		<!-- <button id="openSettingsBtn" class="btn btn-outline">⚙️ Settings</button> -->
	</div>
</section>
