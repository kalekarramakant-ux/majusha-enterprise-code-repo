/** Hero Banner Slider (loaded only on index.html) */
var currentSlide = 0;
var slides = document.querySelectorAll('.slide');
var dots   = document.querySelectorAll('.s-dot');

function goSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active-slide');
  dots[currentSlide].classList.add('active');
}

setInterval(function() { goSlide((currentSlide + 1) % slides.length); }, 5000);
