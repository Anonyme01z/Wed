document.addEventListener('DOMContentLoaded', function() {
    // Hero Slider
    const slider = document.querySelector('.slide-container');
    const slides = slider.children;
    const dots = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    // Slider images
    const sliderImages = [
        '/images/SliderImages/sliderimage1.jpg',
        '/images/SliderImages/sliderimage2.jpg',
        '/images/SliderImages/sliderimage3.jpg',
        '/images/SliderImages/sliderimage4.jpg',
        '/images/SliderImages/sliderimage5.jpg',
        '/images/SliderImages/sliderimage6.jpg' 
    ];
    // Gallery images (all images in src/images/ except Slider Images, bride.jpg, groom.jpg)
    const galleryImages = [
        '/images/IMG_0436.jpg',
        '/images/IMG_0522.jpg',
        '/images/IMG_0472.jpg',
        '/images/IMG_0528.jpg',
        '/images/IMG_0469.jpg',
        '/images/IMG_0524.jpg',
        '/images/IMG_0483.jpg',
        '/images/IMG_0514.jpg',
        '/images/IMG_0409.jpg',
        '/images/IMG_0519.jpg',
        '/images/IMG_0416.jpg',
        '/images/IMG_0474.jpg',
        '/images/IMG_0466.jpg',
        '/images/IMG_0459.jpg',
        '/images/IMG_0464.jpg'
    ];
    // Shuffle slider and gallery images for random order
    const shuffledSliderImages = shuffle(sliderImages.slice());
    const shuffledGalleryImages = shuffle(galleryImages.slice());
    let currentSlide = 0;

    // Create slides and dots
    slider.innerHTML = '';
    dots.innerHTML = '';
    shuffledSliderImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''} slider-centered`;
        slide.style.backgroundImage = `url(${image})`;
        slider.appendChild(slide);
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots.children[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots.children[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause slider on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Gallery grid: show only 6 images
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        shuffledGalleryImages.slice(0, 6).forEach((image, idx) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.onclick = function() { openModal(idx); };
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Gallery Image ${idx + 1}`;
            img.loading = 'lazy';
            galleryItem.appendChild(img);
            const fullscreenIcon = document.createElement('div');
            fullscreenIcon.className = 'fullscreen-icon';
            fullscreenIcon.innerHTML = '<i class="fas fa-expand"></i>';
            galleryItem.appendChild(fullscreenIcon);
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Lightbox modal for full gallery
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    // Add navigation for modal
    let currentModalIdx = 0;
    function showModal(idx) {
        currentModalIdx = idx;
        modalImg.src = shuffledGalleryImages[idx];
        modal.classList.add('active');
    }
    window.openModal = showModal;
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    // Modal navigation
    function showPrev() {
        currentModalIdx = (currentModalIdx - 1 + shuffledGalleryImages.length) % shuffledGalleryImages.length;
        modalImg.src = shuffledGalleryImages[currentModalIdx];
    }
    function showNext() {
        currentModalIdx = (currentModalIdx + 1) % shuffledGalleryImages.length;
        modalImg.src = shuffledGalleryImages[currentModalIdx];
    }
    // Add navigation buttons if not present
    let modalNav = document.querySelector('.modal-nav');
    if (!modalNav && modal) {
        modalNav = document.createElement('div');
        modalNav.className = 'modal-nav';
        modalNav.innerHTML = `
            <button class="prev-modal"><i class="fas fa-chevron-left"></i></button>
            <button class="next-modal"><i class="fas fa-chevron-right"></i></button>
        `;
        modal.appendChild(modalNav);
        modalNav.querySelector('.prev-modal').onclick = (e) => { e.stopPropagation(); showPrev(); };
        modalNav.querySelector('.next-modal').onclick = (e) => { e.stopPropagation(); showNext(); };
    }

    // Countdown Timer
    const nowYear = new Date().getFullYear();
    const weddingDate = new Date(`June 27, ${nowYear} 11:00:00`).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector('.days').textContent = String(days).padStart(2, '0');
        document.querySelector('.hours').textContent = String(hours).padStart(2, '0');
        document.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
        document.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown').innerHTML = '<h2>The Wedding Day Has Arrived!</h2>';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Music Player
    const music = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');
    const muteToggle = document.getElementById('mute-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    let isPlaying = false;
    let isMuted = false;
    let lastVolume = 0.5;

    // Initialize volume
    music.volume = volumeSlider.value / 100;

    // Play/Pause
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicToggle.classList.remove('playing');
        } else {
            music.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Mute/Unmute
    muteToggle.addEventListener('click', () => {
        if (isMuted) {
            music.volume = lastVolume;
            muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            volumeSlider.value = lastVolume * 100;
        } else {
            lastVolume = music.volume;
            music.volume = 0;
            muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            volumeSlider.value = 0;
        }
        isMuted = !isMuted;
    });

    // Volume Control
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        music.volume = volume;
        lastVolume = volume;
        
        if (volume === 0) {
            muteToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isMuted = true;
        } else {
            muteToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            isMuted = false;
        }
    });

    // Google Maps
    window.initMap = function() {
        const location = { lat: 6.4351, lng: 3.4500 }; // Example coordinates for Lagos
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#c9c9c9"}]
                }
            ]
        });

        new google.maps.Marker({
            position: location,
            map: map,
            title: 'Wedding Venue'
        });
    };

    // Copy bank details
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const text = this.dataset.clipboard;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 