export function initGifts() {
  const giftsRoot = document.getElementById('gifts');
  if (!giftsRoot) return;
  giftsRoot.innerHTML = `
    <div class="gift-message">
      <h2 class="section-title">Gifts & Support</h2>
      <p>Your presence at our wedding is the greatest gift we could ask for. If you'd like to gift us, you can send a token of love and support here.</p>
      <div class="gift-button-container">
        <a href="https://paystack.shop/pay/l3ebywj2ka" target="_blank" class="paystack-button">
          <span>Send a Gift</span>
          <img src="https://assets.paystack.com/assets/img/logos/paystack-secure-badge.png" alt="Secured by Paystack" class="paystack-badge" onerror="this.style.display='none'"/>
        </a>
      </div>
    </div>
  `;
} 