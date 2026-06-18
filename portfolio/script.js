/* =============================================
   BHAVYA TYAGI — PORTFOLIO SCRIPTS
   script.js
   ============================================= */


/* ── 1. NAVBAR: add glass effect on scroll ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


/* ── 2. HAMBURGER MENU (mobile) ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


/* ── 3. TYPING ANIMATION ── */
const roles = [
  'Frontend Developer',
  'HTML / CSS / JS Dev',
  'Team Leader',
  'UI Enthusiast'
];

let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;

const typedEl = document.getElementById('typed-text');

function type() {
  const word = roles[roleIdx];

  if (deleting) {
    // erase one character
    typedEl.textContent = word.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(type, 450);
      return;
    }
    setTimeout(type, 38);

  } else {
    // add one character
    typedEl.textContent = word.slice(0, ++charIdx);
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(type, 2200);   // pause before deleting
      return;
    }
    setTimeout(type, 78);
  }
}

// small delay before the animation starts
setTimeout(type, 900);


/* ── 4. SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // stagger each element slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 90);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));


/* ── 5. CONTACT FORM SUBMIT ── */
const contactForm = document.getElementById('contact-form');
const sendBtn     = document.getElementById('send-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Show success state
  sendBtn.textContent  = 'Sent ✓';
  sendBtn.style.background = '#22c55e';
  sendBtn.disabled = true;

  // Reset after 3.5 seconds
  setTimeout(() => {
    sendBtn.textContent       = 'Send Message →';
    sendBtn.style.background  = '';
    sendBtn.disabled          = false;
    contactForm.reset();
  }, 3500);
});


/* ── 6. SMOOTH ACTIVE NAV LINK HIGHLIGHT ── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));