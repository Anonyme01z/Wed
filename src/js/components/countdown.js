export function initCountdown(dateString) {
  const countdownRoot = document.getElementById('countdown');
  if (!countdownRoot) return;
  const target = new Date(dateString).getTime();

  function update() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      countdownRoot.innerHTML = '<h2>The Wedding Day Has Arrived!</h2>';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdownRoot.innerHTML = `
      <div class="countdown-grid">
        <div><span>${String(days).padStart(2, '0')}</span><small>Days</small></div>
        <div><span>${String(hours).padStart(2, '0')}</span><small>Hours</small></div>
        <div><span>${String(mins).padStart(2, '0')}</span><small>Minutes</small></div>
        <div><span>${String(secs).padStart(2, '0')}</span><small>Seconds</small></div>
      </div>
    `;
  }
  update();
  const timer = setInterval(update, 1000);
}
