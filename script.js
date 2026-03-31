// ===== PARTICLE GENERATOR =====
(function() {
  const container = document.getElementById('particles');
  const colors = ['#00f5ff', '#9d00ff', '#ffd700'];
  for (let i = 0; i < 50; i++) {
    const s = document.createElement('span');
    s.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${100 + Math.random() * 10}%;
      --dur: ${6 + Math.random() * 10}s;
      --delay: ${Math.random() * 8}s;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${1 + Math.random() * 2}px;
      height: ${1 + Math.random() * 2}px;
      opacity: 0;
    `;
    container.appendChild(s);
  }
})();

// ===== COUNTDOWN TIMER =====
(function() {
  let totalSeconds = 15 * 60;
  const el = document.getElementById('countdown');

  function update() {
    if (totalSeconds <= 0) {
      el.textContent = '00:00';
      el.classList.add('warning');
      return;
    }
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    el.textContent = `${m}:${s}`;
    if (totalSeconds <= 120) el.classList.add('warning');
    totalSeconds--;
  }

  update();
  setInterval(update, 1000);
})();

// ===== RIPPLE EFFECT =====
function addRipple(btn) {
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height);

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

addRipple(document.getElementById('btn-confirm'));
addRipple(document.getElementById('btn-cancel'));

// ===== BUTTON CLICK HANDLERS =====
document.getElementById('btn-confirm').addEventListener('click', function() {
  this.textContent = '✔ Processing...';
  this.disabled = true;
  this.style.opacity = '0.7';
  setTimeout(() => {
    this.textContent = '✦ Confirm Payment';
    this.disabled = false;
    this.style.opacity = '1';
  }, 3000);
});

document.getElementById('btn-cancel').addEventListener('click', function() {
  if (confirm('Batalkan transaksi ini?')) {
    document.querySelector('.status-badge').innerHTML =
      '<span style="width:6px;height:6px;background:#ff3366;border-radius:50%;display:inline-block;"></span> Cancelled';
    document.querySelector('.status-badge').style.color = '#ff3366';
    document.querySelector('.status-badge').style.background = 'rgba(255,51,102,0.1)';
    document.querySelector('.status-badge').style.borderColor = 'rgba(255,51,102,0.3)';
  }
});
