<!-- components/ConfigSearchEngine.svelte -->
<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import Label from '$lib/components/ui/label/label.svelte';
	import { supportedEngines, getSearchEngineById } from '$lib/constants/search-engines';

	let { searchEngine = $bindable(), error: error }: { searchEngine: string; error?: string } =
		$props();
</script>

<div class="grid w-full gap-2">
	<Label for="search-engine">Default Search Engine</Label>
	<Select.Root name="search-engine" type="single" bind:value={searchEngine}>
		<Select.Trigger id="search-engine" class="w-full" aria-invalid={!!error}>
			{searchEngine ? getSearchEngineById(searchEngine).name : 'Select default search engine.'}
		</Select.Trigger>
		<Select.Content>
			{#each supportedEngines as engine (engine.id)}
				<Select.Item value={engine.id} label={engine.name}>{engine.name}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
