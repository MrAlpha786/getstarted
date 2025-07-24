<p align="center"><a href="#"><img width="120" src="public/favicon.svg"/></a></p>
<h1 align="center">GetStarted – Minimal & Fast Startpage</h1>
<p align="center">Minimal & fast startpage for you browser.</p>

<p align="center">
<a href="https://chromewebstore.google.com/detail/getstarted-minimal-fast-s/gegjomjnkboaliomeoedmdgefofeplgc"><img alt="Chrome Web Store" src="asset/chrome-branding.png" width=200></a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/getstarted-startpage/"><img alt="Mozilla Add-on Version" src="asset/firefox-branding.png" width=150></a>
<a href="https://apps.microsoft.com/detail/0RDCKG2QPN6W?referrer=appbadge&launch=true&mode=full">
	<img src="asset/microsoft-branding.svg" width="190"/>
</a>
</p>
<p align="center">
<a href="https://chromewebstore.google.com/detail/getstarted-minimal-fast-s/gegjomjnkboaliomeoedmdgefofeplgc"><img alt="Chrome Web Store Version" src="https://img.shields.io/chrome-web-store/v/gegjomjnkboaliomeoedmdgefofeplgc"></a>
<a href="https://addons.mozilla.org/en-US/firefox/addon/getstarted-startpage/"><img alt="Mozilla Add-on Version" src="https://img.shields.io/amo/v/getstarted-startpage"></a>
<a href="https://github.com/mralpha786/getstarted/releases/latest"><img alt="Github Latest Release" src="https://img.shields.io/github/v/release/mralpha786/getstarted?style=flat&color=dodgerblue"/></a>
<a href="/LICENSE"><img alt="GitHub License" src="https://img.shields.io/github/license/mralpha786/getstarted"></a>
</p>

## Screenshots

<!-- <p align="center">
<img src="asset/getstarted.gif"/>
</p>
<hr/> -->

[<img src="asset/phone-light.png" width="160" />](asset/phone-light.png)
[<img src="asset/phone-dark.png" width="160" />](asset/phone-dark.png)
[<img src="asset/phone-settings-light.png" width="160" />](asset/phone-settings-light.png)
[<img src="asset/phone-settings-dark.png" width="160" />](asset/phone-settings-dark.png)
<br/>
[<img src="asset/ipad-light.png" width="200" />](asset/ipad-light.png)
[<img src="asset/ipad-dark.png" width="200" />](asset/ipad-dark.png)
[<img src="asset/ipad-settings-light.png" width="200" />](asset/ipad-settings-light.png)
[<img src="asset/ipad-settings-dark.png" width="200" />](asset/ipad-settings-dark.png)
<br/>
[<img src="asset/desktop-light.png" width="405" />](asset/desktop-light.png)
[<img src="asset/desktop-dark.png" width="405" />](asset/desktop-dark.png)
[<img src="asset/desktop-settings-light.png" width="405" />](asset/desktop-settings-light.png)
[<img src="asset/desktop-settings-dark.png" width="405" />](asset/desktop-settings-dark.png)

## Description

GetStarted replaces your browser's default new tab with a distraction-free startpage. It focuses on simplicity, clarity, and utility. You get a centered search bar and your most important bookmarks grouped into categories. That's it.

This extension works across Chrome, Firefox, and Safari. Your settings are automatically synced using browser sync storage. It’s responsive and works across all screen sizes.

### Features

- Light and dark mode toggle
- Configurable bookmarks with categories
- Responsive layout for all screen sizes
- Automatic syncing of settings using browser sync storage
- Settings preserved locally across sessions
- Built-in search bar and keyboard navigation

## Installation

### Available on:

- [Chrome Web Store](https://chromewebstore.google.com/detail/gegjomjnkboaliomeoedmdgefofeplgc?utm_source=item-share-cb)
- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/getstarted-startpage/)

### Manual Installation For Testing Purposes

1. Go to [Latest Release](https://github.com/mralpha786/getstarted/releases/latest)
2. Download the `.zip` for your browser:
   - `getstarted-*-chrome.zip`
   - `getstarted-*-firefox.zip`
   - `getstarted-*-safari.zip`
3. Unzip and follow your browser’s guide to install unpacked extensions:

#### Chrome

1. Open `chrome://extensions/`
2. Enable Developer mode
3. Click Load unpacked and select the extracted folder

#### Firefox

1. Open about:debugging
2. Click This Firefox
3. Click Load Temporary Add-on and select manifest.json in the extracted folder

#### Safari

1. Open `Settings` and go to the `Advanced` tab
2. Enable `Show features for web developers`, a new `Developer` tab will be added to settings.
3. Go to `Developer` and click Add Temporary Extension
4. Select the extracted folder and enable extension.

## 🛠️ Development

### Requirements

- Nodejs (v22)
- pnpm (v10.13.1)

### Initial setup

```bash
pnpm install
```

### To test in development

```bash
pnpm run dev
```

### To test as an extension

```bash
pnpm run build
pnpm run bundle firefox
```

- Build will be in `/dist` and a zipped version will be in `/artifects`.
- Follow the [Manual Installation Instruction](#manual-installation-for-testing-purposes)

> [!Caution]
> `/dist` is hardcoded as the default build location. A lot of scripts (e.g. `npm run bundle`) check for files in this directory.

> [!Note]
> `pnpm run bundle` require `chrome`, `firefox`, or `safari` as a required argument.

# Contributions

Contributions are welcome. Please open an issue to discuss any changes before submitting a pull request. Ensure code is linted, tested, and adheres to the project's style.

# Donation

If you find this extension helpful and would like to support its ongoing development, consider making a donation. Your contribution helps cover the costs of development, testing, browser publishing fees, and maintaining the project over time.

**Remember:** GetStarted will always remain free and open source. But if you'd like to show your appreciation, even a small amount goes a long way.

<a href='https://ko-fi.com/mfaizanx/tip' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

Thank you for your support!

# License

MIT License - see [LICENSE](./LICENSE) for details.
