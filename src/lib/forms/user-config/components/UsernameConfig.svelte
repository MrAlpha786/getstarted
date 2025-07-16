<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	let { userName = $bindable(), error: error }: { userName: string; error?: string } = $props();
</script>

<div class="grid w-full gap-2">
	<Label for="username-input-form-field">Username</Label>
	<Input
		id="username-input-form-field"
		type="text"
		name="username"
		autocomplete="username"
		bind:value={userName}
		aria-invalid={!!error}
	/>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
