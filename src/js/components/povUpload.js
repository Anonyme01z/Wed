export function initPovUpload() {
  const povRoot = document.getElementById('pov-upload');
  if (!povRoot) return;
  povRoot.innerHTML = `
    <div class="pov-upload-container">
      <h2 class="section-title">Share Your POV!</h2>
      <p>We'd love to see the wedding from your perspective! Upload your favorite moments and memories below. High-quality images preferred. <br><span style='color:var(--accent-color);font-size:0.98rem;'>Your uploads are private and only visible to us.</span></p>
      <a href="https://your-upload-link.com" target="_blank" class="upload-link">Upload Your Images</a>
      <div class="qr-code-block">
        <img src="/images/qr-placeholder.png" alt="Upload QR Code" class="qr-code-img" />
        <p>Scan to upload from your phone</p>
      </div>
    </div>
  `;
} 