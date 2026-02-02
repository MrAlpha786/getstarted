import { createStorage } from '$lib/utils/storage-api';
import { ConfigStateStore } from './config.svelte';
import { ThemeStateStore } from './theme.svelte';

export { ThemeStateStore as ThemeState } from './theme.svelte';

const STORAGE_KEY = 'userConfig';
const configStorage = createStorage(STORAGE_KEY);

export const configStore = new ConfigStateStore(configStorage);
export const themeStore = new ThemeStateStore(configStore);
