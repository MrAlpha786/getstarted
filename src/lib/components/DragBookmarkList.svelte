<script lang="ts">
	import Input from '../components/ui/input/input.svelte';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import GripVertical from '@lucide/svelte/icons/grip-vertical';
	import { Button } from '../components/ui/button/index';
	import type { Bookmark, BookmarkErrors } from '$lib/types/user-config';
	import { dragHandleZone, dragHandle } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { ClassValue } from 'svelte/elements';

	let {
		items = $bindable(),
		errors,
		class: className = ''
	}: {
		items: Bookmark[];
		errors?: {
			[index: number]: BookmarkErrors;
		};
		class?: ClassValue;
	} = $props();

	const flipDurationMs = 100;
	const delayTouchStart = 300;
	const zoneTabIndex = 0;
	const zoneItemTabIndex = 0;

	function handleSort(e: CustomEvent) {
		items = e.detail.items;
	}
</script>

<div
	class={className}
	use:dragHandleZone={{ items, flipDurationMs, delayTouchStart, zoneTabIndex, zoneItemTabIndex }}
	onconsider={handleSort}
	onfinalize={handleSort}
>
	{#each items as item, i (item.id)}
		<div
			animate:flip={{ duration: flipDurationMs }}
			class="bg-base-100 flex items-center rounded-lg border p-1 shadow-sm"
		>
			<!-- Drag Handle -->
			<button
				type="button"
				tabindex="0"
				use:dragHandle
				aria-label="drag-handle for {item.label}"
				class="p-2"
			>
				<GripVertical class="size-4" />
			</button>

			<!-- Inputs -->
			<div class="flex w-full items-start justify-stretch gap-1 max-sm:flex-col">
				<!-- Label -->
				<div class="grid w-full gap-2 sm:w-1/3">
					<Input
						name="bookmark-label"
						class="bg-base-200 mr-2 h-8"
						bind:value={item.label}
						aria-invalid={!!errors?.[i]?.label}
					/>
					{#if errors?.[i]?.label}
						<p class="text-sm text-red-500">{errors[i].label}</p>
					{/if}
				</div>

				<!-- URL -->
				<div class="grid w-full gap-2 sm:w-2/3">
					<Input
						name="bookmark-url"
						class="bg-base-200 h-8 "
						bind:value={item.url}
						aria-invalid={!!errors?.[i]?.url}
					/>
					{#if errors?.[i]?.url}
						<p class="text-sm text-red-500">{errors[i].url}</p>
					{/if}
				</div>
			</div>

			<!-- Delete Button -->
			<Button
				variant="ghost"
				size="sm"
				type="button"
				onclick={() => {
					items = items.filter((targetItem) => targetItem.id !== item.id);
				}}
			>
				<Trash2 />
			</Button>
		</div>
	{/each}
</div>
