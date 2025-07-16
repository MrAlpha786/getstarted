<script lang="ts">
	import AppWindowMac from '@lucide/svelte/icons/app-window-mac';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import { getThemeSetting, setTheme } from '$lib/utils/theme';
	import type { ThemeSetting } from '$lib/types/user-config';

	let themesetting: ThemeSetting = $state(getThemeSetting());
	// svelte-ignore state_referenced_locally
	let previous: ThemeSetting = themesetting;

	$effect(() => {
		// toggling again same button set its value to empty string
		if (!themesetting) {
			themesetting = previous;
			return;
		}
		previous = themesetting;
		setTheme(themesetting);
	});
</script>

<ToggleGroup.Root bind:value={themesetting} variant="outline" type="single" class="w-full">
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
