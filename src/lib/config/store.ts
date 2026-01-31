import { onDestroy } from 'svelte';
import { defaultConfig, getConfigVersion, type UserConfig } from '.';
import type { StorageAPI } from '$lib/utils/storage-api';
import {
	BASE_SCHEMA_VERSION,
	LATEST_SCHEMA_VERSION,
	validateUserConfig,
	type AnyUserConfigType
} from './schemas';
import { migrateUserConfig } from './migrations';

type Subscriber = (config: UserConfig | null) => void;

export class ConfigStore {
	private config: UserConfig = structuredClone(defaultConfig);
	private subscribers = new Set<Subscriber>();

	constructor(private storage: StorageAPI) {
		this.init();

		const unsubscribeStorage = this.storage.onChanged((newVal) => {
			if (!newVal || typeof newVal !== 'object') {
				this.notify(null);
				return;
			}

			const validated = this.validate(newVal);
			if (validated) {
				Object.assign(this.config, validated);
				this.notify(this.config);
				return;
			}
			this.notify(null);
		});

		onDestroy(() => {
			unsubscribeStorage();
			this.subscribers.clear();
		});
	}

	private async init() {
		const raw = await this.storage.get();
		if (!raw || typeof raw !== 'object') {
			this.notify(null);
			return;
		}

		const validated = this.validate(raw);
		if (validated) {
			Object.assign(this.config, validated);
			this.notify(this.config);
			return;
		}
		this.notify(null);
	}

	subscribe(cb: Subscriber): () => void {
		this.subscribers.add(cb);
		cb(this.config);
		return () => this.subscribers.delete(cb);
	}

	get(): UserConfig {
		return this.config;
	}

	set(config: UserConfig) {
		Object.assign(this.config, config);
		this.notify(this.config);
	}

	private notify(config: UserConfig | null) {
		for (const cb of this.subscribers) cb(config);
	}

	recover(raw: object): UserConfig | null {
		const configVersion = getConfigVersion(raw);

		const strict = validateUserConfig(raw, configVersion);
		if (strict.success) return strict.data as UserConfig;

		const recovered = validateUserConfig(raw, BASE_SCHEMA_VERSION);
		if (recovered.success) {
			return migrateUserConfig(recovered.data as AnyUserConfigType);
		}
		return null;
	}

	default(): UserConfig {
		return structuredClone(defaultConfig);
	}

	validate(raw: object): UserConfig | null {
		const configVersion = getConfigVersion(raw);

		if (configVersion !== LATEST_SCHEMA_VERSION) return null;

		const strict = validateUserConfig(raw, configVersion);
		if (strict.success) return strict.data as UserConfig;

		return null;
	}
}
