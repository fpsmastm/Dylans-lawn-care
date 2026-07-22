// Set up navigation toggle for small screens
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the mobile menu once a link is picked, otherwise it just
  // sits open over the next section
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Give the header a slightly heavier shadow once the page has scrolled,
// helps it read as separate from the hero image behind it
const header = document.getElementById('site-header');

function updateHeaderState() {
  if (window.scrollY > 12) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

if (header) {
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
}

// Fill in the current year in the footer automatically
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Contact form doesn't have a backend, so instead of failing silently
// we build a mailto link from whatever the visitor typed in and hand
// it off to their email client
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const phone = contactForm.phone.value.trim();
    const address = contactForm.address.value.trim();
    const service = contactForm.service.value;
    const message = contactForm.message.value.trim();

    const serviceLabels = {
      mowing: 'Mowing',
      edging: 'Edging & Trimming',
      cleanup: 'Yard Cleanup',
      snow: 'Snow Removal',
      other: 'Not sure / other'
    };

    const subject = `Quote request from ${name || 'a new customer'}`;

    const bodyLines = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Address: ${address || 'not provided'}`,
      `Service needed: ${serviceLabels[service] || service}`,
      '',
      'Details:',
      message || 'no additional details provided'
    ];

    const body = bodyLines.join('\n');

    const mailtoLink = `mailto:dylangalullo@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
}
