// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const stickyCta = document.getElementById('stickyCta');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  if (window.scrollY > 400) {
    stickyCta.classList.add('visible');
  } else {
    stickyCta.classList.remove('visible');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== BOOKING FORM =====
const form = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');

// Set minimum date to today
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const action = form.getAttribute('action');

  // If using the placeholder Formspree ID, show a demo success
  if (action.includes('YOUR_FORM_ID')) {
    showSuccess();
    return;
  }

  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  submitBtn.disabled = true;

  try {
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showSuccess();
    } else {
      const data = await response.json();
      alert('Oops! Something went wrong. Please try again or contact us directly on Facebook.');
      console.error('Form error:', data);
    }
  } catch (err) {
    alert('Network error. Please check your connection and try again, or message us on Facebook!');
    console.error(err);
  } finally {
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    submitBtn.disabled = false;
  }
});

function showSuccess() {
  form.classList.add('hidden');
  formSuccess.classList.remove('hidden');
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ===== SMOOTH SCROLL active nav highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== GALLERY – simple lightbox feel (fade on load) =====
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity .5s ease, transform .5s ease';
  item.style.transitionDelay = `${i * 0.08}s`;
});

const galObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      galObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.gallery-item').forEach(item => galObserver.observe(item));

// ===== REVIEW CARDS – animate in =====
document.querySelectorAll('.review-card, .menu-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(24px)';
  card.style.transition = `opacity .5s ease ${i * 0.07}s, transform .5s ease ${i * 0.07}s`;
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.review-card, .menu-card').forEach(c => cardObserver.observe(c));
