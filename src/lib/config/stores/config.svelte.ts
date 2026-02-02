import { defaultConfig, getConfigVersion, type UserConfig } from '..';
import type { StorageAPI } from '$lib/utils/storage-api';
import {
	BASE_SCHEMA_VERSION,
	LATEST_SCHEMA_VERSION,
	validateUserConfig,
	type AnyUserConfigType
} from '../schemas';
import { migrateUserConfig } from '../migrations';

export class ConfigStore {
	#config: UserConfig = $state<UserConfig>(this.default());
	private unsubscribeStorage;

	constructor(private storage: StorageAPI) {
		this.initConfig();

		this.unsubscribeStorage = storage.onChanged((newVal) => {
			if (!newVal || typeof newVal !== 'object') return;

			const validated = this.validate(newVal);
			if (validated) {
				this.#config = validated;
				return;
			}
		});
	}

	destroy() {
		this.unsubscribeStorage();
	}

	private async initConfig(): Promise<void> {
		const raw = await this.storage.get();

		if (!raw || typeof raw !== 'object') {
			return;
		}

		const validated = this.validate(raw);
		if (validated) {
			this.#config = validated;
			return;
		}
	}

	get config() {
		return this.#config;
	}

	set config(v: UserConfig) {
		this.#config = v;
	}

	persist() {
		this.storage.set(this.#config);
	}

	createState<K extends keyof UserConfig>(key: K) {
		const store = this;

		return {
			get value(): UserConfig[K] {
				return store.#config[key];
			},
			set value(v: UserConfig[K]) {
				store.#config[key] = v;
				store.storage.set(store.#config);
			}
		};
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
