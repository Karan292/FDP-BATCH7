(() => {
  const form = document.getElementById('contactForm');
  const fields = ['name','email','password','country','message'];

  function setFilled(el){
    const parent = el.closest('.field');
    if(!parent) return;
    if(el.value && el.value.trim() !== '') parent.classList.add('filled'); else parent.classList.remove('filled');
  }

  function showError(el,msg){
    const small = el.closest('.field').querySelector('.error');
    small.textContent = msg || '';
  }

  function clearError(el){ showError(el,''); }

  function isEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  // attach input listeners
  fields.forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    // initialize filled state
    setFilled(el);
    el.addEventListener('input', () => { clearError(el); setFilled(el); });
    el.addEventListener('blur', () => setFilled(el));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const country = document.getElementById('country');
    const message = document.getElementById('message');
    const terms = document.getElementById('terms');

    // name
    if(!name.value.trim() || name.value.trim().length < 2){ showError(name,'Enter your full name'); ok=false; }
    else clearError(name);

    // email
    if(!isEmail(email.value)){ showError(email,'Enter a valid email'); ok=false;} else clearError(email);

    // password
    if(!password.value || password.value.length < 6){ showError(password,'Password must be 6+ characters'); ok=false;} else clearError(password);

    // country
    if(!country.value){ showError(country,'Select a country'); ok=false;} else clearError(country);

    // message
    if(!message.value.trim() || message.value.trim().length < 8){ showError(message,'Write a short message (8+ chars)'); ok=false;} else clearError(message);

    // terms
    if(!terms.checked){ alert('Please accept the terms to continue.'); ok=false; }

    if(!ok) return;

    // simulate submission
    const success = document.getElementById('success');
    success.hidden = false;
    form.querySelectorAll('input,select,textarea,button').forEach(i=>i.disabled=true);

    setTimeout(()=>{
      // reset
      form.reset();
      form.querySelectorAll('.field').forEach(f=>f.classList.remove('filled'));
      success.hidden = true;
      form.querySelectorAll('input,select,textarea,button').forEach(i=>i.disabled=false);
      // brief confirmation alert (optional)
    }, 1500);
  });

})();
