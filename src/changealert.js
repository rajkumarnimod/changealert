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
    type: 'primary',
    theme: 'light',
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
    css: '',
    queue: true,
    zIndex: 999999,
    overlay: false,
    overlayClose: false,
    overlayColor: 'rgba(0,0,0,0.5)',
    customIcon: null,
    customSound: null,
    buttons: null,
    focus: true,
    fontFamily: '',
    fontSize: ''
  };

  // Default icons
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

  // Default sounds
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

  // System variables
  let alertQueue = [];
  let isProcessingQueue = false;
  let overlayEl = null;
  let currentThemeMode = 'light';

  class ChangeAlert {
    constructor() {
      this.initContainer();
      this.updateTheme();
    }

    initContainer() {
      if (!document.querySelector('.changealert-container')) {
        const container = document.createElement('div');
        container.className = 'changealert-container top-right';
        document.body.appendChild(container);
      }
    }

    updateTheme() {
      const container = document.querySelector('.changealert-container');
      if (container) {
        container.setAttribute('data-changealert-theme', currentThemeMode);
      }
    }

    setThemeMode(mode) {
      if (mode === 'light' || mode === 'dark') {
        currentThemeMode = mode;
        this.updateTheme();
      }
      return this;
    }

    createOverlay(color, zIndex, closeOnClick) {
      if (overlayEl) return;
      
      overlayEl = document.createElement('div');
      overlayEl.className = 'changealert-overlay';
      overlayEl.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${color};
        z-index: ${zIndex - 1};
        opacity: 0;
        transition: opacity 0.3s;
      `;
      
      if (closeOnClick) {
        overlayEl.style.cursor = 'pointer';
        overlayEl.addEventListener('click', () => this.clear());
      }
      
      document.body.appendChild(overlayEl);
      
      setTimeout(() => {
        overlayEl.style.opacity = '1';
      }, 10);
    }

    removeOverlay() {
      if (!overlayEl) return;
      
      overlayEl.style.opacity = '0';
      setTimeout(() => {
        overlayEl.remove();
        overlayEl = null;
      }, 300);
    }

    createAlert(message, options) {
      const alertEl = document.createElement('div');
      let alertClasses = `changealert ${options.type} ${options.rtl ? 'rtl' : ''}`;
      
      // Apply custom class if provided
      if (options.css && !options.css.includes(':')) {
        alertClasses += ` ${options.css}`;
      }
      
      alertEl.className = alertClasses;
      
      // Apply inline styles if provided
      if (options.css && options.css.includes(':')) {
        alertEl.style.cssText = options.css;
      }
      
      // Apply font overrides
      if (options.fontFamily) {
        alertEl.style.fontFamily = options.fontFamily;
      }
      if (options.fontSize) {
        alertEl.style.fontSize = options.fontSize;
      }

      alertEl.dataset.animationIn = options.animationIn;
      alertEl.dataset.animationOut = options.animationOut;

      // Set icon
      let iconHtml = options.customIcon || options.icon || DEFAULT_ICONS[options.type] || '';
      if (typeof iconHtml === 'string' && (iconHtml.startsWith('http') || iconHtml.startsWith('/'))) {
        iconHtml = `<img src="${iconHtml}" alt="alert icon">`;
      }
      const iconEl = iconHtml ? `<div class="changealert-icon">${iconHtml}</div>` : '';

      // Close button
      const closeButton = options.closeButton ? 
        `<button class="changealert-close" aria-label="Close">&times;</button>` : '';

      // Buttons
      let buttonsHtml = '';
      if (options.buttons && Array.isArray(options.buttons)) {
        buttonsHtml = '<div class="changealert-buttons">';
        options.buttons.forEach(btn => {
          const btnStyle = btn.style || '';
          buttonsHtml += `<button class="${btn.class || ''}" style="${btnStyle}">${btn.text}</button>`;
        });
        buttonsHtml += '</div>';
      }

      // Content
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

      // Draggable
      if (options.draggable) {
        this.makeDraggable(alertEl);
      }

      return alertEl;
    }

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
        alertEl.style.cursor = 'grabbing';
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
        alertEl.style.cursor = 'grab';
      };

      alertEl.onmousedown = dragMouseDown;
      alertEl.style.cursor = 'grab';
    }

    showAlert(alertEl, animationIn, zIndex) {
      const container = document.querySelector('.changealert-container');
      container.appendChild(alertEl);
      alertEl.style.zIndex = zIndex;
      void alertEl.offsetWidth; // Trigger reflow
      alertEl.classList.add(`changealert-${animationIn}`);
      
      setTimeout(() => {
        alertEl.classList.remove(`changealert-${animationIn}`);
      }, 300);
    }

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

    show(message, options = {}) {
      return new Promise((resolve) => {
        const mergedOptions = { ...DEFAULTS, ...options };
        this.setContainerPosition(mergedOptions.position, mergedOptions.zIndex);
        
        if (mergedOptions.overlay) {
          this.createOverlay(
            mergedOptions.overlayColor, 
            mergedOptions.zIndex, 
            mergedOptions.overlayClose
          );
        }
        
        if (mergedOptions.queue && alertQueue.length > 0) {
          alertQueue.push({ message, options: mergedOptions, resolve });
          return;
        }
        
        const alertEl = this.createAlert(message, mergedOptions);
        alertEl.dataset.pauseOnHover = mergedOptions.pauseOnHover;
        
        if (mergedOptions.sound || mergedOptions.customSound) {
          this.playSound(mergedOptions.type, mergedOptions.customSound);
        }
        
        this.showAlert(alertEl, mergedOptions.animationIn, mergedOptions.zIndex);
        
        if (mergedOptions.onShow) {
          mergedOptions.onShow(alertEl);
        }
        
        if (mergedOptions.focus) {
          setTimeout(() => alertEl.focus(), 50);
        }
        
        if (mergedOptions.buttons) {
          mergedOptions.buttons.forEach((btn, index) => {
            const buttonEl = alertEl.querySelectorAll('.changealert-buttons button')[index];
            if (buttonEl && btn.action) {
              buttonEl.addEventListener('click', (e) => {
                e.stopPropagation();
                btn.action();
                if (btn.closeOnClick !== false) {
                  this.hideAlert(alertEl, mergedOptions.animationOut);
                }
              });
            }
          });
        }
        
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
        
        if (mergedOptions.onClick) {
          alertEl.addEventListener('click', (e) => {
            if (e.target !== alertEl.querySelector('.changealert-close') && 
                !e.target.closest('.changealert-buttons')) {
              mergedOptions.onClick(e);
            }
          });
        }
        
        alertEl.setAttribute('role', 'alert');
        alertEl.setAttribute('aria-live', 'assertive');
        alertEl.tabIndex = 0;
        
        alertEl.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && mergedOptions.closeButton) {
            const closeButton = alertEl.querySelector('.changealert-close');
            if (closeButton) closeButton.click();
          }
        });
        
        if (mergedOptions.timeout <= 0) {
          resolve();
        }
      });
    }

    // Shortcut methods
    primary(message, options = {}) { return this.show(message, { ...options, type: 'primary' }); }
    secondary(message, options = {}) { return this.show(message, { ...options, type: 'secondary' }); }
    success(message, options = {}) { return this.show(message, { ...options, type: 'success' }); }
    error(message, options = {}) { return this.show(message, { ...options, type: 'error' }); }
    warning(message, options = {}) { return this.show(message, { ...options, type: 'warning' }); }
    info(message, options = {}) { return this.show(message, { ...options, type: 'info' }); }
    question(message, options = {}) { return this.show(message, { ...options, type: 'question' }); }
    loading(message, options = {}) { return this.show(message, { ...options, type: 'loading', timeout: 0 }); }

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

    playSound(type, customSound) {
      const soundUrl = customSound || SOUNDS[type];
      if (!soundUrl) return;
      
      const audio = new Audio(soundUrl);
      audio.play().catch(e => console.warn('Sound playback failed:', e));
    }

    setContainerPosition(position, zIndex) {
      const container = document.querySelector('.changealert-container');
      if (container) {
        container.className = `changealert-container ${position}`;
        container.style.zIndex = zIndex;
      }
    }

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

    setIcons(icons) {
      Object.keys(icons).forEach(key => {
        DEFAULT_ICONS[key] = icons[key];
      });
      return this;
    }

    setSounds(sounds) {
      Object.keys(sounds).forEach(key => {
        SOUNDS[key] = sounds[key];
      });
      return this;
    }

    setFont(fontFamily, fontSize = '') {
      const container = document.querySelector('.changealert-container');
      if (container) {
        if (fontFamily) container.style.fontFamily = fontFamily;
        if (fontSize) container.style.fontSize = fontSize;
      }
      return this;
    }
  }

  // Create singleton instance
  const instance = new ChangeAlert();

  // Bind methods
  const methods = [
    'show', 'primary', 'secondary', 'success', 'error', 
    'warning', 'info', 'question', 'loading', 'clear',
    'applyTheme', 'setIcons', 'setSounds', 'setThemeMode', 'setFont'
  ];

  methods.forEach(method => {
    instance[method] = instance[method].bind(instance);
  });

  return instance;
})));