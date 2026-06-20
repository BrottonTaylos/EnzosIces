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

// ===== WHERE'S THE VAN TODAY =====
fetch('location.json?t=' + Date.now())
  .then(r => r.json())
  .then(loc => {
    if (loc.active) {
      document.getElementById('locArea').textContent = loc.area;
      document.getElementById('locStreet').textContent = loc.street + (loc.postcode ? ', ' + loc.postcode : '');
      document.getElementById('locHours').textContent = loc.from + ' – ' + loc.to;
      document.getElementById('locMessage').textContent = loc.message || '';
      document.getElementById('locMap').src =
        'https://maps.google.com/maps?q=' + encodeURIComponent(loc.mapQuery || loc.area) + '&output=embed&z=15';
      document.getElementById('locationCard').style.display = 'grid';
    } else {
      document.getElementById('locationOffline').style.display = 'block';
    }
  })
  .catch(() => {
    document.getElementById('locationOffline').style.display = 'block';
  });

// ===== DATE FIELD – enforce minimum date of today =====
const dateInput = document.getElementById('date');
if (dateInput) {
  dateInput.min = new Date().toISOString().split('T')[0];
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

// ===== GALLERY – fade in on scroll =====
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

// ===== CARDS – animate in on scroll =====
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
