# 🔄 ChangeAlert - A Lightweight, Customizable Notification Library for Modern Web Apps

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

**ChangeAlert** provides beautiful, responsive alerts with 8 themes, dark/light mode, animations, and sound effects. Easily customizable with simple API calls. Perfect for form validations, system alerts, and user notifications. Works across all devices and browsers.


## 📦 Installation

### Via CDN (Easiest)

```html
<!-- In your HTML <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rajkumarnimod/changealert/dist/changealert.min.css">

<!-- Just before </body> -->
<script src="https://cdn.jsdelivr.net/gh/rajkumarnimod/changealert/dist/changealert.min.js"></script>
```

### Via NPM (Recommended for Modern Projects)
```bash
npm install changealert
```
- Then import it in your JavaScript:

### For Webpack/Vite/ESM:
```js
import 'changealert/dist/changealert.min.css';
import ChangeAlert from 'changealert';
```

### For CommonJS:

```js
require('changealert/dist/changealert.min.css');
const ChangeAlert = require('changealert');
```

## 🛠️ How It Works

ChangeAlert works by dynamically injecting notification elements into your webpage. When triggered, it creates alert divs with your message, applies selected themes/animations, and positions them on screen. The `library` manages multiple alerts through a queue system, automatically handling show/hide transitions. Features like progress bars, sounds, and callbacks are processed through an optimized event system. It uses pure JavaScript with zero dependencies, ensuring fast performance across all browsers.

---

## ✅ Key Features

- 8 Color Themes (Success, Error, Info, etc.)
- Light/Dark/Auto Modes
- 9 Entrance Animations
- 6 Screen Positions
- Sound Effects for Alerts
- HTML or Plain Text Support
- Auto Close Timer + Progress Bars
- Custom Action Buttons
- Fully Responsive (Mobile-Friendly)
- RTL Text Support
- Callbacks (onShow, onClick, onClose, onTimeout)
- Works in Vanilla JS, React, Vue, Angular

---

## 🛠️ Usage Examples

### Simple Alert
```html
ChangeAlert.success("File uploaded successfully!");

// Demo Buttons 
<button onclick="ChangeAlert.primary('Primary Alert')"> Primary </button>
<button onclick="ChangeAlert.secondary('Secondary Alert')"> Secondary </button>
<button onclick="ChangeAlert.success('Success!')"> Success </button>
<button onclick="ChangeAlert.error('Error!')"> Error </button>
<button onclick="ChangeAlert.warning('Warning!')"> Warning </button>
<button onclick="ChangeAlert.info('Info!')"> Info </button>
<button onclick="ChangeAlert.question('Are you sure?')"> Question </button>
<button onclick="ChangeAlert.loading('Please wait...')"> Loading</button>
```
### Custom Alert with Options

```html
ChangeAlert.error("Login failed!", {
  timeout: 5000,
  position: "top-center",
  animationIn: "bounce"
});
```

---

## 🔧 Options Reference

```js
ChangeAlert.info("Custom message", {
  position: "top-right",     // Alert position on the screen: 'top-left', 'top-center', etc.
  timeout: 4000,             // Auto-close delay in milliseconds (0 = manual close only)
  theme: "info",             // Alert type: 'success', 'error', 'info', 'warning'
  themeMode: "auto",         // Color mode: 'auto', 'light', or 'dark'
  icon: null,                // Custom icon as HTML, SVG, or image URL
  closeButton: true,         // Show or hide the close (X) button
  pauseOnHover: true,        // Pause the timeout countdown when hovered
  draggable: false,          // Make alert draggable (if supported)
  progressBar: true,         // Display a visual countdown progress bar
  sound: false,              // Play sound when alert appears
  html: false,               // Enable raw HTML content inside alert
  animationIn: "fadeIn",     // Entry animation
  animationOut: "fadeOut",   // Exit animation
  buttons: [                 // Action buttons with custom text and callback
    { text: "Retry", action: retryFunction }
  ],
  onShow: () => console.log("Alert appeared"),     // Triggered when alert is shown
  onClick: (e) => saveChanges(),                   // Triggered when alert is clicked
  onClose: () => console.log("Alert closed"),      // Triggered when alert is manually closed
  onTimeout: () => autoSave()                      // Triggered when alert closes due to timeout
});
```

