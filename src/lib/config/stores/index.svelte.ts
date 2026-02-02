import { createStorage } from '$lib/utils/storage-api';
import { ConfigStore } from './config.svelte';
import { ThemeStore } from './theme.svelte';

const STORAGE_KEY = 'userConfig';
const configStorage = createStorage(STORAGE_KEY);

export const configStore = new ConfigStore(configStorage);
export const themeStore = new ThemeStore(configStore);
