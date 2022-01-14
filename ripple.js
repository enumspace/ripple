window.addEventListener("load", function () {
  const startRipple = function (type, e) {
    // 防止不同事件的双涟漪事件
    const prevEvent = e.target.getAttribute("data-event");
    if (prevEvent && prevEvent !== type) {
      return false;
    }
    e.target.setAttribute("data-event", type);
    // 创建涟漪元素
    const rippleWave = document.createElement("span");
    const rect = e.target.getBoundingClientRect();
    const maxSize = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2));
    rippleWave.style.width = `${2 * maxSize}px`;
    rippleWave.style.height = `${2 * maxSize}px`;
    rippleWave.style.top = `${e.clientY - rect.top - maxSize}px`;
    rippleWave.style.left = `${e.clientX - rect.left - maxSize}px`;
    rippleWave.className = "es-ripple-wave";
    e.target.appendChild(rippleWave);
    // 开始涟漪动画
    setTimeout(() => {
      rippleWave.classList.add("es-ripple-wave-held");
    });
    // 结束涟漪动画
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
  // 注册涟漪时间
  document.querySelectorAll(".es-ripple").forEach((el) => {
    // 创建涟漪容器
    let rippleContainer = el.querySelector(".es-ripple-container");
    if (!rippleContainer) {
      rippleContainer = document.createElement("div");
      rippleContainer.className = "es-ripple-container";
      el.appendChild(rippleContainer);
    }
    // 电脑端
    rippleContainer.addEventListener("mousedown", function (e) {
      startRipple(e.type, e);
    }, { passive: true });
    // 移动端
    rippleContainer.addEventListener("touchstart", function (e) {
      Array.from(e.changedTouches).forEach(touch => {
        startRipple(e.type, touch);
      });
    }, { passive: true });
  });
});
