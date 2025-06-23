export function initGifts() {
  const giftsRoot = document.getElementById('gifts');
  if (!giftsRoot) return;
  giftsRoot.innerHTML = `
    <div class="gift-message">
      <h2 class="section-title">Gifts & Support</h2>
      <p>We appreciate your love and support. If you wish to bless us with a gift, here are our bank details:</p>
      <div class="bank-details">
        <div class="bank-card">
          <h3>Elizabeth Simeipri</h3>
          <p><strong>Bank:</strong> Zenith Bank</p>
          <p><strong>Account Number:</strong> <span class="account-number">1234567890</span></p>
          <button class="copy-btn" data-account="1234567890"><i class="fas fa-clipboard"></i></button>
        </div>
        <div class="bank-card">
          <h3>Onabanjo Ibukunoluwa</h3>
          <p><strong>Bank:</strong> GTBank</p>
          <p><strong>Account Number:</strong> <span class="account-number">0987654321</span></p>
          <button class="copy-btn" data-account="0987654321"><i class="fas fa-clipboard"></i></button>
        </div>
      </div>
    </div>
  `;

  // Copy to clipboard logic with feedback
  giftsRoot.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = function() {
      const acc = btn.getAttribute('data-account');
      navigator.clipboard.writeText(acc).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-clipboard"></i>';
          btn.classList.remove('copied');
        }, 1500);
      });
    };
  });
} 