export function initPovUpload() {
  const povRoot = document.getElementById('pov-upload');
  if (!povRoot) return;
  povRoot.innerHTML = `
    <div class="pov-upload-container">
      <h2 class="section-title">Share Your POV!</h2>
      <p>We'd love to see the wedding from your perspective! Upload your favorite moments and memories below. High-quality images preferred. <br><span style='color:var(--accent-color);font-size:0.98rem;'>Your uploads are private and only visible to us.</span></p>
      <a href="https://web.dotstheapp.com/a?groupId=1989576&code=0yRQ1TnY&dlBy=olusogadaniel001&utm_source=guest&utm_medium=share&utm_campaign=guest_event_album&force_app=1" target="_blank" class="upload-link">Upload Your Images</a>
      <div class="qr-code-block">
        <img src="https://res.cloudinary.com/dp31tyn8m/image/upload/v1750690539/QRCODE_so5yju.jpg" alt="Upload QR Code" class="qr-code-img" />
        <p>Scan to upload from your phone</p>
        <div class="pov-code-block" style="margin-top:0.5rem;">
          <span style="font-weight:600; color:var(--accent-color);">Code:</span>
          <span style="font-family:monospace; font-size:1.1rem; user-select:all; background:#f9f6f2; padding:0.2rem 0.5rem; border-radius:4px; margin-left:0.5rem;">0yRQ1TnY</span>
        </div>
      </div>
    </div>
  `;
} 