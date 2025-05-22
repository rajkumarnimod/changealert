/*!
 * CustomAlert.js - A simple and powerful JavaScript alert system
* Author: Rajkumar Nimod
 * Website: https://masterinwebdesign.in
 * Version: 1.0.0
 * License: MIT
 */
/* Please retain this header when using or modifying the file */


const toastSounds = {
  success: "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg",
  error: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg",
  warning: "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg",
  info: "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
};

const ChangeAlert = (() => {
  const containers = {};
  const defaultOptions = {
    type: "info",
    position: "top-right",
    timeout: 3000,
    icon: null,
    closeButton: true,
    animation: "fade",
    theme: "light",
    onClick: null,
    onClose: null,
    sound: undefined, // No default sound
    pauseOnHover: true
  };

  function createContainer(position) {
    if (containers[position]) return containers[position];
    const container = document.createElement("div");
    container.className = `toast-container ${position}`;
    document.body.appendChild(container);
    containers[position] = container;
    return container;
  }

  function getIcon(type) {
    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️"
    };
    return icons[type] || "ℹ️";
  }

  function show(message, typeOrOptions, maybeOptions) {
    let type = typeof typeOrOptions === "string" ? typeOrOptions : "info";
    let options = typeof typeOrOptions === "object" ? typeOrOptions : maybeOptions || {};

    const config = { ...defaultOptions, ...options, type, message };
    const container = createContainer(config.position);

    if (config.theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    const toast = document.createElement("div");
    toast.className = `toast ${config.type}`;
    toast.innerHTML = `
      <span class="icon">${config.icon || getIcon(config.type)}</span>
      <span class="message">${config.message}</span>
      ${config.closeButton ? '<span class="close-btn">&times;</span>' : ''}
    `;

    // Play sound only if "sound" is true or a custom sound is provided
    if (config.sound) {
      if (typeof config.sound === "string") {
        try {
          const audio = new Audio(config.sound);
          audio.play().catch(err => console.warn("Custom sound failed:", err));
        } catch (e) {
          console.warn("Invalid custom sound:", e);
        }
      } else if (toastSounds[config.type]) {
        try {
          const audio = new Audio(toastSounds[config.type]);
          audio.play().catch(err => console.warn("Default sound failed:", err));
        } catch (e) {
          console.warn("Error playing default sound:", e);
        }
      }
    }

    let timer = setTimeout(() => removeToast(), config.timeout);

    function removeToast() {
      toast.remove();
      config.onClose?.();
    }

    if (config.pauseOnHover) {
      toast.addEventListener("mouseenter", () => clearTimeout(timer));
      toast.addEventListener("mouseleave", () => {
        timer = setTimeout(removeToast, config.timeout);
      });
    }

    if (config.closeButton) {
      toast.querySelector(".close-btn").onclick = removeToast;
    }

    toast.onclick = () => {
      config.onClick?.();
    };

    container.appendChild(toast);
  }

  return {
    show,
    success: (msg, opts = {}) => show(msg, "success", opts),
    error: (msg, opts = {}) => show(msg, "error", opts),
    warning: (msg, opts = {}) => show(msg, "warning", opts),
    info: (msg, opts = {}) => show(msg, "info", opts),
  };
})();
