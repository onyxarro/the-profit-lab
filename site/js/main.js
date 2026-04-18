// The Profit Lab — Main JS

// ===========================================
// GUMROAD PRODUCT LINKS
// Replace these with your actual Gumroad URLs
// after creating your products
// ===========================================
const GUMROAD_LINKS = {
  'ai-prompt-pack': 'https://theprofitlabco.gumroad.com/l/zdmtb',
  'marketing-blueprint': 'https://theprofitlabco.gumroad.com/l/irjstt',
  'content-toolkit': 'https://theprofitlabco.gumroad.com/l/egdeeu',
  'side-hustle': 'https://theprofitlabco.gumroad.com/l/majbkg',
  'productivity': 'https://theprofitlabco.gumroad.com/l/xytxx',
  'bundle': 'https://theprofitlabco.gumroad.com/l/grghmw'
};

// Wire up all Gumroad buy buttons
document.querySelectorAll('.gumroad-link').forEach(link => {
  const product = link.dataset.product;
  if (GUMROAD_LINKS[product]) {
    link.href = GUMROAD_LINKS[product];
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

    // Toggle current
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Email form handler (connects to MailerLite or shows confirmation)
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailForm.querySelector('input[type="email"]').value;
    const btn = emailForm.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    // TODO: Replace with MailerLite embedded form or server-side integration
    // For now, show confirmation and store email intent
    btn.textContent = '✓ You\'re in! Stay tuned.';
    btn.style.background = '#22c55e';
    emailForm.querySelector('input[type="email"]').value = '';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
