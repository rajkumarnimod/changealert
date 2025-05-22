# ChangeAlert

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

**ChangeAlert** is a lightweight, customizable JavaScript alert notification library designed to enhance your web applications by providing visually appealing, interactive, and easy-to-use alert messages. It supports multiple alert types, sound notifications, custom icons, themes, and callback functions to create a dynamic user experience.

---

## Features

- Multiple alert types: success, error, warning, info
- Customizable alert position on screen
- Configurable timeout durations with pause on hover
- Sound support with default and custom sounds
- Dark and light themes
- Custom icons (including emojis)
- Close button with callbacks for clicks and closing events
- Responsive and mobile-friendly
- Easy integration with just CSS and JS files

---


## 🚀 Getting Started (Installation)

Simply include the CSS and JS files in your HTML:

> Place the script **before** `</body>` or use `defer`.

```html
<link rel="stylesheet" href="ChangeAlert.css">
<script src="ChangeAlert.js"></script>
```

### Download

Clone or grab the files:

``` html
/dist/style.css
/dist/script.js
```

---

## 🔧 Usage

### Basic Alerts

```js
ChangeAlert.success("Operation completed successfully!");
ChangeAlert.error("An error occurred!");
ChangeAlert.warning("This is a warning!");
ChangeAlert.info("Just an informational message!");
```

### Customized Alerts
>Pass optional settings as the second argument:

```js
ChangeAlert.success("File uploaded!", {
  position: "top-left",
  timeout: 5000,
  sound: true,
  theme: "dark",
  icon: "🎉",
  closeButton: true,
  pauseOnHover: true,
  onClick: () => alert("You clicked the alert!"),
  onClose: () => console.log("Alert closed!")
});

```

---

## 📚 API

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | `string` | `"info"` | Alert type (`success`, `error`, `warning`, `info`) |
| `message` | `string` | — | Content of the alert |
| `position` | `string` | `"top-right"` | Position on screen |
| `timeout` | `number` | `3000` | Auto‑dismiss delay (ms) – `0` disables |
| `icon` | `string` | *depends on type* | Emoji / SVG / HTML |
| `theme` | `string` | `"light"` | `"light"` or `"dark"` |
| `sound` | `boolean \| string` | `undefined` | `true`, `false`, or custom URL |
| `closeButton` | `boolean` | `true` | Show ✖ button |
| `pauseOnHover` | `boolean` | `true` | Pause timer on hover |
| `onClick` | `function` | `null` | Fired when alert clicked |
| `onClose` | `function` | `null` | Fired when alert removed |

---

## 🛠 Advanced Topics

### Custom Themes

Add your own CSS class:

```css
.changealert.myTheme {
  background: linear-gradient(135deg,#42e695,#3bb2b8);
  color:#fff;
}
```

```js
ChangeAlert.success("Gradient!", { theme: "myTheme" });
```

### Custom Sounds

```js
ChangeAlert.warning("Low battery!", {
  sound: "https://example.com/low-battery.mp3"
});
```

---

## 🌐 Browser Support

| Chrome | Firefox | Safari | Edge | Mobile |
|--------|---------|--------|------|--------|
| 49+ | 45+ | 9+ | 15+ | iOS 9+, Android 5+ |

*(Graceful degradation on very old browsers – no animation)*

---


## Demo 
>Use the following buttons to test alerts in your app:

```html
<button onclick="ChangeAlert.success('Success message!', { position: 'top-right', sound: true })">Success</button>
<button onclick="ChangeAlert.error('Error occurred!', { position: 'bottom-left', timeout: 5000 })">Error</button>
<button onclick="ChangeAlert.warning('Warning message!', { pauseOnHover: false, icon: '⚠️' })">Warning</button>
<button onclick="ChangeAlert.info('Info message!', { theme: 'dark', closeButton: false })">Info</button>
```

---
## Contributing

Thank you for your interest in contributing to ChangeAlert!

Currently, we do not have a public roadmap or an npm package. However, you can help by:

- Reporting bugs or issues via GitHub issues
- Suggesting new features
- Improving documentation or examples

Please keep contributions aligned with the library’s simplicity and usability goals.

---

## 📜 License

ChangeAlert is released under the [MIT license](LICENSE).

## License & Author

© 2025 Rajkumar Nimod. All rights reserved.

Created with ❤️ by Rajkumar Nimod.

Connect with me on [LinkedIn](https://www.linkedin.com/in/rajkumarnimod)


> _Cool alerts for cool websites!_
