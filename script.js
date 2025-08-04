// Toggle menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navMenu    = document.querySelector('.nav-menu');
const navLinks   = document.querySelectorAll('.nav-link');
const navbar     = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Cierra el menú cuando haces clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Scroll suave interno
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior:'smooth', block:'start' });
  });
});

// Fade-in al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.animate-on-scroll');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10% 0px' });
  elems.forEach(el => io.observe(el));
});

// Scroll-spy para nav activo + cambio de fondo navbar
window.addEventListener('scroll', () => {
  const headerH = navbar.offsetHeight;
  const fromTop = window.scrollY + headerH + 20;
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// Lightbox para proyectos actuales
const lightbox = document.getElementById('lightbox');
const lbImg    = lightbox.querySelector('.lightbox-img');
document.querySelectorAll('.project-card img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Validación y envío con Formspree + toast
const form = document.getElementById('contact-form');
const toast = document.getElementById('toast');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        showToast('¡Gracias por contactarnos!. En breve nos pondremos en contacto contigo.');
        form.reset();
      } else {
        const data = await resp.json();
        showToast(data.error || 'Error al enviar. Intenta de nuevo.');
      }
    } catch (err) {
      showToast('Error de red. Verifica tu conexión.');
    }
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
