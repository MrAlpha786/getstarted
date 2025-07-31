<script lang="ts">
	import type { UserConfig } from '$lib/types/user-config';
	import Button from './ui/button/button.svelte';
	import Label from './ui/label/label.svelte';
	import ConfirmnDialog from './ConfirmnDialog.svelte';
	import Plus from '@lucide/svelte/icons/plus';
	import Download from '@lucide/svelte/icons/download';
	import { tryImportUserConfig } from '$lib/utils/importUserConfig';

	let {
		config = $bindable(),
		onImport
	}: { config: UserConfig; onImport?: (config: UserConfig) => void } = $props();

	const VERSION = import.meta.env.APP_VERSION || 'unknown';

	function exportSettings() {
		const exportObj = {
			version: VERSION,
			config: $state.snapshot(config)
		};
		const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
		const dlAnchorElem = document.createElement('a');
		dlAnchorElem.setAttribute('href', dataStr);
		dlAnchorElem.setAttribute('download', `getstarted-settings-v${VERSION}.json`);
		dlAnchorElem.click();
	}

	let importDialogOpen = $state(false);
	let importDialogMessage = $state('');
	let importDialogTitle = $state('Import Error');

	function showDialog(message: string, title = 'Import Error') {
		importDialogMessage = message;
		importDialogTitle = title;
		importDialogOpen = true;
	}

	function importSettings(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const imported = JSON.parse(e.target?.result as string);
					const result = tryImportUserConfig(imported, VERSION);
					if (!result.success) {
						let msg = result.error || 'Import failed.';
						if (result.helpUrl) {
							msg += `\nSee: ${result.helpUrl}`;
						}
						showDialog(msg, 'Import Error');
						return;
					}
					if (result.config != null) {
						if (onImport) onImport(result.config);
						else config = result.config;
					}
                    showDialog(`Settings imported successfully from ${file.name}.`, 'Import Successful');
				} catch {
					showDialog('Invalid settings file.');
				}
			};
			reader.readAsText(file);
		}
	}
</script>

<Label>{#snippet child({ props })}<span {...props}>Import/Export Settings</span>{/snippet}</Label>
<div class="flex w-full flex-col gap-4 sm:flex-row">
	<Button onclick={exportSettings} variant="outline" class="w-full flex-1">
		<Download class="h-4 w-4" />
		<span>Export Settings</span>
	</Button>
	<Button variant="outline" class="relative w-full flex-1">
		<Plus class="h-4 w-4" />
		<span>Import Settings</span>
		<input
			type="file"
			accept="application/json"
			onchange={importSettings}
			class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
		/>
	</Button>
</div>
<span class="text-muted-foreground mb-2 text-xs"
	>Exported file: <code>getstarted-settings-v{VERSION}.json</code></span
>

<ConfirmnDialog
	bind:open={importDialogOpen}
	title={importDialogTitle}
	description={importDialogMessage}
	confirmText="OK"
	onConfirm={() => {
		importDialogOpen = false;
	}}
/>
