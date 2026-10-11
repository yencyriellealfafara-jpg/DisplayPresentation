document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const slideCounter = document.getElementById('slide-counter');
    const slideIndicator = document.getElementById('slide-indicator');
    const dotsContainer = document.getElementById('dots-container');

    let currentSlide = 0;
    const totalSlides = slides.length;

    const svgMap = {
        'curve-arrow-blue-up': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 160' aria-hidden='true'><path d='M18 30C52 78 96 102 146 98C172 96 190 88 206 52' fill='none' stroke='#2B5EE8' stroke-width='6' stroke-linecap='round'/><path d='M160 88l46-10-8-28' fill='none' stroke='#2B5EE8' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'/></svg>",
        'wave-line': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 200' aria-hidden='true'><path d='M10 110C40 90 60 120 92 112C120 105 125 70 160 78C192 86 206 122 236 116C266 110 285 84 310 98' fill='none' stroke='#2B5EE8' stroke-width='5' stroke-linecap='round'/></svg>",
    };

    function loadSvgs() {
        const svgElements = document.querySelectorAll('[data-svg]');
        svgElements.forEach((el) => {
            const svgKey = el.getAttribute('data-svg');
            if (svgMap[svgKey]) {
                el.innerHTML = svgMap[svgKey];
            }
        });
    }

    // Build Navigation Dots
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Update Slide View
    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        // Update Counter & Indicator
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        const currentIndicatorText = slides[currentSlide].getAttribute('data-indicator');
        if (currentIndicatorText) {
            slideIndicator.textContent = currentIndicatorText;
        }

        // Update Dots
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Initialize
    loadSvgs();
    createDots();
    updateSlide();
});