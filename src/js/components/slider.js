// No external imports needed. Only vanilla JS slider logic below.

function isPortrait(url, cb) {
  const img = new window.Image();
  img.onload = function() {
    cb(img.naturalHeight > img.naturalWidth);
  };
  img.src = url;
}

export function initSlider(images) {
  const sliderRoot = document.getElementById('hero-slider');
  if (!sliderRoot || !images.length) return;

  let current = 0;

  sliderRoot.innerHTML = `
    <div class="slider-wrapper">
      <div class="slider-image" style="background-image: url('${images[0]}')"></div>
      <button class="slider-nav prev">&#8592;</button>
      <button class="slider-nav next">&#8594;</button>
    </div>
  `;

  const imgDiv = sliderRoot.querySelector('.slider-image');
  const prevBtn = sliderRoot.querySelector('.slider-nav.prev');
  const nextBtn = sliderRoot.querySelector('.slider-nav.next');

  function show(idx) {
    imgDiv.style.backgroundImage = `url('${images[idx]}')`;
    isPortrait(images[idx], (portrait) => {
      imgDiv.style.backgroundSize = portrait ? 'contain' : 'cover';
      imgDiv.style.backgroundColor = portrait ? '#fff' : '';
    });
  }

  prevBtn.onclick = () => {
    current = (current - 1 + images.length) % images.length;
    show(current);
  };
  nextBtn.onclick = () => {
    current = (current + 1) % images.length;
    show(current);
  };

  // Initial aspect ratio check
  show(current);
} 