/*!
 * CustomAlert.js - A simple and powerful JavaScript alert system
* Author: Rajkumar Nimod
 * Website: https://rajkumarnimod.github.io/changealert/
 * Version: 1.0.0
 * License: MIT
 */
/* Please retain this header when using or modifying the file */

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
  warning: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
  info: "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
  question: "https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum_hit.ogg",
  loading: "https://actions.google.com/sounds/v1/science_fiction/futuristic_spacecraft_takeoff.ogg",
  primary: "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
  secondary: "https://actions.google.com/sounds/v1/cartoon/boing.ogg"
  };

  // Default icons (SVG)
const DEFAULT_ICONS = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
  question: '❓',
  loading: '⏳',
  primary: '🔵',
  secondary: '⚪'
};

  // Queue management
  let alertQueue = [];
  let isProcessingQueue = false;
  let overlayEl = null;
  let currentThemeMode = 'auto';
  let mediaQueryListener = null;

  // Main ChangeAlert class
  class ChangeAlert {
    constructor() {
      this.initContainer();
      this.initTheme();
    }

    // Initialize container
    initContainer() {
      if (!document.querySelector('.changealert-container')) {
        const container = document.createElement('div');
        container.className = 'changealert-container top-right';
        document.body.appendChild(container);
      }
    }

    // Initialize theme system
    initTheme() {
      // Set up media query listener for system theme changes
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Remove previous listener if exists
        if (mediaQueryListener) {
          mediaQuery.removeListener(mediaQueryListener);
        }
        
        mediaQueryListener = (e) => {
          if (currentThemeMode === 'auto') {
            this.updateTheme();
          }
        };
        
        mediaQuery.addListener(mediaQueryListener);
      }
      
      this.updateTheme();
    }

    // Update theme based on current mode
    updateTheme() {
      const container = document.querySelector('.changealert-container');
      if (!container) return;

      if (currentThemeMode === 'dark' || 
          (currentThemeMode === 'auto' && this.isSystemDark())) {
        container.setAttribute('data-changealert-theme', 'dark');
      } else {
        container.setAttribute('data-changealert-theme', 'light');
      }
    }

    // Check if system is in dark mode
    isSystemDark() {
      return window.matchMedia && 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Set theme mode (auto/light/dark)
    setThemeMode(mode) {
      if (['auto', 'light', 'dark'].includes(mode)) {
        currentThemeMode = mode;
        this.updateTheme();
      }
      return this;
    }

    // Create overlay
    createOverlay(color, zIndex, closeOnClick) {
      if (overlayEl) return;
      
      overlayEl = document.createElement('div');
      overlayEl.style.position = 'fixed';
      overlayEl.style.top = '0';
      overlayEl.style.left = '0';
      overlayEl.style.width = '100%';
      overlayEl.style.height = '100%';
      overlayEl.style.backgroundColor = color;
      overlayEl.style.zIndex = zIndex - 1;
      overlayEl.style.opacity = '0';
      overlayEl.style.transition = 'opacity 0.3s';
      
      if (closeOnClick) {
        overlayEl.style.cursor = 'pointer';
        overlayEl.addEventListener('click', () => this.clear());
      }
      
      document.body.appendChild(overlayEl);
      
      setTimeout(() => {
        overlayEl.style.opacity = '1';
      }, 10);
    }

    // Remove overlay
    removeOverlay() {
      if (!overlayEl) return;
      
      overlayEl.style.opacity = '0';
      setTimeout(() => {
        overlayEl.remove();
        overlayEl = null;
      }, 300);
    }

    // Create alert element
    createAlert(message, options) {
      const alertEl = document.createElement('div');
      alertEl.className = `changealert ${options.theme} ${options.customClass} ${options.rtl ? 'rtl' : ''}`;
      
      // Set animation classes
      alertEl.dataset.animationIn = options.animationIn;
      alertEl.dataset.animationOut = options.animationOut;

      // Determine icon
      let iconHtml = options.customIcon || options.icon || DEFAULT_ICONS[options.theme] || '';
      
      // If icon is a URL, create img tag
      if (typeof iconHtml === 'string' && (iconHtml.startsWith('http') || iconHtml.startsWith('/'))) {
        iconHtml = `<img src="${iconHtml}" alt="alert icon">`;
      }

      const iconEl = iconHtml ? `<div class="changealert-icon">${iconHtml}</div>` : '';

      // Add close button
      const closeButton = options.closeButton ? 
        `<button class="changealert-close" aria-label="Close">&times;</button>` : '';

      // Create buttons if provided
      let buttonsHtml = '';
      if (options.buttons && Array.isArray(options.buttons)) {
        buttonsHtml = '<div class="changealert-buttons">';
        options.buttons.forEach(btn => {
          buttonsHtml += `<button class="${btn.class || ''}" style="${btn.style || ''}">${btn.text}</button>`;
        });
        buttonsHtml += '</div>';
      }

      // Set content
      const content = options.html ? message : document.createTextNode(message).textContent;

      alertEl.innerHTML = `
        <div class="changealert-content">
          ${iconEl}
          <div class="changealert-message">${content}</div>
        </div>
        ${closeButton}
        ${buttonsHtml}
        ${options.progressBar ? '<div class="changealert-progress"></div>' : ''}
      `;

      // Add draggable attribute if enabled
      if (options.draggable) {
        alertEl.classList.add('draggable');
        this.makeDraggable(alertEl);
      }

      return alertEl;
    }

    // Make alert draggable
    makeDraggable(alertEl) {
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      let isDragging = false;
      
      const dragMouseDown = (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        isDragging = true;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        alertEl.style.transition = 'none';
      };

      const elementDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        alertEl.style.top = (alertEl.offsetTop - pos2) + "px";
        alertEl.style.left = (alertEl.offsetLeft - pos1) + "px";
      };

      const closeDragElement = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        isDragging = false;
        alertEl.style.transition = 'transform 0.3s, opacity 0.3s';
      };

      alertEl.onmousedown = dragMouseDown;
    }

    // Show alert with animation
    showAlert(alertEl, animationIn, zIndex) {
      const container = document.querySelector('.changealert-container');
      container.appendChild(alertEl);
      
      // Set z-index
      alertEl.style.zIndex = zIndex;
      
      // Trigger reflow to ensure animation plays
      void alertEl.offsetWidth;
      
      alertEl.classList.add(`changealert-${animationIn}`);
      
      // Remove animation class after it completes
      setTimeout(() => {
        alertEl.classList.remove(`changealert-${animationIn}`);
      }, 300);
    }

    // Hide alert with animation
    hideAlert(alertEl, animationOut, callback) {
      alertEl.classList.add(`changealert-${animationOut}`);
      
      setTimeout(() => {
        alertEl.style.opacity = '0';
        setTimeout(() => {
          alertEl.remove();
          if (callback) callback();
        }, 300);
      }, 100);
    }

    // Handle progress bar
    setupProgressBar(alertEl, timeout, onTimeout) {
      if (!timeout || timeout <= 0) return;

      const progressBar = alertEl.querySelector('.changealert-progress');
      if (!progressBar) return;

      let remaining = timeout;
      let startTime = Date.now();
      let paused = false;
      let pauseStart = 0;
      let animationFrameId;

      const updateProgress = () => {
        if (paused) return;

        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / timeout, 1);
        progressBar.style.transform = `scaleX(${1 - progress})`;

        if (progress >= 1) {
          cancelAnimationFrame(animationFrameId);
          if (onTimeout) onTimeout();
          this.hideAlert(alertEl, alertEl.dataset.animationOut);
        } else {
          animationFrameId = requestAnimationFrame(updateProgress);
        }
      };

      // Pause on hover if enabled
      if (alertEl.dataset.pauseOnHover === 'true') {
        alertEl.addEventListener('mouseenter', () => {
          paused = true;
          pauseStart = Date.now();
          cancelAnimationFrame(animationFrameId);
        });

        alertEl.addEventListener('mouseleave', () => {
          paused = false;
          startTime += Date.now() - pauseStart;
          animationFrameId = requestAnimationFrame(updateProgress);
        });
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    }

    // Process the alert queue
    processQueue() {
      if (isProcessingQueue || alertQueue.length === 0) return;
      
      isProcessingQueue = true;
      const { message, options, resolve } = alertQueue.shift();
      
      this.show(message, options).then(() => {
        isProcessingQueue = false;
        resolve();
        this.processQueue();
      });
    }

    // Main show method
    show(message, options = {}) {
      return new Promise((resolve) => {
        // Merge options with defaults
        const mergedOptions = { ...DEFAULTS, ...options };
        
        // Set container position
        this.setContainerPosition(mergedOptions.position, mergedOptions.zIndex);
        
        // Create overlay if needed
        if (mergedOptions.overlay) {
          this.createOverlay(
            mergedOptions.overlayColor, 
            mergedOptions.zIndex, 
            mergedOptions.overlayClose
          );
        }
        
        // Queue management
        if (mergedOptions.queue && alertQueue.length > 0) {
          alertQueue.push({ message, options: mergedOptions, resolve });
          return;
        }
        
        // Create alert element
        const alertEl = this.createAlert(message, mergedOptions);
        
        // Set pause on hover
        alertEl.dataset.pauseOnHover = mergedOptions.pauseOnHover;
        
        // Play sound if enabled
        if (mergedOptions.sound || mergedOptions.customSound) {
          this.playSound(mergedOptions.theme, mergedOptions.customSound);
        }
        
        // Show alert with animation
        this.showAlert(alertEl, mergedOptions.animationIn, mergedOptions.zIndex);
        
        // Call onShow callback
        if (mergedOptions.onShow) {
          mergedOptions.onShow(alertEl);
        }
        
        // Focus alert if enabled
        if (mergedOptions.focus) {
          setTimeout(() => alertEl.focus(), 50);
        }
        
        // Setup button events if any
        if (mergedOptions.buttons) {
          mergedOptions.buttons.forEach((btn, index) => {
            const buttonEl = alertEl.querySelectorAll('.changealert-buttons button')[index];
            if (buttonEl && btn.action) {
              buttonEl.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.action();
              });
            }
          });
        }
        
        // Setup progress bar and timeout
        if (mergedOptions.timeout > 0) {
          this.setupProgressBar(
            alertEl, 
            mergedOptions.timeout, 
            () => {
              if (mergedOptions.onTimeout) mergedOptions.onTimeout();
              if (mergedOptions.overlay) this.removeOverlay();
              resolve();
            }
          );
        }
        
        // Close button event
        if (mergedOptions.closeButton) {
          const closeButton = alertEl.querySelector('.changealert-close');
          closeButton.addEventListener('click', () => {
            this.hideAlert(alertEl, mergedOptions.animationOut, () => {
              if (mergedOptions.onClose) mergedOptions.onClose();
              if (mergedOptions.overlay) this.removeOverlay();
              resolve();
            });
          });
        }
        
        // Click event
        if (mergedOptions.onClick) {
          alertEl.addEventListener('click', (e) => {
            if (e.target !== alertEl.querySelector('.changealert-close') && 
                !e.target.closest('.changealert-buttons')) {
              mergedOptions.onClick(e);
            }
          });
        }
        
        // Keyboard accessibility
        alertEl.setAttribute('role', 'alert');
        alertEl.setAttribute('aria-live', 'assertive');
        alertEl.tabIndex = 0;
        
        alertEl.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && mergedOptions.closeButton) {
            const closeButton = alertEl.querySelector('.changealert-close');
            if (closeButton) closeButton.click();
          }
        });
        
        // Auto-close if no timeout
        if (mergedOptions.timeout <= 0) {
          resolve();
        }
      });
    }

    // Shortcut methods for different alert types
    primary(message, options = {}) {
      return this.show(message, { ...options, theme: 'primary' });
    }

    secondary(message, options = {}) {
      return this.show(message, { ...options, theme: 'secondary' });
    }

    success(message, options = {}) {
      return this.show(message, { ...options, theme: 'success' });
    }

    error(message, options = {}) {
      return this.show(message, { ...options, theme: 'error' });
    }

    warning(message, options = {}) {
      return this.show(message, { ...options, theme: 'warning' });
    }

    info(message, options = {}) {
      return this.show(message, { ...options, theme: 'info' });
    }

    question(message, options = {}) {
      return this.show(message, { ...options, theme: 'question' });
    }

    loading(message, options = {}) {
      return this.show(message, { ...options, theme: 'loading', timeout: 0 });
    }

    // Clear all alerts
    clear() {
      const container = document.querySelector('.changealert-container');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      alertQueue = [];
      isProcessingQueue = false;
      this.removeOverlay();
    }

    // Play sound
    playSound(type, customSound) {
      const soundUrl = customSound || SOUNDS[type];
      if (!soundUrl) return;
      
      const audio = new Audio(soundUrl);
      audio.play().catch(e => console.warn('Sound playback failed:', e));
    }

    // Set container position
    setContainerPosition(position, zIndex) {
      const container = document.querySelector('.changealert-container');
      if (container) {
        container.className = `changealert-container ${position}`;
        container.style.zIndex = zIndex;
      }
    }

    // Apply custom theme colors
    applyTheme(themeConfig) {
      if (typeof themeConfig === 'string') {
        document.documentElement.style.setProperty('--changealert-primary', themeConfig);
      } else if (typeof themeConfig === 'object') {
        Object.keys(themeConfig).forEach(key => {
          document.documentElement.style.setProperty(`--changealert-${key}`, themeConfig[key]);
        });
      }
      return this;
    }

    // Set custom icons
    setIcons(icons) {
      Object.keys(icons).forEach(key => {
        DEFAULT_ICONS[key] = icons[key];
      });
      return this;
    }

    // Set custom sounds
    setSounds(sounds) {
      Object.keys(sounds).forEach(key => {
        SOUNDS[key] = sounds[key];
      });
      return this;
    }
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