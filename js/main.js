/**
 * Application Entry Point
 */

emailjs.init(CONFIG.emailjs.publicKey);

function productCard(p) {
  return '<div class="prod-card">' +
    '<div class="prod-img">' +
      '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" ' +
        'onerror="this.src=\'' + FALLBACK_IMG + '\'">' +
      '<span class="prod-tag">' + p.tag + '</span>' +
    '</div>' +
    '<div class="prod-info">' +
      '<div class="prod-name">' + p.name + '</div>' +
      '<div class="prod-desc">' + p.desc + '</div>' +
      '<div class="prod-footer">' +
        '<span class="prod-origin">' + p.origin + '</span>' +
        '<button class="prod-btn" onclick="showPage(\'contact\')">Enquire</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

document.getElementById('home-products').innerHTML =
  PRODUCTS.slice(0, 4).map(productCard).join('');

document.getElementById('all-products-grid').innerHTML =
  PRODUCTS.map(productCard).join('');
