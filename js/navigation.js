/** Mobile menu toggle + close on link click */
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Close mobile menu when any link inside it is clicked
document.addEventListener('DOMContentLoaded', function() {
  var menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { menu.classList.remove('open'); });
    });
  }

  // Scroll to hash target on page load (e.g. services.html#export-services)
  if (window.location.hash) {
    setTimeout(function() {
      var target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    }, 300);
  }
});
