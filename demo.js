/**
 * ChangeAlert - A customizable alert library
 * Version: 1.2.0
 * License: MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ChangeAlert = factory());
}(this, (function () {
  'use strict';

  // Default configuration
  const DEFAULTS = {
    position: 'top-right',
    timeout: 5000,
    theme: 'primary',
    themeMode: 'auto', // 'auto' | 'light' | 'dark'
    icon: null,
    closeButton: true,
    pauseOnHover: true,
    draggable: false,
    progressBar: true,
    sound: false,
    html: false,
    animationIn: 'fadeIn',
    animationOut: 'fadeOut',
    onClick: null,
    onClose: null,
    onShow: null,
    onTimeout: null,
    rtl: false,
    customClass: '',
    queue: true,
    zIndex: 999999,
    overlay: false,
    overlayClose: false,
    overlayColor: 'rgba(0,0,0,0.5)',
    customIcon: null,
    customSound: null,
    buttons: null,
    focus: true
  };

  // Theme sound mapping
  const SOUNDS = {
    success: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg",
    error: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
    warning: "https://actions.google.com/sounds/v1/alarms/beep_soft.ogg",
    info: "https://actions.google.com/sounds/v1/alarms/button_click_off.ogg",
    question: "https://actions.google.com/sounds/v1/alarms/button_click_on.ogg",
    loading: "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
  };

  // Default icons (SVG)
  const DEFAULT_ICONS = {
    success: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/></svg>',
    error: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12S6.47 22 12 22 22 17.53 22 12 17.53 2 12 2M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"/></svg>',
    warning: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"/></svg>',
    info: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13 9H11V7H13M13 17H11V11H13M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z"/></svg>',
    question: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 18H13V16H11V18M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8S14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z"/></svg>',
    loading: '<svg viewBox="0 0 24 24" class="changealert-spinner"><path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg>'
  };

  // Queue management
  let alertQueue = [];
  let isProcessingQueue = false;
  let overlayEl = null;
  let themeMode = 'auto';
  let themeObserver = null;

  // Main ChangeAlert class
  class ChangeAlert {
    constructor() {
      this.initContainer();
      this.initTheme();
      this.applyTheme = this.applyTheme.bind(this);
      this.setIcons = this.setIcons.bind(this);
      this.setSounds = this.setSounds.bind(this);
      this.setThemeMode = this.setThemeMode.bind(this);
    }

    // Initialize container based on position
    initContainer() {
      if (!document.querySelector('.changealert-container')) {
        const container = document.createElement('div');
        container.className = 'changealert-container top-right';
        document.body.appendChild(container);
      }
    }

    // Initialize theme system
    initTheme() {
      const container = document.querySelector('.changealert-container');
      if (!container) return;

      // Set initial theme
      this.updateTheme();

      // Watch for system theme changes
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', this.updateTheme.bind(this));
      }
    }

    // Update theme based on current mode
    updateTheme() {
      const container = document.querySelector('.changealert-container');
      if (!container) return;

      // Remove all theme classes
      container.classList.remove('changealert-dark-mode', 'changealert-light-mode');

      // Apply appropriate theme
      if (themeMode === 'dark' || (themeMode === 'auto' && this.isSystemDark())) {
        container.classList.add('changealert-dark-mode');
        container.setAttribute('data-changealert-theme', 'dark');
      } else {
        container.classList.add('changealert-light-mode');
        container.setAttribute('data-changealert-theme', 'light');
      }
    }

    // Check if system is in dark mode
    isSystemDark() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Set theme mode (auto/light/dark)
    setThemeMode(mode) {
      if (['auto', 'light', 'dark'].includes(mode)) {
        themeMode = mode;
        this.updateTheme();
      }
      return this;
    }

    // ... [Rest of your existing methods remain the same]
    // Only theme-related changes shown above
    
    // All other methods (createAlert, showAlert, etc.) remain unchanged
    // from the previous implementation
  }

  // Create singleton instance
  const instance = new ChangeAlert();

  // Add shortcut methods to instance
  const methods = [
    'show', 'primary', 'secondary', 'success', 'error', 
    'warning', 'info', 'question', 'loading', 'clear',
    'applyTheme', 'setIcons', 'setSounds', 'setThemeMode'
  ];

  methods.forEach(method => {
    instance[method] = instance[method].bind(instance);
  });

  return instance;
})));