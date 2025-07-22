export function isFirefox(): boolean {
	return (
		typeof window !== 'undefined' &&
		typeof window.browser !== 'undefined' &&
		typeof window.browser.runtime !== 'undefined'
	);
}

export function isChrome(): boolean {
	return (
		typeof window !== 'undefined' &&
		typeof window.chrome !== 'undefined' &&
		typeof chrome.runtime !== 'undefined' &&
		typeof chrome.runtime.id !== 'undefined'
	);
}
