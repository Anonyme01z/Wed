import { openModal } from './modal.js';

function preloadImages(images) {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onerror = () => console.error('Error loading gallery image:', src);
  });
}

export function initGallery(images) {
  const galleryRoot = document.getElementById('gallery');
  if (!galleryRoot || !images.length) return;

  // Preload all gallery images
  preloadImages(images);

  const displayImages = images.slice(0, 6);
  
  galleryRoot.innerHTML = `
    <div class="gallery-container">
      <h2 class="section-title">Our Gallery</h2>
      <div class="gallery-grid">
        ${displayImages.map((img, i) => `
          <div class="gallery-item">
            <img 
              src="${img}" 
              alt="Gallery Image ${i+1}" 
              class="gallery-thumb" 
              data-idx="${i}" 
              loading="lazy"
              onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%25\\' height=\\'100%25\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23f0f0f0\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'system-ui\\' fill=\\'%23999\\'%3EImage not found%3C/text%3E%3C/svg%3E';"
            />
          </div>
        `).join('')}
      </div>
      ${images.length > 6 ? '<button class="view-all-btn">View All</button>' : ''}
    </div>
  `;

  // Open modal on image click
  galleryRoot.querySelectorAll('.gallery-thumb').forEach(img => {
    img.onclick = (e) => {
      e.preventDefault();
      const idx = parseInt(img.dataset.idx, 10);
      if (!isNaN(idx)) {
        openModal(images, idx);
      }
    };
  });

  // Open modal on 'View All' button click
  const viewAllBtn = galleryRoot.querySelector('.view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.onclick = (e) => {
      e.preventDefault();
      openModal(images, 0);
    };
  }
}
