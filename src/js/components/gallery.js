import { openModal } from './modal.js';

export function initGallery(images) {
  const galleryRoot = document.getElementById('gallery');
  if (!galleryRoot || !images.length) return;

  const displayImages = images.slice(0, 6);
  galleryRoot.innerHTML = `
    <div class="gallery-grid">
      ${displayImages.map((img, i) => `<img src="${img}" alt="Gallery Image ${i+1}" class="gallery-thumb" data-idx="${i}" loading="lazy">`).join('')}
    </div>
    ${images.length > 6 ? '<button class="view-all-btn">View All</button>' : ''}
  `;

  // Open modal on image click
  galleryRoot.querySelectorAll('.gallery-thumb').forEach(img => {
    img.onclick = (e) => {
      const idx = parseInt(img.dataset.idx, 10);
      openModal(images, idx);
    };
  });

  // Open modal on 'View All' button click
  const viewAllBtn = galleryRoot.querySelector('.view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.onclick = () => openModal(images, 0);
  }
}
