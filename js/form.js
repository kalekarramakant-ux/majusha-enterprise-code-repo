/**
 * Form Validation, Collection & Submission
 */

function showToast(message, type) {
  type = type || 'success';
  var toast = document.getElementById('toast');
  toast.textContent = (type === 'success' ? 'Done! ' : 'Error! ') + message;
  toast.className = 'toast toast-' + type + ' show';
  setTimeout(function() { toast.classList.remove('show'); }, 5000);
}

function validateForm(wrapperId) {
  var el = document.getElementById(wrapperId);
  var valid = true;
  el.querySelectorAll('.field-error').forEach(function(f) { f.classList.remove('field-error'); });
  el.querySelectorAll('.error-msg').forEach(function(e) { e.remove(); });

  var nameInput  = el.querySelector('input[name="fullName"]');
  var emailInput = el.querySelector('input[name="email"]');

  if (!nameInput.value.trim()) {
    nameInput.classList.add('field-error');
    nameInput.insertAdjacentHTML('afterend', '<span class="error-msg">Name is required</span>');
    valid = false;
  }
  if (!emailInput.value.trim()) {
    emailInput.classList.add('field-error');
    emailInput.insertAdjacentHTML('afterend', '<span class="error-msg">Email is required</span>');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+/.test(emailInput.value.trim())) {
    emailInput.classList.add('field-error');
    emailInput.insertAdjacentHTML('afterend', '<span class="error-msg">Please enter a valid email</span>');
    valid = false;
  }
  return valid;
}

function collectFormData(wrapperId) {
  var el = document.getElementById(wrapperId);
  return {
    from_name:   (el.querySelector('input[name="fullName"]')   || {}).value || '',
    company:     (el.querySelector('input[name="company"]')    || {}).value || 'N/A',
    from_email:  (el.querySelector('input[name="email"]')      || {}).value || '',
    phone:       (el.querySelector('input[name="phone"]')      || {}).value || 'N/A',
    country:     (el.querySelector('input[name="country"]')    || {}).value || 'N/A',
    product:     (el.querySelector('select[name="product"]')   || {}).value || 'N/A',
    quantity:    (el.querySelector('input[name="quantity"]')    || {}).value || 'N/A',
    message:     (el.querySelector('textarea[name="message"]') || {}).value || 'No message provided',
    form_source: wrapperId === 'homeFormWrapper' ? 'Home Page Enquiry' : 'Contact Page Message',
  };
}

function resetForm(wrapperId) {
  var el = document.getElementById(wrapperId);
  el.querySelectorAll('input').forEach(function(i) { i.value = ''; });
  el.querySelectorAll('textarea').forEach(function(t) { t.value = ''; });
  el.querySelectorAll('select').forEach(function(s) { s.selectedIndex = 0; });
}

async function submitForm(wrapperId) {
  if (!validateForm(wrapperId)) return;
  var data    = collectFormData(wrapperId);
  var wrapper = document.getElementById(wrapperId);
  var btn     = wrapper.querySelector('.form-submit button');
  var originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  if (CONFIG.emailjs.publicKey === 'YOUR_PUBLIC_KEY') {
    var subject = encodeURIComponent('New Enquiry from ' + data.from_name + ' - ' + data.form_source);
    var body = encodeURIComponent(
      'Name: ' + data.from_name + '\nCompany: ' + data.company +
      '\nEmail: ' + data.from_email + '\nPhone: ' + data.phone +
      '\nCountry: ' + data.country + '\nProduct: ' + data.product +
      '\nQuantity: ' + data.quantity + '\n\nMessage:\n' + data.message
    );
    window.location.href = 'mailto:' + CONFIG.receiverEmail + '?subject=' + subject + '&body=' + body;
    btn.disabled = false;
    btn.textContent = originalText;
    showToast('Opening your email client.');
    return;
  }

  try {
    await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, data);
    showToast("Your enquiry has been submitted! We'll reply within 24 hours.", 'success');
    resetForm(wrapperId);
  } catch (err) {
    console.error('EmailJS error:', err);
    showToast('Failed to send. Please email us directly at ' + CONFIG.receiverEmail, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}
