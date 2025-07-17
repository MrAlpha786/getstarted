<script lang="ts">
	import Button from './ui/button/button.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import support_me from '../../assets/images/support_me_on_kofi_dark.webp';
	import Twitter from '@lucide/svelte/icons/twitter';
	import Globe from '@lucide/svelte/icons/globe';
	import AtSign from '@lucide/svelte/icons/at-sign';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
</script>

<div class="my-4 space-y-6 px-4 text-sm">
	<div class="flex flex-col items-center gap-2">
		<img src="./icon/android-chrome-512x512.png" alt="GetStarted Icon" class="size-36" />
		<h1 class="font-logo text-2xl">GetStarted</h1>
	</div>
	<!-- About Section -->
	<section>
		<h2 class="text-foreground text-base font-semibold">About GetStarted</h2>
		<p class="mt-1">
			GetStarted is your customizable new tab and start page — designed to help you stay organized,
			focused, and in control of your workspace.
		</p>
		<ul class="mt-2 list-inside list-disc space-y-1">
			<li>✨ Organize bookmarks into smart cards</li>
			<li>🎨 Light / Dark / System themes</li>
			<li>🔍 Choose your favorite search engine</li>
			<li>🔄 Auto-syncs across your devices via browser sync</li>
			<li>🔒 100% local – no cloud, no tracking, no accounts</li>
		</ul>
	</section>

	<!-- Creator Section -->
	<section>
		<h2 class="text-foreground text-base font-semibold">Meet the Creator</h2>
		<p class="mt-1">
			GetStarted is handcrafted by <strong
				><Button href="https://mfaizan.com" variant="link" class="px-0">Muhammad Faizan</Button
				></strong
			>, a developer focused on privacy-first, user-centered web tools that make everyday workflows
			simpler and cleaner.
		</p>
		<p class="mt-1">
			If you enjoy using GetStarted, consider sharing it, sending feedback, or supporting the
			project!
		</p>

		<ul class="mt-2 space-y-1">
			<li class="flex items-center gap-1">
				<Globe class="size-4" /><span>Website:</span><Button
					href="https://mfaizan.com"
					variant="link"
					class="px-0">mfaizan.com</Button
				>
			</li>
			<li class="flex items-center gap-1">
				<Twitter class="size-4" /><span>Twitter/X:</span><Button
					href="https://x.com/mfaizanx"
					variant="link"
					class="px-0">@mfaizanx</Button
				>
			</li>
			<li class="flex items-center gap-1">
				<AtSign class="size-4" /><span>Email:</span><Button
					href="mailto:findme@mfaizan.com"
					variant="link"
					class="px-0">findme@mfaizan.com</Button
				>
			</li>
		</ul>

		<!-- Promote Links -->
		<div class="mt-4">
			<Button href="https://ko-fi.com/mfaizanx/tip" target="_blank" variant="ghost" class="px-0">
				<img src={support_me} alt="support creator" class="h-10" />
			</Button>
		</div>
	</section>

	<!-- License Section -->
	<section>
		<h2 class="text-foreground text-base font-semibold">License</h2>
		<Collapsible.Root>
			<div class="inline">
				<span>GetStarted is released under the </span>
				<Collapsible.Trigger class="inline-flex items-center gap-1 font-semibold">
					<span>MIT License</span>
					<ChevronDown class="mt-0.5 size-4" />
				</Collapsible.Trigger>.
			</div>

			<Collapsible.Content class="bg-base-200 mt-2 rounded-lg border p-4 text-left text-sm">
				<pre class="max-h-[30rem] overflow-auto break-words whitespace-pre-wrap"><code>
MIT License Copyright (c) 2025 Muhammad Faizan

Permission is hereby granted,
free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice
(including the next paragraph) shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
		</code></pre>
			</Collapsible.Content>
		</Collapsible.Root>
	</section>

	<!-- Privacy Section -->
	<section>
		<h2 class="text-foreground text-base font-semibold">Privacy & Storage</h2>
		<p class="mt-1">
			Your data stays entirely on your device and syncs securely using browser-native sync (no
			external servers).
		</p>
		<p class="mt-1">No telemetry, ads, or account needed — just fast, focused productivity.</p>
	</section>
</div>
