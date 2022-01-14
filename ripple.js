window.addEventListener("load", function () {
  const startRipple = function (type, e) {
    // Prevent double ripple events of different events
    const prevEvent = e.target.getAttribute("data-event");
    if (prevEvent && prevEvent !== type) {
      return false;
    }
    e.target.setAttribute("data-event", type);
    // Create a ripple element
    const rippleWave = document.createElement("span");
    const rect = e.target.getBoundingClientRect();
    const maxSize = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2));
    rippleWave.style.width = `${2 * maxSize}px`;
    rippleWave.style.height = `${2 * maxSize}px`;
    rippleWave.style.top = `${e.clientY - rect.top - maxSize}px`;
    rippleWave.style.left = `${e.clientX - rect.left - maxSize}px`;
    rippleWave.className = "es-ripple-wave";
    e.target.appendChild(rippleWave);
    // Start ripple animation
    setTimeout(() => {
      rippleWave.classList.add("es-ripple-wave-held");
    });
    // End ripple animation
    const releaseEvent = (type === "mousedown" ? "mouseup" : "touchend");
    const release = function () {
      document.removeEventListener(releaseEvent, release);
      rippleWave.classList.add("es-ripple-wave-done");
      setTimeout(() => {
        e.target.removeChild(rippleWave);
        if (!e.target.children.length) {
          e.target.removeAttribute("data-event");
        }
      }, 650);
    }
    document.addEventListener(releaseEvent, release);
  }
  // Register events
  document.querySelectorAll(".es-ripple").forEach((el) => {
    // Create a ripple container
    let rippleContainer = el.querySelector(".es-ripple-container");
    if (!rippleContainer) {
      rippleContainer = document.createElement("div");
      rippleContainer.className = "es-ripple-container";
      el.appendChild(rippleContainer);
    }
    // PC
    rippleContainer.addEventListener("mousedown", function (e) {
      startRipple(e.type, e);
    }, { passive: true });
    // Mobile
    rippleContainer.addEventListener("touchstart", function (e) {
      [].slice.call(e.changedTouches).forEach(touch => {
        startRipple(e.type, touch);
      });
    }, { passive: true });
  });
});
