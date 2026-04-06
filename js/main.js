/** App entry - init EmailJS + render product cards */
if(typeof emailjs !== 'undefined') { emailjs.init(CONFIG.emailjs.publicKey); }

function productCard(p) {
  return '<div class="prod-card">' +
    '<div class="prod-img"><img src="'+p.img+'" alt="'+p.name+'" loading="lazy" onerror="this.src=\''+FALLBACK_IMG+'\'"><span class="prod-tag">'+p.tag+'</span></div>' +
    '<div class="prod-info"><div class="prod-name">'+p.name+'</div><div class="prod-desc">'+p.desc+'</div>' +
    '<div class="prod-footer"><span class="prod-origin">'+p.origin+'</span><a href="contact.html" class="prod-btn">Enquire</a></div></div></div>';
}

// Render into whichever containers exist on this page
var homeGrid = document.getElementById('home-products');
var allGrid  = document.getElementById('all-products-grid');
if(homeGrid) homeGrid.innerHTML = PRODUCTS.slice(0,4).map(productCard).join('');
if(allGrid)  allGrid.innerHTML  = PRODUCTS.map(productCard).join('');
