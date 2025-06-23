let modalRoot, modalImg, currentIdx = 0, images = [];

export function initModal() {
  modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;
  modalRoot.innerHTML = `
    <div class="modal-overlay" style="display:none;">
      <span class="close-modal">&times;</span>
      <img class="modal-img" src="" alt="Gallery Full View" />
      <button class="modal-nav prev">&#8592;</button>
      <button class="modal-nav next">&#8594;</button>
    </div>
  `;
  modalImg = modalRoot.querySelector('.modal-img');
  modalRoot.querySelector('.close-modal').onclick = closeModal;
  modalRoot.querySelector('.modal-nav.prev').onclick = showPrev;
  modalRoot.querySelector('.modal-nav.next').onclick = showNext;
}

export function openModal(imgArray, idx) {
  images = imgArray;
  currentIdx = idx;
  modalImg.src = images[currentIdx];
  modalRoot.querySelector('.modal-overlay').style.display = 'flex';
}

function closeModal() {
  modalRoot.querySelector('.modal-overlay').style.display = 'none';
}

function showPrev(e) {
  if (e) e.stopPropagation();
  currentIdx = (currentIdx - 1 + images.length) % images.length;
  modalImg.src = images[currentIdx];
}

function showNext(e) {
  if (e) e.stopPropagation();
  currentIdx = (currentIdx + 1) % images.length;
  modalImg.src = images[currentIdx];
}
