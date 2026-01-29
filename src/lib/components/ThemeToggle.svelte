<script lang="ts">
	import AppWindowMac from '@lucide/svelte/icons/app-window-mac';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import { setTheme, themeState } from '$lib/utils/theme';
	import type { Theme } from '$lib/states/theme';

	let current: Theme = $state(themeState.theme);
	let previous: Theme = themeState.theme;

	$effect(() => {
	if (current !== previous) {
		previous = current;
		setTheme(current);
	}
	});
</script>

<ToggleGroup.Root bind:value={current} variant="outline" type="single" class="w-full">
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
