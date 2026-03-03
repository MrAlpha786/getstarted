import { defaultConfig, getConfigVersion, type UserConfig } from '..';
import type { StorageAPI } from '$lib/utils/storage-api';
import {
	BASE_SCHEMA_VERSION,
	LATEST_SCHEMA_VERSION,
	validateUserConfig,
	type AnyUserConfigType
} from '../schemas';
import { migrateUserConfig } from '../migrations';

export type ConfigLoadState =
	| { value: 'pending' }
	| { value: 'ok' }
	| { value: 'invalid'; data: object };

export class ConfigStore {
	#config: UserConfig = $state<UserConfig>(this.default());
	#loadstate: ConfigLoadState = $state({ value: 'pending' });

	private unsubscribeStorage;

	constructor(private storage: StorageAPI) {
		this.unsubscribeStorage = storage.onChanged((newVal) => {
			try {
				this.applyFromStorage(newVal ? JSON.parse(newVal) : null);
			} catch {
				console.error('Failed to parse config from storage event');
				this.#loadstate = { value: 'invalid', data: {} };
			}
		});
	}

	async init(): Promise<void> {
		try {
			const raw = await this.storage.get();
			if (!raw) {
				this.#loadstate = { value: 'ok' };
				return;
			}
			this.applyFromStorage(JSON.parse(raw));
		} catch {
			console.error('Failed to read config from storage');
			this.#loadstate = { value: 'invalid', data: {} };
		}
	}

	destroy() {
		this.unsubscribeStorage();
	}

	private applyFromStorage(raw: unknown): void {
		if (raw === null || raw === undefined) {
			this.#loadstate = { value: 'ok' };
			return;
		}

		if (typeof raw !== 'object') {
			this.#loadstate = { value: 'invalid', data: {} };
			return;
		}

		const validated = this.validate(raw as object);
		if (validated) {
			this.#config = validated;
			this.#loadstate = { value: 'ok' };
			return;
		}

		this.#loadstate = { value: 'invalid', data: raw as object };
	}

	get status(): ConfigLoadState {
		return this.#loadstate;
	}

	get config() {
		return this.#config;
	}

	set config(v: UserConfig) {
		const validated = this.validate(v);
		if (validated) {
			this.#config = validated;
			return;
		}
		throw new Error('Invalid config: failed validation');
	}

	persist() {
		if (this.#loadstate.value === 'pending') return;
		this.storage.set(JSON.stringify(this.#config));
	}

	attemptRecovery(): boolean {
		if (this.#loadstate.value !== 'invalid') return false;

		const recovered = this.recover(this.#loadstate.data);
		if (recovered) {
			this.#config = recovered;
			this.#loadstate = { value: 'ok' };
			this.persist();
			return true;
		}

		return false;
	}

	markValid(): void {
		this.#loadstate = { value: 'ok' };
		this.persist();
	}

	createState<K extends keyof UserConfig>(key: K) {
		const store = this;

		return {
			get value(): UserConfig[K] {
				return store.#config[key];
			},
			set value(v: UserConfig[K]) {
				const current = $state.snapshot(store.#config);
				current[key] = v;
				try {
					store.config = current;
				} catch (e) {
					throw new Error(
						`Invalid value for key "${String(key)}": ${e instanceof Error ? e.message : 'failed validation'}`
					);
				}
			}
		};
	}

	recover(raw: object): UserConfig | null {
		const configVersion = getConfigVersion(raw);

		const strict = validateUserConfig(raw, configVersion);
		if (strict.success) return strict.data as UserConfig;

		const recovered = validateUserConfig(raw, BASE_SCHEMA_VERSION);
		if (!recovered.success) {
			console.error('Config recovery failed: could not parse against base schema', recovered.error);
			return null;
		}

		const migrated = migrateUserConfig(recovered.data as AnyUserConfigType);
		const revalidated = this.validate(migrated);
		if (!revalidated) {
			console.error('Config recovery failed: migrated config is invalid');
			return null;
		}

		return revalidated;
	}

	default(): UserConfig {
		return structuredClone(defaultConfig);
	}

	validate(raw: object): UserConfig | null {
		const configVersion = getConfigVersion(raw);

		if (configVersion !== LATEST_SCHEMA_VERSION) {
			console.error(
				`Config version mismatch: expected ${LATEST_SCHEMA_VERSION}, got ${configVersion}`
			);
			return null;
		}

		const strict = validateUserConfig(raw, configVersion);
		if (strict.success) return strict.data as UserConfig;

		console.error('Config validation failed:', strict.error?.issues);
		return null;
	}
}
