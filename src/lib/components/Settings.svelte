<script lang="ts">
	import Cog from '@lucide/svelte/icons/cog';
	import UserConfigForm from '../forms/user-config/UserConfigForm.svelte';
	import * as Sheet from './ui/sheet';
	import ThemeToggle from './ThemeToggle.svelte';
	import Label from './ui/label/label.svelte';
	import { saveConfig } from '$lib/utils/user-config';
	import ConfirmnDialog from './ConfirmnDialog.svelte';
	import type { UserConfig } from '$lib/types/user-config';

	let { config = $bindable() }: { config: UserConfig } = $props();
	let save = $state(false);
	let sheetOpen = $state(true);
	let confirmDialogOpen = $state(false);
	let currentConfig = $state.snapshot(config);

	$effect(() => {
		if (save && JSON.stringify($state.snapshot(config)) !== JSON.stringify(currentConfig)) {
			saveConfig($state.snapshot(config));
			currentConfig = $state.snapshot(config);
			sheetOpen = false;
		}
		save = false;
	});
</script>

<Sheet.Root
	bind:open={sheetOpen}
	onOpenChange={(newVal) => {
		if (!newVal && JSON.stringify($state.snapshot(config)) !== JSON.stringify(currentConfig)) {
			// Trigger confirm dialog instead of closing
			confirmDialogOpen = true;
			sheetOpen = true;
		}
	}}
>
	<Sheet.Trigger aria-label="Open Settings" class="fixed right-4 bottom-4 md:right-8 md:bottom-8"
		><Cog class="transition hover:rotate-45" /></Sheet.Trigger
	>
	<Sheet.Content
		onOpenAutoFocus={(e) => {
			e.preventDefault();
			document.getElementById('username-input-form-field')?.focus();
		}}
		class="w-full overflow-auto sm:max-w-full! lg:max-w-3/4!"
	>
		<Sheet.Header>
			<Sheet.Title>Edit GetStarted</Sheet.Title>
			<Sheet.Description>
				Customize your GetStarted experience. Adjust settings to personalize the app according to
				your preferences.
			</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-2 px-4">
			<Label for="theme">Theme</Label>
			<ThemeToggle />
		</div>
		<UserConfigForm bind:save bind:config />
	</Sheet.Content>
</Sheet.Root>

<ConfirmnDialog
	bind:open={confirmDialogOpen}
	title="Discard or save changes?"
	description="You have unsaved changes. Do you want to save them before leaving?"
	confirmText="Save Changes"
	cancelText="Discard"
	onConfirm={() => {
		save = true;
		confirmDialogOpen = false;
		sheetOpen = false;
	}}
	onCancel={() => {
		confirmDialogOpen = false;
		sheetOpen = false;
	}}
/>
