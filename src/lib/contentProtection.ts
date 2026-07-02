/**
 * Content protection: disable right-click, dev tools, and text selection
 * Note: These are surface-level protections. Determined users can still bypass them.
 */

export function initContentProtection() {
  // Disable right-click context menu
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // Disable text selection with CSS (also set in index.css)
  document.body.style.userSelect = "none";
  document.body.style.webkitUserSelect = "none";

  // Disable common developer tools shortcuts
  document.addEventListener("keydown", (e) => {
    // F12 - Developer Tools
    if (e.key === "F12") {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I - Inspect Element
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J - Console
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C - Inspect Element (Firefox)
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+K - Developer Console (Firefox)
    if (e.ctrlKey && e.shiftKey && e.key === "K") {
      e.preventDefault();
      return false;
    }
  });

  // Disable text copy with keyboard shortcuts
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener("cut", (e) => {
    e.preventDefault();
    return false;
  });

  // Try to detect if dev tools are open (limited effectiveness)
  const devtools = { open: false };
  const threshold = 160;

  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold) {
      devtools.open = true;
      // Optionally reload or blur when dev tools detected
      // window.location.reload();
    } else {
      devtools.open = false;
    }
  }, 500);
}
