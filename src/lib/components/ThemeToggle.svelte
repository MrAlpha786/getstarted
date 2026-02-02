<script lang="ts">
	import AppWindowMac from '@lucide/svelte/icons/app-window-mac';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import type { Theme } from '$lib/constants/themes';
	import { themeStore } from '$lib/config/stores/index.svelte';

	let previous: Theme = themeStore.theme;

	$effect(() => {
		if (themeStore.theme !== previous) {
			previous = themeStore.theme;
			themeStore.theme = themeStore.theme;
		}
	});
</script>

<ToggleGroup.Root bind:value={themeStore.theme} variant="outline" type="single" class="w-full">
	<ToggleGroup.Item value="system" aria-label="Select System Theme">
		<AppWindowMac class="size-4" /><span>System</span>
	</ToggleGroup.Item>
	<ToggleGroup.Item value="light" aria-label="Select Light Theme">
		<Sun class="size-4" /><span>Light</span>
	</ToggleGroup.Item>
	<ToggleGroup.Item value="dark" aria-label="Select Dark Theme">
		<Moon class="size-4" /><span>Dark</span>
	</ToggleGroup.Item>
</ToggleGroup.Root>
