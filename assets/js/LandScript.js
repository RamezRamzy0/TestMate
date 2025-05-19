emailjs.init('zRdi9jQY7pObD-URD'); 

const backToTopButton = document.querySelector('.back-to-top');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('div[id], footer[id]');
const form = document.getElementById('form');
const btn = document.getElementById('button');

let isScrolling = false;
window.addEventListener('scroll', function () {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      handleScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

function handleScroll() {
  const scrollY = window.scrollY;

  if (backToTopButton) {
    if (scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });

  if (scrollY < 100) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#') {
        link.classList.add('active');
      }
    });
  }

  animateElementsOnScroll();
}

function animateElementsOnScroll() {
  const textElements = document.querySelectorAll(
    '.text-wrapper-12, .text-wrapper-13, .text-wrapper-15, .create-a, ' +
    '.text-wrapper-14, .text-wrapper-16, .section-title, .p, .description, ' +
    '.text-wrapper-4, .when-joining-the, .animate-on-scroll'
  );

  textElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      element.classList.add('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  animateElementsOnScroll();

  const startButton = document.getElementById('start-button');
  if (startButton) {
    startButton.addEventListener('click', function () {
      console.log('Navigating to sign-in page...');
    });
  }
});


if (backToTopButton) {
  backToTopButton.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement && header) {
        const offset = targetElement.offsetTop - header.offsetHeight;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  });
});


if (form && btn) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    btn.value = 'Sending...';

    const serviceID = 'service_su45159';
    const templateID = 'template_je6yy3u';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });
}
