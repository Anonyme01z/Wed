export function initFooter() {
  const footerRoot = document.getElementById('footer');
  if (!footerRoot) return;
  const year = new Date().getFullYear();
  footerRoot.innerHTML = `
    <div class="footer-content">
      <p>With love, Elizabeth & Ibukunoluwa &copy; ${year}</p>
      
      <div class="website-inquiry">
        <h3>Want a beautiful website like this for your event?</h3>
        <p>Let's bring your vision to life. Get in touch for a custom design.</p>
        <a href="https://wa.me/2348107144826?text=Hello!%20I'm%20interested%20in%20getting%20a%20website%20like%20Elizabeth%20and%20Ibukunoluwa's." target="_blank" class="inquiry-link">
          <i class="fab fa-whatsapp"></i>
          Chat on WhatsApp
        </a>
      </div>

      <p class="copyright">&copy; ${year} All Rights Reserved</p>
    </div>
  `;
} 