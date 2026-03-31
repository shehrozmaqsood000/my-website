/* =============================================
   HOPE PREPARATIONS – MAIN SCRIPT
   ============================================= */

// ─── NAVBAR STICKY ───────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// ─── HAMBURGER MENU ──────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

// ─── HERO SLIDER ─────────────────────────────
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('slidePrev');
const nextBtn = document.getElementById('slideNext');
let currentSlide = 0;
let sliderInterval;

if (slides.length > 0) {
  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.slider-dot')[currentSlide]?.classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.slider-dot')[currentSlide]?.classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

  function resetInterval() { clearInterval(sliderInterval); sliderInterval = setInterval(nextSlide, 5500); }
  sliderInterval = setInterval(nextSlide, 5500);
}

// ─── COUNTER ANIMATION ───────────────────────
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString();
    }, 16);
  });
}

// ─── SCROLL REVEAL ───────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { animateCounters(); statsObserver.disconnect(); }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  document.querySelectorAll('.course-card, .faculty-card, .schedule-card, .why-inner, .director-card, .subject-pill').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Stats counter
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) statsObserver.observe(statsBar);

  // Back to top
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400));
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === currentPage) link.classList.add('active');
  });

  // Init auth forms if present
  initAuth();
  initAdminDashboard();
  initStudentDashboard();
  initAdmissionForm();
});

// ─── AUTH (Login) ─────────────────────────────
function initAuth() {
  // Sample users (in a real app, this would be server-side)
  const USERS = {
    students: [
      { id: 'STU001', username: 'student1', password: 'hope123', name: 'Ali Hassan', course: 'CSS/PMS', batch: '2025-A', fee_status: 'Paid' },
      { id: 'STU002', username: 'ahmed', password: 'hope123', name: 'Ahmed Raza', course: 'FPSC/PPSC', batch: '2025-B', fee_status: 'Pending' },
    ],
    admin: [
      { id: 'ADM001', username: 'admin', password: 'hopeadmin2025', name: 'Admin User', role: 'Super Admin' },
      { id: 'ADM002', username: 'director', password: 'asifnaveed', name: 'Asif Naveed', role: 'Director' },
    ]
  };

  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  const isAdmin = loginForm.dataset.type === 'admin';

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const msgEl = document.getElementById('loginMsg');

    const list = isAdmin ? USERS.admin : USERS.students;
    const user = list.find(u => u.username === username && u.password === password);

    if (user) {
      sessionStorage.setItem('hopeUser', JSON.stringify({ ...user, type: isAdmin ? 'admin' : 'student' }));
      window.location.href = isAdmin ? 'admin-dashboard.html' : 'student-dashboard.html';
    } else {
      if (msgEl) { msgEl.textContent = 'Invalid username or password. Please try again.'; msgEl.className = 'alert alert-error'; }
    }
  });

  // Logout buttons
  document.querySelectorAll('[data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', () => {
      sessionStorage.removeItem('hopeUser');
      window.location.href = '../pages/login.html';
    });
  });
}

// ─── STUDENT DASHBOARD ───────────────────────
function initStudentDashboard() {
  if (!document.getElementById('studentDashboard')) return;

  const user = JSON.parse(sessionStorage.getItem('hopeUser') || 'null');
  if (!user || user.type !== 'student') {
    window.location.href = 'login.html';
    return;
  }

  // Set user info
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = user.name);
  document.querySelectorAll('[data-user-course]').forEach(el => el.textContent = user.course || '');
  document.querySelectorAll('[data-user-id]').forEach(el => el.textContent = user.id || '');

  // Tab switching
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('[data-tab-content]').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const content = document.querySelector(`[data-tab-content="${tab}"]`);
      if (content) content.style.display = 'block';
    });
  });
}

// ─── ADMIN DASHBOARD ─────────────────────────
function initAdminDashboard() {
  if (!document.getElementById('adminDashboard')) return;

  const user = JSON.parse(sessionStorage.getItem('hopeUser') || 'null');
  if (!user || user.type !== 'admin') {
    window.location.href = 'admin-login.html';
    return;
  }

  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = user.name);

  // Upload note handler
  const uploadForm = document.getElementById('uploadNoteForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showAlert('noteUploadMsg', 'Resource uploaded successfully!', 'success');
      uploadForm.reset();
    });
  }

  // Announcement handler
  const annForm = document.getElementById('announcementForm');
  if (annForm) {
    annForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showAlert('annMsg', 'Announcement posted successfully!', 'success');
      annForm.reset();
    });
  }

  // Tab switching
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('[data-tab-content]').forEach(c => c.style.display = 'none');
      btn.classList.add('active');
      const content = document.querySelector(`[data-tab-content="${tab}"]`);
      if (content) content.style.display = 'block';
    });
  });
}

// ─── ADMISSION FORM ──────────────────────────
function initAdmissionForm() {
  const form = document.getElementById('admissionForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('appName')?.value;
    document.getElementById('admissionSuccess').style.display = 'block';
    document.getElementById('appNameDisplay').textContent = name || 'Applicant';
    form.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── HELPERS ─────────────────────────────────
function showAlert(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type}`;
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showAlert('contactMsg', 'Your message has been sent! We will get back to you shortly.', 'success');
    contactForm.reset();
  });
}

// Search filter for resources
function filterResources(inputId, listId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    const val = input.value.toLowerCase();
    document.querySelectorAll(`#${listId} .resource-card`).forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(val) ? '' : 'none';
    });
  });
}
filterResources('notesSearch', 'notesList');
filterResources('paperSearch', 'papersList');

// Date filter for newspapers
const dateFilter = document.getElementById('paperDateFilter');
if (dateFilter) {
  dateFilter.addEventListener('change', () => {
    const val = dateFilter.value;
    document.querySelectorAll('#papersList .resource-card').forEach(card => {
      const date = card.dataset.date || '';
      card.style.display = (!val || date === val) ? '' : 'none';
    });
  });
}

// Quiz timer
function startQuizTimer(seconds, displayId) {
  const el = document.getElementById(displayId);
  if (!el) return;
  let remaining = seconds;
  const interval = setInterval(() => {
    remaining--;
    const m = Math.floor(remaining / 60).toString().padStart(2, '0');
    const s = (remaining % 60).toString().padStart(2, '0');
    el.textContent = `${m}:${s}`;
    if (remaining <= 0) { clearInterval(interval); el.textContent = 'Time Up!'; submitQuiz(); }
  }, 1000);
}

function submitQuiz() {
  const form = document.getElementById('quizForm');
  if (!form) return;
  let score = 0, total = 0;
  form.querySelectorAll('input[type="radio"]:checked').forEach(input => {
    total++;
    if (input.dataset.correct === 'true') score++;
  });
  const result = document.getElementById('quizResult');
  if (result) {
    result.style.display = 'block';
    result.innerHTML = `<div class="alert alert-info"><i class="fas fa-trophy"></i> You scored <strong>${score} / ${total}</strong></div>`;
  }
  form.querySelectorAll('input[type="radio"]').forEach(inp => inp.disabled = true);
}

// Modal helpers
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('show'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('show'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', (e) => { if (e.target === m) closeModal(m.id); });
});