---

##  Animation Types

```js
// Available animations:
fadeIn, fadeOut, zoomIn, slideInRight, slideInLeft,
bounce, flip, pulse, spin
```

// Usage:
```js
ChangeAlert.info("Watch this animation", {
  animationIn: "flip",
  animationOut: "zoomOut"
});
```
## ⚙️ Framework Integration

### ✅ HTML
- Use via <script> and <link> as shown in CDN setup.

### ✅ React
```js
import 'changealert/dist/changealert.min.css';
import ChangeAlert from 'changealert';

ChangeAlert.success("Hello from ChangeAlert!");
```
```js

import ChangeAlert from 'changealert';
function App() {
 
  const showAlert = () => {
    ChangeAlert.success("Hello from ChangeAlert!",{sound:true});
  };

  return (
    <div>
      <button onClick={showAlert}>Show Alert</button>
    </div>
  );
}

export default App;
```
### ✅ Vue
```js
import 'changealert/dist/changealert.min.css';
import ChangeAlert from 'changealert';

ChangeAlert.warning("Vue alert works!");
```

### ✅ Angular
```js
import 'changealert/dist/changealert.min.css';
declare const ChangeAlert: any;

ChangeAlert.error("Angular alert triggered!");
```
---

## 🔔 Callbacks & Events

Use callbacks to hook into alert lifecycle.

```js
ChangeAlert.warning("Unsaved changes!", {
  onShow: () => console.log("Alert appeared"),
  onClick: () => saveChanges(),      // Triggered when alert is clicked
  onClose: () => console.log("Alert closed"),
  onTimeout: () => autoSave()        // When alert disappears automatically
});
```

---

## 📱 Mobile Responsiveness
> Automatically adjusts for small screens:

- Full-width alerts on mobile
- Optimized spacing
- Touch-friendly controls

---
## 🌐 Browser Support

ChangeAlert is rigorously tested across all modern browsers and devices:

| Browser | Version | Mobile Support | Notes |
|---------|---------|----------------|-------|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" width="16"> Chrome | 49+ | ✅ Android 5+ | Full functionality |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg" width="16"> Firefox | 45+ | ✅ All devices | Best performance |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/safari/safari-original.svg" width="16"> Safari | 9+ | ✅ iOS 9+ | Reduced animations |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/edge/edge-original.svg" width="16"> Edge | 15+ | ✅ Windows Mobile | Full support |

**Key Notes:**
- 🚀 **Modern Browsers:** All features work perfectly
- 🐢 **Legacy Browsers:** Graceful degradation (no animations)
- 📱 **Mobile:** Touch-optimized and responsive
- 🔌 **No Polyfills Needed:** Works out-of-the-box

*(Tested via BrowserStack on 100+ device/browser combinations)*

---


## 🌐 Documentation

👉 **Documentation:** <https://changealert.netlify.app/>

---

## 📚 Documentation & Links

- **GitHub:** <https://github.com/rajkumarnimod/changealert>
- **LinkedIn:** <https://www.linkedin.com/in/rajkumar-nimod>

---

## 🏷️ Keywords

`ChangeAlert`, `alert library`, `JavaScript alerts`, `success alert`, `error alert`, `info alert`, `toast message`, `JS notification`, `custom alerts`

---

## Author

Created with ❤️ by Rajkumar Nimod.

Connect with me on [LinkedIn](https://www.linkedin.com/in/rajkumar-nimod)
📫 rajkumar221299@gmail.com

---

## 📄 License

MIT License – Free for personal and commercial use.

---

## 🌟 Support the Project

If you find ChangeAlert useful:

- ⭐ Star the repo
- 🗣 Share with fellow developers
- 📢 Mention it in blogs, videos, or tutorials
