export function initFooter() {
  const footerRoot = document.getElementById('footer');
  if (!footerRoot) return;
  const year = new Date().getFullYear();
  footerRoot.innerHTML = `
    <div class="footer-content">
      <p>With love, Elizabeth & Ibukunoluwa &copy; ${year}</p>
      <p>Designed for our special day</p>
    </div>
  `;
} 