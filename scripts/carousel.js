// carousel.js - Salve este arquivo em ./scripts/carousel.js

// CARROSSEL
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
const totalSlides = slides.length;
let autoplayInterval;

function showSlide(index) {
  // Remove active de todos
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Adiciona active no slide atual
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 700); // Muda a cada 5 segundos
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Event listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  stopAutoplay();
  startAutoplay(); // Reinicia o autoplay
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  stopAutoplay();
  startAutoplay(); // Reinicia o autoplay
});

// Indicadores clicáveis
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
    stopAutoplay();
    startAutoplay(); // Reinicia o autoplay
  });
});

// Pausa o autoplay quando o mouse está sobre o carrossel
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', stopAutoplay);
carouselContainer.addEventListener('mouseleave', startAutoplay);

// Navegação por teclado (acessibilidade)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
    stopAutoplay();
    startAutoplay();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    stopAutoplay();
    startAutoplay();
  }
});

// Inicia o autoplay quando a página carregar
startAutoplay();