import path from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

// https://vite.dev/config/
export default defineConfig({
	plugins: [svelte(), tailwindcss()],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	},
	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(pkg.version)
	}
});
