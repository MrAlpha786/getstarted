import type { UserConfigErrors } from '$lib/types/user-config';

export function setNestedErrorWithIndexKeys(
	obj: UserConfigErrors,
	path: (string | number)[],
	message: string
) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let current: any = obj;
	for (let i = 0; i < path.length; i++) {
		const key = path[i];
		if (i === path.length - 1) {
			current[key] = message;
		} else {
			if (!(key in current)) current[key] = {};
			current = current[key];
		}
	}
}
