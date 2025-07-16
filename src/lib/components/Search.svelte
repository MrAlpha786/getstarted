<script lang="ts">
	import type { SearchEngine } from '$lib/types/user-config';

	const { searchEngine }: { searchEngine: SearchEngine } = $props();

	let searchValue = $state('');
	let placeholder = $derived(`Search ${searchEngine.name}...`);
	let searchIsEmpty = $derived(searchValue.trim() == '');

	function performSearch(e: Event) {
		e.preventDefault();
		if (!searchValue) return;
		window.open(searchEngine.url + encodeURIComponent(searchValue), '_self');
	}

	// This is a hack to get focus from browser searchbar
	if (location.search !== '?x') {
		location.search = '?x';
		throw new Error(); // load everything on the next page;
		// stop execution on this page
	}
</script>

<div
	class="bg-base-200 my-8 flex w-full flex-row items-center justify-between gap-4 rounded-xl p-3"
>
	<form class="w-full" onsubmit={(e) => performSearch(e)}>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus
			id="search-bar-input"
			name="searchbar"
			type="text"
			{placeholder}
			class="text-base-content w-full focus:outline-0"
			bind:value={searchValue}
		/>
	</form>

	<button class:hidden={searchIsEmpty} onclick={() => (searchValue = '')} aria-label="Clear Input">
		<svg
			class="h-4 w-4 fill-gray-400 hover:fill-current"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 371.23 371.23"
		>
			<path
				d="M371.23 21.213 350.018 0 185.615 164.402 21.213 0 0 21.213l164.402 164.402L0 350.018l21.213 21.212 164.402-164.402L350.018 371.23l21.212-21.212-164.402-164.403z"
			/>
		</svg>
	</button>

	<button
		class="text-gray-400 hover:text-current disabled:hover:text-gray-400"
		onclick={(e) => performSearch(e)}
		disabled={searchIsEmpty}
		aria-label="Search"
	>
		<svg
			class="h-4 w-4 fill-current"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 487.95 487.95"
		>
			<path
				d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"
			/>
		</svg>
	</button>
</div>
