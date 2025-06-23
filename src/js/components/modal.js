let modalRoot, modalImg, currentIdx = 0, images = [];
let isAnimating = false;

function preloadAdjacentImages(idx) {
  // Preload current, next, and previous images
  const imagesToPreload = [
    images[idx],
    images[(idx + 1) % images.length],
    images[(idx - 1 + images.length) % images.length]
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onerror = () => console.error('Error loading modal image:', src);
  });
}

export function initModal() {
  modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;
  
  modalRoot.innerHTML = `
    <div class="modal-overlay" style="display:none;">
      <button class="close-modal" aria-label="Close modal">&times;</button>
      <div class="modal-content">
        <img class="modal-img" src="" alt="Gallery Full View" 
          onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100%25\\' height=\\'100%25\\'%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23f0f0f0\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-family=\\'system-ui\\' fill=\\'%23999\\'%3EImage not found%3C/text%3E%3C/svg%3E';"
        />
        <button class="modal-nav prev" aria-label="Previous image">&#8592;</button>
        <button class="modal-nav next" aria-label="Next image">&#8594;</button>
      </div>
    </div>
  `;

  modalImg = modalRoot.querySelector('.modal-img');
  const overlay = modalRoot.querySelector('.modal-overlay');

  // Close modal on overlay click
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  };

  modalRoot.querySelector('.close-modal').onclick = closeModal;
  modalRoot.querySelector('.modal-nav.prev').onclick = (e) => {
    e.stopPropagation();
    showPrev();
  };
  modalRoot.querySelector('.modal-nav.next').onclick = (e) => {
    e.stopPropagation();
    showNext();
  };

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay || overlay.style.display === 'none') return;
    
    switch(e.key) {
      case 'ArrowLeft':
        showPrev();
        break;
      case 'ArrowRight':
        showNext();
        break;
      case 'Escape':
        closeModal();
        break;
    }
  });
}

export function openModal(imgArray, idx) {
  if (!modalRoot || isAnimating) return;
  
  images = imgArray;
  currentIdx = idx;
  
  const overlay = modalRoot.querySelector('.modal-overlay');
  overlay.style.display = 'flex';
  
  // Preload adjacent images
  preloadAdjacentImages(currentIdx);
  
  // Show current image
  showImage(currentIdx);
  
  // Prevent body scrolling while modal is open
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modalRoot || isAnimating) return;
  
  const overlay = modalRoot.querySelector('.modal-overlay');
  overlay.style.display = 'none';
  
  // Restore body scrolling
  document.body.style.overflow = '';
}

function showImage(idx) {
  if (isAnimating) return;
  isAnimating = true;

  // Create new image element
  const newImg = new Image();
  newImg.className = 'modal-img';
  newImg.alt = 'Gallery Full View';
  newImg.style.opacity = '0';
  newImg.style.transition = 'opacity 0.3s ease-in-out';
  
  // Add error handling
  newImg.onerror = function() {
    this.onerror = null;
    this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'%23f0f0f0\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui\' fill=\'%23999\'%3EImage not found%3C/text%3E%3C/svg%3E';
  };

  // When new image is loaded
  newImg.onload = function() {
    // Replace old image with new one
    modalImg.parentNode.replaceChild(newImg, modalImg);
    modalImg = newImg;
    
    // Fade in new image
    setTimeout(() => {
      newImg.style.opacity = '1';
      setTimeout(() => {
        isAnimating = false;
      }, 300);
    }, 50);
  };

  // Start loading new image
  newImg.src = images[idx];
}

function showPrev() {
  if (isAnimating) return;
  currentIdx = (currentIdx - 1 + images.length) % images.length;
  preloadAdjacentImages(currentIdx);
  showImage(currentIdx);
}

function showNext() {
  if (isAnimating) return;
  currentIdx = (currentIdx + 1) % images.length;
  preloadAdjacentImages(currentIdx);
  showImage(currentIdx);
}
