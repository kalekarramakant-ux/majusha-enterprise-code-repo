/** Form validation, collection & submission */
function showToast(msg, type) {
  type = type || 'success';
  var t = document.getElementById('toast');
  t.textContent = (type==='success'?'Done! ':'Error! ') + msg;
  t.className = 'toast toast-' + type + ' show';
  setTimeout(function(){ t.classList.remove('show'); }, 5000);
}

function validateForm(id) {
  var el = document.getElementById(id), valid = true;
  el.querySelectorAll('.field-error').forEach(function(f){f.classList.remove('field-error');});
  el.querySelectorAll('.error-msg').forEach(function(e){e.remove();});
  var n = el.querySelector('input[name="fullName"]');
  var e = el.querySelector('input[name="email"]');
  if(!n.value.trim()){n.classList.add('field-error');n.insertAdjacentHTML('afterend','<span class="error-msg">Name is required</span>');valid=false;}
  if(!e.value.trim()){e.classList.add('field-error');e.insertAdjacentHTML('afterend','<span class="error-msg">Email is required</span>');valid=false;}
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+/.test(e.value.trim())){e.classList.add('field-error');e.insertAdjacentHTML('afterend','<span class="error-msg">Invalid email</span>');valid=false;}
  return valid;
}

function collectFormData(id) {
  var el = document.getElementById(id);
  return {
    from_name:(el.querySelector('input[name="fullName"]')||{}).value||'',
    company:(el.querySelector('input[name="company"]')||{}).value||'N/A',
    from_email:(el.querySelector('input[name="email"]')||{}).value||'',
    phone:(el.querySelector('input[name="phone"]')||{}).value||'N/A',
    country:(el.querySelector('input[name="country"]')||{}).value||'N/A',
    product:(el.querySelector('select[name="product"]')||{}).value||'N/A',
    quantity:(el.querySelector('input[name="quantity"]')||{}).value||'N/A',
    message:(el.querySelector('textarea[name="message"]')||{}).value||'No message',
    form_source: id==='homeFormWrapper'?'Home Page':'Contact Page',
  };
}

function resetForm(id) {
  var el = document.getElementById(id);
  el.querySelectorAll('input').forEach(function(i){i.value='';});
  el.querySelectorAll('textarea').forEach(function(t){t.value='';});
  el.querySelectorAll('select').forEach(function(s){s.selectedIndex=0;});
}

async function submitForm(id) {
  if(!validateForm(id)) return;
  var data=collectFormData(id), w=document.getElementById(id), btn=w.querySelector('.form-submit button'), orig=btn.textContent;
  btn.disabled=true; btn.textContent='Sending...';
  if(CONFIG.emailjs.publicKey==='YOUR_PUBLIC_KEY'){
    window.location.href='mailto:'+CONFIG.receiverEmail+'?subject='+encodeURIComponent('Enquiry from '+data.from_name)+'&body='+encodeURIComponent('Name: '+data.from_name+'\nEmail: '+data.from_email+'\nProduct: '+data.product+'\n\n'+data.message);
    btn.disabled=false; btn.textContent=orig; showToast('Opening email client.'); return;
  }
  try { await emailjs.send(CONFIG.emailjs.serviceId,CONFIG.emailjs.templateId,data); showToast("Submitted! We'll reply within 24 hours.",'success'); resetForm(id); }
  catch(err){ console.error(err); showToast('Failed. Email us at '+CONFIG.receiverEmail,'error'); }
  finally { btn.disabled=false; btn.textContent=orig; }
}
