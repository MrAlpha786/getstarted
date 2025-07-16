<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	let {
		open = $bindable(),
		title = 'Are you sure?',
		description = '',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		onConfirm,
		onCancel = () => (open = false)
	}: {
		open?: boolean;
		title?: string;
		description?: string;
		confirmText?: string;
		cancelText?: string;
		onConfirm: (e: Event) => void;
		onCancel?: (e: Event) => void;
	} = $props();
</script>

<Dialog.Root {open} onOpenChange={(val) => (open = val)}>
	<Dialog.Content
		onOpenAutoFocus={(e) => {
			e.preventDefault();
			document.getElementById('dialog-config-button')?.focus();
		}}
		class="sm:max-w-md"
	>
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
			{#if description}
				<Dialog.Description>{description}</Dialog.Description>
			{/if}
		</Dialog.Header>

		<Dialog.Footer class="mt-4 flex justify-end gap-2">
			<Button variant="ghost" onclick={onCancel}>{cancelText}</Button>
			<Button id="dialog-config-button" onclick={onConfirm}>{confirmText}</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
