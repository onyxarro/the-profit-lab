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

// Email form handler — MailerLite via serverless API
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = emailForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const btn = emailForm.querySelector('button');
    const originalText = btn.textContent;

    if (!email) return;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        btn.textContent = '✓ Check your inbox!';
        btn.style.background = '#22c55e';
        emailInput.value = '';
      } else {
        btn.textContent = 'Something went wrong. Try again.';
        btn.style.background = '#ef4444';
      }
    } catch (err) {
      btn.textContent = 'Something went wrong. Try again.';
      btn.style.background = '#ef4444';
    }

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
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
