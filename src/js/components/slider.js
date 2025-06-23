// No external imports needed. Only vanilla JS slider logic below.

function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

function isPortrait(url, cb) {
  const img = new window.Image();
  img.onload = function() {
    cb(img.naturalHeight > img.naturalWidth);
  };
  img.onerror = function() {
    console.error('Error loading image:', url);
    cb(false);
  };
  img.src = url;
}

export function initSlider(images) {
  const sliderRoot = document.getElementById('hero-slider');
  if (!sliderRoot || !images.length) return;

  let current = 0;
  let isAnimating = false;

  // Preload all images
  preloadImages(images);

  sliderRoot.innerHTML = `
    <div class="slider-wrapper" style="position:relative;">
      <div class="slider-image" style="background-image: url('${images[0]}')"></div>
      <button class="slider-nav prev" aria-label="Previous image">&#8592;</button>
      <button class="slider-nav next" aria-label="Next image">&#8594;</button>
      <div class="slider-preview" style="position:absolute; bottom:1rem; right:1rem; width:80px; height:60px; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.15); border:2px solid #fff; background:#eee; z-index:3;">
        <img src="${images[1 % images.length]}" alt="Next Slide Preview" style="width:100%; height:100%; object-fit:cover; opacity:0.85;" />
      </div>
    </div>
  `;

  let imgDiv = sliderRoot.querySelector('.slider-image');
  const prevBtn = sliderRoot.querySelector('.slider-nav.prev');
  const nextBtn = sliderRoot.querySelector('.slider-nav.next');
  const previewDiv = sliderRoot.querySelector('.slider-preview img');

  function show(idx, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    // Create new image div
    const newImgDiv = document.createElement('div');
    newImgDiv.className = 'slider-image';
    newImgDiv.style.backgroundImage = `url('${images[idx]}')`;
    newImgDiv.style.position = 'absolute';
    newImgDiv.style.top = '0';
    newImgDiv.style.left = direction === 'next' ? '100%' : '-100%';
    newImgDiv.style.transition = 'none';
    
    // Add new image div to wrapper
    const wrapper = sliderRoot.querySelector('.slider-wrapper');
    wrapper.appendChild(newImgDiv);

    // Force reflow
    newImgDiv.offsetHeight;

    // Add transition and move both images
    newImgDiv.style.transition = 'left 0.5s ease-in-out';
    imgDiv.style.transition = 'left 0.5s ease-in-out';
    
    newImgDiv.style.left = '0';
    imgDiv.style.left = direction === 'next' ? '-100%' : '100%';

    // Check image orientation
    isPortrait(images[idx], (portrait) => {
      newImgDiv.style.backgroundSize = portrait ? 'contain' : 'cover';
      newImgDiv.style.backgroundColor = portrait ? '#fff' : '';
    });

    // After transition, cleanup
    setTimeout(() => {
      imgDiv.remove();
      newImgDiv.style.position = 'relative';
      imgDiv = newImgDiv; // Update reference to the new image div
      // Update preview to show the next image
      const nextIdx = (idx + 1) % images.length;
      previewDiv.src = images[nextIdx];
      isAnimating = false;
    }, 500);
  }

  prevBtn.onclick = () => {
    current = (current - 1 + images.length) % images.length;
    show(current, 'prev');
  };

  nextBtn.onclick = () => {
    current = (current + 1) % images.length;
    show(current, 'next');
  };

  // Initial aspect ratio check
  show(current);

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
} 