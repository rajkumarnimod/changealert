# 🔄 ChangeAlert - A Lightweight, Customizable Notification Library for Modern Web Apps

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Overview

**ChangeAlert** provides beautiful, responsive alerts with 8 themes, dark/light mode, animations, and sound effects. Easily customizable with simple API calls. Perfect for form validations, system alerts, and user notifications. Works across all devices and browsers.

> A Complete Notification Library for Modern Web Apps

---

## 📦 Installation

### Via CDN (Easiest)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rajkumarnimod/changealert/dist/style.css">
<script src="https://cdn.jsdelivr.net/gh/rajkumarnimod/changealert/dist/script.js"></script>
```

### Download (Clone or grab the files)
```html
/dist/style.css
/dist/script.js
```

---

## 🛠️ How It Works

ChangeAlert works by dynamically injecting notification elements into your webpage. When triggered, it creates alert divs with your message, applies selected themes/animations, and positions them on screen. The `library` manages multiple alerts through a queue system, automatically handling show/hide transitions. Features like progress bars, sounds, and callbacks are processed through an optimized event system. It uses pure JavaScript with zero dependencies, ensuring fast performance across all browsers.

---

## ✅ Features

- Theme System: 8 color schemes + auto dark/light toggle
- Custom Icons: SVG, PNG or emoji support + default set
- Animations: 9 effects (fade/zoom/slide/bounce/spin)
- Positions: 6 screen locations + draggable option
- Queue Control: Smart stacking with priority management
- Accessibility: WCAG 2.1 compliant, keyboard navigable
- Progress Bars: Visual countdown with hover pause
- Sound Effects: Custom audio per alert type
- HTML Content: Rich text/images in alerts
- Action Buttons: Multiple configurable CTAs per alert
- Responsive: Mobile-optimized layouts
- RTL Support: Right-to-left language compatibility
- Callbacks: onShow/onClose/onClick hooks
- Performance: 5KB gzipped, 60fps animations
- Theming API: CSS variables + JS override methods
- Overlay Mode: Dimmed background option
- Z-Index Control: Always-on-top layer management

---

## 🚀 Basic Usage

### Simple Alert
```html
ChangeAlert.success("File uploaded successfully!");
```
### Alert with Options

```html
ChangeAlert.error("Login failed!", {
  timeout: 5000,       // Auto-close after 5s
  position: "top-center",
  animationIn: "bounce"
});
```

---

## 🔧 API Reference

### `ChangeAlert.watch(selector, callback)`

```html
{
  position: "top-right",   // Alert position
  timeout: 3000,           // Auto-close delay (0 = manual close)
  theme: "success",        // Alert type
  themeMode: "auto",       // "auto" | "light" | "dark"
  icon: null,              // Custom icon (HTML/SVG/URL)
  closeButton: true,       // Show close button
  pauseOnHover: true,      // Pause timeout on hover
  draggable: false,        // Make alert draggable
  progressBar: true,       // Show countdown bar
  sound: false,            // Enable sound
  html: false,             // Allow HTML content
  animationIn: "fadeIn",   // Entrance animation
  animationOut: "fadeOut", // Exit animation
  buttons: [               // Action buttons
    { text: "Retry", action: retryFunction }
  ]
}
```

##  Animation Types

```html
// Available animations:
"fadeIn" | "fadeOut" | "zoomIn" 
"slideInRight" | "slideInLeft" | "bounce" 
"flip" | "pulse" | "spin"

// Usage:
ChangeAlert.info("Look at this animation!", {
  animationIn: "flip",
  animationOut: "zoomOut"
});
```

---

## 🔔 Callbacks & Events

```html
ChangeAlert.warning("Unsaved changes!", {
  onShow: () => console.log("Alert appeared"),
  onClick: (e) => saveChanges(),
  onClose: () => console.log("Alert closed"),
  onTimeout: () => autoSave()
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
