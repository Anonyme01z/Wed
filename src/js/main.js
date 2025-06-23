import { initSlider } from './components/slider.js';
import { initGallery } from './components/gallery.js';
import { initCountdown } from './components/countdown.js';
import { initCouple } from './components/couple.js';
import { initStory } from './components/story.js';
import { initEvents } from './components/events.js';
import { initModal, openModal } from './components/modal.js';
import { initNavbar } from './components/navbar.js';
import { initFooter } from './components/footer.js';
import { initMusicPlayer } from './components/musicPlayer.js';
import { COUPLE, EVENTS, RECEPTION, RSVP, COLOR_OF_DAY, SLIDER_IMAGES, GALLERY_IMAGES } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSlider(SLIDER_IMAGES);
  initGallery(GALLERY_IMAGES);
  initCountdown(EVENTS[0].date);
  initCouple();
  initStory();
  initEvents();
  initModal();
  initFooter();
  initMusicPlayer();

  // Integrate modal with gallery
  const galleryRoot = document.getElementById('gallery');
  if (galleryRoot) {
    galleryRoot.addEventListener('click', (e) => {
      if (e.target.classList.contains('gallery-thumb')) {
        const idx = parseInt(e.target.dataset.idx, 10);
        openModal(GALLERY_IMAGES, idx);
      }
    });
  }
});
